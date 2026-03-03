# BUG-002: "Create Project" button placed inside page content instead of page header

## Status: RESOLVED

## Related to
FEATURE-008-Project_key_mgmt / STORY-003 (Create Project Dialog)

## Symptom

The "Create Project" button on the Portfolio page was placed inside `<eui-page-content>`, causing it to appear inline with the table content rather than in the page header action area. This was inconsistent with the Users screen where the "Create User" button sits in the header bar (right-aligned next to the page title).

## Root Cause

Same issue as BUG-002 from the admin users branch. The button was initially added as a direct child of `<eui-page-content>`, which uses `display: flex; flex-direction: column`. This stretches children to full width and places the button above the table content instead of in the header action area.

The eUI `<eui-page-header>` component provides a dedicated `<eui-page-header-action-items>` slot for page-level action buttons, but it requires an open/close tag (not self-closing) to project content into.

## Solution

Moved the button from `<eui-page-content>` into `<eui-page-header-action-items>` inside `<eui-page-header>`, matching the pattern used on the Users screen and documented in the eUI page header anatomy guide.

### Before

```html
<eui-page-header label="Projects" />
<eui-page-content>
    @if (isSuperAdmin) {
        <button euiButton euiPrimary
                type="button"
                aria-haspopup="dialog"
                (click)="openCreateDialog()">
            Create Project
        </button>
    }
    <!-- table content -->
</eui-page-content>
```

### After

```html
<eui-page-header label="Projects">
    @if (isSuperAdmin) {
        <eui-page-header-action-items>
            <button euiButton euiPrimary
                    type="button"
                    aria-haspopup="dialog"
                    (click)="openCreateDialog()">
                Create Project
            </button>
        </eui-page-header-action-items>
    }
</eui-page-header>
<eui-page-content>
    <!-- table content -->
</eui-page-content>
```

## Key Takeaway

Always place page-level action buttons inside `<eui-page-header-action-items>` within `<eui-page-header>`. This is part of the `EUI_PAGE` spread import. The `<eui-page-header>` must use open/close tags (not self-closing) to allow content projection.

## Files Changed

| File | Change |
|---|---|
| `src/app/features/projects/portfolio/portfolio.component.html` | Moved "Create Project" button into `<eui-page-header-action-items>` |
