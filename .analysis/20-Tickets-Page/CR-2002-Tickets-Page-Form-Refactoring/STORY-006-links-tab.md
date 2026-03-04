# STORY-006 — Links Tab Refactoring

## Scope

Replace custom `<ul class="link-list">` with eUI utility-class layout inside the Links tab. Keep add/delete dialogs.

## Current State

- Custom `.links-section`, `.link-list`, `.link-item`, `.link-label`, `.link-target`, `.section-header` SCSS
- `<h3>` heading + add button + `<ul>` list

## Target State

- No `<h3>` heading (tab label serves as heading)
- Add Link button at top using `eui-u-mb-m`
- List items using `eui-u-d-flex eui-u-align-items-center eui-u-gap-s eui-u-pv-xs eui-u-border-bottom`
- Keep existing add/delete dialogs unchanged (they use `eui-dialog` correctly)

## Tests

- Links list renders with utility classes
- Add link button visible when canEdit
- Delete button visible when canDeleteLink
- Dialogs still function correctly
