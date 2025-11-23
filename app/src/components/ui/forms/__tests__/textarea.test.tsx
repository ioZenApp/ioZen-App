import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { Textarea } from '../textarea'
import userEvent from '@testing-library/user-event'

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter description" />)
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Textarea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello world')

    expect(handleChange).toHaveBeenCalled()
    expect(textarea).toHaveValue('Hello world')
  })

  it('can be disabled', () => {
    render(<Textarea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('does not accept input when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Textarea disabled onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello')

    expect(handleChange).not.toHaveBeenCalled()
    expect(textarea).toHaveValue('')
  })

  it('renders with default value', () => {
    render(<Textarea defaultValue="Default text" />)
    expect(screen.getByRole('textbox')).toHaveValue('Default text')
  })

  it('renders with controlled value', () => {
    const { rerender } = render(<Textarea value="Initial" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Initial')

    rerender(<Textarea value="Updated" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Updated')
  })

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Textarea ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('supports required attribute', () => {
    render(<Textarea required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('supports readonly attribute', () => {
    render(<Textarea readOnly />)
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })

  it('supports maxLength attribute', () => {
    render(<Textarea maxLength={100} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '100')
  })

  it('supports minLength attribute', () => {
    render(<Textarea minLength={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('minlength', '10')
  })

  it('handles focus and blur events', async () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    const user = userEvent.setup()

    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)
    
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    expect(handleFocus).toHaveBeenCalledOnce()

    await user.tab()
    expect(handleBlur).toHaveBeenCalledOnce()
  })

  it('supports name attribute', () => {
    render(<Textarea name="description" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'description')
  })

  it('supports id attribute', () => {
    render(<Textarea id="user-textarea" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'user-textarea')
  })

  it('has data-slot attribute', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'textarea')
  })

  it('sets aria-invalid when error prop is provided', () => {
    render(<Textarea error="This field is required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not set aria-invalid when no error', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('has focus-visible ring classes', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('focus-visible:ring-[3px]')
    expect(textarea.className).toContain('focus-visible:ring-ring/50')
  })

  it('has shadow-xs class', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('shadow-xs')
  })

  it('has dark mode background class', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('dark:bg-input/30')
  })

  it('has aria-invalid styling classes', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('aria-invalid:ring-destructive/20')
    expect(textarea.className).toContain('aria-invalid:border-destructive')
  })

  it('has min-h-20 class', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('min-h-20')
  })

  it('supports rows attribute', () => {
    render(<Textarea rows={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10')
  })
})


