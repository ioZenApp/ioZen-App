import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { Input } from '../input'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter name" />)
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello')

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Hello')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('does not accept input when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input disabled onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello')

    expect(handleChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('')
  })

  it('supports different types', () => {
    const { rerender, container } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    // Password inputs don't have an accessible role, so use container
    rerender(<Input type="password" />)
    const passwordInput = container.querySelector('input[type="password"]')
    expect(passwordInput).toHaveAttribute('type', 'password')

    rerender(<Input type="text" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')

    rerender(<Input type="tel" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')

    rerender(<Input type="url" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url')
  })

  it('supports number type', () => {
    render(<Input type="number" />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    render(<Input defaultValue="Default text" />)
    expect(screen.getByRole('textbox')).toHaveValue('Default text')
  })

  it('renders with controlled value', () => {
    const { rerender } = render(<Input value="Initial" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Initial')

    rerender(<Input value="Updated" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Updated')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('supports required attribute', () => {
    render(<Input required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('supports readonly attribute', () => {
    render(<Input readOnly />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('supports maxLength attribute', () => {
    render(<Input maxLength={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10')
  })

  it('supports minLength attribute', () => {
    render(<Input minLength={5} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('minlength', '5')
  })

  it('supports pattern attribute', () => {
    render(<Input pattern="[0-9]*" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]*')
  })

  it('handles focus and blur events', async () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    const user = userEvent.setup()

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    await user.click(input)
    expect(handleFocus).toHaveBeenCalledOnce()

    await user.tab()
    expect(handleBlur).toHaveBeenCalledOnce()
  })

  it('supports autocomplete attribute', () => {
    render(<Input autoComplete="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email')
  })

  it('supports name attribute', () => {
    render(<Input name="username" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username')
  })

  it('supports id attribute', () => {
    render(<Input id="user-input" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'user-input')
  })

  it('has data-slot attribute', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input')
  })

  it('sets aria-invalid when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when no error', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('has focus-visible ring classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('focus-visible:ring-[3px]')
    expect(input.className).toContain('focus-visible:ring-ring/50')
  })

  it('has shadow-xs class', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('shadow-xs')
  })

  it('has dark mode background class', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('dark:bg-input/30')
  })

  it('has aria-invalid styling classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('aria-invalid:ring-destructive/20')
    expect(input.className).toContain('aria-invalid:border-destructive')
  })

  it('has file input styling classes', () => {
    const { container } = render(<Input type="file" />)
    // File inputs don't have a standard accessible role, so we query by tag/type
    const fileInput = container.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
    expect(fileInput?.className).toContain('file:inline-flex')
    expect(fileInput?.className).toContain('file:h-7')
  })
})

