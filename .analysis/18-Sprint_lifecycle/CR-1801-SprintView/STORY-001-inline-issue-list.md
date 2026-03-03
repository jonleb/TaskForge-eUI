# STORY-001 — Inline Issue List per Sprint

## Objective

Replace the ticket count text ("2 ticket(s)") with a full issue list rendered inside each sprint item on the sprint list page. Users see ticket number, type, title, status, priority, and assignee at a glance.

## Current State

- `sprints.component.ts` loads all backlog items via `getBacklog(projectId, { _limit: 1000 })` and stores them in `allBacklogItems`.
- Only `ticketCounts` (a `Map<string, number>`) is exposed to the template.
- The template shows `{{ 'sprint.tickets-count' | translate:{ count: getTicketCount(sprint.id) } }}`.

## Changes

### Template (`sprints.component.html`)

Below the existing metadata paragraph in each sprint item, add an issue list:

```html
<ul class="sprint-issue-list" [attr.aria-label]="'sprint.issue-list-label' | translate:{ name: sprint.name }">
    @for (item of getSprintItems(sprint.id); track item.id) {
        <li class="sprint-issue-item"
            tabindex="0"
            [attr.aria-label]="'#' + item.ticket_number + ' — ' + item.title">
            <span class="sprint-issue-item__number">#{{ item.ticket_number }}</span>
            <eui-status-badge [euiSizeS]="true"
                [ariaLabel]="item.type">
                {{ item.type }}
            </eui-status-badge>
            <span class="sprint-issue-item__title">{{ item.title }}</span>
            <eui-status-badge
                [euiSuccess]="item.status === 'DONE'"
                [euiWarning]="item.status === 'IN_PROGRESS' || item.status === 'IN_REVIEW'"
                [euiInfo]="item.status === 'TO_DO'"
                [euiSizeS]="true"
                [ariaLabel]="item.status">
                {{ item.status }}
            </eui-status-badge>
            @if (item.priority) {
                <span class="sprint-issue-item__priority">{{ item.priority }}</span>
            }
        </li>
    }
    @empty {
        <li class="eui-u-c-text-muted eui-u-text-center">{{ 'sprint.no-issues' | translate }}</li>
    }
</ul>
```

Keep the ticket count text as a summary above the list.

### Component (`sprints.component.ts`)

- Make `getSprintTickets` public (rename to `getSprintItems`) so the template can call it.
- Sort items by `position` (ascending), falling back to `ticket_number`.

```typescript
getSprintItems(sprintId: string): BacklogItem[] {
    return this.allBacklogItems
        .filter(item => item.sprint_id === sprintId)
        .sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));
}
```

### Styles (`sprints.component.scss`)

```scss
.sprint-issue-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
}

.sprint-issue-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    border-bottom: 1px solid var(--eui-color-grey-15, #eee);
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover,
    &:focus-visible {
        background-color: var(--eui-color-grey-5, #f5f5f5);
        outline: 2px solid var(--eui-color-primary, #004494);
        outline-offset: -2px;
    }

    &__number {
        font-weight: 600;
        min-width: 2.5rem;
        color: var(--eui-color-primary, #004494);
    }

    &__title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__priority {
        font-size: 0.75rem;
        text-transform: uppercase;
    }
}
```

### i18n

**en.json**:
```json
"sprint.issue-list-label": "Issues in {{name}}",
"sprint.no-issues": "No issues in this sprint"
```

**fr.json**:
```json
"sprint.issue-list-label": "Tickets dans {{name}}",
"sprint.no-issues": "Aucun ticket dans ce sprint"
```

## Accessibility

- `<ul>` with `aria-label` describing the sprint name context.
- Each `<li>` is focusable via `tabindex="0"` with a descriptive `aria-label`.
- Status conveyed via text labels inside badges, not colour alone.
- Priority displayed as text.

## Unit Tests

- Renders issue list items for sprints with tickets.
- Shows "No issues" message for empty sprints.
- Items sorted by position, then ticket_number.
- Each item displays ticket_number, type, title, status.
- Issue list items are focusable (have `tabindex="0"`).
