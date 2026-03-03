# STORY-004: Frontend — Add Member Dialog

## Objective

Allow managers (SUPER_ADMIN, PROJECT_ADMIN) to search for a candidate user and add them to the project with a selected role, via a dialog triggered from the "Add Member" button in the Members page header.

## Scope

- Update `MembersComponent` with add dialog logic and template.
- Candidate search with debounce (300 ms, min 2 characters).
- Candidate selection from results list.
- Role selection from `PROJECT_ROLES`.
- Success: close dialog, growl notification, reload members.
- Error: inline feedback message.
- Form reset on dismiss.

## Implementation Details

### Component (`members.component.ts`)

- Add `@ViewChild('addDialog') addDialog: EuiDialogComponent`.
- Add properties: `candidates: MemberCandidate[]`, `candidateSearch: string`, `selectedCandidate: MemberCandidate | null`, `selectedAddRole: string`, `addError: string`, `candidateLoading: boolean`.
- Import `EUI_INPUT_TEXT` from `@eui/components/eui-input-text`, `MemberCandidate` from models.
- `openAddDialog()`: reset form, open dialog.
- `onCandidateSearch()`: if `candidateSearch.length >= 2`, call `projectService.searchCandidates(projectId, candidateSearch)`. Otherwise clear candidates.
- `selectCandidate(candidate)`: set `selectedCandidate`.
- `onAddMember()`: call `projectService.upsertMember()` with `selectedCandidate.id` and `selectedAddRole`. Success: close dialog, growl, reload. Error: inline message.
- `resetAddForm()`: clear all add dialog state.

### Template (`members.component.html`)

- Add `<eui-dialog #addDialog>` after the change role dialog.
- Search input with `euiInputText`, label, and `(input)` event.
- Candidate results displayed as a `<ul role="listbox">` with `<li role="option">` items.
- Selected candidate display.
- Role `<select euiSelect>`.
- Error `<eui-feedback-message euiDanger>`.

### Tests (`members.component.spec.ts`)

- Test `openAddDialog()` resets form.
- Test `onCandidateSearch()` calls `searchCandidates` when >= 2 chars.
- Test `onCandidateSearch()` clears candidates when < 2 chars.
- Test `selectCandidate()` sets selected candidate.
- Test `onAddMember()` success: calls upsertMember, growl, reloads.
- Test `onAddMember()` error: sets addError.
- Test `resetAddForm()` clears state.

## Acceptance Criteria

- [ ] Candidate search works (min 2 characters)
- [ ] Existing members excluded from results (server-side)
- [ ] Selecting a candidate displays their name
- [ ] Role selection among 5 project roles
- [ ] Successful add: closes dialog, growl success, reloads members
- [ ] Error: inline message in dialog
- [ ] Form reset on close/dismiss
- [ ] Accessibility: labels, aria-required, listbox roles, keyboard navigation
- [ ] Unit tests pass
- [ ] Build passes
