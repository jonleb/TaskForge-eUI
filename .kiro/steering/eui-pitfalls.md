# eUI Common Pitfalls

Recurring issues discovered during development. Check these rules before implementing UI patterns to avoid known mistakes.

## Page-Level Action Buttons

NEVER place page-level action buttons (Create, Export, etc.) inside `<eui-page-content>`. The content area uses `display: flex; flex-direction: column`, which stretches buttons to full width.

ALWAYS place them inside `<eui-page-header-action-items>` within `<eui-page-header>`:

```html
<!-- WRONG — button stretches full width -->
<eui-page-header label="Page Title" />
<eui-page-content>
    <button euiButton euiPrimary (click)="doSomething()">Action</button>
</eui-page-content>

<!-- CORRECT — button right-aligned in header bar -->
<eui-page-header label="Page Title">
    <eui-page-header-action-items>
        <button euiButton euiPrimary (click)="doSomething()">Action</button>
    </eui-page-header-action-items>
</eui-page-header>
<eui-page-content>
    <!-- page content only -->
</eui-page-content>
```

Note: `<eui-page-header>` must use open/close tags (not self-closing `/>`) to allow content projection into the action items slot.

## Dialog Accept Label Timing

`eui-dialog` captures `[acceptLabel]` at overlay creation time. If the label depends on dynamic state, set the component property before calling `openDialog()` and force change detection with `cdr.detectChanges()`.

## Paginator Init Event

`eui-paginator` fires `pageChange` during initialization. Guard with `AfterViewInit` + a `paginatorReady` flag to prevent spurious API calls on page load.

## Table Caption

`eui-table` strips `<caption>` elements from the DOM. Use `aria-label` on the table element instead for accessibility.

## Icon Button Disabled State

`eui-icon-button` uses `[euiDisabled]`, not `[disabled]`. The standard `disabled` attribute causes build errors.

## Toggle Group Width

`eui-toggle-group` has `width: 100%` by default. Override with `::ng-deep { width: auto }` in component SCSS for compact layouts.
