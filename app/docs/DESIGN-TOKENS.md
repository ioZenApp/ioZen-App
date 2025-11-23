# Design Tokens Documentation

## Overview

IoZen uses a professional OKLCH color space for perceptually uniform colors and better dark mode support. All design tokens are defined in `app/src/app/globals.css` and follow the shadcn-admin design system.

---

## Color System

### OKLCH Color Space

OKLCH (Lightness, Chroma, Hue) provides:
- **Perceptual uniformity** - Colors appear equally bright
- **Better dark mode** - More natural color transitions
- **Predictable behavior** - Easier to create color variations

---

## Core Color Tokens

### Light Mode

```css
:root {
  --background: oklch(1 0 0);                    /* Pure white */
  --foreground: oklch(0.129 0.042 264.695);      /* Dark blue-gray */
  
  --card: oklch(1 0 0);                          /* White */
  --card-foreground: oklch(0.129 0.042 264.695); /* Dark blue-gray */
  
  --popover: oklch(1 0 0);                       /* White */
  --popover-foreground: oklch(0.129 0.042 264.695);
  
  --primary: oklch(0.208 0.042 265.755);         /* Dark blue */
  --primary-foreground: oklch(0.984 0.003 247.858); /* Off-white */
  
  --secondary: oklch(0.968 0.007 247.896);       /* Light gray */
  --secondary-foreground: oklch(0.208 0.042 265.755);
  
  --muted: oklch(0.968 0.007 247.896);           /* Light gray */
  --muted-foreground: oklch(0.554 0.046 257.417); /* Medium gray */
  
  --accent: oklch(0.968 0.007 247.896);          /* Light gray */
  --accent-foreground: oklch(0.208 0.042 265.755);
  
  --destructive: oklch(0.577 0.245 27.325);      /* Red */
  --destructive-foreground: oklch(0.984 0.003 247.858);
  
  --border: oklch(0.929 0.013 255.508);          /* Light gray border */
  --input: oklch(0.929 0.013 255.508);           /* Light gray input */
  --ring: oklch(0.704 0.04 256.788);             /* Medium gray ring */
}
```

### Dark Mode

```css
.dark {
  --background: oklch(0.129 0.042 264.695);      /* Dark blue-gray */
  --foreground: oklch(0.984 0.003 247.858);      /* Off-white */
  
  --card: oklch(0.14 0.04 259.21);               /* Slightly lighter */
  --card-foreground: oklch(0.984 0.003 247.858);
  
  --popover: oklch(0.208 0.042 265.755);         /* Medium dark */
  --popover-foreground: oklch(0.984 0.003 247.858);
  
  --primary: oklch(0.929 0.013 255.508);         /* Light gray */
  --primary-foreground: oklch(0.208 0.042 265.755); /* Dark */
  
  --secondary: oklch(0.279 0.041 260.031);       /* Dark gray */
  --secondary-foreground: oklch(0.984 0.003 247.858);
  
  --muted: oklch(0.279 0.041 260.031);           /* Dark gray */
  --muted-foreground: oklch(0.704 0.04 256.788); /* Medium light */
  
  --accent: oklch(0.279 0.041 260.031);          /* Dark gray */
  --accent-foreground: oklch(0.984 0.003 247.858);
  
  --destructive: oklch(0.704 0.191 22.216);      /* Lighter red */
  --destructive-foreground: oklch(0.984 0.003 247.858);
  
  --border: oklch(1 0 0 / 10%);                  /* Subtle white border */
  --input: oklch(1 0 0 / 15%);                   /* Slightly visible */
  --ring: oklch(0.551 0.027 264.364);            /* Medium ring */
}
```

---

## Chart Colors

Five distinct colors for data visualization:

**Light Mode:**
```css
--chart-1: oklch(0.646 0.222 41.116);   /* Orange */
--chart-2: oklch(0.6 0.118 184.704);     /* Cyan */
--chart-3: oklch(0.398 0.07 227.392);    /* Blue */
--chart-4: oklch(0.828 0.189 84.429);    /* Yellow-green */
--chart-5: oklch(0.769 0.188 70.08);     /* Yellow */
```

**Dark Mode:**
```css
--chart-1: oklch(0.488 0.243 264.376);   /* Purple */
--chart-2: oklch(0.696 0.17 162.48);     /* Green */
--chart-3: oklch(0.769 0.188 70.08);     /* Yellow */
--chart-4: oklch(0.627 0.265 303.9);     /* Magenta */
--chart-5: oklch(0.645 0.246 16.439);    /* Red-orange */
```

---

## Border Radius

Consistent border radius values:

```css
--radius: 0.625rem;           /* 10px - Base radius */
--radius-sm: 0.225rem;        /* 3.6px - Small */
--radius-md: 0.425rem;        /* 6.8px - Medium */
--radius-lg: 0.625rem;        /* 10px - Large (same as base) */
--radius-xl: 1.025rem;        /* 16.4px - Extra large */
```

**Usage:**
- Buttons: `rounded-md` (radius-md)
- Cards: `rounded-xl` (radius-xl)
- Inputs: `rounded-md` (radius-md)
- Badges: `rounded-lg` (radius-lg)
- Avatars: `rounded-full`

---

## Spacing System

Consistent spacing scale based on 4px (0.25rem):

```
0.5  → 2px   (gap-0.5, p-0.5)
1    → 4px   (gap-1, p-1)
1.5  → 6px   (gap-1.5, p-1.5)
2    → 8px   (gap-2, p-2)
3    → 12px  (gap-3, p-3)
4    → 16px  (gap-4, p-4)
6    → 24px  (gap-6, p-6)
8    → 32px  (gap-8, p-8)
```

**Common Patterns:**
- Card gap: `gap-6` (24px)
- Section spacing: `space-y-4` (16px)
- Form spacing: `space-y-8` (32px)
- Main padding: `px-4 py-6`
- Card content padding: `px-6`
- PageHeader margin: `mb-2`

---

## Typography

### Font Families

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
--font-mono: 'Monaco', 'Courier New', monospace;
```

### Headings

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  color: oklch(var(--foreground));
}

h1 {
  font-size: 2rem;        /* 32px */
  font-weight: 600;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.5rem;      /* 24px */
}

h3 {
  font-size: 1.125rem;    /* 18px */
}
```

### Body Text

```css
p {
  line-height: 1.5;
}
```

### Font Sizes

```
text-xs   → 0.75rem (12px)
text-sm   → 0.875rem (14px)
text-base → 1rem (16px)
text-lg   → 1.125rem (18px)
text-xl   → 1.25rem (20px)
text-2xl  → 1.5rem (24px)
```

---

## Shadows

Subtle shadows for depth:

```css
shadow-xs → box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-sm → box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
                        0 1px 2px -1px rgba(0, 0, 0, 0.1)
shadow    → box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
                        0 1px 2px -1px rgba(0, 0, 0, 0.1)
shadow-md → box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                        0 2px 4px -2px rgba(0, 0, 0, 0.1)
shadow-lg → box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                        0 4px 6px -4px rgba(0, 0, 0, 0.1)
```

**Usage:**
- Buttons: `shadow-xs`
- Cards: `shadow-sm`
- Dropdowns: `shadow-md`
- Modals: `shadow-lg`

---

## Focus States

Consistent focus ring for accessibility:

```css
*:focus-visible {
  outline: 2px solid oklch(var(--ring));
  outline-offset: 2px;
}
```

**Component Focus States:**
```css
focus-visible:ring-[3px]        /* 3px ring width */
focus-visible:ring-ring/50      /* 50% opacity */
focus-visible:border-ring       /* Border color */
```

---

## Sidebar Tokens

Specialized tokens for sidebar component:

```css
--sidebar: var(--background);
--sidebar-foreground: var(--foreground);
--sidebar-primary: var(--primary);
--sidebar-primary-foreground: var(--primary-foreground);
--sidebar-accent: var(--accent);
--sidebar-accent-foreground: var(--accent-foreground);
--sidebar-border: var(--border);
--sidebar-ring: var(--ring);
```

---

## Using Design Tokens

### In CSS/Tailwind

```css
/* Background */
bg-background
bg-card
bg-primary

/* Text */
text-foreground
text-muted-foreground
text-primary-foreground

/* Borders */
border-border
border-input
border-destructive

/* Custom CSS */
background-color: oklch(var(--background));
color: oklch(var(--foreground));
```

### In Components

```typescript
// Using Tailwind classes
<div className="bg-card text-card-foreground border-border">
  Content
</div>

// Using CSS variables
<div style={{ backgroundColor: 'oklch(var(--background))' }}>
  Content
</div>
```

---

## Customization

To customize colors, update `globals.css`:

```css
:root {
  /* Change primary color */
  --primary: oklch(0.5 0.2 240);  /* Blue */
  
  /* Change accent color */
  --accent: oklch(0.7 0.15 160);  /* Green */
}
```

**OKLCH Format:**
- **L** (Lightness): 0-1 (0 = black, 1 = white)
- **C** (Chroma): 0-0.4 (saturation, 0 = gray)
- **H** (Hue): 0-360 (color angle)

**Hue Values:**
- 0-60: Red-Orange
- 60-120: Yellow-Green
- 120-180: Green-Cyan
- 180-240: Cyan-Blue
- 240-300: Blue-Purple
- 300-360: Purple-Red

---

## Accessibility Considerations

1. **Contrast Ratios**
   - Text: Minimum 4.5:1 for normal text, 3:1 for large text
   - Interactive elements: Minimum 3:1

2. **Focus Indicators**
   - Always visible on keyboard focus
   - Minimum 3px width
   - High contrast with background

3. **Color Independence**
   - Don't rely solely on color to convey information
   - Use icons, labels, or patterns alongside color

4. **Dark Mode**
   - Test all components in both light and dark modes
   - Ensure sufficient contrast in both modes

---

## Tools

- **OKLCH Color Picker**: https://oklch.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Blindness Simulator**: https://www.color-blindness.com/coblis-color-blindness-simulator/

---

## Further Reading

- [UI Components](./UI-COMPONENTS.md) - Component documentation
- [Standards](./standards.md) - Coding standards
- [OKLCH Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) - Why OKLCH?


