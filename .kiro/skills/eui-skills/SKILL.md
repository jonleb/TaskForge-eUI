---
name: eui-angular-v21
description: Comprehensive guide for developing with eUI Angular 21 framework. Use it always when building EC/EU web applications, working with Angular 21 and eUI components, styling EC-themed interfaces, integrating ECL components, or developing mobile apps with eUI-Mobile (Ionic 8).
---

# eUI Angular 21 Framework

Guide for building European Commission web applications with eUI Angular 21.

## Critical Rules

1. **Search references first** - Consult `references/` before writing code. Never guess component APIs.
2. **Verify with tools** - Run `yarn lint` or `yarn build` to check for errors.
3. **Don't hallucinate** - If errors occur, find the documentation before acting.

## Choosing the Right Library

| Library  | Use Case                         | Components Guide                                    | Styles Guide                                |
| -------- | -------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| **eUI**  | Internal EC/EU apps, dashboards  | [eui-components.md](references/eui-components.md)   | [eui-styles.md](references/eui-styles.md)   |
| **ECL**  | Public-facing ec.europa.eu sites | [ecl-components.md](references/ecl-components.md)   | [ecl-styles.md](references/ecl-styles.md)   |
| **EUIM** | Mobile apps (iOS/Android)        | [euim-components.md](references/euim-components.md) | [euim-styles.md](references/euim-styles.md) |

## Reference Guides

Always read the relevant guides before modifying code.

### Core

| Topic             | Guide                                                           |
| ----------------- | --------------------------------------------------------------- |
| Getting Started   | [getting-started.md](references/getting-started.md)             |
| App Structure     | [app-structure.md](references/app-structure.md)                 |
| App Configuration | [app-configuration.md](references/app-configuration.md)         |
| Security          | [security.md](references/security.md)                           |
| Services          | [services.md](references/services.md)                           |
| Testing           | [testing.md](references/testing.md)                             |
| Icons             | [icons.md](references/icons.md)                                 |
| Forms             | [forms.md](references/forms.md)                                 |
| Reactive Forms    | [guides/reactive-forms.md](references/guides/reactive-forms.md) |

### Component Documentation

- `references/eui/` - eUI component docs (components, directives, layout, pipes)
- `references/ecl/` - ECL component docs
- `references/euim/` - EUIM mobile docs

## Modern Angular Patterns

```typescript
// Standalone components only (no NgModules)
@Component({
  standalone: true,
  imports: [...EUI_BUTTON, ...EUI_INPUT_TEXT],
})

// Signals for state
count = signal(0);
doubled = computed(() => this.count() * 2);

// New control flow
@if (condition) { ... }
@for (item of items; track item.id) { ... }

// inject() over constructor
private service = inject(MyService);
```

## Quick Start Patterns

### Import Pattern

```typescript
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_PAGE } from "@eui/components/eui-page";
import { EUI_TABLE } from "@eui/components/eui-table";
```

### Directives vs Components

```html
<!-- Directives: on native elements -->
<input euiInputText [(ngModel)]="value" />
<button euiButton euiPrimary>Click</button>
<table euiTable [data]="items">
  ...
</table>

<!-- Components: custom elements -->
<eui-page>...</eui-page>
<eui-card>...</eui-card>
```

### Form Pattern

```html
<div euiInputGroup>
  <label euiLabel for="name">Name</label>
  <input euiInputText id="name" [(ngModel)]="name" />
</div>
```

### Page Layout

```html
<eui-page>
  <eui-page-header label="Title" subLabel="Subtitle"></eui-page-header>
  <eui-page-content>...</eui-page-content>
</eui-page>
```

## Components Quick Reference

The full list is in [eUI Components](references/eui-components.md). For ECL, use [ECL components](references/ecl-components.md). For EUIM, use [EUIM components](references/euim-components.md)

Open it to understand which components are available.

## Notes

**Date components** require a date adapter:

```typescript
import { provideNativeDateAdapter } from "@angular/material/core";
providers: [provideNativeDateAdapter()];
```

**Icons** format: `icon="name:set"` where set is `eui`, `eui-file`, `ecl`, `regular` (Phosphor), or `fill` (Phosphor). See [icons.md](references/icons.md) for full icon list.

```html
<eui-icon-svg icon="eui-home" size="m"></eui-icon-svg>
<!-- eUI set (default) -->
<eui-icon-svg icon="house:regular" size="m"></eui-icon-svg>
<!-- Phosphor regular -->
<eui-icon-svg icon="house:fill" size="m"></eui-icon-svg>
<!-- Phosphor fill -->
```

**Flag Icons** require CSS import in `angular.json`: `node_modules/@eui/styles/dist/eui-icons-flags.css`

```html
<span class="eui-flag-icon eui-flag-icon-be"></span>
<!-- 2-letter ISO code -->
<span class="eui-flag-icon eui-flag-icon-fr eui-flag-icon--rounded"></span>
```

**Common Directives** (camelCase selectors):

```html
<!-- Form inputs -->
<input euiInputText [(ngModel)]="text" />
<input euiInputNumber [(ngModel)]="num" />
<input type="checkbox" euiInputCheckBox [(ngModel)]="checked" />
<input type="radio" euiInputRadio [(ngModel)]="option" />
<textarea euiTextArea [(ngModel)]="content"></textarea>
<select euiSelect [(ngModel)]="selected">
  ...
</select>
<label euiLabel>Field label</label>
<div euiInputGroup>...</div>

<!-- Buttons -->
<button euiButton>Default</button>
<button euiButton euiPrimary>Primary</button>
<button euiButton euiSecondary>Secondary</button>
<button euiButton euiDanger>Danger</button>

<!-- Other -->
<div euiTooltip="Tooltip text">Hover me</div>
<div *euiHasPermission="'admin'">Admin only</div>
<div euiResizable>Resizable panel</div>
```

**Host Directive Inputs** - Available on most components via `BaseStatesDirective`:

- Variants: `euiPrimary`, `euiSecondary`, `euiSuccess`, `euiInfo`, `euiWarning`, `euiDanger`, `[euiVariant]`
- Sizes: `euiSizeXS`, `euiSizeS`, `euiSizeM`, `euiSizeL`, `euiSizeXL`, `euiSize2XL`, `[euiSizeVariant]`
- States: `euiDisabled`, `euiOutline`, `euiHighlighted`

```html
<eui-badge euiSuccess euiSizeS>Active</eui-badge>
<eui-alert euiWarning>Warning message</eui-alert>
<button euiButton euiPrimary euiSizeL>Large Primary</button>
```

**Badges, Chips & Avatars** - When to use each:

| Component          | Use Case                                        | Example                                         |
| ------------------ | ----------------------------------------------- | ----------------------------------------------- |
| `eui-badge`        | Counts, notifications, labels on other elements | Unread count on icon, status label              |
| `eui-status-badge` | Workflow/process states with text               | "Success", "In Progress", "Pending", "Rejected" |
| `eui-chip`         | Removable tags, selected values, filters        | Selected filters, email recipients              |
| `eui-chip-button`  | Clickable chip (action trigger)                 | Filter toggle, category selector                |
| `eui-chip-list`    | Container for multiple chips                    | Tag list, multi-select display                  |
| `eui-avatar`       | User/entity representation                      | Profile picture, user initials                  |

```html
<!-- Badge: notification count -->
<eui-badge euiDanger>5</eui-badge>

<!-- Status badge: workflow state -->
<eui-status-badge euiSuccess>Approved</eui-status-badge>
<eui-status-badge euiWarning>In Progress</eui-status-badge>
<eui-status-badge euiDanger>Rejected</eui-status-badge>
<eui-status-badge euiInfo>Pending Review</eui-status-badge>

<!-- Chip: removable tag -->
<eui-chip [isChipRemovable]="true" (remove)="onRemove($event)">Tag</eui-chip>

<!-- Chip button: clickable filter -->
<eui-chip-button euiPrimary (buttonClick)="toggle()">Active</eui-chip-button>

<!-- Chip list: multiple chips -->
<eui-chip-list>
  @for (tag of tags; track tag) {
  <eui-chip euiSizeS [isChipRemovable]="true">{{tag}}</eui-chip>
  }
</eui-chip-list>

<!-- Avatar: user image with badge -->
<eui-avatar euiSizeM>
  <eui-avatar-image [imageUrl]="user.photo"></eui-avatar-image>
  <eui-avatar-badge>
    <eui-status-badge euiSuccess euiDottedBadge></eui-status-badge>
  </eui-avatar-badge>
</eui-avatar>
```

## Common Pitfalls

1. **Missing component imports** - Always spread the component array in `imports`:

   ```typescript
   @Component({
     imports: [...EUI_BUTTON, ...EUI_TABLE], // ✓ correct
     // imports: [EUI_BUTTON], // ✗ wrong - missing spread
   })
   ```

2. **Directives require separate imports** - Each directive needs its own import:

   ```typescript
   import { EUI_LABEL } from '@eui/components/eui-label';
   import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
   import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

   @Component({
     imports: [...EUI_INPUT_TEXT, ...EUI_LABEL, ...EUI_INPUT_GROUP],
   })
   ```

3. **Directive selectors use camelCase** - Not kebab-case like components:

   ```html
   <!-- Form directives -->
   <input euiInputText />
   <!-- ✓ correct -->
   <input eui-input-text />
   <!-- ✗ wrong -->
   <input euiInputNumber />
   <input type="checkbox" euiInputCheckBox />
   <!-- capital B -->
   <input type="radio" euiInputRadio />
   <textarea euiTextArea></textarea>
   <!-- capital A -->
   <select euiSelect></select>
   <label euiLabel>Name</label>
   <div euiInputGroup></div>

   <!-- Button directives -->
   <button euiButton euiPrimary>Submit</button>
   ```

4. **EUI_HELPER_TEXT doesn't exist** - Use `eui-feedback-message` with `euiInfo`:

   ```html
   <!-- ✗ wrong - doesn't exist -->
   <eui-helper-text>Help text</eui-helper-text>

   <!-- ✓ correct -->
   <eui-feedback-message euiInfo>Help text</eui-feedback-message>
   ```

   ```typescript
   import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
   ```

5. **EuiMaxLengthDirective requires separate import** - Not part of EUI_TEXTAREA:

   ```typescript
   import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
   import { EuiMaxLengthDirective } from '@eui/components/directives';

   @Component({
     imports: [...EUI_TEXTAREA, EuiMaxLengthDirective], // Note: no spread for directive
   })
   ```

6. **eui-datepicker doesn't support two-way binding** - Use separate input/output:

   ```html
   <!-- ✗ wrong -->
   <eui-datepicker [(value)]="date"></eui-datepicker>

   <!-- ✓ correct -->
   <eui-datepicker
     [value]="date"
     (dateSelect)="onDateSelect($event)"
   ></eui-datepicker>
   <!-- Or with reactive forms -->
   <eui-datepicker formControlName="date"></eui-datepicker>
   ```

7. **eui-slide-toggle doesn't support two-way binding** - Use separate input/output:

   ```html
   <!-- ✗ wrong -->
   <eui-slide-toggle [(isChecked)]="enabled"></eui-slide-toggle>

   <!-- ✓ correct -->
   <eui-slide-toggle
     [isChecked]="enabled"
     (slideToggleChange)="enabled = $event"
   ></eui-slide-toggle>
   <!-- Or with reactive forms -->
   <eui-slide-toggle formControlName="enabled"></eui-slide-toggle>
   ```

8. **eui-autocomplete uses autocompleteData** - Not `options`, requires `EuiAutoCompleteItem[]`:

   ```typescript
   import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

   items: EuiAutoCompleteItem[] = [
     { id: 1, label: 'Option 1' },
     { id: 2, label: 'Option 2' },
   ];
   ```

   ```html
   <eui-autocomplete
     [autocompleteData]="items"
     formControlName="selection"
   ></eui-autocomplete>
   ```

9. **EUI_LABEL must be imported separately** - Not included in EUI_INPUT_GROUP or other form imports:

   ```typescript
   import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
   import { EUI_LABEL } from "@eui/components/eui-label"; // Must add separately!
   ```

10. **Bootstrap grid CSS not included** - Must be explicitly added to `angular.json`:

    ```json
    "styles": [
      "node_modules/@eui/styles/dist/eui-bootstrap-grid.css",
      "node_modules/@eui/core/styles/eui-styles.scss",
      "src/styles.scss"
    ]
    ```

11. **Width/height utilities: numbers can mean rem OR percentage** - Know the ranges:

    ```html
    <!-- Width: 0-30 = rem, 33/50/66/100 = percentage -->
    <div class="eui-u-width-8">8rem</div>
    <div class="eui-u-width-50">50%</div>

    <!-- Height: 0-30 = rem, 33/50/100 = percentage (no 66!) -->
    <div class="eui-u-height-8">8rem</div>
    <div class="eui-u-height-100">100%</div>

    <!-- auto -->
    <div class="eui-u-width-auto">auto</div>
    ```

12. **eui-card icon placement** - Don't put icons directly in header title:

    ```html
    <!-- ✗ wrong -->
    <eui-card-header-title
      ><eui-icon-svg icon="house:regular" />Title</eui-card-header-title
    >

    <!-- ✓ correct -->
    <eui-card-header-left-content
      ><eui-icon-svg icon="house:regular"
    /></eui-card-header-left-content>
    <eui-card-header-title>Title</eui-card-header-title>
    ```

13. **eui-card with list or table** - Use `euiNoContentPadding` for edge-to-edge display:

    ```html
    <eui-card euiNoContentPadding>
      <eui-card-content>
        <!-- For tables, also wrap in scrollable wrapper -->
        <div class="eui-table__scrollable-wrapper">
          <table euiTable [isTableResponsive]="true">
            ...
          </table>
        </div>
      </eui-card-content>
    </eui-card>
    ```

14. **eui-card accordion pattern** - Use collapsible directives:

    ```html
    <eui-card euiCollapsible euiCollapsed>
      <eui-card-header hasBottomExpander>...</eui-card-header>
      <eui-card-content>...</eui-card-content>
    </eui-card>
    ```

15. **eui-u-br-circle doesn't exist** - Use `eui-u-br-max` for circles/pills.

16. **eui-u-border-state-\* only applies LEFT border** - For full borders use inline style:

    ```html
    <div style="border: 1px solid var(--eui-c-primary);">Full border</div>
    ```

17. **Angular pipes need explicit imports** - Add to component imports:

    ```typescript
    import { TitleCasePipe } from '@angular/common';

    @Component({
      imports: [TitleCasePipe],
    })
    ```

18. **eui-editor requires Quill CSS and JS** - Add to `angular.json`:

    ```json
    "styles": [
      "node_modules/quill/dist/quill.core.css",
      "node_modules/quill/dist/quill.snow.css"
    ],
    "scripts": [
      "node_modules/quill/dist/quill.js",
      "node_modules/quill-better-table/dist/quill-better-table.min.js"
    ]
    ```

19. **ngx-extended-pdf-viewer requires assets** - Add to `angular.json` assets:

    ```json
    "assets": [
      {
        "glob": "**/*",
        "input": "node_modules/ngx-extended-pdf-viewer/assets/",
        "output": "./assets"
      }
    ]
    ```

20. **eui-u-flex sets more than just display:flex** - It also forces `width: 100%` and `align-items: center`. Use `eui-u-d-flex` for pure flexbox without side effects.

21. **eui-dialog requires EuiDialogService** - Don't use `<eui-dialog>` directly in templates. Open dialogs via service:

    ```typescript
    import { EuiDialogService } from '@eui/components/eui-dialog';

    dialogService = inject(EuiDialogService);
    this.dialogService.open(MyDialogComponent, { data: {...} });
    ```
