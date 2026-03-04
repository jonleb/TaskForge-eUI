# STORY-002 — Reactive Forms Migration + eui-fieldset Structure

## Scope

Replace the current `<dl>`-based layout and `ngModel` bindings with:
1. `ReactiveFormsModule` with `FormGroup` containing all editable fields
2. Three `eui-fieldset` sections: Ticket Information, Description, Additional Information
3. `euiInputGroup` + `euiInputGroupAddOn` pattern for each field
4. `row` / `col-md-*` grid layout for multi-column fields
5. `[readonly]` binding controlled by `isEditActive`

## Current State

- `FormsModule` with `[(ngModel)]` on individual edit fields (`editTitle`, `editStatus`, etc.)
- `<dl>` with `<dt>`/`<dd>` pairs
- Chips row for type/status/priority
- Per-field edit icons

## Target State

### FormGroup Definition (TS)

```typescript
ticketForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    status: new FormControl<WorkflowStatus>('TO_DO'),
    priority: new FormControl<TicketPriority>('MEDIUM'),
    assignee_id: new FormControl<string | null>(null),
    description: new FormControl('', [Validators.maxLength(2000)]),
    epic_id: new FormControl<string | null>(null),
});
```

### Template Structure

```
eui-fieldset "Ticket information" (icon: note-pencil:regular, isExpandable, isExpanded=true)
├── row > col-md-6: Title (euiInputGroup + input euiInputText)
├── row > col-md-6: Type (euiInputGroup + select euiSelect, always readonly)
├── row > col-md-6: Status (euiInputGroup + select euiSelect)
└── row > col-md-6: Priority (euiInputGroup + select euiSelect)
    row > col-md-6: Assignee (euiInputGroup + select euiSelect)

eui-fieldset "Description" (icon: eui-edit, isExpandable, isExpanded=true)
└── textarea euiTextArea formControlName="description"

eui-fieldset "Additional information" (icon: eui-ellipsis-horizontal, isExpandable, isExpanded=true)
├── row > col-md-6: Epic (euiInputGroup + select euiSelect)
├── row > col-md-6: Created by (euiInputGroup + input euiInputText, always readonly)
└── row > col-md-6: Created at (euiInputGroup + input euiInputText, always readonly)
```

## Imports to Add

- `ReactiveFormsModule` from `@angular/forms`
- `EUI_FIELDSET` from `@eui/components/eui-fieldset`
- `EUI_INPUT_GROUP` from `@eui/components/eui-input-group`

## Imports to Remove

- `FormsModule` (replaced by `ReactiveFormsModule`)
- `EUI_CHIP` (no longer used for field display)

## TypeScript Changes

- Add `FormGroup` with `FormControl` for each editable field
- Add `patchFormFromTicket()` method to populate form from ticket data
- Modify `saveChanges()` to read from `ticketForm.value` instead of individual edit fields
- Remove individual edit fields: `editTitle`, `editDescription`, `editStatus`, `editPriority`, `editAssigneeId`, `editEpicId`
- Remove `syncEditFields()` — replaced by `patchFormFromTicket()`
- Type field is NOT in the form (always read-only, displayed as plain text or readonly select)

## Accessibility

- Every input has `<label euiLabel for="..." euiRequired>` with matching `id`
- Required fields: title (required, minLength 2)
- `aria-describedby` on inputs pointing to validation error messages
- `eui-feedback-message euiDanger` for validation errors
- `eui-fieldset` provides semantic `<fieldset>` + `<legend>`

## Tests

- Form initializes with ticket data
- Title validation: required, minLength 2, maxLength 200
- Status select shows workflow-allowed transitions
- Save reads from form values
- Readonly state when isEditActive is false
- Fieldset sections render with correct labels
- Validation errors display for invalid title
