import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { Button } from '../button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    await user.click(screen.getByText('Disabled'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    
    // Button should be disabled when loading
    expect(screen.getByRole('button')).toBeDisabled()
    
    // Should show loading spinner
    expect(screen.getByRole('button')).toHaveTextContent('Loading')
  })

  it('is disabled when loading is true', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when loading', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button loading onClick={handleClick}>Submit</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    let button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary')
    expect(button.className).toContain('shadow-xs')

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('bg-secondary')
    expect(button.className).toContain('shadow-xs')

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('border')
    expect(button.className).toContain('shadow-xs')

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('hover:bg-accent')

    rerender(<Button variant="destructive">Destructive</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('bg-destructive')
    expect(button.className).toContain('shadow-xs')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button')
    expect(button.className).toContain('h-8')
    expect(button.className).toContain('px-3')

    rerender(<Button size="default">Default</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('h-9')
    expect(button.className).toContain('px-4')

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('h-10')
    expect(button.className).toContain('px-6')

    rerender(<Button size="icon">Icon</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('size-9')
  })

  it('applies default variant when not specified', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary')
    expect(button.className).toContain('shadow-xs')
  })

  it('applies default size when not specified', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('h-9')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies type attribute correctly', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('can be a button type', () => {
    render(<Button type="button">Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('has data-slot attribute', () => {
    render(<Button>Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
  })

  it('has focus-visible ring classes', () => {
    render(<Button>Focus</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('focus-visible:ring-[3px]')
    expect(button.className).toContain('focus-visible:ring-ring/50')
  })

  it('has SVG styling classes', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('[&_svg]:pointer-events-none')
    expect(button.className).toContain('[&_svg:not([class*=\'size-\'])]:')
  })

  it('renders with icon correctly', () => {
    render(
      <Button>
        <svg data-testid="icon" />
        Click me
      </Button>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('has gap-2 for spacing between elements', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('gap-2')
  })
})

