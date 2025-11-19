# UI Design Reference

**Version:** 1.0  
**Last Updated:** 2025-11-19  
**Status:** Reference Documentation

---

## 1. Overview

This document serves as the visual design reference for the ioZen platform MVP. It captures the UI patterns, components, and design language demonstrated in the reference screenshots to ensure consistency across the application.

### Design Philosophy
- **Dark Mode First**: Premium dark interface with high contrast
- **Minimalist**: Clean, focused interfaces with generous whitespace
- **Conversational**: Chat-centric design language
- **Professional**: Enterprise-grade aesthetics

---

## 2. Brand Assets

### Logo
![ioZen Logo](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_0_1763541536299.png)

**Logo Specifications:**
- **Style**: Minimalist, geometric
- **Components**: "iO" with circular "O" element
- **Usage**: Primary navigation, branding
- **Color**: White on dark backgrounds, black on light backgrounds

---

## 3. Color Palette

### Primary Colors
```css
--background-primary: #000000;      /* Pure black background */
--background-secondary: #0a0a0a;    /* Slightly lighter black */
--background-tertiary: #1a1a1a;     /* Card/panel backgrounds */

--text-primary: #ffffff;            /* Primary text */
--text-secondary: #a0a0a0;          /* Secondary/muted text */
--text-tertiary: #666666;           /* Disabled/placeholder text */

--border-primary: #2a2a2a;          /* Subtle borders */
--border-secondary: #1a1a1a;        /* Very subtle dividers */
```

### Accent Colors
```css
--accent-primary: #ffffff;          /* Primary CTAs (white buttons) */
--accent-hover: #f5f5f5;           /* Hover states */
--accent-active: #e0e0e0;          /* Active/pressed states */

--status-active: #4ade80;          /* Active status badge */
--status-building: #fbbf24;        /* Building/in-progress status */
--status-inactive: #6b7280;        /* Inactive status */
```

### Interactive Elements
```css
--button-primary-bg: #ffffff;
--button-primary-text: #000000;
--button-primary-hover: #f5f5f5;

--button-secondary-bg: transparent;
--button-secondary-text: #ffffff;
--button-secondary-border: #2a2a2a;
--button-secondary-hover: #1a1a1a;

--input-bg: #0a0a0a;
--input-border: #2a2a2a;
--input-focus: #3a3a3a;
--input-text: #ffffff;
--input-placeholder: #666666;
```

---

## 4. Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Type Scale
```css
--font-size-xs: 0.75rem;      /* 12px - Labels, captions */
--font-size-sm: 0.875rem;     /* 14px - Secondary text */
--font-size-base: 1rem;       /* 16px - Body text */
--font-size-lg: 1.125rem;     /* 18px - Subheadings */
--font-size-xl: 1.5rem;       /* 24px - Section headings */
--font-size-2xl: 2rem;        /* 32px - Page titles */
--font-size-3xl: 2.5rem;      /* 40px - Hero text */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Text Styles
```css
/* Page Title */
.page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Section Heading */
.section-heading {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

/* Body Text */
.body-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--text-primary);
  line-height: 1.5;
}

/* Secondary Text */
.secondary-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--text-secondary);
}

/* Label Text */
.label-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 5. Layout System

### Spacing Scale
```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

### Border Radius
```css
--radius-sm: 0.375rem;    /* 6px - Small elements */
--radius-md: 0.5rem;      /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;     /* 12px - Cards */
--radius-xl: 1rem;        /* 16px - Large panels */
--radius-full: 9999px;    /* Circular elements */
```

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

---

## 6. Component Library

### 6.1 Navigation

#### Top Navigation Bar
![Navigation Example](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_1_1763541536299.png)

**Specifications:**
- **Height**: 64px
- **Background**: `#000000`
- **Border Bottom**: 1px solid `#2a2a2a`
- **Padding**: 0 24px

**Structure:**
```html
<nav class="top-nav">
  <div class="nav-left">
    <img src="logo.svg" alt="ioZen" class="logo" />
  </div>
  <div class="nav-center">
    <a href="/dashboard" class="nav-link active">Dashboard</a>
    <a href="/preview" class="nav-link">Preview Chat</a>
    <a href="/analytics" class="nav-link">Analytics</a>
    <a href="/settings" class="nav-link">Settings</a>
  </div>
  <div class="nav-right">
    <a href="/feedback" class="nav-link-secondary">Feedback</a>
    <a href="/changelog" class="nav-link-secondary">Changelog</a>
    <a href="/help" class="nav-link-secondary">Help</a>
    <a href="/docs" class="nav-link-secondary">Docs</a>
    <button class="user-menu-button">
      <UserIcon />
    </button>
  </div>
</nav>
```

**Styles:**
```css
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: #000000;
  border-bottom: 1px solid #2a2a2a;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #a0a0a0;
  text-decoration: none;
  padding: 8px 16px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link.active {
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
}

.nav-link-secondary {
  font-size: 0.875rem;
  color: #666666;
  text-decoration: none;
  padding: 8px 12px;
  transition: color 0.2s;
}

.nav-link-secondary:hover {
  color: #a0a0a0;
}

.user-menu-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.user-menu-button:hover {
  background: #2a2a2a;
}
```

---

### 6.2 Buttons

#### Primary Button
```css
.button-primary {
  background: #ffffff;
  color: #000000;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.button-primary:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}

.button-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.button-secondary {
  background: transparent;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  cursor: pointer;
  transition: all 0.2s;
}

.button-secondary:hover {
  background: #1a1a1a;
  border-color: #3a3a3a;
}
```

#### Icon Button
```css
.button-icon {
  background: transparent;
  color: #a0a0a0;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.button-icon:hover {
  background: #1a1a1a;
  color: #ffffff;
}
```

---

### 6.3 Input Fields

#### Text Input
```css
.input-text {
  background: #0a0a0a;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 12px 16px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  width: 100%;
  transition: all 0.2s;
}

.input-text::placeholder {
  color: #666666;
}

.input-text:focus {
  outline: none;
  border-color: #3a3a3a;
  background: #0f0f0f;
}
```

#### Search Input
![Search Input Example](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_1_1763541536299.png)

```css
.input-search {
  background: #0a0a0a;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 12px 16px 12px 44px;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  width: 100%;
  background-image: url('search-icon.svg');
  background-position: 16px center;
  background-repeat: no-repeat;
  transition: all 0.2s;
}

.input-search:focus {
  outline: none;
  border-color: #3a3a3a;
  background-color: #0f0f0f;
}
```

---

### 6.4 Cards & Panels

#### Card Component
```css
.card {
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s;
}

.card:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
}
```

#### Panel Component
```css
.panel {
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
}

.panel-header {
  padding: 20px 24px;
  border-bottom: 1px solid #2a2a2a;
}

.panel-body {
  padding: 24px;
}
```

---

### 6.5 Tables

#### Data Table
![Table Example](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_3_1763541536299.png)

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  border-bottom: 1px solid #2a2a2a;
}

.table th {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
}

.table td {
  padding: 16px;
  border-bottom: 1px solid #1a1a1a;
  font-size: 0.875rem;
  color: #ffffff;
}

.table tr:hover {
  background: #0f0f0f;
  cursor: pointer;
}

.table tr:last-child td {
  border-bottom: none;
}
```

**Table Columns:**
- **NAME**: Chatflow name with icon and ID
- **SUBMISSIONS**: Count with icon
- **LAST UPDATED**: Relative time
- **STATUS**: Badge component

---

### 6.6 Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge-active {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.badge-building {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.badge-inactive {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
}
```

---

### 6.7 Field Configuration Components

![Field Configuration](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_2_1763541536299.png)

#### Field Item
```css
.field-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.field-item:hover {
  background: #0f0f0f;
  border-color: #3a3a3a;
}

.field-icon {
  width: 40px;
  height: 40px;
  background: #1a1a1a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
}

.field-content {
  flex: 1;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.field-name {
  font-size: 0.75rem;
  font-family: 'Monaco', 'Courier New', monospace;
  color: #666666;
}

.field-type {
  font-size: 0.75rem;
  color: #a0a0a0;
  background: #1a1a1a;
  padding: 4px 8px;
  border-radius: 4px;
}

.field-actions {
  display: flex;
  gap: 8px;
}
```

**Field Types:**
- `text` - Text icon (#)
- `date` - Calendar icon
- `long_text` - Paragraph icon (T)
- `image` - Image icon
- `number` - Hash icon
- `email` - At symbol icon

---

### 6.8 Tabs

![Tabs Example](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_2_1763541536299.png)

```css
.tabs {
  display: flex;
  gap: 4px;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
}

.tab {
  padding: 8px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #a0a0a0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover {
  color: #ffffff;
  background: #1a1a1a;
}

.tab.active {
  color: #ffffff;
  background: #1a1a1a;
}
```

---

### 6.9 Preview/Chat Interface

![Preview Interface](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_4_1763541536299.png)

#### Chat Container
```css
.chat-preview {
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chat-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
}

.share-link-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #a0a0a0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.share-link-button:hover {
  color: #ffffff;
}
```

#### Chat Messages
```css
.chat-messages {
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  padding: 16px;
  background: #050505;
  border-radius: 8px;
  margin-bottom: 16px;
}

.message {
  margin-bottom: 16px;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1a1a1a;
  margin-bottom: 8px;
}

.message-content {
  background: #1a1a1a;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #ffffff;
  line-height: 1.5;
}

.message.user .message-content {
  background: #2563eb;
  margin-left: auto;
  max-width: 80%;
}
```

#### Chat Input
```css
.chat-input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #ffffff;
  resize: none;
  min-height: 44px;
  max-height: 120px;
}

.chat-input:focus {
  outline: none;
  border-color: #3a3a3a;
}

.chat-send-button {
  width: 44px;
  height: 44px;
  background: #2563eb;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-send-button:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

.chat-send-button:disabled {
  background: #1a1a1a;
  cursor: not-allowed;
  opacity: 0.5;
}
```

---

### 6.10 Dropdown/Select

```css
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-trigger:hover {
  background: #0f0f0f;
  border-color: #3a3a3a;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.dropdown-item {
  padding: 10px 12px;
  font-size: 0.875rem;
  color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #1a1a1a;
}

.dropdown-item.active {
  background: #1a1a1a;
  color: #2563eb;
}
```

---

## 7. Page Layouts

### 7.1 Dashboard Layout

![Dashboard Layout](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_3_1763541536299.png)

**Structure:**
```html
<div class="dashboard-layout">
  <nav class="top-nav">...</nav>
  
  <main class="dashboard-main">
    <div class="dashboard-header">
      <h1 class="page-title">Chatflows</h1>
      <button class="button-primary">
        <PlusIcon /> Create Chatflow
      </button>
    </div>
    
    <div class="dashboard-filters">
      <div class="search-input-wrapper">
        <input type="text" class="input-search" placeholder="Search chatflows..." />
      </div>
      <select class="dropdown-trigger">
        <option>All Environments</option>
      </select>
    </div>
    
    <div class="dashboard-content">
      <table class="table">...</table>
    </div>
  </main>
</div>
```

**Styles:**
```css
.dashboard-layout {
  min-height: 100vh;
  background: #000000;
}

.dashboard-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-input-wrapper {
  flex: 1;
  max-width: 400px;
}
```

---

### 7.2 Configure Fields Layout

![Configure Fields Layout](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_2_1763541536299.png)

**Structure:**
```html
<div class="configure-layout">
  <nav class="top-nav">...</nav>
  
  <main class="configure-main">
    <div class="configure-header">
      <h1 class="page-title">Configure Fields</h1>
      <button class="button-text">Cancel</button>
    </div>
    
    <div class="configure-tabs">
      <div class="tabs">
        <button class="tab active">Configuration</button>
        <button class="tab">Preview</button>
      </div>
    </div>
    
    <div class="configure-content">
      <div class="panel">
        <div class="panel-header">
          <h2 class="section-heading">Field Configuration</h2>
          <p class="secondary-text">Review and edit the generated fields.</p>
        </div>
        <div class="panel-body">
          <div class="field-list">
            <!-- Field items -->
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

### 7.3 Preview Layout

![Preview Layout](/Users/jacobomoreno/.gemini/antigravity/brain/38114d7d-6830-4d1f-80c5-0a5aa3e581da/uploaded_image_4_1763541536299.png)

**Structure:**
```html
<div class="preview-layout">
  <div class="preview-header">
    <h2 class="section-heading">Preview</h2>
    <button class="share-link-button">
      <ShareIcon /> Share Link
    </button>
  </div>
  
  <div class="preview-container">
    <div class="chat-preview">
      <div class="chat-messages">
        <!-- Messages -->
      </div>
      <div class="chat-input-container">
        <textarea class="chat-input" placeholder="Type your message..."></textarea>
        <button class="chat-send-button">
          <SendIcon />
        </button>
      </div>
    </div>
  </div>
  
  <div class="preview-footer">
    <button class="button-primary">Publish Chatflow</button>
  </div>
</div>
```

---

## 8. Icons

### Icon System
Use a consistent icon library (recommended: Lucide React or Heroicons)

**Common Icons:**
- **Plus**: Create/Add actions
- **Search**: Search inputs
- **User**: User menu
- **Share**: Share link
- **Send**: Send message
- **Calendar**: Date fields
- **Hash**: Text/number fields
- **Image**: Image upload fields
- **Type**: Long text fields
- **Settings**: Configuration
- **ChevronDown**: Dropdowns
- **X**: Close/Cancel

**Icon Sizes:**
```css
--icon-xs: 14px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

---

## 9. Animations & Transitions

### Standard Transitions
```css
/* Default transition */
transition: all 0.2s ease-in-out;

/* Color transitions */
transition: color 0.2s ease-in-out;

/* Background transitions */
transition: background 0.2s ease-in-out;

/* Transform transitions */
transition: transform 0.2s ease-in-out;
```

### Hover Effects
```css
/* Lift effect */
.card:hover {
  transform: translateY(-2px);
}

/* Scale effect */
.button:hover {
  transform: scale(1.02);
}

/* Glow effect */
.input:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Loading States
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## 10. Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  /* Stack layouts vertically */
}

/* Tablet */
@media (max-width: 768px) {
  /* Adjust spacing and font sizes */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full layout */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Maximum container widths */
}
```

> **Note for MVP**: Desktop-first approach. Mobile optimization is post-MVP (v1.1).

---

## 11. Accessibility Considerations

### Focus States
```css
*:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

### Color Contrast
- Ensure WCAG AA compliance for text (4.5:1 for normal text, 3:1 for large text)
- White text on black background: ✅ 21:1 ratio
- Gray text (#a0a0a0) on black: ✅ 7.5:1 ratio

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<button>` for clickable actions
- Use `<a>` for navigation
- Use `<label>` for form inputs
- Use ARIA labels where needed

---

## 12. Implementation Guidelines

### CSS Architecture
```
styles/
├── globals.css          # Global styles, resets
├── variables.css        # CSS custom properties
├── components/
│   ├── button.css
│   ├── input.css
│   ├── card.css
│   ├── table.css
│   └── ...
└── layouts/
    ├── dashboard.css
    ├── configure.css
    └── preview.css
```

### Component Structure (React/Next.js)
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`button button-${variant} button-${size}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Design Tokens (TypeScript)
```typescript
// lib/design-tokens.ts
export const colors = {
  background: {
    primary: '#000000',
    secondary: '#0a0a0a',
    tertiary: '#1a1a1a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    tertiary: '#666666',
  },
  // ... more tokens
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  // ... more spacing
} as const;
```

---

## 13. MVP Implementation Priorities

### Phase 1: Core Components (Day 1)
- [ ] Navigation bar
- [ ] Button variants (primary, secondary)
- [ ] Input fields (text, search)
- [ ] Card component
- [ ] Basic layout structure

### Phase 2: Dashboard Components (Day 2)
- [ ] Table component
- [ ] Status badges
- [ ] Search and filter UI
- [ ] Dashboard layout

### Phase 3: Configuration Components (Day 3)
- [ ] Field item component
- [ ] Tabs component
- [ ] Panel component
- [ ] Add field button

### Phase 4: Chat Components (Day 4)
- [ ] Chat message component
- [ ] Chat input component
- [ ] Preview container
- [ ] Publish button

### Phase 5: Polish (Day 5)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Transitions and animations

---

## 14. Design System Checklist

### Before Starting Development
- [x] Review all reference screenshots
- [x] Document color palette
- [x] Document typography scale
- [x] Document spacing system
- [x] Document component specifications
- [ ] Set up CSS variables
- [ ] Create base component library
- [ ] Test dark mode rendering

### During Development
- [ ] Use design tokens consistently
- [ ] Follow naming conventions
- [ ] Maintain component documentation
- [ ] Test responsive behavior
- [ ] Validate accessibility

### Before Launch
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Design consistency review

---

## 15. Reference Screenshots

All reference screenshots are stored in the project artifacts directory:

1. **Logo**: `uploaded_image_0_1763541536299.png`
2. **Dashboard (Mobile View)**: `uploaded_image_1_1763541536299.png`
3. **Configure Fields**: `uploaded_image_2_1763541536299.png`
4. **Dashboard (Desktop View)**: `uploaded_image_3_1763541536299.png`
5. **Preview Interface**: `uploaded_image_4_1763541536299.png`

---

## Next Steps

1. ✅ Review this UI reference document
2. 🎨 Set up design system in codebase (CSS variables, base styles)
3. 🧩 Build core component library (buttons, inputs, cards)
4. 📱 Implement dashboard layout
5. 🚀 Continue with MVP development phases

---

**Questions or Clarifications?**
- Need additional component specifications?
- Want to discuss alternative design patterns?
- Ready to start implementation?
