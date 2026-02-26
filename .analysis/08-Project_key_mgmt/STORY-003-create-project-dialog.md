# STORY-003: Frontend — Create Project Dialog

## Goal

Create a dialog for project creation, embedded in the `PortfolioComponent` using the template-ref `eui-dialog` pattern. The dialog contains a reactive form with name (required), key (optional, auto-generated if omitted), and description (optional). Only `SUPER_ADMIN` users see the "Create Project" button.

## Prerequisites

- STORY-001 complete — `POST /api/projects` endpoint available
- STORY-002 complete — `ProjectService.createProject()` and `CreateProjectPayload` available
- `PermissionService.isSuperAdmin()` available
- `EuiDialogComponent` template-ref pattern established in admin users feature

## Design Decision: Inline Dialog in PortfolioComponent

Use template-ref `<eui-dialog>` directly in `PortfolioComponent` rather than a separate component. Reasons:
- The form is small (3 fields) — no need for a separate component
- The dialog needs to call `loadProjects()` on success and navigate, which is easier from the same component
- Matches the pattern used in `UsersComponent` for the create user dialog
- Avoids `EuiDialogService` config boilerplate

> Note: This story merges STORY-003 and STORY-004 from the stories file since the dialog and the button/navigation are tightly coupled and simpler to implement together.

## eUI Components & Imports

| Component / Directive | Import | Purpose |
|----------------------|--------|---------|
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Create project form dialog |
| `input[euiInputText]` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Name and key inputs |
| `textarea[euiTextArea]` | `EuiTextareaComponent` from `@eui/components/eui-textarea` | Description field |
| `label[euiLabel]` | `EUI_LABEL` from `@eui/components/eui-label` | Form labels |
| `div[euiInputGroup]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Form field grouping |
| `eui-feedback-message` | `EUI_FEEDBACK_MESSAGE` from `@eui/components/eui-feedback-message` | Inline validation / 409 error |
| `eui-helper-text` | `EuiHelperTextComponent` from `@eui/components/eui-helper-text` | Key field hint |
| `button[euiButton]` | `EUI_BUTTON` from `@eui/components/eui-button` | "Create Project" trigger button |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

## Implementation Plan

### 1. Update `PortfolioComponent` class (`portfolio.component.ts`)

Add imports and inject services:

```typescript
import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiHelperTextComponent } from '@eui/components/eui-helper-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { PermissionService } from '../../../core/auth';
```

Add to component:

```typescript
private readonly permissionService = inject(PermissionService);
private readonly fb = inject(FormBuilder);

@ViewChild('createDialog') createDialog!: EuiDialogComponent;

isSuperAdmin = false;

createForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    key: [''],
    description: [''],
});

createError = '';
```

Add key format validator (custom or pattern):
- Key field: optional, but if provided must match `^[A-Z0-9]{2,10}$`
- Auto-uppercase on input via `(input)` event handler

```typescript
onKeyInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    this.createForm.get('key')?.setValue(input.value, { emitEvent: false });
}
```

Key validation: use a conditional validator — only validate format if the field is non-empty:

```typescript
keyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null; // optional
    return /^[A-Z0-9]{2,10}$/.test(value) ? null : { keyFormat: true };
}
```

Set `isSuperAdmin` in `ngOnInit()`:

```typescript
this.isSuperAdmin = this.permissionService.isSuperAdmin();
```

Add create method:

```typescript
onCreateProject(): void {
    if (this.createForm.invalid) {
        this.createForm.markAllAsTouched();
        return;
    }

    this.createError = '';
    const payload: CreateProjectPayload = {
        name: this.createForm.get('name')?.value.trim(),
        description: this.createForm.get('description')?.value?.trim() || undefined,
        key: this.createForm.get('key')?.value || undefined,
    };

    this.projectService.createProject(payload).subscribe({
        next: project => {
            this.createDialog.closeDialog();
            this.resetCreateForm();
            this.growlService.growl({
                severity: 'success',
                summary: 'Project created',
                detail: `${project.name} (${project.key}) has been created.`,
            });
            this.router.navigate(['screen/projects', project.id]);
        },
        error: err => {
            if (err.status === 409) {
                this.createError = err.error?.message || 'A project with this name or key already exists';
            } else {
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Creation failed',
                    detail: err.error?.message || 'Could not create project. Please try again.',
                });
            }
            this.cdr.markForCheck();
        },
    });
}

resetCreateForm(): void {
    this.createForm.reset();
    this.createError = '';
}
```

### 2. Update template (`portfolio.component.html`)

Add "Create Project" button (visible only to SUPER_ADMIN) between page header and the count text:

```html
@if (isSuperAdmin) {
    <button euiButton euiPrimary
            type="button"
            aria-haspopup="dialog"
            (click)="createDialog.openDialog()"
            class="eui-u-mb-m">
        Create Project
    </button>
}
```

Add the create project dialog at the end of the template:

```html
<eui-dialog #createDialog
    [title]="'Create Project'"
    [acceptLabel]="'Create'"
    [width]="'500px'"
    [isHandleCloseOnAccept]="true"
    (accept)="onCreateProject()"
    (dismiss)="resetCreateForm()">

    <form [formGroup]="createForm" id="create-project-form">
        @if (createError) {
            <eui-feedback-message euiDanger class="eui-u-mb-m"
                                  aria-live="polite">
                {{ createError }}
            </eui-feedback-message>
        }

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cp-name">Name</label>
            <input euiInputText id="cp-name" formControlName="name"
                   aria-required="true"
                   [attr.aria-describedby]="createForm.get('name')?.invalid && createForm.get('name')?.touched ? 'cp-name-err' : null" />
            @if (createForm.get('name')?.invalid && createForm.get('name')?.touched) {
                <eui-feedback-message euiDanger id="cp-name-err">
                    @if (createForm.get('name')?.errors?.['required']) {
                        Project name is required
                    } @else {
                        Name must be at least 2 characters
                    }
                </eui-feedback-message>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel for="cp-key">Key</label>
            <input euiInputText id="cp-key" formControlName="key"
                   maxlength="10"
                   (input)="onKeyInput($event)"
                   [attr.aria-describedby]="(createForm.get('key')?.invalid && createForm.get('key')?.touched ? 'cp-key-err' : 'cp-key-hint')" />
            <eui-helper-text id="cp-key-hint">Leave empty to auto-generate from name. 2–10 uppercase alphanumeric characters.</eui-helper-text>
            @if (createForm.get('key')?.invalid && createForm.get('key')?.touched) {
                <eui-feedback-message euiDanger id="cp-key-err">
                    Key must be 2–10 uppercase alphanumeric characters
                </eui-feedback-message>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel for="cp-description">Description</label>
            <textarea euiTextArea id="cp-description" formControlName="description"
                      rows="3"></textarea>
        </div>
    </form>
</eui-dialog>
```

### 3. Key Behaviors

- `[isHandleCloseOnAccept]="true"` prevents auto-close on Accept — we close manually only after successful API call
- If form is invalid, `markAllAsTouched()` triggers validation messages without closing
- On 409 (duplicate name/key), the backend message is displayed inline via `eui-feedback-message euiDanger`
- On other errors, a growl notification is shown
- On success: close dialog → reset form → show growl → navigate to new project
- Navigation to the new project triggers `ProjectShellComponent` which sets project context, sidebar, and breadcrumbs automatically
- Key field auto-uppercases and strips non-alphanumeric characters on input
- Key field is optional — if empty, backend auto-generates from name

### 4. Imports to add to `PortfolioComponent`

```typescript
imports: [
    // existing:
    ...EUI_PAGE,
    ...EUI_TABLE,
    ...EUI_BUTTON,
    EuiTemplateDirective,
    // new:
    ReactiveFormsModule,
    EuiDialogComponent,
    EuiInputTextComponent,
    EuiTextareaComponent,
    EuiHelperTextComponent,
    ...EUI_LABEL,
    ...EUI_INPUT_GROUP,
    ...EUI_FEEDBACK_MESSAGE,
],
```

---

## Test Plan — `portfolio.component.spec.ts`

### Setup additions

```typescript
const permissionServiceMock = {
    isSuperAdmin: vi.fn().mockReturnValue(false),
};
const growlServiceMock = {
    growl: vi.fn(),
};

// Add to providers:
{ provide: PermissionService, useValue: permissionServiceMock },
{ provide: EuiGrowlService, useValue: growlServiceMock },
```

### New test cases

#### Create Project button
- `should show "Create Project" button when user is SUPER_ADMIN`
- `should hide "Create Project" button when user is not SUPER_ADMIN`
- `should have aria-haspopup="dialog" on create button`

#### Create form
- `should have name, key, and description fields`
- `should require name field`
- `should validate name minimum length (2 chars)`
- `should allow empty key (optional)`
- `should validate key format when provided (uppercase alphanumeric, 2-10 chars)`
- `should auto-uppercase key input`

#### Create flow
- `should call projectService.createProject() on valid form submit`
- `should show inline error on 409 conflict response`
- `should show growl error on non-409 error`
- `should navigate to new project on successful creation`
- `should reset form when dialog is dismissed`

#### Accessibility
- `should have labels with for/id pairs on all form inputs`
- `should have aria-required="true" on name input`
- `should have aria-describedby on key field pointing to helper text`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/features/projects/portfolio/portfolio.component.ts` | Add form, dialog logic, imports, ViewChild, PermissionService, key validator |
| `src/app/features/projects/portfolio/portfolio.component.html` | Add Create Project button, create dialog with form |
| `src/app/features/projects/portfolio/portfolio.component.spec.ts` | Add tests for create flow, form validation, visibility, a11y |

## Files NOT Modified

- No backend changes (endpoint exists from STORY-001)
- No model changes (interfaces exist from STORY-002)
- No service changes (method exists from STORY-002)
- No routing changes

## Accessibility Compliance

- [x] All form inputs have associated `<label>` with `for`/`id` pairs
- [x] Required field (name) uses `euiRequired` directive on label + `aria-required="true"` on input
- [x] Validation errors use `aria-describedby` pointing to error message elements
- [x] Key field has `eui-helper-text` with `aria-describedby` for guidance
- [x] "Create Project" button has `aria-haspopup="dialog"`
- [x] `eui-dialog` provides built-in focus trap, Escape handling, `role="dialog"`, `aria-modal="true"`
- [x] 409 error message uses `aria-live="polite"` for screen reader announcement
- [x] All interactive elements are keyboard-navigable (native `<button>`, `<input>`, `<textarea>`)

## Acceptance Criteria

- [ ] "Create Project" button visible only to SUPER_ADMIN
- [ ] Dialog opens with empty form
- [ ] Name is required (min 2 chars), key is optional, description is optional
- [ ] Key auto-uppercases and strips non-alphanumeric characters
- [ ] Key validates format (2–10 uppercase alphanumeric) when provided
- [ ] Successful create closes dialog, shows success growl, navigates to new project
- [ ] 409 conflict shows inline error message
- [ ] Other errors show growl error
- [ ] Form resets on dismiss or after successful creation
- [ ] All inputs have associated labels with `for`/`id` pairs
- [ ] Required input has `aria-required="true"`
- [ ] Validation errors linked via `aria-describedby`
- [ ] Key field has helper text linked via `aria-describedby`
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
