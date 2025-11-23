# UI Components Documentation

## Overview

IoZen's UI component library is built on the shadcn-admin design system, providing a consistent, accessible, and professional interface. All components follow the design tokens and patterns established in the system.

## Design Principles

- **Consistency**: All components use the same design tokens and spacing system
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Dark Mode**: Full dark mode support with refined colors
- **Responsive**: Mobile-first approach with responsive breakpoints
- **Type Safe**: Full TypeScript support with proper typing

---

## Core Components

### Button

Versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary action button
- `destructive` - Destructive actions (delete, remove)
- `outline` - Secondary actions with border
- `secondary` - Secondary actions  
- `ghost` - Subtle actions without background
- `link` - Link-styled button

**Sizes:**
- `sm` - Small (h-8)
- `default` - Default (h-9)
- `lg` - Large (h-10)
- `icon` - Icon only (size-9)

**Features:**
- Advanced focus states with 3px ring
- Shadow-xs for depth
- SVG icon handling with proper sizing
- Loading state support
- Dark mode optimized

**Usage:**
```typescript
import { Button } from '@/ui/button'

<Button variant="default" size="default">
  Click me
</Button>

<Button variant="destructive" loading>
  Deleting...
</Button>

<Button variant="ghost" size="icon">
  <Icon className="h-4 w-4" />
</Button>
```

---

### Card

Flexible card component for grouping related content.

**Components:**
- `Card` - Main container
- `CardHeader` - Header with grid layout support
- `CardTitle` - Title text
- `CardDescription` - Subtitle/description text
- `CardAction` - Action button area (positioned at top-right)
- `CardContent` - Main content area
- `CardFooter` - Footer area

**Features:**
- `rounded-xl` borders
- `py-6` vertical padding
- `gap-6` between sections
- Container queries for responsive layouts
- `shadow-sm` for subtle elevation

**Usage:**
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter } from '@/ui/data-display'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
    <CardAction>
      <Button size="sm">Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

---

### Input

Text input component with sophisticated focus states and error handling.

**Features:**
- Advanced focus states (3px ring with ring-ring/50)
- Dark mode support (dark:bg-input/30)
- Aria-invalid handling for errors
- File input styling
- Shadow-xs for depth
- Selection styling

**Usage:**
```typescript
import { Input } from '@/ui/forms'

<Input 
  placeholder="Enter text"
  error="This field is required"
/>

<Input 
  type="email"
  placeholder="your@email.com"
/>
```

---

### Textarea

Multi-line text input with same refinements as Input.

**Features:**
- Same focus states as Input
- `min-h-20` default height
- Aria-invalid handling
- Dark mode support

**Usage:**
```typescript
import { Textarea } from '@/ui/forms'

<Textarea 
  placeholder="Enter description"
  rows={5}
  error="Description is required"
/>
```

---

### Select

Dropdown select component with shadcn-admin styling.

**Features:**
- Advanced focus states
- Shadow-xs
- Size variants (sm, default)
- Dark mode support
- Aria-invalid handling

**Usage:**
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/forms'

<Select>
  <SelectTrigger size="default">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Checkbox

Checkbox with refined styling and focus states.

**Features:**
- 3px focus ring
- Shadow-xs
- Dark mode support
- Aria-invalid handling

**Usage:**
```typescript
import { Checkbox } from '@/ui/forms'

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>
```

---

### Switch

Toggle switch component.

**Features:**
- 3px focus ring
- Shadow-xs
- Smooth transitions
- Dark mode support

**Usage:**
```typescript
import { Switch } from '@/ui/forms'

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

---

### RadioGroup

Radio button group component.

**Features:**
- 3px focus ring
- Shadow-xs
- Dark mode support
- Aria-invalid handling

**Usage:**
```typescript
import { RadioGroup, RadioGroupItem } from '@/ui/forms'

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
</RadioGroup>
```

---

## Layout Components

### PageHeader

Standardized page header with title, description, and actions.

**Features:**
- `mb-2` margin (aligned with shadcn-admin)
- Responsive flex layout
- Optional back button
- Action slot

**Usage:**
```typescript
import { PageHeader } from '@/components/layout'

<PageHeader
  title="Dashboard"
  description="Welcome to your workspace"
  backUrl="/w/workspace"
  action={
    <Button>New Item</Button>
  }
/>
```

---

### Main

Main content container with responsive max-width.

**Features:**
- `px-4 py-6` padding
- `max-w-7xl` at 7xl breakpoint
- Container queries
- Fixed/fluid layout options

---

### Container

Flexible container with size variants.

**Sizes:**
- `sm` - max-w-3xl
- `md` - max-w-4xl
- `lg` - max-w-5xl
- `xl` - max-w-7xl (default)
- `full` - max-w-full

---

## Data Display Components

### Badge

Status and label badges.

**Variants:**
- `active` - Green for active states
- `building` - Yellow for building/pending states
- `inactive` - Gray for inactive states
- `draft` - Gray for draft states
- `published` - Green for published states
- `archived` - Gray for archived states
- `outline` - Outlined variant
- `secondary` - Secondary variant
- `default` - Default variant

**Usage:**
```typescript
import { Badge } from '@/ui/data-display'

<Badge variant="published">Published</Badge>
<Badge variant="draft">Draft</Badge>
```

---

### Avatar

User avatar component with image and fallback support.

**Features:**
- Rounded-full
- Fallback text support
- Image loading states
- Dark mode support

**Usage:**
```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@/ui/data-display'

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Feedback Components

### Progress

Progress bar component.

**Features:**
- Smooth transitions
- Uses design system colors
- Accessible

**Usage:**
```typescript
import { Progress } from '@/ui/feedback'

<Progress value={60} />
```

---

### Skeleton

Loading skeleton component.

**Usage:**
```typescript
import { Skeleton } from '@/ui/feedback'

<Skeleton className="h-12 w-full" />
```

---

## Spacing System

Consistent spacing values used throughout:

- **gap-2** (0.5rem / 8px) - Tight spacing
- **gap-4** (1rem / 16px) - Default spacing for sections
- **gap-6** (1.5rem / 24px) - Card internal spacing
- **space-y-4** - Vertical spacing for major sections
- **space-y-8** - Vertical spacing for form sections
- **px-4 py-6** - Main content padding
- **px-6** - Card content padding
- **mb-2** - PageHeader bottom margin

---

## Focus States

All interactive components use consistent focus states:

- `focus-visible:ring-[3px]` - 3px ring width
- `focus-visible:ring-ring/50` - 50% opacity
- `focus-visible:border-ring` - Border color on focus
- `outline-none` - Remove default outline

---

## Dark Mode

All components support dark mode with:

- `dark:bg-input/30` - Input backgrounds
- `dark:hover:bg-accent/50` - Hover states
- `dark:aria-invalid:ring-destructive/40` - Error states
- Refined colors using OKLCH color space

---

## Accessibility

All components include:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader support
- Focus visible states
- Semantic HTML
- Error state indication

---

## Data-Slot Attributes

All components include `data-slot` attributes for:

- Easier debugging
- Styling hooks
- Testing selectors
- Component identification

Example: `data-slot="button"`, `data-slot="card-header"`, etc.

---

## Best Practices

1. **Use semantic HTML** - Buttons for actions, links for navigation
2. **Provide labels** - All form fields need labels
3. **Handle errors** - Use aria-invalid and error messages
4. **Consider loading states** - Show loading indicators
5. **Test keyboard navigation** - Ensure all interactive elements are keyboard accessible
6. **Test dark mode** - Verify components look good in both modes
7. **Use consistent spacing** - Follow the spacing system
8. **Optimize for mobile** - Test on small screens

---

## Migration from Old Components

If upgrading from older components:

1. Update button variants: `primary` → `default`
2. Update button sizes: `md` → `default`
3. Update card padding: Individual padding → `py-6` + `px-6`
4. Update focus states: `ring-1` → `ring-[3px]`
5. Add `data-slot` attributes where missing
6. Update colors to use design tokens

---

## Further Reading

- [Design Tokens](./DESIGN-TOKENS.md) - Color system and tokens
- [Standards](./standards.md) - Coding standards
- [Quick Reference](./quick-reference.md) - Common patterns


