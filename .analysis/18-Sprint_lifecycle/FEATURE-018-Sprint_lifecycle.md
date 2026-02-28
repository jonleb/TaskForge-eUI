# FEATURE-018 Sprint Lifecycle - Business Summary

## Business objective
Provide Jira-style sprint operations so teams can create, plan, start, and close sprints with controlled guardrails and basic lifecycle history.

## Front-end business needs
- Provide project-scoped sprint workspace with clear list visibility across planned, active, and closed sprints.
- Allow authorized users to create sprints quickly with core metadata (name and optional goal).
- Support visual sprint planning from backlog ticket selection without manual ID entry.
- Expose explicit lifecycle actions (`PLANNED`, `ACTIVE`, `CLOSED`) directly from sprint list.
- Enforce deterministic close behavior by surfacing conflict confirmation when unresolved tickets exist and allowing explicit move-to-backlog fallback.
- Present sprint history in MVP through persistent list state (`status`, timestamps) rather than a dedicated event timeline.

## Backend business needs
- Provide deterministic project-scoped contracts for sprint create, list, update, and plan operations.
- Enforce strict authorization for sprint management actions (`SUPER_ADMIN`, `PROJECT_ADMIN`, `PRODUCT_OWNER`).
- Initialize new sprints in `PLANNED` state and persist optional capacity/date metadata.
- Enforce close guardrail semantics: block close with unresolved tickets unless `move_open_tickets_to_backlog=true`.
- Preserve lifecycle history through persisted sprint records and list contracts that include status plus creation/update timestamps.

## Role coverage for this feature
- All authenticated project members can consume sprint visibility in project scope.
- Sprint create/update/plan actions are restricted to privileged roles (`SUPER_ADMIN`, authorized `PROJECT_ADMIN`, authorized `PRODUCT_OWNER`).
- Non-privileged roles remain read-only for sprint lifecycle management actions.

## Expected business outcomes
- Faster and more consistent sprint operations aligned with common Agile/Jira usage.
- Lower risk of unsafe sprint closure with unresolved work.
- Better retrospective visibility through persistent sprint lifecycle records.
