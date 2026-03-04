# STORY-004 — Comments Tab with eui-discussion-thread

## Scope

Replace the custom `<ul class="comment-list">` with `eui-discussion-thread`. Keep the add-comment form.

## Current State

- Custom `<ul class="comment-list">` with `<li class="comment-item">`
- `.comment-meta`, `.comment-author`, `.comment-content` custom SCSS classes
- Add comment: `<textarea>` + submit button

## Target State

- `eui-discussion-thread` with mapped `TicketComment` → `EuiDiscussionThreadItem`
- Add comment form above thread using `euiInputGroup` + `textarea euiTextArea` + submit button
- No custom SCSS

## Mapping

```typescript
get commentThreadItems(): EuiDiscussionThreadItem[] {
    return this.comments.map(c => ({
        author: c.authorName,
        date: c.created_at,
        body: c.content,
    }));
}
```

## Imports to Add

- `EUI_DISCUSSION_THREAD` from `@eui/components/eui-discussion-thread`

## Tests

- Discussion thread renders with comment items
- Empty state shows when no comments
- Add comment form visible when canEdit
- Add comment form hidden when !canEdit
- Submit calls addComment service method
- Textarea clears after successful submit
