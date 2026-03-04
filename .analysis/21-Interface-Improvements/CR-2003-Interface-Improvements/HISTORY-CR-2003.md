# CR-2003 — Interface Improvements — Branch History

## Branch: `21-CR-Interface-improvements`

## Changes Delivered

### 1. Remove notification bell from top bar

**Prompt:** "Remove notification in top bar."

**What was done:**
- Removed `<eui-notifications>` component and its wrapping `<eui-toolbar-item>` from `layout.component.html`
- Removed the hardcoded `notificationItems` array from `layout.component.ts`
- No test changes needed (spec didn't reference notifications directly)

**Files:** `layout.component.html`, `layout.component.ts`

### 2. Persist language selection across sessions

**Prompt:** "As a user once I have selected a language it has to be saved and next time I connect or refresh a page, it keeps the language selected."

**What was done:**
- In `LayoutComponent`: subscribe to `TranslateService.onLangChange` and save the selected language to `localStorage` under key `taskforge_lang`
- In `AppStarterService`: after `i18nService.init()`, read `taskforge_lang` from `localStorage` and call `translate.use()` to restore the saved language
- Added unit test for language persistence in `layout.component.spec.ts`

**Files:** `layout.component.ts`, `layout.component.spec.ts`, `app-starter.service.ts`

### 3. Remember me + automatic token refresh

**Prompt:** "I'm sometimes disconnected during a session. Please implement a Remember me and avoid disconnection during a session."

**What was done:**

**Login form:**
- Added "Remember me" checkbox using eUI `euiInputCheckBox` with proper `label[for]`/`id` a11y pairing
- Added `rememberMe` form control to the reactive form
- Passes `rememberMe` flag to `AuthService.login()`

**AuthService (dual storage + refresh timer):**
- When `rememberMe=true`: token stored in `localStorage` (persists across browser restarts)
- When `rememberMe=false`: token stored in `sessionStorage` (cleared when browser closes)
- `getToken()` checks both storages (localStorage first)
- `logout()` clears both storages + the `auth_remember` flag
- Periodic refresh timer: runs outside Angular zone every 60s, refreshes token when <5 min remain
- `startRefreshTimer()` called on login and on app startup (via `AppStarterService`)

**Auth interceptor:**
- Skip 401 redirect for `/api/auth/refresh` requests (fail silently, handled by AuthService)
- Clear both storages on 401

**Mock server:**
- Login endpoint accepts `rememberMe` flag: 7-day TTL when true, 1-hour when false
- New `POST /api/auth/refresh` endpoint: returns a fresh token with same TTL intent

**i18n:**
- `login.remember-me`: "Remember me" (EN) / "Se souvenir de moi" (FR)

**Tests:**
- AuthService spec: 17 tests covering dual storage, rememberMe flag, logout cleanup
- Login component spec: added rememberMe to all `setValue()` calls, added checkbox rendering test
- Mock server: 6 new tests for refresh endpoint and rememberMe token TTL

**Files:** `auth.service.ts`, `auth.service.spec.ts`, `auth.interceptor.ts`, `login.component.ts`, `login.component.html`, `login.component.spec.ts`, `app-starter.service.ts`, `mock/app/routes/auth_routes.js`, `mock/app/routes/auth_routes.test.js`, `en.json`, `fr.json`

## Test Results

- Frontend: 715 tests pass (26 test files)
- Backend: auth_routes tests all pass (including 6 new tests)
- Build: clean

## Commits

1. `dcedc0d` — feat: remove notification bell + persist language selection
2. `fc58632` — feat: remember me + automatic token refresh to prevent session disconnects
