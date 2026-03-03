# STORY-004: Frontend — Create User Dialog

## Goal

Implement a "Create User" dialog that allows SUPER_ADMIN users to create new platform accounts. On success, display the one-time temporary password in a confirmation dialog. Wire the "Create User" button in the `UsersComponent` page header.

## Prerequisites

- STORY-003 complete — `UsersComponent` with table, pagination, search, sort
- STORY-002 complete — `AdminUserService.createUser()` available
- Models: `CreateUserRequest`, `CreateUserResponse`, `UserRole` defined in `admin-user.models.ts`
- Backend: `POST /api/admin/users` returns `{ user, temporaryPassword }` (201) or 409 on duplicate

## eUI Components & Imports

| Component / Directive | Import | Purpose |
|----------------------|--------|---------|
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Create user form dialog + temp password dialog |
| `input[euiInputText]` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Text inputs (username, firstName, lastName, email) |
| `select[euiSelect]` | `EuiSelectComponent` from `@eui/components/eui-select` | Role dropdown |
| `label[euiLabel]` | `EuiLabelComponent` from `@eui/components/eui-label` | Form labels with `euiRequired` |
| `div[euiInputGroup]` | `EuiInputGroupComponent` from `@eui/components/eui-input-group` | Form field grouping |
| `eui-feedback-message` | `EuiFeedbackMessageComponent` from `@eui/components/eui-feedback-message` | Inline error for 409 duplicate |
| `button[euiButton]` | `EUI_BUTTON` from `@eui/components/eui-button` | "Create User" trigger button + Copy button |
| `EuiGrowlService` | from `@eui/core` | Success notification after creation |

## Design Decision: Template-ref Dialog vs. Separate Component

Use template-ref `<eui-dialog>` elements directly in `UsersComponent` rather than a separate `CreateUserDialogComponent`. Reasons:
- The form is small (5 fields) — no need for a separate component
- Template-ref dialogs are simpler to wire (no `EuiDialogService` config boilerplate)
- The dialog needs to call `loadUsers()` on success, which is easier from the same component
- The temporary password dialog is also a simple template-ref dialog

If the component grows too large in later stories (STORY-005, STORY-006 add more dialogs), we can extract to separate components at that point.

## Implementation Plan

### 1. Add "Create User" button and dialogs to `UsersComponent`

#### Template additions (`users.component.html`)

Add a "Create User" button in the page header area (between `eui-page-header` and the table filter):

```html
<button euiButton euiPrimary
        type="button"
        aria-haspopup="dialog"
        (click)="createDialog.openDialog()"
        class="eui-u-mb-m">
    Create User
</button>
```

Add the create user form dialog:

```html
<eui-dialog #createDialog
    [title]="'Create User'"
    [acceptLabel]="'Create'"
    [width]="'500px'"
    [isHandleCloseOnAccept]="true"
    (accept)="onCreateUser()"
    (dismiss)="resetCreateForm()">

    <form [formGroup]="createForm" id="create-user-form">
        @if (createError) {
            <eui-feedback-message euiDanger class="eui-u-mb-m">
                {{ createError }}
            </eui-feedback-message>
        }

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cu-username">Username</label>
            <input euiInputText id="cu-username" formControlName="username"
                   aria-required="true"
                   [attr.aria-describedby]="createForm.get('username')?.invalid && createForm.get('username')?.touched ? 'cu-username-err' : null" />
            @if (createForm.get('username')?.invalid && createForm.get('username')?.touched) {
                <span euiLabel euiDanger id="cu-username-err">Username is required</span>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cu-firstName">First Name</label>
            <input euiInputText id="cu-firstName" formControlName="firstName"
                   aria-required="true"
                   [attr.aria-describedby]="createForm.get('firstName')?.invalid && createForm.get('firstName')?.touched ? 'cu-firstName-err' : null" />
            @if (createForm.get('firstName')?.invalid && createForm.get('firstName')?.touched) {
                <span euiLabel euiDanger id="cu-firstName-err">First name is required</span>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cu-lastName">Last Name</label>
            <input euiInputText id="cu-lastName" formControlName="lastName"
                   aria-required="true"
                   [attr.aria-describedby]="createForm.get('lastName')?.invalid && createForm.get('lastName')?.touched ? 'cu-lastName-err' : null" />
            @if (createForm.get('lastName')?.invalid && createForm.get('lastName')?.touched) {
                <span euiLabel euiDanger id="cu-lastName-err">Last name is required</span>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cu-email">Email</label>
            <input euiInputText id="cu-email" formControlName="email" type="email"
                   aria-required="true"
                   [attr.aria-describedby]="createForm.get('email')?.invalid && createForm.get('email')?.touched ? 'cu-email-err' : null" />
            @if (createForm.get('email')?.invalid && createForm.get('email')?.touched) {
                <span euiLabel euiDanger id="cu-email-err">
                    @if (createForm.get('email')?.errors?.['required']) {
                        Email is required
                    } @else {
                        Enter a valid email address
                    }
                </span>
            }
        </div>

        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="cu-role">Role</label>
            <select euiSelect id="cu-role" formControlName="role"
                    aria-required="true"
                    placeholder="Select a role">
                @for (role of availableRoles; track role) {
                    <option [value]="role">{{ role }}</option>
                }
            </select>
            @if (createForm.get('role')?.invalid && createForm.get('role')?.touched) {
                <span euiLabel euiDanger id="cu-role-err">Role is required</span>
            }
        </div>
    </form>
</eui-dialog>
```

Add the temporary password display dialog:

```html
<eui-dialog #tempPasswordDialog
    [title]="'User Created Successfully'"
    [hasDismissButton]="false"
    [acceptLabel]="'Close'"
    [width]="'450px'"
    [isMessageBox]="true">

    <eui-feedback-message euiWarning class="eui-u-mb-m">
        This password will not be shown again. Please copy it now.
    </eui-feedback-message>

    <div euiInputGroup>
        <label euiLabel for="temp-password">Temporary Password</label>
        <input euiInputText id="temp-password"
               [value]="temporaryPassword"
               readonly
               aria-label="Temporary password" />
    </div>

    <button euiButton euiSecondary type="button"
            class="eui-u-mt-s"
            (click)="copyPassword()">
        Copy to Clipboard
    </button>
</eui-dialog>
```

#### Component class additions (`users.component.ts`)

```typescript
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EuiGrowlService } from '@eui/core';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiSelectComponent } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { UserRole } from './admin-user.models';

// Add to imports array:
// ReactiveFormsModule, EuiDialogComponent, EuiInputTextComponent,
// EuiSelectComponent, ...EUI_LABEL, ...EUI_INPUT_GROUP,
// ...EUI_FEEDBACK_MESSAGE, ...EUI_BUTTON

// Add ViewChild refs:
@ViewChild('createDialog') createDialog!: EuiDialogComponent;
@ViewChild('tempPasswordDialog') tempPasswordDialog!: EuiDialogComponent;

// Properties:
private readonly fb = inject(FormBuilder);
private readonly growlService = inject(EuiGrowlService);

availableRoles: UserRole[] = [
    'SUPER_ADMIN', 'PROJECT_ADMIN', 'PRODUCT_OWNER',
    'DEVELOPER', 'REPORTER', 'VIEWER',
];

createForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
});

createError = '';
temporaryPassword = '';

// Methods:
onCreateUser(): void {
    if (this.createForm.invalid) {
        this.createForm.markAllAsTouched();
        return;
    }

    this.createError = '';
    this.adminUserService.createUser(this.createForm.value).subscribe({
        next: res => {
            this.temporaryPassword = res.temporaryPassword;
            this.createDialog.closeDialog();
            this.resetCreateForm();
            this.loadUsers();
            this.tempPasswordDialog.openDialog();
            this.growlService.showSuccessMessage('User created successfully');
        },
        error: err => {
            this.createError = err.error?.message || 'An error occurred while creating the user';
            this.cdr.markForCheck();
        },
    });
}

resetCreateForm(): void {
    this.createForm.reset();
    this.createError = '';
}

copyPassword(): void {
    navigator.clipboard.writeText(this.temporaryPassword).then(() => {
        this.growlService.showSuccessMessage('Password copied to clipboard');
    });
}
```

### 2. Key Behaviors

- `[isHandleCloseOnAccept]="true"` on the create dialog prevents auto-close on Accept click — we close manually only after successful API call
- If the form is invalid, `markAllAsTouched()` triggers validation messages without closing the dialog
- On 409 (duplicate email/username), the backend message is displayed inline via `eui-feedback-message euiDanger`
- On success: close create dialog → reset form → refresh table → open temp password dialog → show growl
- `[isMessageBox]="true"` on the temp password dialog disables Escape-to-close and hides the X button, forcing the user to explicitly click "Close" (reducing risk of accidentally dismissing without copying the password)
- `copyPassword()` uses the Clipboard API

### 3. Imports to add to `UsersComponent`

```typescript
imports: [
    // existing:
    ...EUI_PAGE,
    ...EUI_TABLE,
    ...EUI_ICON_BUTTON,
    EuiTemplateDirective,
    EuiPaginatorComponent,
    // new:
    ReactiveFormsModule,
    EuiDialogComponent,
    EuiInputTextComponent,
    EuiSelectComponent,
    ...EUI_LABEL,
    ...EUI_INPUT_GROUP,
    ...EUI_FEEDBACK_MESSAGE,
    ...EUI_BUTTON,
],
```

---

## Test Plan — `users.component.spec.ts`

Add the following test cases to the existing spec file. The `EuiGrowlService` must be mocked.

### Setup additions

```typescript
const growlServiceMock = {
    showSuccessMessage: vi.fn(),
    showErrorMessage: vi.fn(),
};

// Add to providers:
{ provide: EuiGrowlService, useValue: growlServiceMock },
```

### New test cases

#### Create User button
- `should render a "Create User" button with aria-haspopup="dialog"`

#### Create form dialog
- `should open create dialog when "Create User" button is clicked`
- `should have all required form fields (username, firstName, lastName, email, role)`
- `should show validation errors when submitting empty form`
- `should show email format error for invalid email`
- `should call adminUserService.createUser() on valid form submit`
- `should display inline error on 409 duplicate response`
- `should close dialog and refresh table on successful creation`
- `should reset form when dialog is dismissed`

#### Temporary password dialog
- `should open temp password dialog after successful creation`
- `should display the temporary password in a readonly input`
- `should show warning about one-time password visibility`
- `should copy password to clipboard when copy button is clicked`

#### Form accessibility
- `should have labels with for/id pairs on all form inputs`
- `should have aria-required="true" on all required inputs`
- `should have aria-describedby on invalid inputs pointing to error messages`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/features/admin/users/users.component.ts` | Add form, dialog logic, imports, ViewChild refs |
| `src/app/features/admin/users/users.component.html` | Add Create User button, create form dialog, temp password dialog |
| `src/app/features/admin/users/users.component.spec.ts` | Add tests for create flow, form validation, a11y |

## Files NOT Modified

- No backend changes (endpoint already exists from STORY-001)
- No model changes (interfaces already defined in STORY-002)
- No service changes (method already exists in STORY-002)
- No routing changes

## Accessibility Compliance

- [x] All form inputs have associated `<label>` with `for`/`id` pairs
- [x] Required fields use `euiRequired` directive on labels + `aria-required="true"` on inputs
- [x] Validation errors use `aria-describedby` pointing to error message elements
- [x] "Create User" button has `aria-haspopup="dialog"`
- [x] `eui-dialog` provides built-in focus trap, Escape handling, `role="dialog"`, `aria-modal="true"`
- [x] Temp password dialog uses `isMessageBox` to force explicit close
- [x] Warning message in temp password dialog is text-based (not color-only)
- [x] All interactive elements are keyboard-navigable (native `<button>`, `<input>`, `<select>`)

## Acceptance Criteria

- [ ] "Create User" button opens a dialog with the form
- [ ] All fields are required with proper validation messages
- [ ] Email format is validated
- [ ] Duplicate email/username shows inline error (409 handling)
- [ ] On success, temporary password is displayed in a confirmation dialog
- [ ] Temp password dialog warns about one-time visibility
- [ ] Password can be copied to clipboard
- [ ] User list refreshes after creation
- [ ] Form resets on dismiss or after successful creation
- [ ] Form inputs have associated labels with `for`/`id` pairs
- [ ] Required inputs have `aria-required="true"`
- [ ] Validation errors linked via `aria-describedby`
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
