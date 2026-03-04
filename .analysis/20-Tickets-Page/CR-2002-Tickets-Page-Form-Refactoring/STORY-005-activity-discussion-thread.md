# STORY-005 — Activity Tab with eui-discussion-thread

## Scope

Replace the custom `<ul class="activity-list">` with `eui-discussion-thread` (read-only timeline).

## Current State

- Custom `<ul class="activity-list">` with `<li class="activity-item">`
- `.activity-text`, `.activity-date` custom SCSS classes

## Target State

- `eui-discussion-thread` with mapped `ActivityEntry` → `EuiDiscussionThreadItem`
- Read-only (no add form)

## Mapping

```typescript
get activityThreadItems(): EuiDiscussionThreadItem[] {
    return this.activity.map(a => ({
        author: this.getChangerName(a.changedBy),
        date: a.created_at,
        body: this.translate.instant('ticket-detail.activity.changed', {
            user: this.getChangerName(a.changedBy),
            field: a.field, oldValue: a.oldValue, newValue: a.newValue,
        }),
    }));
}
```

## Tests

- Discussion thread renders with activity items
- Empty state shows when no activity
- Activity entries show changer name and change description
