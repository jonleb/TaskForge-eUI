# BUG-002: "Create User" button stretches to full width

## Status: RESOLVED

## Symptom

The "Create User" button on the User Administration page spans the entire width of the content area instead of being auto-sized to fit its label.

## Root Cause

Two issues combined:

1. The button was placed as a direct child of `<eui-page-content>`, which uses `display: flex; flex-direction: column`. Flex column children stretch to full width by default (`align-items: stretch`).

2. The `<eui-page-header>` was using a self-closing tag (`<eui-page-header label="..." />`), which prevents content projection. The eUI page header component provides a dedicated `<eui-page-header-action-items>` slot for page-level action buttons, but it requires an open/close tag to project content into.

## Solution

Moved the button from `<eui-page-content>` into `<eui-page-header-action-items>` inside the page header, following the eUI page header anatomy pattern documented in:
- `.kiro/skills/eui-skills/references/guides/showcase-design-patterns/patterns/page-header-anatomy.md`
- `EuiPageHeaderActionItemsComponent` compodoc docs

The `<eui-page-header-action-items>` container uses `display: flex; align-items: flex-end; justify-content: flex-end` which auto-sizes buttons and right-aligns them next to the page title.

### Before

```html
<eui-page-header label="User Administration" />
<eui-page-content>
    <button euiButton euiPrimary
            class="eui-u-mb-m"
            aria-haspopup="dialog"
            (click)="createDialog.openDialog()">
        Create User
    </button>
    ...
</eui-page-content>
```

### After

```html
<eui-page-header label="User Administration">
    <eui-page-header-action-items>
        <button euiButton euiPrimary
                type="button"
                aria-haspopup="dialog"
                (click)="createDialog.openDialog()">
            Create User
        </button>
    </eui-page-header-action-items>
</eui-page-header>
<eui-page-content>
    ...
</eui-page-content>
```

### eUI reference pattern

```html
<eui-page-header label="Page title" subLabel="Page Sub-title (optional)">
    <eui-page-header-action-items>
        <button euiButton euiSecondary>Secondary action</button>
        <button euiButton euiPrimary>Primary action</button>
    </eui-page-header-action-items>
</eui-page-header>
```

## Files Changed

| File | Change |
|---|---|
| `src/app/features/admin/users/users.component.html` | Moved button into `<eui-page-header-action-items>` |
| `src/tsconfig.app.json` | Excluded `test-setup.ts` from app compilation (side-fix from BUG-003) |
