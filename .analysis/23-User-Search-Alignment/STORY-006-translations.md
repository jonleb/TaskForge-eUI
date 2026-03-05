# STORY-006: Translations (EN + FR)

## Objective

Add all new i18n keys required by stories 2–5 to both `en.json` and `fr.json`.

## New keys

### Filter sidebar

| Key | EN | FR |
|---|---|---|
| `users.filter.column-label` | Search filter | Filtre de recherche |
| `users.filter.expand-label` | Expand search filter | Développer le filtre de recherche |
| `users.filter.collapse-label` | Collapse search filter | Réduire le filtre de recherche |
| `users.filter.search-label` | Search | Recherche |
| `users.filter.status-label` | Status | Statut |
| `users.filter.all-statuses` | All statuses | Tous les statuts |
| `users.filter.role-label` | Role | Rôle |
| `users.filter.all-roles` | All roles | Tous les rôles |

### Results header

| Key | EN | FR |
|---|---|---|
| `users.results.heading` | Results | Résultats |
| `users.results.count` | {{total}} user(s) | {{total}} utilisateur(s) |
| `users.results.selected-criteria` | Selected criteria | Critères sélectionnés |
| `users.results.clear-all` | Clear all | Tout effacer |
| `users.results.more` | +{{count}} more | +{{count}} de plus |

### Sort controls

| Key | EN | FR |
|---|---|---|
| `users.results.sort-by` | Sort by | Trier par |
| `users.results.sort-creation-date` | Creation date | Date de création |
| `users.results.sort-username` | Username | Nom d'utilisateur |
| `users.results.sort-last-name` | Last name | Nom de famille |
| `users.results.sort-role` | Role | Rôle |
| `users.results.sort-direction` | Toggle sort direction | Inverser l'ordre de tri |

### Filter chips

| Key | EN | FR |
|---|---|---|
| `users.chip.search` | Search: {{term}} | Recherche : {{term}} |
| `users.chip.status` | Status: {{value}} | Statut : {{value}} |
| `users.chip.role` | Role: {{value}} | Rôle : {{value}} |

## Keys to remove

| Key | Reason |
|---|---|
| `users.showing-of` | Replaced by `users.results.count` |
| `users.filter-status-label` | Toggle group removed; replaced by `users.filter.status-label` |
| `users.search-placeholder` | Replaced by `users.filter.search-placeholder` (keep existing key, just rename reference) |

Note: Keep `users.search-placeholder` as-is if it's still used; otherwise rename to `users.filter.search-placeholder` for consistency with Tickets naming.

## Acceptance criteria

- [ ] All new keys present in `src/assets/i18n/en.json`.
- [ ] All new keys present in `src/assets/i18n/fr.json`.
- [ ] No orphaned keys (removed keys no longer referenced in template).
- [ ] Build passes with no missing translation warnings.

## Files to modify

- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`
