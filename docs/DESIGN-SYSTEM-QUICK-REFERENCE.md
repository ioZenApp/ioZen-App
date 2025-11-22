# Design System Quick Reference

A quick guide for maintaining visual consistency with the shadcn-admin design system.

---

## Core Principles

1. **Always use semantic tokens** - Never hardcode colors
2. **Use semantic button variants** - Never custom button styles
3. **Follow 4px grid spacing** - Consistent spacing throughout
4. **Maintain typography hierarchy** - Clear and readable
5. **Theme-aware by default** - All components adapt to light/dark mode

---

## Color System

### ❌ Never Use These

```tsx
// Hardcoded colors
bg-black
text-white
border-neutral-800
bg-neutral-900
text-neutral-300

// Direct HSL references
bg-[hsl(var(--card))]
text-[hsl(var(--muted-foreground))]
```

### ✅ Always Use These

```tsx
// Background colors
bg-background       // Main page background
bg-card            // Card backgrounds
bg-muted           // Subtle backgrounds
bg-accent          // Hover states
bg-primary         // Primary actions
bg-secondary       // Secondary actions
bg-destructive     // Destructive actions

// Text colors
text-foreground            // Primary text
text-muted-foreground     // Secondary text
text-primary              // Primary colored text
text-destructive          // Error text

// Border colors
border-border      // Default borders
border-input       // Input borders
border-primary     // Primary colored borders
border-destructive // Error borders
```

---

## Components

### Buttons

```tsx
// ✅ Primary action
<Button variant="default">Save</Button>

// ✅ Secondary action
<Button variant="outline">Cancel</Button>

// ✅ Subtle action
<Button variant="ghost">Skip</Button>

// ✅ Destructive action
<Button variant="destructive">Delete</Button>

// ❌ Never do this
<Button className="bg-white text-black hover:bg-gray-200">
```

---

### Cards

```tsx
// ✅ Standard card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>

// ✅ Hoverable card
<Card className="hover:shadow-md transition-shadow cursor-pointer">

// ✅ With subtle shadow
<Card className="shadow-sm">

// ❌ Never do this
<Card className="bg-black border-neutral-800">
```

---

### Typography

```tsx
// ✅ Page title
<h1 className="text-2xl font-bold tracking-tight">
  Page Title
</h1>

// ✅ Section title
<h2 className="text-xl font-semibold">
  Section Title
</h2>

// ✅ Card title
<h3 className="text-lg font-semibold">
  Card Title
</h3>

// ✅ Description
<p className="text-muted-foreground">
  Description text
</p>

// ✅ Small text
<p className="text-sm text-muted-foreground">
  Helper text
</p>
```

---

### Form Inputs

```tsx
// ✅ Standard input
<Input placeholder="Enter text..." />

// ✅ With label
<div className="space-y-2">
  <Label>Email</Label>
  <Input type="email" placeholder="name@example.com" />
</div>

// ✅ Textarea
<Textarea 
  className="min-h-[120px]" 
  placeholder="Enter description..."
/>

// ❌ Never do this
<Input className="bg-neutral-900 border-neutral-800 text-white" />
```

---

### Lists

```tsx
// ✅ Semantic list with proper spacing
<ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <li key={item.id}>
      <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
        {/* Content */}
      </div>
    </li>
  ))}
</ul>

// ❌ Avoid wrapping in unnecessary Card components
```

---

### Empty States

```tsx
// ✅ Centered empty state
<div className="flex flex-col items-center justify-center py-16">
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
    <Icon className="h-10 w-10 text-muted-foreground" />
  </div>
  <h3 className="mt-6 text-lg font-semibold">No items yet</h3>
  <p className="text-muted-foreground mt-2 text-center text-sm max-w-md">
    Description of what to do next
  </p>
  <Button className="mt-6">
    <Plus className="w-4 h-4 mr-2" />
    Create Item
  </Button>
</div>
```

---

### Loading States

```tsx
// ✅ Use default Skeleton styling
<Skeleton className="h-12 w-full" />

// ❌ Never override background
<Skeleton className="h-12 w-full bg-neutral-900" />
```

---

## Spacing System

### Use 4px Grid

```tsx
// Padding
p-2   // 8px
p-4   // 16px
p-6   // 24px
p-8   // 32px

// Margin
m-2   // 8px
m-4   // 16px
m-6   // 24px
m-8   // 32px

// Gap
gap-2   // 8px
gap-4   // 16px
gap-6   // 24px
gap-8   // 32px

// Space between
space-y-2   // 8px vertical
space-y-4   // 16px vertical
space-x-4   // 16px horizontal
```

---

## Common Patterns

### Icon with Text

```tsx
// ✅ Proper icon sizing
<div className="flex items-center gap-2">
  <Icon className="h-4 w-4 text-muted-foreground" />
  <span className="text-sm">Label</span>
</div>
```

---

### Hover States

```tsx
// ✅ Interactive elements
className="hover:bg-accent transition-colors"
className="hover:shadow-md transition-shadow"
className="hover:opacity-80 transition-opacity"

// ❌ Avoid
className="hover:bg-neutral-800 hover:text-white"
```

---

### Tab Switcher

```tsx
// ✅ Semantic tab switcher
<div className="inline-flex rounded-lg bg-muted p-1 border border-border">
  <button
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active 
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    Tab 1
  </button>
</div>

// ❌ Avoid
<div className="bg-neutral-900 border-neutral-800">
  <button className={active ? "bg-neutral-800 text-white" : "text-neutral-400"}>
```

---

## Error Messages

```tsx
// ✅ Error message
<div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
  {error}
</div>

// ✅ Success message
<div className="p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-md">
  {message}
</div>
```

---

## Logo/Icons

```tsx
// ✅ Theme-aware SVG
<svg viewBox="0 0 100 100">
  <rect className="fill-foreground" />
  <circle className="fill-background" />
</svg>

// ❌ Hardcoded colors
<svg viewBox="0 0 100 100">
  <rect fill="white" />
  <circle fill="black" />
</svg>
```

---

## When to Deviate

### Public-Facing Interfaces

For public-facing components (like embedded chat widgets), it's acceptable to use custom styling to create a distinct experience:

```tsx
// ✅ Acceptable for public chat interfaces
<div className="bg-black border-neutral-800">
  <div className="bg-gradient-to-br from-blue-600 to-violet-600">
    <Bot className="text-white" />
  </div>
</div>
```

**Reason**: Creates a polished, branded experience separate from admin interface.

---

## Quick Checks

Before committing code, verify:

- [ ] No hardcoded `bg-black`, `text-white`, `border-neutral-*`
- [ ] All buttons use semantic variants
- [ ] Cards use default or `shadow-sm` only
- [ ] Typography uses semantic classes
- [ ] Spacing follows 4px grid
- [ ] No linter errors
- [ ] Component adapts to light/dark mode

---

## Resources

- Full refactor details: `DESIGN-CONSISTENCY-REFACTOR.md`
- OKLCH migration: `OKLCH-MIGRATION-SUMMARY.md`
- Color system: `app/src/app/globals.css`
- Reference design: `shadcn-admin-main/`

---

**Last Updated**: November 22, 2025

