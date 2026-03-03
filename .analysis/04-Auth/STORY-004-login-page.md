# STORY-004: Login Page

## Goal
Create a login page with username/password form using eUI components. The page is standalone (no sidebar, no toolbar) and redirects to `/screen/home` on successful login.

## Branch
Work on `04-AUTH-LOGIN` (branched from `INIT-BACKEND` at `32ac021`).

## Dependencies
- STORY-003 (AuthService, auth interceptor, token management)

## eUI Components Used

Verified via eUI compodoc MCP and skill references:

| Component / Directive | Import | Selector |
|---|---|---|
| `EuiButtonComponent` | `EUI_BUTTON` from `@eui/components/eui-button` | `button[euiButton]` |
| `EuiInputTextComponent` | `EUI_INPUT_TEXT` from `@eui/components/eui-input-text` | `input[euiInputText]` |
| `EuiLabelComponent` | `EUI_LABEL` from `@eui/components/eui-label` | `label[euiLabel]` |
| `EuiInputGroupComponent` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | `div[euiInputGroup]` |
| `EuiFeedbackMessageComponent` | `EUI_FEEDBACK_MESSAGE` from `@eui/components/eui-feedback-message` | `eui-feedback-message` |
| `EuiIconSvgComponent` | `EUI_ICON` from `@eui/components/eui-icon` | `eui-icon-svg` |

No `eui-page` layout is used for the login page — it's a standalone page without the app shell (no sidebar, toolbar, or header). We use a simple centered card layout with eUI utility classes.

## Implementation

### 1. Create `src/app/features/login/login.component.ts`

Standalone component with reactive form:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ICON } from '@eui/components/eui-icon';

import { AuthService } from '../../core/auth';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ICON,
    ],
})
export class LoginComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    errorMessage = '';
    isLoading = false;

    ngOnInit(): void {
        // If already authenticated, redirect to home
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/screen/home']);
        }
    }

    onSubmit(): void {
        this.loginForm.markAllAsTouched();

        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const { username, password } = this.loginForm.getRawValue();

        this.authService.login(username!, password!).subscribe({
            next: () => {
                this.router.navigate(['/screen/home']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'An unexpected error occurred';
            },
        });
    }
}
```

### 2. Create `src/app/features/login/login.component.html`

```html
<main class="eui-u-d-flex eui-u-flex-align-items-center eui-u-flex-justify-center eui-u-height-100">
    <div class="eui-u-width-20">
        <h1 class="eui-u-text-center eui-u-mb-l">TaskForge</h1>

        <!-- Error message (a11y: aria-live for dynamic updates) -->
        @if (errorMessage) {
            <div aria-live="polite" class="eui-u-mb-m">
                <eui-feedback-message euiDanger>{{ errorMessage }}</eui-feedback-message>
            </div>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Username field -->
            <div euiInputGroup class="eui-u-mb-m">
                <label euiLabel euiRequired for="login-username">Username</label>
                <input euiInputText
                       id="login-username"
                       formControlName="username"
                       autocomplete="username"
                       aria-required="true"
                       [attr.aria-describedby]="loginForm.get('username')?.touched && loginForm.get('username')?.hasError('required') ? 'username-error' : null" />
                @if (loginForm.get('username')?.touched && loginForm.get('username')?.hasError('required')) {
                    <eui-feedback-message euiDanger id="username-error">Username is required</eui-feedback-message>
                }
            </div>

            <!-- Password field -->
            <div euiInputGroup class="eui-u-mb-m">
                <label euiLabel euiRequired for="login-password">Password</label>
                <input euiInputText
                       id="login-password"
                       type="password"
                       formControlName="password"
                       autocomplete="current-password"
                       aria-required="true"
                       [attr.aria-describedby]="loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required') ? 'password-error' : null" />
                @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')) {
                    <eui-feedback-message euiDanger id="password-error">Password is required</eui-feedback-message>
                }
            </div>

            <!-- Submit button -->
            <button euiButton
                    euiPrimary
                    euiBlockButton
                    type="submit"
                    [euiDisabled]="isLoading">
                @if (isLoading) {
                    Signing in...
                } @else {
                    Sign in
                }
            </button>
        </form>
    </div>
</main>
```

Key a11y decisions:
- `<label euiLabel euiRequired for="...">` with matching `id` on inputs
- `aria-required="true"` on required inputs
- `aria-describedby` pointing to error message elements when validation fails
- `aria-live="polite"` on the error container for dynamic API error messages
- `<main>` landmark for the page content
- `<h1>` for the page title
- `autocomplete="username"` and `autocomplete="current-password"` for browser autofill
- `type="submit"` on the button for Enter key form submission
- Semantic `<form>` element with `(ngSubmit)` for keyboard submission

### 3. Create `src/app/features/login/login.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const LOGIN_ROUTES: Routes = [
    { path: '', component: LoginComponent },
];
```

### 4. Update `src/app/app.routes.ts`

Add the login route:

```typescript
export const routes: Routes = [
    { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES) },
    { path: 'index.jsp', redirectTo: 'screen/home' },
    { path: 'screen/home', loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES) },
    { path: 'screen/module1', loadChildren: () => import('./features/module1/module1.routes').then(m => m.MODULE1_ROUTES) },
    { path: 'screen/module2', loadChildren: () => import('./features/module2/module2.routes').then(m => m.MODULE2_ROUTES) },
];
```

Note: The default redirect stays at `/screen/home` for now. It will change to `/login` in STORY-005 when the auth guard is added.

### 5. Add login page styles (minimal)

Add to `src/app/features/login/login.component.html` via the `<main>` element:
- `eui-u-height-100` — full viewport height
- `eui-u-d-flex`, `eui-u-flex-align-items-center`, `eui-u-flex-justify-center` — center the form
- `eui-u-width-20` — 20rem width for the form container

No custom CSS file needed — eUI utility classes handle the layout.

## File Structure

```
src/app/features/login/
    login.component.ts       — standalone component with reactive form
    login.component.html     — template with eUI form components
    login.component.spec.ts  — unit tests
    login.routes.ts          — LOGIN_ROUTES
```

## What NOT to do

- Do NOT add auth guard to routes (that's STORY-005)
- Do NOT change the default redirect from `/screen/home` to `/login` (that's STORY-005)
- Do NOT add logout functionality (that's STORY-006)
- Do NOT modify `AppStarterService` (that's STORY-005)
- Do NOT use `mat-form-field` or Angular Material — use eUI components only
- Do NOT create a custom CSS file — use eUI utility classes

## Unit Tests

### `src/app/features/login/login.component.spec.ts`

```
Test suite: LoginComponent

Setup:
- provideHttpClient(withInterceptorsFromDi())
- provideHttpClientTesting()
- provideRouter([])
- Mock AuthService (login, isAuthenticated)

Tests:
1. should create the component
2. should render username and password fields
3. should render a Sign in button
4. should show validation errors when submitting empty form
5. should call AuthService.login() with form values on submit
6. should navigate to /screen/home on successful login
7. should display API error message on failed login
8. should disable submit button while loading
9. should show "Signing in..." text while loading
10. should redirect to /screen/home if already authenticated (ngOnInit)
11. should have labels with for/id pairs (a11y)
12. should have aria-required on required inputs (a11y)
13. should have aria-live="polite" on error container (a11y)
```

Run with:
```bash
npm run ng test -- --include src/app/features/login/login.component.spec.ts
```

## How to Test Manually

Start the full dev environment:
```bash
npm start
```

Navigate to `http://localhost:4200/login` and test:
- Submit empty form → validation errors appear
- Submit with `superadmin / SecurePassword!123` → redirects to `/screen/home`
- Submit with wrong password → API error message appears
- Submit with `inactive_user / SecurePassword!123` → "Account is deactivated" error

## Acceptance Criteria
- [ ] Login page renders at `/login` with username and password fields
- [ ] Successful login redirects to `/screen/home`
- [ ] Failed login shows generic error message from API
- [ ] Already-authenticated users are redirected away from login page
- [ ] Submit button is disabled during request and shows "Signing in..."
- [ ] Empty form submission shows field-level validation errors
- [ ] Form inputs have associated `<label>` with `for`/`id` pairs (a11y)
- [ ] Required inputs have `aria-required="true"` (a11y)
- [ ] Error messages use `aria-live="polite"` (a11y)
- [ ] Validation errors use `aria-describedby` (a11y)
- [ ] All interactive elements are keyboard-navigable (a11y)
- [ ] Page has a single `<h1>` element (a11y)
- [ ] All unit tests pass: `npm run ng test`
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`
