import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../card'

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<Card>Card content</Card>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card')
  })

  it('has flex flex-col gap-6 classes', () => {
    const { container } = render(<Card>Card content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('flex')
    expect(card.className).toContain('flex-col')
    expect(card.className).toContain('gap-6')
  })

  it('has rounded-xl border and shadow-sm', () => {
    const { container } = render(<Card>Card content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('rounded-xl')
    expect(card.className).toContain('border')
    expect(card.className).toContain('shadow-sm')
  })

  it('has py-6 padding', () => {
    const { container } = render(<Card>Card content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('py-6')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-header')
  })

  it('has grid layout classes', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    const header = container.firstChild as HTMLElement
    expect(header.className).toContain('grid')
    expect(header.className).toContain('auto-rows-min')
  })

  it('has gap-1.5 and px-6', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    const header = container.firstChild as HTMLElement
    expect(header.className).toContain('gap-1.5')
    expect(header.className).toContain('px-6')
  })

  it('has container query class', () => {
    const { container } = render(<CardHeader>Header</CardHeader>)
    const header = container.firstChild as HTMLElement
    expect(header.className).toContain('@container/card-header')
  })
})

describe('CardTitle', () => {
  it('renders correctly', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('renders as h3 element', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-title')
  })

  it('has font-semibold and leading-none', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    const title = container.firstChild as HTMLElement
    expect(title.className).toContain('font-semibold')
    expect(title.className).toContain('leading-none')
  })
})

describe('CardDescription', () => {
  it('renders correctly', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-description')
  })

  it('has text-sm and text-muted-foreground', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    const description = container.firstChild as HTMLElement
    expect(description.className).toContain('text-sm')
    expect(description.className).toContain('text-muted-foreground')
  })
})

describe('CardAction', () => {
  it('renders correctly', () => {
    render(<CardAction>Action content</CardAction>)
    expect(screen.getByText('Action content')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardAction>Action</CardAction>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-action')
  })

  it('has grid positioning classes', () => {
    const { container } = render(<CardAction>Action</CardAction>)
    const action = container.firstChild as HTMLElement
    expect(action.className).toContain('col-start-2')
    expect(action.className).toContain('row-span-2')
    expect(action.className).toContain('row-start-1')
    expect(action.className).toContain('self-start')
    expect(action.className).toContain('justify-self-end')
  })
})

describe('CardContent', () => {
  it('renders correctly', () => {
    render(<CardContent>Content text</CardContent>)
    expect(screen.getByText('Content text')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-content')
  })

  it('has px-6 padding', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    const content = container.firstChild as HTMLElement
    expect(content.className).toContain('px-6')
  })
})

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('has data-slot attribute', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    expect(container.firstChild).toHaveAttribute('data-slot', 'card-footer')
  })

  it('has flex and px-6', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    const footer = container.firstChild as HTMLElement
    expect(footer.className).toContain('flex')
    expect(footer.className).toContain('items-center')
    expect(footer.className).toContain('px-6')
  })
})

describe('Card composition', () => {
  it('renders complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })
})


