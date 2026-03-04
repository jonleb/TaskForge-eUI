# STORY-006: i18n Keys (EN/FR)

## Objective

Add all new i18n keys required by STORY-001 through STORY-005 to both `en.json` and `fr.json` translation files. Remove i18n keys that are no longer used after the refactoring (Quick Filters, old search button, etc.).

---

## Prerequisites

- STORY-005 completed (all template changes done, new keys referenced).

---

## Modifications

### 1. Add new keys — `src/assets/i18n/en.json`

```json
{
    "tickets.breadcrumb.home": "Home",
    "tickets.breadcrumb.tickets": "Tickets",
    "tickets.filter.select-filter": "Select filter",
    "tickets.filter.search-filter-placeholder": "Search tickets...",
    "tickets.filter.all-statuses": "All statuses",
    "tickets.filter.priority-all": "All",
    "tickets.filter.remove-filter": "Remove filter",
    "tickets.results.heading": "Results",
    "tickets.results.count": "{{total}} tickets found",
    "tickets.results.selected-criteria": "Selected criteria",
    "tickets.results.clear-all": "Clear all",
    "tickets.results.more": "+{{count}} more",
    "tickets.results.sort-by": "Sort by",
    "tickets.results.sort-creation-date": "Creation date",
    "tickets.results.sort-title": "Title",
    "tickets.results.sort-priority": "Priority",
    "tickets.results.sort-status": "Status",
    "tickets.results.sort-direction": "Toggle sort direction",
    "tickets.view.card": "Card view",
    "tickets.view.table": "Table view",
    "tickets.card.expand": "Expand description",
    "tickets.card.collapse": "Collapse description",
    "tickets.card.actions-menu": "Ticket actions",
    "tickets.card.action.edit": "Edit",
    "tickets.card.action.delete": "Delete",
    "tickets.card.action.assign": "Assign",
    "tickets.card.action.change-status": "Change status",
    "tickets.table.caption": "Tickets list",
    "tickets.table.col.key": "Key",
    "tickets.table.col.title": "Title",
    "tickets.table.col.type": "Type",
    "tickets.table.col.status": "Status",
    "tickets.table.col.priority": "Priority",
    "tickets.table.col.assignee": "Assignee",
    "tickets.table.col.project": "Project"
}
```

### 2. Add new keys — `src/assets/i18n/fr.json`

```json
{
    "tickets.breadcrumb.home": "Accueil",
    "tickets.breadcrumb.tickets": "Tickets",
    "tickets.filter.select-filter": "Sélectionner un filtre",
    "tickets.filter.search-filter-placeholder": "Rechercher des tickets...",
    "tickets.filter.all-statuses": "Tous les statuts",
    "tickets.filter.priority-all": "Tous",
    "tickets.filter.remove-filter": "Supprimer le filtre",
    "tickets.results.heading": "Résultats",
    "tickets.results.count": "{{total}} tickets trouvés",
    "tickets.results.selected-criteria": "Critères sélectionnés",
    "tickets.results.clear-all": "Tout effacer",
    "tickets.results.more": "+{{count}} autres",
    "tickets.results.sort-by": "Trier par",
    "tickets.results.sort-creation-date": "Date de création",
    "tickets.results.sort-title": "Titre",
    "tickets.results.sort-priority": "Priorité",
    "tickets.results.sort-status": "Statut",
    "tickets.results.sort-direction": "Inverser le tri",
    "tickets.view.card": "Vue carte",
    "tickets.view.table": "Vue tableau",
    "tickets.card.expand": "Développer la description",
    "tickets.card.collapse": "Réduire la description",
    "tickets.card.actions-menu": "Actions du ticket",
    "tickets.card.action.edit": "Modifier",
    "tickets.card.action.delete": "Supprimer",
    "tickets.card.action.assign": "Assigner",
    "tickets.card.action.change-status": "Changer le statut",
    "tickets.table.caption": "Liste des tickets",
    "tickets.table.col.key": "Clé",
    "tickets.table.col.title": "Titre",
    "tickets.table.col.type": "Type",
    "tickets.table.col.status": "Statut",
    "tickets.table.col.priority": "Priorité",
    "tickets.table.col.assignee": "Assigné à",
    "tickets.table.col.project": "Projet"
}
```

### 3. Remove obsolete keys from both `en.json` and `fr.json`

Keys to remove (no longer referenced after refactoring):

| Key | Reason |
|-----|--------|
| `tickets.filter.quick-filters` | Quick Filters section removed |
| `tickets.filter.assigned-to-me` | Quick Filters removed |
| `tickets.filter.open-sprints` | Quick Filters removed |
| `tickets.filter.search-btn` | Search button removed |
| `tickets.chip.assigned-to-me` | Quick Filters removed |
| `tickets.chip.open-sprints` | Quick Filters removed |
| `tickets.results-found` | Replaced by `tickets.results.count` |
| `tickets.selected-filters` | Replaced by `tickets.results.selected-criteria` |
| `tickets.clear-all` | Replaced by `tickets.results.clear-all` |

### 4. Update existing keys (if needed)

| Key | Change | Reason |
|-----|--------|--------|
| `tickets.search-placeholder` | Keep or replace with `tickets.filter.search-filter-placeholder` | Verify which key the template uses after STORY-002 |

### 5. Verification

- Search the codebase for any remaining references to removed keys.
- Ensure all `| translate` pipes in the tickets template reference keys that exist in both `en.json` and `fr.json`.
- Run `npx ng build --configuration=development` to verify no missing translation warnings.

---

## Key Count Summary

| Category | Count |
|----------|-------|
| New keys added | 33 |
| Keys removed | 9 |
| Net change | +24 |

---

## Acceptance Criteria

- [ ] All 33 new keys present in `en.json`
- [ ] All 33 new keys present in `fr.json`
- [ ] 9 obsolete keys removed from both files
- [ ] No missing translation warnings in build
- [ ] No orphaned keys (keys in JSON not referenced in code)
- [ ] French translations are correct and natural
- [ ] Build passes (`npx ng build --configuration=development`)
- [ ] All tests pass (`npm run test:ci`)
