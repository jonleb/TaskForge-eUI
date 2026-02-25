# BUG-006 — Status Filter Toggle Items Spacing Inconsistent

## Summary

The `eui-toggle-group` items (All, Active, Inactive) have inconsistent internal spacing. When "All" is the active (checked) item, the remaining unchecked items ("Active", "Inactive") appear spread too far apart. When a different item is checked (e.g. "Inactive"), the spacing between items looks correct.

## Expected Behavior

The toggle group items should maintain consistent, compact spacing between each other regardless of which item is currently selected.

## Actual Behavior

- When "All" is checked: "Active" and "Inactive" are spread far apart from each other.
- When "Active" or "Inactive" is checked: spacing between items looks fine.

## Root Cause

The `eui-toggle-group` component sets `width: 100%` on its host element by default. In a flex layout, this causes the component to consume all remaining horizontal space. The internal item distribution changes depending on which item is checked, because the checked item's border/box styling affects how the remaining space is distributed across the group.

## Fix Applied

1. Created `users.component.scss` with `::ng-deep` override to set `eui-toggle-group { width: auto; margin-left: 0.5rem; }` — this collapses the toggle group to its natural content width and adds consistent spacing from the search field.
2. Reduced flex container gap from `eui-u-gap-m` to `eui-u-gap-s`.
3. Fixed `styleUrl` (singular) → `styleUrls` (plural array) in the component decorator — Angular requires the array form.

## Status

Fixed — spacing is now consistent regardless of which toggle item is selected.

## Files Changed

- `src/app/features/admin/users/users.component.scss` (new)
- `src/app/features/admin/users/users.component.html` (gap class)
- `src/app/features/admin/users/users.component.ts` (styleUrls)
