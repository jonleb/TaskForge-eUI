# STORY-003 — Quick-Edit Modal on Issue Click

## Objective

When a user clicks an issue row in the inline sprint issue list, open an `eui-dialog` modal with the ticket's editable fields pre-populated. Save changes via the existing PATCH endpoint without navigating away from the sprint list page.

## Prerequisites

- STORY-001 (inline issue list) must be completed first — provides the clickable issue rows.

## Changes

### Template (`sprints.component.html`)

Add click handler on each issue `<li>` (from STORY-001):

```html
<li class="sprint-issue-item"
    tabindex="0"
    [attr.aria-label]="'#' + item.ticket_number + ' — ' + item.title"
    (click)="openEditDialog(item, sprint); $event.stopPropagation()"
    (keydown.enter)="openEditDialog(item, sprint); $event.stopPropagation()">
```

Add the edit dialog at the bottom of the template:

```html
<eui-dialog #editDialog
    [title]="editDialogTitle"
    [acceptLabel]="'common.save' | translate"
    [dismissLabel]="'common.cancel' | translate"
    [isHandleCloseOnAccept]="false"
    (accept)="onSaveEdit()"
    (dismiss)="resetEditForm()">

    <div euiInputGroup>
        <label euiLabel for="editTitleInput" euiRequired>{{ 'ticket.field.title' | translate }}</label>
        <input euiInputText id="editTitleInput"
               [(ngModel)]="editForm.title"
               aria-required="true"
               maxlength="200" />
    </div>

    <div euiInputGroup>
        <label euiLabel for="editDescriptionInput">{{ 'ticket.field.description' | translate }}</label>
        <textarea euiTextArea id="editDescriptionInput"
                  [(ngModel)]="editForm.description"
                  maxlength="2000"
                  rows="4"></textarea>
    </div>

    <div euiInputGroup>
        <label euiLabel for="editStatusSelect" euiRequired>{{ 'ticket.field.status' | translate }}</label>
        <eui-select id="editStatusSelect"
                    [(ngModel)]="editForm.status"
                    aria-required="true">
            @for (s of workflowStatuses; track s) {
                <eui-option [value]="s">{{ s }}</eui-option>
            }
        </eui-select>
    </div>

    <div euiInputGroup>
        <label euiLabel for="editPrioritySelect">{{ 'ticket.field.priority' | translate }}</label>
        <eui-select id="editPrioritySelect"
                    [(ngModel)]="editForm.priority">
            <eui-option [value]="null">—</eui-option>
            @for (p of priorities; track p) {
                <eui-option [value]="p">{{ p }}</eui-option>
            }
        </eui-select>
    </div>

    <div euiInputGroup>
        <label euiLabel for="editAssigneeSelect">{{ 'ticket.field.assignee' | translate }}</label>
        <eui-select id="editAssigneeSelect"
                    [(ngModel)]="editForm.assignee_id">
            <eui-option [value]="null">{{ 'ticket.unassigned' | translate }}</eui-option>
            @for (member of projectMembers; track member.userId) {
                <eui-option [value]="member.userId">{{ member.firstName }} {{ member.lastName }}</eui-option>
            }
        </eui-select>
    </div>

    @if (editError) {
        <eui-feedback-message euiDanger aria-live="assertive">{{ editError }}</eui-feedback-message>
    }
</eui-dialog>
```

### Component (`sprints.component.ts`)

New imports:
```typescript
import { EUI_SELECT } from '@eui/components/eui-select';
import { WORKFLOW_STATUSES, TICKET_PRIORITIES, WorkflowStatus, TicketPriority, ProjectMember, UpdateTicketPayload } from '../../../core/project';
```

Add to component `imports` array: `...EUI_SELECT`.

New state:
```typescript
@ViewChild('editDialog') editDialog!: EuiDialogComponent;

editingItem: BacklogItem | null = null;
editDialogTitle = '';
editError = '';
projectMembers: ProjectMember[] = [];
workflowStatuses = WORKFLOW_STATUSES;
priorities = TICKET_PRIORITIES;

editForm = {
    title: '',
    description: '',
    status: '' as WorkflowStatus,
    priority: null as TicketPriority | null,
    assignee_id: null as string | null,
};
```

New methods:
```typescript
openEditDialog(item: BacklogItem, sprint: Sprint): void {
    this.editingItem = item;
    this.editDialogTitle = this.translate.instant('sprint.dialog.edit-title', {
        ticket: '#' + item.ticket_number,
        title: item.title,
    });
    this.editForm = {
        title: item.title,
        description: item.description,
        status: item.status,
        priority: item.priority,
        assignee_id: item.assignee_id,
    };
    this.editError = '';
    this.cdr.detectChanges(); // eui-dialog captures labels at open time
    this.editDialog.openDialog();
}

onSaveEdit(): void {
    if (!this.project || !this.editingItem || !this.editForm.title.trim()) return;

    const payload: UpdateTicketPayload = {
        title: this.editForm.title.trim(),
        description: this.editForm.description,
        status: this.editForm.status,
        priority: this.editForm.priority,
        assignee_id: this.editForm.assignee_id,
    };

    this.projectService.updateTicket(this.project.id, this.editingItem.ticket_number, payload).pipe(
        takeUntil(this.destroy$),
    ).subscribe({
        next: () => {
            this.editDialog.closeDialog();
            this.growlService.growl({
                severity: 'success',
                summary: this.translate.instant('sprint.growl.edit-success'),
                detail: this.translate.instant('sprint.growl.edit-detail', {
                    ticket: '#' + this.editingItem!.ticket_number,
                }),
            });
            this.resetEditForm();
            this.loadSprints(this.project!.id);
        },
        error: () => {
            this.editError = this.translate.instant('sprint.growl.edit-error');
            this.cdr.markForCheck();
        },
    });
}

resetEditForm(): void {
    this.editingItem = null;
    this.editDialogTitle = '';
    this.editError = '';
}
```

Load project members on init (needed for assignee dropdown):
```typescript
// In the project subscription, after determineCanManage:
this.loadProjectMembers(project.id);

private loadProjectMembers(projectId: string): void {
    this.projectService.getProjectMembers(projectId).pipe(
        takeUntil(this.destroy$),
    ).subscribe(members => {
        this.projectMembers = members;
        this.cdr.markForCheck();
    });
}
```

### i18n

**en.json**:
```json
"sprint.dialog.edit-title": "Edit {{ticket}} — {{title}}",
"sprint.growl.edit-success": "Ticket updated",
"sprint.growl.edit-detail": "{{ticket}} saved successfully",
"sprint.growl.edit-error": "Failed to save changes"
```

**fr.json**:
```json
"sprint.dialog.edit-title": "Modifier {{ticket}} — {{title}}",
"sprint.growl.edit-success": "Ticket mis à jour",
"sprint.growl.edit-detail": "{{ticket}} enregistré avec succès",
"sprint.growl.edit-error": "Échec de la sauvegarde"
```

## Accessibility

- `eui-dialog` traps focus while open (built-in behaviour).
- All form inputs have associated `<label>` with `euiLabel` directive and matching `for`/`id` pairs.
- Required fields use `euiRequired` and `aria-required="true"`.
- Validation error announced via `aria-live="assertive"`.
- Dialog title includes ticket number for screen reader context.
- `cdr.detectChanges()` called before `openDialog()` to ensure `[acceptLabel]` and `[title]` are captured correctly (eui-dialog pitfall).
- `$event.stopPropagation()` on issue click prevents the parent sprint item's navigation handler from firing.
- On dialog close, focus returns to the triggering element (eui-dialog default behaviour).

## Unit Tests

- `openEditDialog` populates `editForm` with item data.
- `onSaveEdit` calls `updateTicket` with correct payload.
- Success growl shown on save.
- Error message displayed on save failure.
- `resetEditForm` clears state.
- Dialog title includes ticket number and title.
- Edit dialog renders all form fields (title, description, status, priority, assignee).
- Project members loaded for assignee dropdown.
