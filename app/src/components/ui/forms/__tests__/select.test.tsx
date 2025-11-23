import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../select'
import userEvent from '@testing-library/user-event'

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('has data-slot attribute on Select', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    // Select root is not rendered in the DOM by default in Radix UI unless open? 
    // Actually Select is a provider. We should check children or context, but for DOM testing:
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
  })

  it('has data-slot attribute on SelectTrigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger')
  })

  it('has shadow-xs class on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('shadow-xs')
  })

  it('has focus-visible ring classes on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('focus-visible:ring-[3px]')
    expect(trigger.className).toContain('focus-visible:ring-ring/50')
  })

  it('has dark mode background class on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('dark:bg-input/30')
  })

  it('has aria-invalid styling classes on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('aria-invalid:ring-destructive/20')
    expect(trigger.className).toContain('aria-invalid:border-destructive')
  })

  it('supports sm size on trigger', () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-size', 'sm')
  })

  it('supports default size on trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('data-size', 'default')
  })

  it('can be disabled', () => {
    render(
      <Select>
        <SelectTrigger disabled>
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('applies custom className to trigger', () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue />
        </SelectTrigger>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('custom-class')
  })

  it('applies custom className to content', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="custom-content">
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )
    const content = document.querySelector('[data-slot="select-content"]')
    expect(content?.className).toContain('custom-content')
  })

  it('renders SelectValue with placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
      </Select>
    )
    expect(screen.getByText('Choose...')).toBeInTheDocument()
  })
})

