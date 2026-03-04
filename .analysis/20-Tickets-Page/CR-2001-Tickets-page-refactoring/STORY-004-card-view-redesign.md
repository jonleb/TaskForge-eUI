# STORY-004: Card View Redesign

## Objective

Redesign the ticket cards to match the new design: title as a blue link, subtitle (project key + ticket number), metadata line (`Type · Priority · Assignee`), right-aligned `eui-status-badge`, kebab action menu via `eui-popover` (Edit, Delete, Assign, Change status), and expand/collapse chevron to toggle description visibility. Expanded cards have a blue left border. Remove the current `eui-content-card` structure and replace with a custom card layout using eUI utility classes.

---

## Prerequisites

- STORY-003 completed (results header bar with view toggle).

---

## Modifications

### 1. Template — `src/app/features/tickets/tickets.component.html`

Replace the current card list inside `@if (currentView === 'card')` with the new card design:

```html
@if (currentView === 'card') {
    @for (item of items; track item.id; let i = $index) {
        <div class="eui-u-mb-s eui-u-p-m eui-u-border eui-u-border-radius-m eui-u-bg-white"
             [class.card-expanded]="expandedCards.has(item.id)"
             role="article"
             [attr.aria-label]="getProjectKey(item) + '-' + item.ticket_number + ' ' + item.title">

            <!-- Card header row -->
            <div class="eui-u-d-flex eui-u-align-items-start eui-u-flex-justify-content-between">
                <!-- Left: title + subtitle + metadata -->
                <div class="eui-u-flex-grow-1">
                    <a [routerLink]="['/screen/projects', item.projectId, 'tickets', item.ticket_number]"
                       class="eui-u-f-l eui-u-c-primary eui-u-text-decoration-none">
                        {{ item.title }}
                    </a>
                    <p class="eui-u-f-s eui-u-c-muted eui-u-mt-2xs">
                        {{ getProjectKey(item) }}-{{ item.ticket_number }}
                    </p>
                    <p class="eui-u-f-s eui-u-mt-2xs">
                        {{ 'workflow.ticket-type.' + item.type | translate }}
                        · {{ item.priority ? ('ticket.priority.' + item.priority | translate) : '' }}
                        · {{ getAssigneeName(item) }}
                    </p>
                </div>

                <!-- Right: status badge + kebab + expand -->
                <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-xs eui-u-flex-shrink-0">
                    <span euiStatusBadge
                          [attr.euiSuccess]="item.status === 'DONE' ? '' : null"
                          [attr.euiInfo]="item.status === 'IN_PROGRESS' || item.status === 'IN_REVIEW' ? '' : null"
                          [attr.euiWarning]="item.status === 'TO_DO' ? '' : null">
                        {{ 'workflow.status.' + item.status | translate }}
                    </span>

                    <!-- Kebab menu trigger -->
                    <eui-icon-button
                        #kebabTrigger
                        icon="dots-three-vertical:regular"
                        size="s"
                        [ariaLabel]="'tickets.card.actions-menu' | translate"
                        (buttonClick)="openKebabMenu(i, kebabTrigger)">
                    </eui-icon-button>

                    <!-- Expand/collapse -->
                    @if (item.description) {
                        <eui-icon-button
                            [icon]="expandedCards.has(item.id) ? 'caret-up:regular' : 'caret-down:regular'"
                            size="s"
                            [ariaLabel]="(expandedCards.has(item.id) ? 'tickets.card.collapse' : 'tickets.card.expand') | translate"
                            (buttonClick)="toggleCardExpand(item.id)">
                        </eui-icon-button>
                    }
                </div>
            </div>

            <!-- Expandable description -->
            @if (expandedCards.has(item.id) && item.description) {
                <div class="eui-u-mt-s eui-u-pt-s eui-u-border-top">
                    <p class="eui-u-f-s">{{ item.description }}</p>
                </div>
            }
        </div>
    }
}
```

#### Kebab menu popover (single shared instance)

Add a single `eui-popover` at the end of the results column (outside the `@for` loop):

```html
<eui-popover #kebabPopover
             [isDismissable]="true"
             [hasCloseButton]="false"
             [hasNoContentPadding]="true"
             position="bottom">
    <div role="menu" [attr.aria-label]="'tickets.card.actions-menu' | translate">
        <button euiButton euiBasicButton class="eui-u-w-100 eui-u-text-align-start"
                role="menuitem"
                (click)="onCardAction('edit')">
            <eui-icon-svg icon="eui-edit" aria-hidden="true"></eui-icon-svg>
            {{ 'tickets.card.action.edit' | translate }}
        </button>
        <button euiButton euiBasicButton class="eui-u-w-100 eui-u-text-align-start"
                role="menuitem"
                (click)="onCardAction('assign')">
            <eui-icon-svg icon="user:regular" aria-hidden="true"></eui-icon-svg>
            {{ 'tickets.card.action.assign' | translate }}
        </button>
        <button euiButton euiBasicButton class="eui-u-w-100 eui-u-text-align-start"
                role="menuitem"
                (click)="onCardAction('change-status')">
            <eui-icon-svg icon="arrows-clockwise:regular" aria-hidden="true"></eui-icon-svg>
            {{ 'tickets.card.action.change-status' | translate }}
        </button>
        <button euiButton euiBasicButton euiDanger class="eui-u-w-100 eui-u-text-align-start"
                role="menuitem"
                (click)="onCardAction('delete')">
            <eui-icon-svg icon="eui-trash" aria-hidden="true"></eui-icon-svg>
            {{ 'tickets.card.action.delete' | translate }}
        </button>
    </div>
</eui-popover>
```

#### Status badge color mapping

Use directive-based color variants on `span[euiStatusBadge]`. Since Angular attribute binding with empty string for directive selectors can be tricky, an alternative approach is to use `[ngClass]` or conditional classes. The implementation should test which approach works with `eui-status-badge` and adjust accordingly. A safe fallback:

```html
<span euiStatusBadge
      [class.eui-status-badge--success]="item.status === 'DONE'"
      [class.eui-status-badge--info]="item.status === 'IN_PROGRESS' || item.status === 'IN_REVIEW'"
      [class.eui-status-badge--warning]="item.status === 'TO_DO'">
    {{ 'workflow.status.' + item.status | translate }}
</span>
```

Check `eui-status-badge` docs at implementation time for the correct dynamic color binding approach.

### 2. Component — `src/app/features/tickets/tickets.component.ts`

#### New state properties

```ts
// Card expand state
expandedCards = new Set<string>();

// Kebab menu
activeKebabItemIndex: number | null = null;

@ViewChild('kebabPopover') kebabPopover!: EuiPopoverComponent;
```

#### New methods

```ts
toggleCardExpand(itemId: string): void {
    if (this.expandedCards.has(itemId)) {
        this.expandedCards.delete(itemId);
    } else {
        this.expandedCards.add(itemId);
    }
    this.cdr.markForCheck();
}

openKebabMenu(index: number, triggerRef: any): void {
    this.activeKebabItemIndex = index;
    this.kebabPopover.openPopover(triggerRef._elementRef || triggerRef);
}

onCardAction(action: 'edit' | 'delete' | 'assign' | 'change-status'): void {
    if (this.activeKebabItemIndex === null) return;
    const item = this.items[this.activeKebabItemIndex];
    this.kebabPopover.closePopover();

    switch (action) {
        case 'edit':
            // Navigate to ticket detail / edit page
            // For now: navigate to ticket detail
            break;
        case 'delete':
            // Show confirmation dialog (future implementation)
            this.growlService.growl({
                severity: 'info',
                summary: this.translate.instant('tickets.card.action.delete'),
                detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
            });
            break;
        case 'assign':
            // Show assign dialog (future implementation)
            this.growlService.growl({
                severity: 'info',
                summary: this.translate.instant('tickets.card.action.assign'),
                detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
            });
            break;
        case 'change-status':
            // Show status change dialog (future implementation)
            this.growlService.growl({
                severity: 'info',
                summary: this.translate.instant('tickets.card.action.change-status'),
                detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
            });
            break;
    }
}
```

Note: The kebab actions (Delete, Assign, Change status) are placeholder implementations using growl notifications. Full dialog/navigation implementations are out of scope for this CR. The Edit action navigates to the ticket detail page.

#### Add imports

```ts
import { EuiPopoverComponent } from '@eui/components/eui-popover';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
```

Add `EuiPopoverComponent`, `...EUI_STATUS_BADGE` to `imports` array.

#### Remove

- `truncateDescription()` method (description is now shown in full when expanded, hidden when collapsed)
- Remove `eui-content-card` related template code

Check if `EUI_CONTENT_CARD` import is still needed (used elsewhere?). If not, remove from imports.

### 3. SCSS — `src/app/features/tickets/tickets.component.scss`

Replace `.card-link` with `.card-expanded` for the blue left border on expanded cards:

```scss
.card-expanded {
    border-left: 3px solid var(--eui-c-primary, #004494);
}
```

Remove `.card-link` (the `<a>` wrapper around the entire card is removed — only the title is now a link).

Remove `.empty-state` — replace with eUI utility classes in the template:
- Change `<output class="empty-state ...">` to `<output class="eui-u-d-flex eui-u-flex-direction-column eui-u-align-items-center eui-u-pv-xl">` (already using utility classes, just remove the `.empty-state` class reference).

Final SCSS should be minimal:

```scss
:host {
    display: block;
}

::ng-deep eui-toggle-group {
    width: auto;
}

.card-expanded {
    border-left: 3px solid var(--eui-c-primary, #004494);
}

.dialog-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
```

### 4. Unit tests — `src/app/features/tickets/tickets.component.spec.ts`

New tests (~14):

| # | Test | Detail |
|---|------|--------|
| 1 | Card renders title as link | Verify `<a>` with `routerLink` and primary color class |
| 2 | Card renders subtitle | Verify project key + ticket number text |
| 3 | Card renders metadata line | Verify Type · Priority · Assignee text |
| 4 | Card renders status badge | Verify `span[euiStatusBadge]` with translated status text |
| 5 | Status badge color matches status | Verify correct color class for DONE/IN_PROGRESS/TO_DO |
| 6 | Kebab button renders | Verify `eui-icon-button[icon="dots-three-vertical:regular"]` |
| 7 | Kebab menu opens on click | Click kebab, verify popover opens |
| 8 | Kebab menu has 4 actions | Verify Edit, Assign, Change status, Delete buttons |
| 9 | Kebab action closes popover | Click an action, verify popover closes |
| 10 | Expand button renders for cards with description | Verify chevron button present |
| 11 | Expand button hidden for cards without description | Verify no chevron button |
| 12 | Expand toggles description visibility | Click expand, verify description appears |
| 13 | Expanded card has blue left border | Verify `.card-expanded` class applied |
| 14 | Collapse hides description | Click collapse, verify description hidden |

Remove tests for:
- Old `eui-content-card` structure
- `truncateDescription()` method
- Card link wrapper (`<a class="card-link">`)

---

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `span[euiStatusBadge]` | `EUI_STATUS_BADGE` from `@eui/components/eui-status-badge` | Status display on cards |
| `eui-popover` | `EuiPopoverComponent` from `@eui/components/eui-popover` | Kebab action menu |
| `eui-icon-button` | already imported | Kebab trigger, expand/collapse chevron |
| `eui-icon-svg` | already imported | Icons in menu actions |

---

## Accessibility

- Each card has `role="article"` with `aria-label` containing ticket key + title.
- Title link is keyboard-focusable and navigates to ticket detail.
- Kebab `eui-icon-button` has `ariaLabel` for screen readers.
- Popover menu uses `role="menu"` with `role="menuitem"` on each action button.
- `eui-popover` provides focus trap and Escape key dismissal.
- Expand/collapse `eui-icon-button` has dynamic `ariaLabel` ("Expand"/"Collapse").
- Status badge uses `role="status"` (built into `eui-status-badge`) with text content — not color-only.
- Metadata line uses text separators (`·`) — no color-only information.

---

## i18n Keys (new)

| Key | EN | FR |
|-----|----|----|
| `tickets.card.expand` | Expand description | Développer la description |
| `tickets.card.collapse` | Collapse description | Réduire la description |
| `tickets.card.actions-menu` | Ticket actions | Actions du ticket |
| `tickets.card.action.edit` | Edit | Modifier |
| `tickets.card.action.delete` | Delete | Supprimer |
| `tickets.card.action.assign` | Assign | Assigner |
| `tickets.card.action.change-status` | Change status | Changer le statut |

---

## Acceptance Criteria

- [ ] Card title renders as a blue link navigating to ticket detail
- [ ] Card subtitle shows project key + ticket number
- [ ] Card metadata line shows Type · Priority · Assignee
- [ ] Status badge renders with correct color variant per status
- [ ] Status badge shows text (not color-only)
- [ ] Kebab menu button renders on each card
- [ ] Kebab menu opens a popover with 4 actions (Edit, Delete, Assign, Change status)
- [ ] Kebab menu closes after action click
- [ ] Expand chevron shows for cards with description
- [ ] Expand chevron hidden for cards without description
- [ ] Clicking expand shows full description
- [ ] Expanded card has blue left border
- [ ] Clicking collapse hides description
- [ ] Old `eui-content-card` structure is removed
- [ ] Custom SCSS classes `.card-link`, `.empty-state` are removed
- [ ] All interactive elements reachable via keyboard (Tab, Enter, Space, Escape)
- [ ] Popover has focus trap and Escape dismissal
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
