# STORY-003: Results Header Bar (Sort Control + View Toggle)

## Objective

Add a results header bar above the ticket list containing: "Results" heading with ticket count, a sort control (sort field dropdown + sort direction icon button), and a card/table view toggle using `eui-toggle-group`. Restructure the selected criteria chips area with "Clear all" as a text link and "More" overflow indicator.

---

## Prerequisites

- STORY-002 completed (filter panel refactored).

---

## Modifications

### 1. Template — `src/app/features/tickets/tickets.component.html`

#### 1a. Results header bar

Replace the current simple result count `<p>` with a structured toolbar:

```html
<!-- Results header bar -->
<div class="eui-u-d-flex eui-u-align-items-center eui-u-flex-justify-content-between eui-u-mb-s">
    <!-- Left: heading + count -->
    <div class="eui-u-d-flex eui-u-align-items-baseline eui-u-gap-s">
        <h2 class="eui-u-f-l eui-u-f-bold">{{ 'tickets.results.heading' | translate }}</h2>
        <p aria-live="polite" class="eui-u-f-s">
            {{ 'tickets.results.count' | translate:{ total: total } }}
        </p>
    </div>

    <!-- Right: sort + view toggle -->
    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-s">
        <!-- Sort control -->
        <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-2xs">
            <label euiLabel for="sort-field" class="eui-u-sr-only">{{ 'tickets.results.sort-by' | translate }}</label>
            <select euiSelect id="sort-field"
                    [(ngModel)]="sortField"
                    (ngModelChange)="onSortFieldChange()">
                <option value="created_at">{{ 'tickets.results.sort-creation-date' | translate }}</option>
                <option value="title">{{ 'tickets.results.sort-title' | translate }}</option>
                <option value="priority">{{ 'tickets.results.sort-priority' | translate }}</option>
                <option value="status">{{ 'tickets.results.sort-status' | translate }}</option>
            </select>
            <eui-icon-button
                [icon]="sortOrder === 'asc' ? 'arrow-up:regular' : 'arrow-down:regular'"
                size="s"
                [ariaLabel]="'tickets.results.sort-direction' | translate"
                (buttonClick)="onToggleSortOrder()">
            </eui-icon-button>
        </div>

        <!-- View toggle -->
        <eui-toggle-group>
            <eui-toggle-group-item id="view-card"
                                   [isChecked]="currentView === 'card'"
                                   (itemClick)="onViewChange('card')">
                <eui-icon-svg icon="squares-four:regular" aria-hidden="true"></eui-icon-svg>
                <span class="eui-u-sr-only">{{ 'tickets.view.card' | translate }}</span>
            </eui-toggle-group-item>
            <eui-toggle-group-item id="view-table"
                                   [isChecked]="currentView === 'table'"
                                   (itemClick)="onViewChange('table')">
                <eui-icon-svg icon="list:regular" aria-hidden="true"></eui-icon-svg>
                <span class="eui-u-sr-only">{{ 'tickets.view.table' | translate }}</span>
            </eui-toggle-group-item>
        </eui-toggle-group>
    </div>
</div>
```

#### 1b. Selected criteria chips — restructure

```html
@if (hasActiveFilters) {
    <section class="eui-u-d-flex eui-u-align-items-center eui-u-flex-wrap eui-u-gap-xs eui-u-mb-m"
             [attr.aria-label]="'tickets.results.selected-criteria' | translate">
        <span class="eui-u-f-s eui-u-f-bold">{{ 'tickets.results.selected-criteria' | translate }}:</span>
        @for (chip of visibleChips; track chip.key) {
            <eui-chip euiSizeS
                      [isChipRemovable]="true"
                      [ariaLabel]="chip.label"
                      (remove)="onChipRemove(chip)">
                {{ chip.label }}
            </eui-chip>
        }
        @if (hasOverflowChips) {
            <span class="eui-u-f-s">{{ 'tickets.results.more' | translate:{ count: overflowChipCount } }}</span>
        }
        <button euiButton euiBasicButton euiSizeS type="button"
                (click)="clearAllFilters()">
            {{ 'tickets.results.clear-all' | translate }}
        </button>
    </section>
}
```

#### 1c. Conditional rendering of card vs table view

Wrap the existing card list in `@if (currentView === 'card')` and add a placeholder for the table view (STORY-005):

```html
@if (currentView === 'card') {
    <!-- Card list (existing, will be redesigned in STORY-004) -->
    @for (item of items; track item.id) { ... }
} @else {
    <!-- Table view placeholder (STORY-005) -->
    <p>{{ 'tickets.view.table' | translate }} — coming soon</p>
}
```

### 2. Component — `src/app/features/tickets/tickets.component.ts`

#### New state properties

```ts
// Sort
sortField: string = 'created_at';
sortOrder: 'asc' | 'desc' = 'desc';

// View toggle
currentView: 'card' | 'table' = 'card';

// Chip overflow
readonly MAX_VISIBLE_CHIPS = 5;
```

#### New methods

```ts
onSortFieldChange(): void {
    this.params = { ...this.params, _sort: this.sortField, _page: 1 };
    this.loadTickets();
}

onToggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.params = { ...this.params, _order: this.sortOrder, _page: 1 };
    this.loadTickets();
}

onViewChange(view: 'card' | 'table'): void {
    this.currentView = view;
    this.cdr.markForCheck();
}

get visibleChips(): FilterChip[] {
    return this.activeFilterChips.slice(0, this.MAX_VISIBLE_CHIPS);
}

get hasOverflowChips(): boolean {
    return this.activeFilterChips.length > this.MAX_VISIBLE_CHIPS;
}

get overflowChipCount(): number {
    return this.activeFilterChips.length - this.MAX_VISIBLE_CHIPS;
}
```

#### Update `params` initialization

```ts
params: TicketsListParams = {
    _page: 1,
    _limit: 10,
    _sort: 'created_at',
    _order: 'desc',
};
```

Already matches — no change needed. Just ensure `sortField` and `sortOrder` stay in sync with `params._sort` and `params._order`.

#### Add imports

```ts
import { EUI_TOGGLE_GROUP } from '@eui/components/eui-toggle-group';
```

Add `...EUI_TOGGLE_GROUP` to `imports` array. `EUI_ICON_BUTTON` should already be imported from STORY-002.

### 3. SCSS — `src/app/features/tickets/tickets.component.scss`

Add the toggle group width override (per eUI pitfalls):

```scss
::ng-deep eui-toggle-group {
    width: auto;
}
```

This is the only custom SCSS exception allowed (documented in eUI pitfalls).

### 4. Unit tests — `src/app/features/tickets/tickets.component.spec.ts`

New tests (~10):

| # | Test | Detail |
|---|------|--------|
| 1 | Results heading renders | Verify `h2` with "Results" text |
| 2 | Ticket count renders with `aria-live` | Verify count text with `aria-live="polite"` |
| 3 | Sort field dropdown renders | Verify `select#sort-field` with 4 options |
| 4 | Sort field change triggers reload | Change sort field, verify `params._sort` updated |
| 5 | Sort direction toggle works | Click direction button, verify `sortOrder` flips and `params._order` updated |
| 6 | Sort direction icon updates | Verify icon changes between `arrow-up:regular` and `arrow-down:regular` |
| 7 | View toggle renders | Verify `eui-toggle-group` with 2 items |
| 8 | View toggle switches view | Click table toggle, verify `currentView === 'table'` |
| 9 | Card view shown by default | Verify card list visible, table placeholder not visible |
| 10 | Chip overflow shows "More" | Set >5 active filters, verify "More" text appears |

---

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-toggle-group` | `EUI_TOGGLE_GROUP` from `@eui/components/eui-toggle-group` | Card/table view switcher |
| `eui-toggle-group-item` | included in `EUI_TOGGLE_GROUP` | Toggle items |
| `eui-icon-button` | already imported (STORY-002) | Sort direction button |
| `eui-icon-svg` | already imported | Icons in toggle items |
| `select[euiSelect]` | already imported | Sort field dropdown |
| `eui-chip` | already imported | Filter chips |

---

## Accessibility

- `aria-live="polite"` on ticket count for dynamic updates.
- Sort field label is screen-reader-only (`eui-u-sr-only`) — visible label would clutter the compact toolbar.
- Sort direction `eui-icon-button` has `ariaLabel`.
- View toggle items have screen-reader-only text (`eui-u-sr-only`) since they use icon-only content.
- "Selected criteria" section has `aria-label`.
- "Clear all" is a `button` (not a link) for proper semantics.
- `h2` for "Results" heading maintains heading hierarchy (`h1` = page title, `h2` = results section).

---

## i18n Keys (new)

| Key | EN | FR |
|-----|----|----|
| `tickets.results.heading` | Results | Résultats |
| `tickets.results.count` | {{total}} tickets found | {{total}} tickets trouvés |
| `tickets.results.selected-criteria` | Selected criteria | Critères sélectionnés |
| `tickets.results.clear-all` | Clear all | Tout effacer |
| `tickets.results.more` | +{{count}} more | +{{count}} autres |
| `tickets.results.sort-by` | Sort by | Trier par |
| `tickets.results.sort-creation-date` | Creation date | Date de création |
| `tickets.results.sort-title` | Title | Titre |
| `tickets.results.sort-priority` | Priority | Priorité |
| `tickets.results.sort-status` | Status | Statut |
| `tickets.results.sort-direction` | Toggle sort direction | Inverser le tri |
| `tickets.view.card` | Card view | Vue carte |
| `tickets.view.table` | Table view | Vue tableau |

---

## Acceptance Criteria

- [ ] "Results" heading with ticket count renders above the list
- [ ] Ticket count uses `aria-live="polite"` for screen reader announcements
- [ ] Sort field dropdown with 4 options (Creation date, Title, Priority, Status)
- [ ] Sort direction icon button toggles between asc/desc
- [ ] Sort changes trigger API reload
- [ ] View toggle with card/table icons renders
- [ ] Card view is the default
- [ ] Switching to table view hides cards (placeholder for STORY-005)
- [ ] "Selected criteria" label shown when filters active
- [ ] "Clear all" button resets all filters
- [ ] Chip overflow shows "+N more" when >5 chips
- [ ] `eui-toggle-group` has `width: auto` override
- [ ] All interactive elements reachable via keyboard
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
