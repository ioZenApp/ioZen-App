# Design Elevation Validation Checklist

This checklist helps verify that all features from the shadcn-admin refactor are working correctly and meet production standards.

## Phase 1: Layout & Navigation

### Sidebar Navigation

- [ ] Sidebar renders with correct workspace-specific routes
- [ ] All navigation items are clickable and navigate correctly
- [ ] Active route is highlighted in sidebar
- [ ] Collapsible sidebar state persists across page reloads (cookie-based)
- [ ] Sidebar state syncs correctly between "icon", "offcanvas", and "none" modes
- [ ] Navigation icons display correctly
- [ ] Navigation groups render with proper spacing and hierarchy

### Mobile Responsiveness

- [ ] On mobile (<768px), sidebar opens as a drawer/sheet
- [ ] Drawer opens smoothly with proper animations
- [ ] Drawer closes when navigating to a new route
- [ ] Drawer backdrop blocks interaction with underlying content
- [ ] Sidebar trigger button (hamburger menu) is visible and functional on mobile
- [ ] Touch targets meet 44×44px minimum size

### Header

- [ ] Header renders with correct content (search, theme switcher, profile)
- [ ] Header shows scroll shadow when content scrolls
- [ ] Header is sticky on desktop
- [ ] Header layout is responsive on mobile

### Layout Persistence

- [ ] Sidebar open/closed state persists in cookies
- [ ] Layout preferences (variant, collapsibility) persist across sessions
- [ ] No layout shift on page load (hydration works correctly)

---

## Phase 2: Command Menu & Global Search

### Command Menu (Cmd+K)

- [ ] Command menu opens with `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- [ ] Command menu closes with `Escape` key
- [ ] Command menu closes when clicking outside
- [ ] Search input is auto-focused when menu opens
- [ ] Search results filter as you type
- [ ] Arrow keys navigate through search results
- [ ] Enter key navigates to selected item
- [ ] Command menu shows all workspace navigation items
- [ ] Command menu includes settings and profile links

### Search Button

- [ ] Search button in header opens command menu
- [ ] Search button shows keyboard shortcut hint (Cmd+K)
- [ ] Search button is accessible via keyboard (Tab navigation)

---

## Phase 3: Data Tables

### Table Structure

- [ ] Table renders with correct columns
- [ ] Table data loads from server component
- [ ] Table is responsive (horizontal scroll on mobile)
- [ ] Empty state shows when no data
- [ ] Loading state shows skeleton during data fetch

### URL State Synchronization

- [ ] Pagination page number syncs with URL (`?page=2`)
- [ ] Page size syncs with URL (`?pageSize=25`)
- [ ] Global filter syncs with URL (`?search=test`)
- [ ] Column filters sync with URL (`?status=completed`)
- [ ] Browser back/forward buttons work correctly
- [ ] URL state persists on page refresh
- [ ] Sharing URL with filters applies them correctly

### Filtering

- [ ] Global search filters across all columns
- [ ] Faceted filters show correct option counts
- [ ] Multiple filter selections work (AND logic)
- [ ] Filter reset button clears all filters
- [ ] Filters update table data immediately

### Sorting

- [ ] Click column header to sort ascending
- [ ] Click again to sort descending
- [ ] Click again to remove sort
- [ ] Sort icon displays current state (↑↓)
- [ ] Only one column can be sorted at a time

### Pagination

- [ ] Page number updates on navigation
- [ ] "Previous" button disabled on first page
- [ ] "Next" button disabled on last page
- [ ] Page size selector updates results per page
- [ ] Pagination info shows correct counts ("1-10 of 100")
- [ ] Changing page size resets to page 1

### Row Selection

- [ ] Checkbox in header selects all visible rows
- [ ] Individual row checkboxes work correctly
- [ ] Selected row count displays correctly
- [ ] Bulk actions toolbar appears when rows selected
- [ ] Bulk actions apply to selected rows only
- [ ] Deselect all works correctly

### Column Visibility

- [ ] Column visibility dropdown shows all columns
- [ ] Toggling column visibility works immediately
- [ ] Hidden columns don't break table layout
- [ ] At least one column must remain visible

---

## Phase 4: Settings Pages

### Settings Layout

- [ ] Settings sidebar navigation renders
- [ ] Active settings tab is highlighted
- [ ] All settings tabs are accessible
- [ ] Settings layout is responsive on mobile
- [ ] Mobile settings use stacked layout (sidebar above content)

### Profile Settings

- [ ] Profile form loads with current user data
- [ ] Name field is editable
- [ ] Email field is disabled (read-only)
- [ ] Bio field is editable
- [ ] Form validation works (Zod schema)
- [ ] Form submission updates profile
- [ ] Success toast shows on save
- [ ] Error toast shows on failure

### Appearance Settings

- [ ] Theme selector shows light/dark/system options
- [ ] Theme changes apply immediately
- [ ] Theme preference persists across sessions
- [ ] Font selector shows available fonts
- [ ] Font changes apply immediately
- [ ] Font preference persists across sessions

### Notifications Settings

- [ ] All notification checkboxes render
- [ ] Checkbox states toggle correctly
- [ ] Form submission saves preferences
- [ ] Success toast shows on save

### Display Settings

- [ ] All display checkboxes render
- [ ] Checkbox states toggle correctly
- [ ] Form submission saves preferences
- [ ] Success toast shows on save

---

## Phase 5: Enhanced Components & Polish

### Theme Switcher

- [ ] Theme switcher dropdown in header works
- [ ] Light mode applies correctly
- [ ] Dark mode applies correctly
- [ ] System theme detection works
- [ ] Theme transition is smooth (no flash)

### Skip to Main

- [ ] "Skip to Main" link is hidden by default
- [ ] Link becomes visible on keyboard focus (Tab)
- [ ] Clicking link focuses main content
- [ ] Link meets accessibility standards

### Password Input

- [ ] Password input masks characters by default
- [ ] Toggle button shows/hides password
- [ ] Eye icon changes based on state
- [ ] Input is accessible via keyboard

### Error Pages

- [ ] 404 page renders correctly
- [ ] 500 page renders correctly
- [ ] Error pages have working "Go Back" button
- [ ] Error pages have working "Back to Home" button
- [ ] Error pages are responsive

### Loading States

- [ ] Loading skeletons show during data fetch
- [ ] Loading table skeleton matches actual table structure
- [ ] Skeleton animations are smooth
- [ ] Loading states disappear when data loads

---

## Accessibility Audit (WCAG 2.1 AA)

### Keyboard Navigation

- [ ] All interactive elements accessible via Tab
- [ ] Tab order is logical (top to bottom, left to right)
- [ ] Focus indicator is visible on all interactive elements
- [ ] Enter/Space activate buttons and links
- [ ] Escape closes dialogs, dropdowns, and command menu
- [ ] Arrow keys navigate within menus and tables

### Screen Reader

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] ARIA labels present where needed
- [ ] Screen reader announces dynamic content changes
- [ ] Landmark regions defined (header, nav, main, footer)
- [ ] Heading hierarchy is correct (h1 → h2 → h3)

### Color Contrast

- [ ] Text meets 4.5:1 contrast ratio (WCAG AA)
- [ ] Interactive elements meet 3:1 contrast ratio
- [ ] Focus indicators meet 3:1 contrast ratio
- [ ] Color is not the only means of conveying information

### Touch Targets

- [ ] All buttons meet 44×44px minimum size
- [ ] Adequate spacing between interactive elements
- [ ] Touch targets don't overlap

---

## Performance Audit

### Build Size

- [ ] Run `pnpm build` successfully
- [ ] Bundle size increase < 50KB from baseline
- [ ] No duplicate dependencies (check with bundle analyzer)
- [ ] Tree-shaking works (unused code removed)

### Load Performance

- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] No layout shift (CLS < 0.1)

### Runtime Performance

- [ ] Navigation between pages is instant
- [ ] Table filtering/sorting is instant (<100ms)
- [ ] Command menu opens immediately
- [ ] No jank or stuttering during interactions
- [ ] Smooth animations (60fps)

### Code Quality

- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No ESLint errors (`pnpm lint`)
- [ ] No console warnings in production build
- [ ] All imports resolve correctly

---

## Mobile Testing

### Devices to Test

- [ ] iPhone (Safari, iOS 15+)
- [ ] Android (Chrome, Android 10+)
- [ ] Tablet (iPad, Android tablet)

### Mobile-Specific Checks

- [ ] Sidebar drawer opens/closes smoothly
- [ ] Tables scroll horizontally without breaking
- [ ] Forms don't zoom on input focus (16px minimum)
- [ ] Touch targets are easily tappable
- [ ] Horizontal scroll is smooth
- [ ] Pull-to-refresh works correctly
- [ ] Virtual keyboard doesn't cover important content

---

## Architecture Compliance

### Documentation Standards

- [ ] All new patterns documented in `/docs`
- [ ] Code comments explain complex logic
- [ ] Type definitions are complete
- [ ] README updated if needed

### Code Standards

- [ ] All files follow naming conventions (kebab-case)
- [ ] Import order follows standards
- [ ] Components follow Server/Client Component rules
- [ ] No `any` types (strict TypeScript)
- [ ] All functions have proper type signatures

### Security

- [ ] All queries filter by `workspaceId`
- [ ] All API routes use `requireAuth()`
- [ ] All inputs validated with Zod
- [ ] No internal IDs exposed in URLs
- [ ] RLS policies enforced

### Multi-Tenancy

- [ ] Workspace isolation is maintained
- [ ] Sidebar routes include `workspaceSlug`
- [ ] All data queries filter by workspace
- [ ] No cross-tenant data leakage

---

## Final Checklist

### Before Deployment

- [ ] All phases completed
- [ ] All tests passing
- [ ] No linter errors
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Performance metrics acceptable
- [ ] Accessibility audit passed
- [ ] Mobile testing complete
- [ ] Documentation updated
- [ ] Security checklist verified

### Post-Deployment Verification

- [ ] Production build runs without errors
- [ ] All features work in production
- [ ] Analytics tracking works
- [ ] Error monitoring active
- [ ] User feedback collected

---

## Notes

**Date Completed**: _______________  
**Completed By**: _______________  
**Issues Found**: _______________  
**Follow-up Tasks**: _______________

---

## Reference

- [Architecture Documentation](./architecture.md)
- [Standards Documentation](./standards.md)
- [Quick Reference](./quick-reference.md)
- [Design Elevation Plan](/cursor-plan://4069d218-2cce-4dfd-92eb-53b7964060a6/Design%20Elevation.plan.md)

