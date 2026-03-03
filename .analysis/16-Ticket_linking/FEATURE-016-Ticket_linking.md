# FEATURE-016 Ticket Linking - Business Summary

## Business objective
Establish a controlled ticket-linking model so teams can represent work dependencies and relationships with clear governance.

## Front-end business needs
- Display related tickets clearly in ticket detail context.
- Preserve a deterministic read model for outgoing ticket relationships.
- Keep the current read-only UI boundary explicit where mutation UX is not yet exposed.
- Ensure users can still understand dependency context without dedicated link-management screens.

## Backend business needs
- Provide deterministic contracts for link-type administration and ticket-link create/delete commands.
- Enforce scope and authorization rules for global and project-specific link types.
- Enforce link creation safety checks (source/target validity, visibility, cross-project access rules).
- Enforce controlled delete rules based on creator/role policy.
- Keep link read projections stable for ticket detail consumption.

## Role coverage for this feature
- `SUPER_ADMIN` manages global link-type governance.
- Project-level managers can manage project-scoped link types and allowed link operations by policy.
- Non-privileged roles are restricted from unauthorized link mutations.
- Read access to projected links follows project access context.

## Expected business outcomes
- Better dependency visibility across related work items.
- Stronger control over who can define and change relationship structures.
- Improved planning and risk management through explicit linkage of connected tickets.

