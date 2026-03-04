# STORY-001: Breadcrumb Navigation + Page Header Restructuring

## Objective

Add breadcrumb navigation (`Home > Tickets`) above the page title and restructure the page header so the title and "Create ticket" button sit at the top level of the page (outside the nested `eui-page-columns`). The "Create ticket" button gains an icon prefix.

---

## Prerequisites

- None (first story in CR-2001).

---

## Modifications

### 1. Template — `src/app/features/tickets/tickets.component.html`

#### 1a. Add breadcrumb

Insert `eui-page-breadcrumb` as the first child of `eui-page`, before `eui-page-content`:

```html
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item
                link="/screen/home"
                iconSvgName="home:outline"
                [ariaLabel]="'tickets.breadcrumb.home' | translate">
            </eui-breadcrumb-item>
            <eui-breadcrumb-item
                [label]="'tickets.breadcrumb.tickets' | translate">
            </eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>
    <!-- rest of page -->
</eui-page>
```

#### 1b. Restructure page header

Move `eui-page-header` out of the nested `eui-page-column-header-body` and place it as a direct child of `eui-page`, between `eui-page-breadcrumb` and `eui-page-content`:

```html
<eui-page>
    <eui-page-breadcrumb>...</eui-page-breadcrumb>

    <eui-page-header [label]="'tickets.page-title' | translate">
        @if (canCreate) {
            <eui-page-header-action-items>
                <button euiButton euiPrimary
                        (click)="openCreateDialog()"
                        aria-haspopup="dialog">
                    <eui-icon-svg icon="plus:regular" aria-hidden="true"></eui-icon-svg>
                    {{ 'tickets.create-btn' | translate }}
                </button>
            </eui-page-header-action-items>
        }
    </eui-page-header>

    <eui-page-content>
        <eui-page-columns>
            <!-- Remove the outer eui-page-column[hasSubColumns] wrapper -->
            <!-- Filter column (left) -->
            <eui-page-column ...>...</eui-page-column>
            <!-- Results column (right) -->
            <eui-page-column>...</eui-page-column>
        </eui-page-columns>
    </eui-page-content>
</eui-page>
```

Remove the `eui-page-column[hasSubColumns]` > `eui-page-column-header-body` > `eui-page-column-body` nesting. The `eui-page-columns` with filter + results columns becomes a direct child of `eui-page-content`.

#### 1c. Add icon to "Create ticket" button

Add `<eui-icon-svg icon="plus:regular" aria-hidden="true"></eui-icon-svg>` before the button text.

### 2. Component — `src/app/features/tickets/tickets.component.ts`

Add breadcrumb imports:

```ts
import { EUI_BREADCRUMB } from '@eui/components/eui-breadcrumb';
```

Add to `imports` array:

```ts
imports: [
    ...EUI_BREADCRUMB,
    // ... existing imports
],
```

No logic changes needed — breadcrumb is static.

### 3. Unit tests — `src/app/features/tickets/tickets.component.spec.ts`

New tests (~4):

| # | Test | Detail |
|---|------|--------|
| 1 | Breadcrumb renders | Verify `eui-breadcrumb` is present with 2 `eui-breadcrumb-item` elements |
| 2 | Home breadcrumb links to `/screen/home` | Verify first item has `link="/screen/home"` and `iconSvgName="home:outline"` |
| 3 | Tickets breadcrumb has no link | Verify second item has label but no `link` attribute (current page) |
| 4 | Create button has icon | Verify `eui-icon-svg[icon="plus:regular"]` inside the create button |

Update existing tests that query the old nested header structure to match the new flat structure.

---

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-page-breadcrumb` | from `@eui/components/eui-page` (already imported via `EUI_PAGE`) | Breadcrumb container |
| `eui-breadcrumb` | `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` | Breadcrumb navigation |
| `eui-breadcrumb-item` | `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` | Individual breadcrumb items |
| `eui-icon-svg` | already imported via `EUI_ICON` | Icon in create button |

---

## Accessibility

- `eui-breadcrumb` provides a `<nav>` landmark with proper ARIA structure.
- Home breadcrumb item has `ariaLabel` for the icon-only item.
- Last breadcrumb item (Tickets) has no link — indicates current page.
- `eui-icon-svg` in the create button uses `aria-hidden="true"` (decorative, text label present).
- Page has exactly one `<h1>` via `eui-page-header[label]`.
- Focus order: breadcrumb → page header → content.

---

## i18n Keys (new)

| Key | EN | FR |
|-----|----|----|
| `tickets.breadcrumb.home` | Home | Accueil |
| `tickets.breadcrumb.tickets` | Tickets | Tickets |

---

## Acceptance Criteria

- [ ] Breadcrumb `Home > Tickets` renders above the page title
- [ ] Home breadcrumb links to `/screen/home` with home icon
- [ ] Tickets breadcrumb shows as current page (no link)
- [ ] Page header with title "Tickets" is at the top level (not nested in columns)
- [ ] "Create ticket" button has a `plus:regular` icon prefix
- [ ] "Create ticket" button is in `eui-page-header-action-items` (not stretched)
- [ ] Existing filter column and results area still work correctly
- [ ] All interactive elements reachable via keyboard
- [ ] Screen reader announces breadcrumb navigation
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
