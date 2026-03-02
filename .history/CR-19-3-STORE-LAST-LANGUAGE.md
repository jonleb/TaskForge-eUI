# CR-19-3 — Store Last Selected Language

## What this branch does

Persists the user's language selection in `localStorage` so it survives page reloads. When the user picks a language via the eUI language selector, the choice is saved immediately. On the next app startup, the saved language is restored after `I18nService.init()` completes, so the UI loads in the user's preferred language without requiring manual re-selection.

## Step-by-step walkthrough

### 1. Save language on change

Added a `localStorage.setItem('preferred_language', event.lang)` call inside the existing `TranslateService.onLangChange` subscription in `LayoutComponent.ngOnInit()`.

Files: `src/app/layout/layout.component.ts`

### 2. Restore language on startup

Added a `tap()` operator after `this.i18nService.init()` in `AppStarterService.start()` that reads `localStorage.getItem('preferred_language')` and calls `translate.use(savedLang)` if the saved language differs from the current one.

Files: `src/app/app-starter.service.ts`

### 3. Unit tests

- Layout spec: new test verifying `localStorage` is written when language changes.
- App-starter spec: two new tests — one verifying `translate.use('fr')` is called when `preferred_language` is set, another verifying it is not called when no saved language exists.

Files: `src/app/layout/layout.component.spec.ts`, `src/app/app-starter.service.spec.ts`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` file in `.analysis/CR-19-3-Store-last-language/` describing the plan and acceptance criteria.
2. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
3. **Tests** — unit tests for modified services/components (vitest).
4. **Verification** — all 626 tests pass, build passes.
5. **Commit** — CR docs first, then implementation, then history file.

## Key technical decisions

- **localStorage over cookies/backend**: Language preference is a UI-only concern with no security implications. `localStorage` is the simplest, zero-dependency approach and survives across sessions.
- **Restore after i18n init, not before**: `I18nService.init()` sets up translation loaders and the default language. Calling `translate.use()` before init would fail silently. The `tap()` after init ensures translations are loaded before switching.
- **`currentLang` deprecation**: `TranslateService.currentLang` is deprecated in newer ngx-translate versions, but eUI's own samples use the same pattern. Acceptable for now; can be updated when eUI migrates.

## Git history

```
(pending) docs: add CR-19-3 analysis
(pending) feat: persist language selection in localStorage
(pending) docs: add CR-19-3 history file
```

## Test summary

- Frontend: 626 unit tests (vitest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

> **Prerequisites**: An eUI Angular app with `I18nService` initialised in an `AppStarterService`, a `LayoutComponent` that subscribes to `TranslateService.onLangChange`, and `eui-language-selector` in the layout template.
>
> 1. In the layout component's `onLangChange` subscription, add `localStorage.setItem('preferred_language', event.lang)`.
> 2. In the app starter service's `start()` method, add a `tap()` after `i18nService.init()` that reads `localStorage.getItem('preferred_language')` and calls `translate.use(savedLang)` if it differs from `translate.currentLang`.
> 3. Add unit tests: verify localStorage is written on language change (layout), verify `translate.use()` is called with saved lang on startup, verify it's not called when no saved lang exists (app-starter).
> 4. Run `npm run test:ci` and `npx ng build --configuration=development` to verify.
