# CR-19-3: Store Last Selected Language

## Summary

Persist the user's language selection in `localStorage` so it is automatically restored on the next page load or browser refresh.

## Motivation

When a user switches the UI language via the `eui-language-selector`, the choice is lost on page reload — the app always reverts to the default language (`en`). This forces users to re-select their preferred language every session.

## Current Behavior

- `eui-language-selector` calls `TranslateService.use()` to change the active language at runtime.
- `I18nService.init()` in `AppStarterService.start()` initialises with `defaultLanguage: 'en'` from `src/config/global.ts`.
- On reload, the language resets to `en`.

## Desired Behavior

- When the user picks a language, the choice is saved to `localStorage` under the key `preferred_language`.
- On app startup (after `I18nService.init()` completes), the saved language is read and applied via `TranslateService.use()`.
- If no saved language exists, the default (`en`) is used as before.

## Scope

- `src/app/layout/layout.component.ts` — save language on change.
- `src/app/app-starter.service.ts` — restore language after i18n init.
- Unit tests for both files.

## Acceptance Criteria

- [x] Selecting a language persists the value in `localStorage('preferred_language')`.
- [x] Refreshing the page restores the previously selected language.
- [x] If no saved language exists, the app defaults to `en`.
- [x] All 626 frontend tests pass (`npm run test:ci`).
- [x] Build passes (`npx ng build --configuration=development`).
