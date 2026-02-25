# Add "Scrollbar" Menu Item and Page

## Goal
Add a new sidebar menu item called "Scrollbar" that navigates to a new page containing ~20,000 characters of lorem ipsum text, to test scrollbar behavior.

## Implementation

### 1. Create the Scrollbar feature component

Create `src/app/features/scrollbar/scrollbar.component.ts`:
- Standalone component using `EUI_PAGE` and `TranslateModule`
- Template uses `eui-page` > `eui-page-header` > `eui-page-content` structure
- Page header label: "Scrollbar Test"
- Content: a `<p>` tag with ~20,000 characters of lorem ipsum

Create `src/app/features/scrollbar/scrollbar.component.html`:
- Follow the same eUI page structure as the Home page
- No custom scroll CSS

### 2. Create the route file

Create `src/app/features/scrollbar/scrollbar.routes.ts`:
- Export `SCROLLBAR_ROUTES` (same pattern as `HOME_ROUTES`)
- Single route: `{ path: '', component: ScrollbarComponent }`

### 3. Register the route in app.routes.ts

Add a lazy-loaded route:
```typescript
{ path: 'screen/scrollbar', loadChildren: () => import('./features/scrollbar/scrollbar.routes').then(m => m.SCROLLBAR_ROUTES) }
```

### 4. Add the sidebar menu item in app.component.ts

Add to the `sidebarItems` array:
```typescript
{ label: 'Scrollbar', url: 'screen/scrollbar' }
```

## Acceptance Criteria
- [ ] "Scrollbar" menu item appears in the sidebar
- [ ] Clicking it navigates to `/screen/scrollbar`
- [ ] The page renders with `eui-page` > `eui-page-header` > `eui-page-content`
- [ ] ~20,000 characters of lorem ipsum are displayed
- [ ] No custom scroll CSS is applied — eUI handles overflow natively
- [ ] Build passes: `npx ng build --configuration=development`
