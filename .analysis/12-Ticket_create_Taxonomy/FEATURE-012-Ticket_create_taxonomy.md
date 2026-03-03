# FEATURE-012 Ticket Create Taxonomy - Business Summary

## Business objective
Enable teams to create tickets consistently with shared taxonomy so work planning and execution stay structured across projects.

## Front-end business needs
- Provide a clear ticket creation flow with stable defaults and required fields.
- Use consistent taxonomy options (type, priority, status model) across creation and list surfaces.
- Allow ticket creation only when user context and project scope are valid.
- Keep create success/failure feedback clear and predictable for users.

## Backend business needs
- Enforce ticket creation rules with project-scoped authorization and lifecycle checks.
- Apply canonical taxonomy values and reject invalid inputs.
- Generate deterministic ticket identifiers and numbering per project.
- Enforce domain guards for assignee validity, parent epic rules, and archived-project restrictions.
- Persist related side effects (labels, backlog order, activity) consistently for traceability.

## Role coverage for this feature
- Authorized project contributors can create tickets according to role policy.
- Read-only roles (for example `VIEWER`) must be blocked from creation commands.
- Super-admin and privileged project roles can create tickets within allowed scope.

## Expected business outcomes
- Better data consistency for ticketing across the product.
- Faster and less error-prone work item creation.
- Stronger planning/reporting quality due to standardized taxonomy usage.

