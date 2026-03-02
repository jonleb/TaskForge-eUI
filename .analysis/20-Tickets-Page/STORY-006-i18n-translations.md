# STORY-006: i18n — Translation Keys

## Objective

Add all translation keys required by the Tickets page feature to `en.json` and `fr.json`. This story can be implemented in parallel with STORY-003 or earlier, since the keys are referenced by templates from STORY-003 through STORY-005.

## Existing i18n Structure

- `src/assets/i18n/en.json` — English translations
- `src/assets/i18n/fr.json` — French translations
- Keys follow a dot-separated namespace convention: `{feature}.{section}.{key}` (e.g., `backlog.filter.search-label`).
- Shared keys live under `common.*`, `ticket.*`, `workflow.*`, `nav.*`.
- The Tickets page keys use the `tickets.*` namespace (distinct from `ticket.*` which is shared field labels).

## Translation Keys to Add

### Navigation

| Key | EN | FR |
|-----|----|----|
| `nav.tickets` | Tickets | Tickets |

### Page & Results

| Key | EN | FR |
|-----|----|----|
| `tickets.page-title` | Tickets | Tickets |
| `tickets.results-found` | {{total}} results found | {{total}} résultats trouvés |
| `tickets.no-items` | No tickets found. | Aucun ticket trouvé. |
| `tickets.no-match-search` | No tickets match your search. | Aucun ticket ne correspond à votre recherche. |
| `tickets.no-match-filter` | No tickets match the selected filters. | Aucun ticket ne correspond aux filtres sélectionnés. |
| `tickets.load-error` | Could not load tickets. Please try again. | Impossible de charger les tickets. Veuillez réessayer. |
| `tickets.retry` | Retry | Réessayer |
| `tickets.search-placeholder` | Search tickets... | Rechercher des tickets... |
| `tickets.card.no-assignee` | Unassigned | Non assigné |

### Filter Panel

| Key | EN | FR |
|-----|----|----|
| `tickets.filter.column-label` | Search filter | Filtre de recherche |
| `tickets.filter.expand-label` | Expand search filter | Ouvrir le filtre de recherche |
| `tickets.filter.collapse-label` | Collapse search filter | Fermer le filtre de recherche |
| `tickets.filter.search-label` | Search | Recherche |
| `tickets.filter.project-label` | Project | Projet |
| `tickets.filter.select-project` | All projects | Tous les projets |
| `tickets.filter.assigned-to-me` | Assigned to me | Assigné à moi |
| `tickets.filter.open-sprints` | Open Sprints | Sprints ouverts |
| `tickets.filter.sprint-label` | Sprint | Sprint |
| `tickets.filter.select-sprint` | Select a sprint | Sélectionner un sprint |
| `tickets.filter.status-legend` | Status | Statut |
| `tickets.filter.type-legend` | Type | Type |
| `tickets.filter.priority-legend` | Priority | Priorité |

### Filter Chips

| Key | EN | FR |
|-----|----|----|
| `tickets.chip.search` | Search: {{term}} | Recherche : {{term}} |
| `tickets.chip.status` | Status: {{value}} | Statut : {{value}} |
| `tickets.chip.type` | Type: {{value}} | Type : {{value}} |
| `tickets.chip.priority` | Priority: {{value}} | Priorité : {{value}} |
| `tickets.chip.project` | Project: {{value}} | Projet : {{value}} |
| `tickets.chip.assigned-to-me` | Assigned to me | Assigné à moi |
| `tickets.chip.open-sprints` | Open Sprints | Sprints ouverts |
| `tickets.chip.sprint` | Sprint: {{value}} | Sprint : {{value}} |
| `tickets.clear-all` | Clear all | Tout effacer |
| `tickets.selected-filters` | Selected filters | Filtres sélectionnés |

### Create Ticket Dialog

| Key | EN | FR |
|-----|----|----|
| `tickets.create-btn` | Create Ticket | Créer un ticket |
| `tickets.dialog.create-title` | Create Ticket | Créer un ticket |
| `tickets.dialog.project` | Project | Projet |
| `tickets.dialog.select-project` | Select a project | Sélectionner un projet |
| `tickets.error.create-default` | An error occurred while creating the ticket. | Une erreur est survenue lors de la création du ticket. |

### Growl Notifications

| Key | EN | FR |
|-----|----|----|
| `tickets.growl.created-summary` | Ticket created | Ticket créé |
| `tickets.growl.created-detail` | {{key}}-{{number}} {{title}} has been created. | {{key}}-{{number}} {{title}} a été créé. |
| `tickets.growl.load-failed-summary` | Load failed | Échec du chargement |
| `tickets.growl.load-failed-detail` | Could not load tickets. Please try again. | Impossible de charger les tickets. Veuillez réessayer. |

## Implementation Plan

### 1. Update `src/assets/i18n/en.json`

Add all keys from the table above in the English column. Insert them after the `board.*` keys block, maintaining alphabetical order by namespace.

### 2. Update `src/assets/i18n/fr.json`

Add all keys from the table above in the French column. Same insertion point.

### 3. Verify

- Run `npx ng build --configuration=development` to ensure JSON is valid.
- Verify that switching language in the app renders the Tickets page labels in the selected language (manual check after STORY-003+).

## Reused Keys (no changes needed)

The following existing keys are reused by the Tickets page and do NOT need to be duplicated:

- `common.create`, `common.cancel`, `common.loading`
- `common.validation.required`, `common.validation.min-length`
- `ticket.field.type`, `ticket.field.title`, `ticket.field.description`, `ticket.field.assignee`, `ticket.field.epic`
- `ticket.priority.label`, `ticket.priority.CRITICAL`, `ticket.priority.HIGH`, `ticket.priority.MEDIUM`, `ticket.priority.LOW`
- `workflow.ticket-type.STORY`, `workflow.ticket-type.BUG`, `workflow.ticket-type.TASK`, `workflow.ticket-type.EPIC`
- `workflow.status.TO_DO`, `workflow.status.IN_PROGRESS`, `workflow.status.IN_REVIEW`, `workflow.status.DONE`

## Files Modified

| File | Modification |
|------|----|
| `src/assets/i18n/en.json` | Add ~30 `tickets.*` keys + `nav.tickets` |
| `src/assets/i18n/fr.json` | Add ~30 `tickets.*` keys + `nav.tickets` |

## Acceptance Criteria

- [ ] All `tickets.*` keys added to `en.json` and `fr.json`
- [ ] `nav.tickets` key added to both files
- [ ] JSON files are valid (no syntax errors)
- [ ] Language switch renders Tickets page labels correctly (manual verification after STORY-003)
- [ ] Build passes: `npx ng build --configuration=development`
