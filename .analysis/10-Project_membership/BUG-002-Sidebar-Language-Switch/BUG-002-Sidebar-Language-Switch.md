# BUG-002: Sidebar menu not updated on language switch

| Field          | Value                                      |
|----------------|--------------------------------------------|
| ID             | BUG-002                                    |
| Feature        | 10-2-i18n                                  |
| Branch         | `10-2-i18n`                                |
| Severity       | Medium                                     |
| Status         | Fixed                                      |
| Reported       | 2026-02-27                                 |

## Description

When the user switches language via `eui-language-selector` (e.g. FR → EN or EN → FR), the sidebar menu labels remain in the previous language. A full page reload is required to see the updated labels.

## Steps to Reproduce

1. Log in as any user.
2. Observe the sidebar menu labels (e.g. "Home", "Projects", "Users").
3. Click the language selector in the toolbar and switch to French.
4. Observe: sidebar labels still show English ("Home", "Projects", "Users") instead of French ("Accueil", "Projets", "Utilisateurs").

## Expected Behavior

Sidebar menu labels update immediately to the newly selected language without requiring a page reload.

## Actual Behavior

Sidebar labels remain in the language that was active when `LayoutComponent` was initialized.

## Root Cause

In `src/app/layout/layout.component.ts`, sidebar menu items are built using `this.translate.instant('nav.xxx')` which captures the translated string synchronously at call time. These labels are plain strings stored in the `allSidebarItems` array and the `sidebarItems` array — they are not reactive to language changes.

The same issue affects `buildSidebar()` which also uses `translate.instant()` for project-scoped menu items.

```typescript
// Current (non-reactive) — labels captured once
private readonly allSidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [
    { label: this.translate.instant('nav.home'), url: 'screen/home' },
    { label: this.translate.instant('nav.projects'), url: 'screen/projects' },
    { label: this.translate.instant('nav.users'), url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } },
];
```

## Proposed Fix

Subscribe to `TranslateService.onLangChange` in `LayoutComponent` and rebuild the sidebar items whenever the language changes:

1. In `ngOnInit()`, add a subscription to `this.translate.onLangChange` (piped through `takeUntil(this.destroy$)`).
2. In the subscription callback, re-create `allSidebarItems` with fresh `translate.instant()` calls, then call `buildSidebar()` or `filterSidebarItems()` depending on whether a project is active.
3. Call `cdr.markForCheck()` to trigger change detection.

## Affected Files

| File | Role |
|------|------|
| `src/app/layout/layout.component.ts` | Sidebar menu construction |
