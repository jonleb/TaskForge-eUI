# STORY-005: Frontend — Create Ticket Dialog

## Goal

Add a "Create Ticket" dialog to the Backlog page with type, title, description, priority, assignee, and epic fields. The dialog is role-gated: only non-VIEWER project members (and SUPER_ADMIN) see the "Create Ticket" button.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — Backlog page from STORY-004 with `canCreate` flag.
- `src/app/features/projects/members/members.component.ts` — reference for dialog pattern: `@ViewChild`, `openDialog()`, `cdr.detectChanges()`, `FormsModule` + `ngModel`, `EuiGrowlService`.
- `src/app/core/project/project.service.ts` — `createTicket(projectId, payload)`, `getEpics(projectId)`, `getProjectMembers(projectId)`.
- `src/app/core/project/project.models.ts` — `CreateTicketPayload`, `CREATABLE_TICKET_TYPES`, `TICKET_PRIORITIES`, `BacklogItem`, `ProjectMember`.
- eUI pitfalls: `eui-dialog` captures `[acceptLabel]` at overlay creation time → set properties before `openDialog()` + `cdr.detectChanges()`. Place action buttons in `<eui-page-header-action-items>`.

## Implementation Plan

### 1. Update `BacklogComponent` with dialog

**New properties:**

```typescript
// Dialog state
@ViewChild('createDialog') createDialog!: EuiDialogComponent;

// Form fields
newTicketType: TicketType = 'STORY';
newTicketTitle = '';
newTicketDescription = '';
newTicketPriority: TicketPriority = 'MEDIUM';
newTicketAssigneeId: string | null = null;
newTicketEpicId: string | null = null;

// Dropdown data
creatableTypes = CREATABLE_TICKET_TYPES;
priorities = TICKET_PRIORITIES;
epics: BacklogItem[] = [];
members: ProjectMember[] = [];

// Dialog error state
createError = '';
isCreating = false;
```

**New methods:**

```typescript
openCreateDialog(): void {
    this.resetCreateForm();
    this.loadDialogData();
    this.cdr.detectChanges();
    this.createDialog.openDialog();
}

loadDialogData(): void {
    // Load epics and members for dropdowns (if not already loaded)
    // epics = getEpics(projectId)
    // members = getProjectMembers(projectId) — already loaded for assignee resolution
}

onCreateTicket(): void {
    // Validate required fields (title, type, priority)
    // Build CreateTicketPayload
    // Call createTicket()
    // On success: close dialog, growl, reload backlog
    // On error: show inline error via eui-feedback-message
}

resetCreateForm(): void {
    this.newTicketType = 'STORY';
    this.newTicketTitle = '';
    this.newTicketDescription = '';
    this.newTicketPriority = 'MEDIUM';
    this.newTicketAssigneeId = null;
    this.newTicketEpicId = null;
    this.createError = '';
    this.isCreating = false;
}

isCreateFormValid(): boolean {
    return this.newTicketTitle.trim().length >= 2
        && this.newTicketTitle.trim().length <= 200;
}
```

### 2. Template additions

**"Create Ticket" button in page header (visible only when `canCreate`):**

```html
<eui-page-header [label]="'backlog.page-title' | translate">
    @if (canCreate) {
        <eui-page-header-action-items>
            <button euiButton euiPrimary
                    (click)="openCreateDialog()"
                    aria-haspopup="dialog">
                {{ 'backlog.create-btn' | translate }}
            </button>
        </eui-page-header-action-items>
    }
</eui-page-header>
```

**Dialog template:**

```html
<eui-dialog #createDialog
    [title]="'backlog.dialog.create-title' | translate"
    [acceptLabel]="'common.create' | translate"
    [dismissLabel]="'common.cancel' | translate"
    (accept)="onCreateTicket()"
    (dismiss)="resetCreateForm()">

    @if (createError) {
        <eui-feedback-message euiDanger aria-live="polite">
            {{ createError }}
        </eui-feedback-message>
    }

    <!-- Type -->
    <label euiLabel for="ticket-type" euiRequired>{{ 'ticket.field.type' | translate }}</label>
    <select euiSelect id="ticket-type" [(ngModel)]="newTicketType" aria-required="true">
        @for (t of creatableTypes; track t) {
            <option [ngValue]="t">{{ 'workflow.ticket-type.' + t | translate }}</option>
        }
    </select>

    <!-- Title -->
    <label euiLabel for="ticket-title" euiRequired>{{ 'ticket.field.title' | translate }}</label>
    <input euiInputText id="ticket-title" [(ngModel)]="newTicketTitle"
           [attr.aria-required]="true"
           [attr.aria-describedby]="newTicketTitle.trim().length > 0 && newTicketTitle.trim().length < 2 ? 'title-error' : null"
           maxlength="200" />
    @if (newTicketTitle.trim().length > 0 && newTicketTitle.trim().length < 2) {
        <span id="title-error" class="eui-u-c-danger">
            {{ 'common.validation.min-length' | translate:{ field: ('ticket.field.title' | translate), min: 2 } }}
        </span>
    }

    <!-- Description -->
    <label euiLabel for="ticket-description">{{ 'ticket.field.description' | translate }}</label>
    <textarea euiTextArea id="ticket-description" [(ngModel)]="newTicketDescription"
              [euiMaxlength]="2000"></textarea>

    <!-- Priority -->
    <label euiLabel for="ticket-priority" euiRequired>{{ 'ticket.priority.label' | translate }}</label>
    <select euiSelect id="ticket-priority" [(ngModel)]="newTicketPriority" aria-required="true">
        @for (p of priorities; track p) {
            <option [ngValue]="p">{{ 'ticket.priority.' + p | translate }}</option>
        }
    </select>

    <!-- Assignee (optional) -->
    <label euiLabel for="ticket-assignee">{{ 'ticket.field.assignee' | translate }}</label>
    <select euiSelect id="ticket-assignee" [(ngModel)]="newTicketAssigneeId">
        <option [ngValue]="null">—</option>
        @for (m of members; track m.userId) {
            <option [ngValue]="m.userId">{{ m.firstName }} {{ m.lastName }}</option>
        }
    </select>

    <!-- Epic (optional) -->
    <label euiLabel for="ticket-epic">{{ 'ticket.field.epic' | translate }}</label>
    <select euiSelect id="ticket-epic" [(ngModel)]="newTicketEpicId">
        <option [ngValue]="null">—</option>
        @for (e of epics; track e.id) {
            <option [ngValue]="e.id">{{ e.title }}</option>
        }
    </select>
</eui-dialog>
```

### 3. Module imports to add

```typescript
imports: [
    // existing...
    ...EUI_DIALOG,
    EuiInputTextDirective,
    EuiTextareaComponent,
    EuiSelectDirective,
    EuiLabelDirective,
    EuiMaxLengthDirective,
    FormsModule,
]
```

### 4. `canCreate` determination

In `ngOnInit`, after loading the project:

```typescript
// SUPER_ADMIN can always create
if (this.permissionService.isSuperAdmin()) {
    this.canCreate = true;
} else {
    // Check project role — VIEWER cannot create
    this.permissionService.hasProjectRole(project.id, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER')
        .subscribe(can => {
            this.canCreate = can;
            this.cdr.markForCheck();
        });
}
```

### 5. Add i18n keys

**en.json:**
```json
"backlog.create-btn": "Create Ticket",
"backlog.dialog.create-title": "Create Ticket",
"backlog.growl.created-summary": "Ticket created",
"backlog.growl.created-detail": "{{key}}-{{number}} {{title}} has been created.",
"backlog.growl.create-failed-summary": "Creation failed",
"backlog.growl.create-failed-detail": "Could not create ticket. Please try again.",
"backlog.error.create-default": "An error occurred while creating the ticket."
```

**fr.json:**
```json
"backlog.create-btn": "Créer un ticket",
"backlog.dialog.create-title": "Créer un ticket",
"backlog.growl.created-summary": "Ticket créé",
"backlog.growl.created-detail": "{{key}}-{{number}} {{title}} a été créé.",
"backlog.growl.create-failed-summary": "Échec de la création",
"backlog.growl.create-failed-detail": "Impossible de créer le ticket. Veuillez réessayer.",
"backlog.error.create-default": "Une erreur est survenue lors de la création du ticket."
```

### 6. Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | Should show "Create Ticket" button when canCreate is true | Button visible |
| 2 | Should hide "Create Ticket" button when canCreate is false | Button not in DOM |
| 3 | Should open dialog on button click | Dialog opened |
| 4 | Should populate type dropdown with STORY, BUG, TASK (no EPIC) | 3 options |
| 5 | Should populate priority dropdown with 4 values | 4 options |
| 6 | Should populate assignee dropdown from project members | Members listed |
| 7 | Should populate epic dropdown from project epics | Epics listed |
| 8 | Should default type to STORY and priority to MEDIUM | Defaults set |
| 9 | Should disable accept when title is empty | Form invalid |
| 10 | Should disable accept when title is 1 char | Form invalid |
| 11 | Should call createTicket on accept with correct payload | Service called |
| 12 | Should show growl on success and reload backlog | Growl + reload |
| 13 | Should show inline error on failure | Error message visible |
| 14 | Should reset form on dismiss | Fields cleared |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add dialog logic, form state, canCreate |
| `src/app/features/projects/backlog/backlog.component.html` | Add create button + dialog template |
| `src/app/features/projects/backlog/backlog.component.scss` | Dialog form spacing |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add 14 unit tests |
| `src/assets/i18n/en.json` | Add 7 i18n keys |
| `src/assets/i18n/fr.json` | Add 7 i18n keys |

## Acceptance Criteria

- [ ] "Create Ticket" button visible only for non-VIEWER members and SUPER_ADMIN
- [ ] Button placed in `<eui-page-header-action-items>` (not in page content)
- [ ] Dialog opens with type (STORY/BUG/TASK), title, description, priority, assignee, epic fields
- [ ] Type defaults to STORY, priority defaults to MEDIUM
- [ ] EPIC is not in the type dropdown
- [ ] Title is required (min 2 chars, max 200 chars) with inline validation
- [ ] Description is optional with 2000 char max length indicator
- [ ] Assignee dropdown populated from project members (optional, "—" default)
- [ ] Epic dropdown populated from project epics (optional, "—" default)
- [ ] On success: dialog closes, growl notification, backlog reloads
- [ ] On error: inline `eui-feedback-message` with `aria-live="polite"`
- [ ] Form resets on dismiss
- [ ] All form inputs have `<label>` with `for`/`id` pairs
- [ ] Required fields marked with `euiRequired` / `aria-required`
- [ ] All unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
