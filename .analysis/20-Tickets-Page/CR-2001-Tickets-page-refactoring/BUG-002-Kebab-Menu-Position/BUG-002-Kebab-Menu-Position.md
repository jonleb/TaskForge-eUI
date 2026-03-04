# BUG-002: Kebab Menu Appears at Top-Left Instead of Near Trigger

## Problem

Clicking the kebab (three-dot) menu on a ticket card causes the popover menu to appear at the top-left corner of the page instead of anchored to the trigger button.

## Root Cause

The `openKebabMenu` method receives a template reference variable (`#kebabTrigger`) pointing to the `eui-icon-button` component instance, then tries to extract the native element via `triggerRef._elementRef || triggerRef`. However, `eui-popover.openPopover()` expects a native DOM element (or `ElementRef`), and the component instance doesn't expose `_elementRef` publicly.

All eUI popover samples use the native click event pattern:
```html
<button (click)="openPopover($event)">
```
```typescript
openPopover(e: any) {
    this.popover.openPopover(e.target);
}
```

The `eui-icon-button` `(buttonClick)` output emits the native `Event` object, so `event.target` gives the correct DOM element for positioning.

## Fix

- Template: replace `(buttonClick)="openKebabMenu(i, kebabTrigger)"` with `(buttonClick)="openKebabMenu(i, $event)"`
- Remove `#kebabTrigger` template reference
- TS: change `openKebabMenu(index, triggerRef)` to `openKebabMenu(index, event: Event)` using `event.target`
- Update test mock to pass a native Event instead of a fake component ref

## Files Modified

- `src/app/features/tickets/tickets.component.html`
- `src/app/features/tickets/tickets.component.ts`
- `src/app/features/tickets/tickets.component.spec.ts`
