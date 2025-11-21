# Testing Guide

## Running Tests

```bash
# Run all tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once (CI mode)
pnpm test:run

# Run with coverage
pnpm test:coverage
```

## Test Organization

```
src/
├── lib/
│   ├── utils.ts
│   └── __tests__/
│       └── utils.test.ts
├── components/
│   └── ui/
│       ├── button.tsx
│       └── __tests__/
│           └── button.test.tsx
├── test/
│   ├── setup.ts      # Global test configuration
│   ├── utils.tsx     # Test rendering helpers
│   └── README.md     # This file
```

## Writing Tests

### Unit Tests (Utilities)

Test pure functions with clear inputs/outputs:

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../my-file'

describe('myFunction', () => {
  it('does something', () => {
    expect(myFunction('input')).toBe('output')
  })
})
```

### Component Tests

Use `render` from `@/test/utils`:

```typescript
import { render, screen } from '@/test/utils'
import { MyComponent } from '../my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```typescript
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### Testing Server Components

Server components are tested by rendering their output:

```typescript
// Render the component and test the HTML output
it('renders server component', () => {
  render(<ServerComponent />)
  expect(screen.getByRole('heading')).toHaveTextContent('Title')
})
```

### Mocking

External dependencies are mocked globally in `setup.ts`:

```typescript
// Mock Prisma
vi.mock('@/lib/db')

// Mock Supabase
vi.mock('@/lib/supabase/client')

// Mock Next.js router
vi.mock('next/navigation')
```

For test-specific mocks:

```typescript
import prisma from '@/lib/db'
import { vi } from 'vitest'

vi.mocked(prisma.profile.findUnique).mockResolvedValue({
  id: 'test-id',
  email: 'test@example.com',
  name: 'Test User'
})
```

## Best Practices

### 1. Arrange, Act, Assert

Structure tests clearly:

```typescript
it('validates email format', () => {
  // Arrange
  const email = 'test@example.com'
  
  // Act
  const result = isValidEmail(email)
  
  // Assert
  expect(result).toBe(true)
})
```

### 2. Test Behavior, Not Implementation

```typescript
// ✅ GOOD - Tests behavior
it('shows error message for invalid input', () => {
  render(<Form />)
  fireEvent.submit(screen.getByRole('form'))
  expect(screen.getByText('Invalid input')).toBeInTheDocument()
})

// ❌ BAD - Tests implementation
it('calls validate function', () => {
  const validate = vi.fn()
  render(<Form validate={validate} />)
  expect(validate).toHaveBeenCalled()
})
```

### 3. Use Semantic Queries

Prefer queries that reflect how users interact:

```typescript
// ✅ GOOD - Semantic queries
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email')
screen.getByText('Welcome')

// ❌ BAD - Implementation details
screen.getByTestId('submit-button')
screen.getByClassName('email-input')
```

### 4. Mock External Dependencies

Always mock:
- Database (Prisma)
- External APIs (Anthropic, etc.)
- Authentication (Supabase)
- Next.js router

### 5. Keep Tests Fast

- Unit tests should run in milliseconds
- Avoid real network calls
- Minimize setup complexity
- Clear mocks between tests

### 6. One Assertion Per Test (When Possible)

```typescript
// ✅ GOOD - Single assertion
it('validates email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
})

it('rejects invalid email', () => {
  expect(isValidEmail('invalid')).toBe(false)
})

// ⚠️ OK - Related assertions
it('renders user profile', () => {
  render(<UserProfile user={mockUser} />)
  expect(screen.getByText(mockUser.name)).toBeInTheDocument()
  expect(screen.getByText(mockUser.email)).toBeInTheDocument()
})
```

## Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| **Utilities/Libs** | 80%+ | High |
| **Type Guards** | 100% | Critical |
| **UI Components** | 50%+ | Medium |
| **API Routes** | 70%+ | High |
| **Integration** | Key flows | Medium |

## Common Patterns

### Testing API Handlers

```typescript
import { NextRequest } from 'next/server'
import { createApiHandler } from '@/lib/api-utils'

describe('GET /api/users', () => {
  it('returns user list', async () => {
    const handler = createApiHandler(async () => {
      return { users: [{ id: '1', name: 'Test' }] }
    })
    
    const req = new NextRequest('http://localhost:3000/api/users')
    const response = await handler(req)
    const data = await response.json()
    
    expect(data.success).toBe(true)
    expect(data.data.users).toHaveLength(1)
  })
})
```

### Testing Server Actions

```typescript
import { createObjectAction } from '@/lib/action-utils'

describe('updateUserAction', () => {
  it('updates user successfully', async () => {
    const result = await updateUserAction({
      id: '123',
      name: 'New Name'
    })
    
    expect(result.success).toBe(true)
  })
})
```

### Testing Type Guards

```typescript
import { isChatflowSchema } from '@/types/chatflow'

describe('isChatflowSchema', () => {
  it('validates correct schema', () => {
    const valid = {
      fields: [
        { id: '1', type: 'text', label: 'Name', name: 'name', required: true }
      ]
    }
    
    expect(isChatflowSchema(valid)).toBe(true)
  })
  
  it('rejects invalid field type', () => {
    const invalid = {
      fields: [
        { id: '1', type: 'invalid', label: 'Name', name: 'name', required: true }
      ]
    }
    
    expect(isChatflowSchema(invalid)).toBe(false)
  })
})
```

## Debugging Tests

### Run Single Test

```bash
# Run specific test file
pnpm test src/lib/__tests__/utils.test.ts

# Run specific test by name
pnpm test -t "validates email format"
```

### Use Test UI

```bash
pnpm test:ui
```

Opens an interactive UI where you can:
- Filter tests
- See test results visually
- Debug failing tests
- View coverage

### Console Logging

```typescript
it('debugs component state', () => {
  const { container } = render(<MyComponent />)
  
  // Log rendered HTML
  console.log(container.innerHTML)
  
  // Log specific element
  screen.debug(screen.getByRole('button'))
})
```

## Troubleshooting

### Tests Not Found

Ensure test files match the pattern: `**/*.{test,spec}.{ts,tsx}`

### Mock Not Working

Check if mock is defined in `setup.ts` or before the import:

```typescript
vi.mock('@/lib/db')  // Must be before import
import prisma from '@/lib/db'
```

### Type Errors

Add type reference at top of test file:

```typescript
/// <reference types="vitest/globals" />
```

### Async Issues

Always await async operations and use `userEvent.setup()`:

```typescript
const user = userEvent.setup()
await user.click(button)  // Don't forget await!
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- Project Standards: `/docs/standards.md`
- Architecture Guide: `/docs/architecture.md`

