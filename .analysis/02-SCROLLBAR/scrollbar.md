# Scrollbar Verification: Home Page

## Goal
Verify that the eUI page layout handles overflow content correctly with a scrollbar, and that the page structure follows eUI guidelines.

## Implementation

### File to modify
`src/app/features/home/home.component.html`

### What to do
1. Keep the existing `eui-page` > `eui-page-header` > `eui-page-content` structure intact
2. Inside `<eui-page-content>`, add a large block of lorem ipsum text (~20,000 characters)
3. Wrap the text in a `<p>` tag with no custom overflow or scroll CSS — let eUI handle it

### Constraints
- Do NOT add custom CSS for scrolling (no `overflow-y: auto`, no `height: 100vh`, etc.)
- Do NOT modify the app shell or layout components
- The scrollbar must come from eUI's built-in page content overflow behavior

## Acceptance Criteria

### Structure check
- [ ] Page uses `<eui-page>` as root container
- [ ] Page has `<eui-page-header>` with a title
- [ ] Page has `<eui-page-content>` wrapping all body content
- [ ] No custom scroll CSS is applied

### Scrollbar check
- [ ] A vertical scrollbar appears inside the page content area (not the browser window)
- [ ] The app shell (toolbar + sidebar) remains fixed/visible while scrolling
- [ ] Scrolling is smooth and the content is fully reachable (top to bottom)
- [ ] The scrollbar disappears or is not present when content fits without overflow

## How to verify
1. Run `npm start` (or `yarn start`)
2. Navigate to the Home page
3. Confirm the toolbar and sidebar stay fixed while the page content scrolls
4. Inspect the DOM to confirm no custom overflow styles were added — the scroll should be managed by eUI's `eui-page-content`
