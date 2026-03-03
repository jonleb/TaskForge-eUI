# STORY-005: Frontend — Create Ticket Dialog

## Objective

Add a "Create Ticket" button in the page header and a dialog that allows creating a ticket from the global Tickets page. The dialog includes a mandatory Project selector that drives the Assignee and Epic dropdowns. The button is visible only to users who have create permission on at least one project.

## Existing Code (reference)

- `src/app/features/projects/backlog/backlog.component.ts` — `openCreateDialog()`, `onCreateTicket()`, `resetCreateForm()`, `isCreateFormValid()`, `loadDialogData()`. The backlog dialog has Type, Title, Description, Priority, Assignee, Epic fields. The Tickets page dialog adds a mandatory Project field at the top.
- `src/app/features/projects/backlog/backlog.component.html` — `<eui-dialog #createDialog>` template with form fields.
- `src/app/core/project/project.service.ts` — `createTicket(projectId, payload)`, `getProjectMembers(projectId)`, `getEpics(projectId)`.
- `src/app/core/tickets/tickets.service.ts` (from STORY-002) — `getUserProjects()`.
- `src/app/core/auth/permission.service.ts` — `isSuperAdmin()`, `hasProjectRole()`.

## Implementation Plan

### 1. Update `src/app/features/tickets/tickets.component.ts`

**New properties:**
```typescript
@ViewChild('createDialog') createDialog!: EuiDialogComponent;

// Create permission
canCreate = false;
creatableProjects: Project[] = [];     // projects where user can create tickets

// Dialog form state
selectedCreateProjectId: string | null = null;
newTicketType: TicketType = 'STORY';
newTicketTitle = '';
newTicketDescription = '';
newTicketPriority: TicketPriority = 'MEDIUM';
newTicketAssigneeId: string | null = null;
newTicketEpicId: string | null = null;
creatableTypes = CREATABLE_TICKET_TYPES;
dialogMembers: ProjectMember[] = [];
dialogEpics: BacklogItem[] = [];
createError = '';
isCreating = false;
```

**New methods:**

- `determineCanCreate()` — called on init after `getUserProjects()` resolves. For SUPER_ADMIN: `canCreate = true`, `creatableProjects = userProjects`. For regular users: check `hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER')` for each project. Collect projects where user can create. Set `canCreate = creatableProjects.length > 0`.
  - Optimization: since `getUserProjects()` already returns only member projects, and the membership itself implies at least VIEWER role, we can check if the user has any non-VIEWER role. But the safest approach is to use `hasProjectRole()` per project. For a small number of projects this is acceptable.
  - Alternative simpler approach: since the backend will reject unauthorized creates anyway, we can show the button to all users who have at least one project, and let the Project dropdown in the dialog only list projects where the user has create permission. This avoids N API calls on page load.

- `openCreateDialog()` — reset form, set `creatableProjects`, call `cdr.detectChanges()`, open dialog.
- `onCreateProjectChange()` — when the Project select changes in the dialog, load members and epics for the selected project via `projectService.getProjectMembers()` and `projectService.getEpics()`. Clear assignee and epic selections.
- `onCreateTicket()` — validate form (project required, title 2–200 chars), call `projectService.createTicket(selectedCreateProjectId, payload)`. On success: close dialog, success growl (include project key + ticket number), reload tickets. On error: inline error message.
- `resetCreateForm()` — clear all dialog form state.
- `isCreateFormValid()` — `selectedCreateProjectId !== null && title.trim().length >= 2 && title.trim().length <= 200`.

### 2. Update `src/app/features/tickets/tickets.component.html`

Add Create button in page header:
```html
<eui-page-header [label]="'tickets.page-title' | translate">
    @if (canCreate) {
        <eui-page-header-action-items>
            <button euiButton euiPrimary
                    (click)="openCreateDialog()"
                    aria-haspopup="dialog">
                {{ 'tickets.create-btn' | translate }}
            </button>
        </eui-page-header-action-items>
    }
</eui-page-header>
```

Add dialog template:
```html
<eui-dialog #createDialog
    [title]="'tickets.dialog.create-title' | translate"
    [acceptLabel]="'common.create' | translate"
    [dismissLabel]="'common.cancel' | translate"
    [isHandleCloseOnAccept]="true"
    (accept)="onCreateTicket()"
    (dismiss)="resetCreateForm()">

    @if (createError) {
        <eui-feedback-message euiDanger aria-live="polite">{{ createError }}</eui-feedback-message>
    }

    <div class="dialog-form">
        <!-- Project (required) -->
        <label euiLabel for="create-project" euiRequired>{{ 'tickets.dialog.project' | translate }}</label>
        <select euiSelect id="create-project"
                [(ngModel)]="selectedCreateProjectId"
                (change)="onCreateProjectChange()"
                aria-required="true">
            <option [ngValue]="null" disabled>{{ 'tickets.dialog.select-project' | translate }}</option>
            @for (p of creatableProjects; track p.id) {
                <option [ngValue]="p.id">{{ p.name }}</option>
            }
        </select>

        <!-- Type (required) -->
        <label euiLabel for="create-type" euiRequired>{{ 'ticket.field.type' | translate }}</label>
        <select euiSelect id="create-type" [(ngModel)]="newTicketType" aria-required="true">
            @for (t of creatableTypes; track t) {
                <option [ngValue]="t">{{ 'workflow.ticket-type.' + t | translate }}</option>
            }
        </select>

        <!-- Title (required, 2-200 chars) -->
        <label euiLabel for="create-title" euiRequired>{{ 'ticket.field.title' | translate }}</label>
        <input euiInputText id="create-title" [(ngModel)]="newTicketTitle"
               aria-required="true"
               [attr.aria-describedby]="newTicketTitle.trim().length > 0 && newTicketTitle.trim().length < 2 ? 'create-title-error' : null"
               maxlength="200" />
        @if (newTicketTitle.trim().length > 0 && newTicketTitle.trim().length < 2) {
            <span id="create-title-error" class="eui-u-c-danger">
                {{ 'common.validation.min-length' | translate:{ field: ('ticket.field.title' | translate), min: 2 } }}
            </span>
        }

        <!-- Description (optional) -->
        <label euiLabel for="create-description">{{ 'ticket.field.description' | translate }}</label>
        <textarea euiTextArea id="create-description" [(ngModel)]="newTicketDescription" maxlength="2000"></textarea>

        <!-- Priority (required) -->
        <label euiLabel for="create-priority" euiRequired>{{ 'ticket.priority.label' | translate }}</label>
        <select euiSelect id="create-priority" [(ngModel)]="newTicketPriority" aria-required="true">
            @for (p of priorities; track p) {
                <option [ngValue]="p">{{ 'ticket.priority.' + p | translate }}</option>
            }
        </select>

        <!-- Assignee (optional, loaded per project) -->
        <label euiLabel for="create-assignee">{{ 'ticket.field.assignee' | translate }}</label>
        <select euiSelect id="create-assignee" [(ngModel)]="newTicketAssigneeId"
                [disabled]="!selectedCreateProjectId">
            <option [ngValue]="null">—</option>
            @for (m of dialogMembers; track m.userId) {
                <option [ngValue]="m.userId">{{ m.firstName }} {{ m.lastName }}</option>
            }
        </select>

        <!-- Epic (optional, loaded per project) -->
        <label euiLabel for="create-epic">{{ 'ticket.field.epic' | translate }}</label>
        <select euiSelect id="create-epic" [(ngModel)]="newTicketEpicId"
                [disabled]="!selectedCreateProjectId">
            <option [ngValue]="null">—</option>
            @for (e of dialogEpics; track e.id) {
                <option [ngValue]="e.id">{{ e.title }}</option>
            }
        </select>
    </div>
</eui-dialog>
```

### 3. Unit tests: update `tickets.component.spec.ts`

Add ~15 tests for create dialog:

| # | Test | Expected |
|---|------|----------|
| 1 | Create button visible when `canCreate` is true | Button rendered |
| 2 | Create button hidden when `canCreate` is false | Button not rendered |
| 3 | Create button has `aria-haspopup="dialog"` | Attribute present |
| 4 | Dialog opens on button click | `openDialog()` called |
| 5 | Project select populated with creatable projects | Options rendered |
| 6 | Changing project loads members | `getProjectMembers()` called |
| 7 | Changing project loads epics | `getEpics()` called |
| 8 | Changing project clears assignee and epic | Selections reset |
| 9 | Assignee select disabled when no project | `disabled` attribute |
| 10 | Epic select disabled when no project | `disabled` attribute |
| 11 | Title validation: too short shows error | Error span visible |
| 12 | Title validation: valid hides error | Error span hidden |
| 13 | Successful create: closes dialog, growl, reloads | All 3 actions |
| 14 | Create error: inline message shown | Error message visible |
| 15 | Form resets on dismiss | All fields cleared |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/tickets/tickets.component.ts` | Add create dialog state, methods |
| `src/app/features/tickets/tickets.component.html` | Add Create button + dialog template |
| `src/app/features/tickets/tickets.component.spec.ts` | Add ~15 create dialog tests |

## eUI Pitfalls Applied

- Create button in `<eui-page-header-action-items>` (not in `<eui-page-content>`).
- `<eui-page-header>` uses open/close tags (not self-closing) for content projection.
- `[isHandleCloseOnAccept]="true"` — close manually after API success.
- `cdr.detectChanges()` before `openDialog()` to ensure `[acceptLabel]` is captured correctly.

## Accessibility Checklist

- [x] Create button has `aria-haspopup="dialog"`
- [x] All form inputs have `<label>` with `for`/`id` pairs
- [x] Required fields have `euiRequired` directive and `aria-required="true"`
- [x] Title validation error linked via `aria-describedby`
- [x] Error feedback has `aria-live="polite"`
- [x] Disabled selects have `disabled` attribute (not just visual)
- [x] Dialog has title, accept/dismiss buttons (keyboard accessible)

## Acceptance Criteria

- [ ] "Create Ticket" button visible in page header for authorized users
- [ ] Button hidden for users with no create permission
- [ ] Dialog has mandatory Project select
- [ ] Changing project reloads Assignee and Epic dropdowns
- [ ] Assignee and Epic disabled when no project selected
- [ ] Type, Title, Description, Priority fields match backlog dialog
- [ ] Title validation: 2–200 chars, inline error with `aria-describedby`
- [ ] Successful creation: close dialog, success growl, reload ticket list
- [ ] Error: inline message in dialog
- [ ] Form resets on dismiss
- [ ] All a11y criteria met
- [ ] Unit tests pass (~15 new tests)
- [ ] Build passes
