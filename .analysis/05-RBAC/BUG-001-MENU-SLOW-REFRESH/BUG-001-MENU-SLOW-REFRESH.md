# BUG-001-MENU-SLOW-REFRESH — Sidebar menu empty on page refresh

## Symptom

When the user refreshes the page (F5 / Ctrl+R), the sidebar menu is empty. It only appears after clicking somewhere on the page.

## Root Cause

`LayoutComponent.ngOnInit()` calls `authService.getCurrentUser()` which is an async HTTP call. The `sidebarItems` array is reassigned inside the `subscribe` callback. The eUI `<eui-app-sidebar-menu>` component uses `OnPush` change detection internally, so it does not detect the array reassignment that happens asynchronously — it only re-renders when Angular's change detection is triggered by a user interaction (click, keypress, etc.).

## Fix

Inject `ChangeDetectorRef` and call `cdr.markForCheck()` after `filterSidebarItems()` in both the success and error paths of the subscription. This tells Angular that the component's inputs have changed and the view needs to be re-checked, even under `OnPush` strategy.

## Files Changed

- `src/app/layout/layout.component.ts` — inject `ChangeDetectorRef`, call `markForCheck()` after filtering
