# STORY-003 — Frontend: Sprint models & service methods

## Objective
Add TypeScript interfaces and ProjectService methods for sprint operations. Add i18n keys.

## Models (project.models.ts)

```typescript
export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'CLOSED';

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string;
  status: SprintStatus;
  start_date: string | null;
  end_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSprintPayload {
  name: string;
  goal?: string;
}

export interface UpdateSprintPayload {
  name?: string;
  goal?: string;
  start_date?: string;
  end_date?: string;
}

export interface SprintStatusPayload {
  status: 'ACTIVE' | 'CLOSED';
  move_open_tickets_to_backlog?: boolean;
}

export interface SprintItemsPayload {
  ticket_numbers: number[];
}
```

## Service methods (project.service.ts)

- `getSprints(projectId, status?): Observable<Sprint[]>`
- `createSprint(projectId, payload): Observable<Sprint>`
- `updateSprint(projectId, sprintId, payload): Observable<Sprint>`
- `updateSprintStatus(projectId, sprintId, payload): Observable<Sprint>`
- `assignSprintItems(projectId, sprintId, payload): Observable<{ assigned: number }>`
- `removeSprintItem(projectId, sprintId, ticketNumber): Observable<{ removed: boolean }>`

## BacklogItem update
- Add `sprint_id?: string | null` to `BacklogItem` interface.

## Barrel export
- Re-export new types from `src/app/core/project/index.ts`.

## i18n keys (en.json / fr.json)
- `nav.sprints`: "Sprints" / "Sprints"
- `sprint.page-title`: "Sprints" / "Sprints"
- `sprint.create-btn`: "Create Sprint" / "Créer un sprint"
- `sprint.status.PLANNED`: "Planned" / "Planifié"
- `sprint.status.ACTIVE`: "Active" / "Actif"
- `sprint.status.CLOSED`: "Closed" / "Fermé"
- `sprint.section.active`: "Active Sprint" / "Sprint actif"
- `sprint.section.planned`: "Planned Sprints" / "Sprints planifiés"
- `sprint.section.closed`: "Closed Sprints" / "Sprints fermés"
- `sprint.field.name`: "Name" / "Nom"
- `sprint.field.goal`: "Goal" / "Objectif"
- `sprint.field.start-date`: "Start date" / "Date de début"
- `sprint.field.end-date`: "End date" / "Date de fin"
- `sprint.no-sprints`: "No sprints yet." / "Aucun sprint pour le moment."
- `sprint.tickets-count`: "{{count}} ticket(s)" / "{{count}} ticket(s)"
- `sprint.action.start`: "Start Sprint" / "Démarrer le sprint"
- `sprint.action.close`: "Close Sprint" / "Fermer le sprint"
- `sprint.dialog.create-title`: "Create Sprint" / "Créer un sprint"
- `sprint.dialog.close-title`: "Close Sprint" / "Fermer le sprint"
- `sprint.dialog.close-message`: "This sprint has {{count}} unresolved ticket(s). They will be moved back to the backlog." / "Ce sprint contient {{count}} ticket(s) non résolu(s). Ils seront replacés dans le backlog."
- `sprint.dialog.close-accept`: "Close & move tickets" / "Fermer et déplacer les tickets"
- `sprint.growl.created-summary`: "Sprint created" / "Sprint créé"
- `sprint.growl.created-detail`: "{{name}} has been created." / "{{name}} a été créé."
- `sprint.growl.started-summary`: "Sprint started" / "Sprint démarré"
- `sprint.growl.started-detail`: "{{name}} is now active." / "{{name}} est maintenant actif."
- `sprint.growl.closed-summary`: "Sprint closed" / "Sprint fermé"
- `sprint.growl.closed-detail`: "{{name}} has been closed." / "{{name}} a été fermé."
- `sprint.growl.error-summary`: "Error" / "Erreur"
- `sprint.growl.error-detail`: "Could not complete the operation. Please try again." / "Impossible de terminer l'opération. Veuillez réessayer."
- `sprint.planning.title`: "Sprint Planning" / "Planification du sprint"
- `sprint.planning.available`: "Available tickets" / "Tickets disponibles"
- `sprint.planning.assigned`: "Sprint tickets" / "Tickets du sprint"
- `sprint.planning.assign`: "Add to sprint" / "Ajouter au sprint"
- `sprint.planning.remove`: "Remove from sprint" / "Retirer du sprint"
- `sprint.load-error`: "Could not load sprints." / "Impossible de charger les sprints."

## Unit tests
- 6 tests: one per service method (correct HTTP call + error propagation for create).
