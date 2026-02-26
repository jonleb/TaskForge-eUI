# FEATURE-006 Project Navigation UX - Business Summary

## Business objective
Provide a clear and consistent project-centered navigation experience so users always understand which project context they are working in.

## Front-end business needs
- Keep an active project context visible and consistent across work pages.
- Allow users to switch between a specific project and cross-project views in a predictable way.
- Ensure project entry from the portfolio opens the correct scoped workspace.
- Keep route behavior and breadcrumbs stable so navigation is understandable and repeatable.
- Preserve navigation context across sessions to reduce repetitive user setup.

## Backend business needs
- Provide a reliable project discovery contract that supports scope selectors.
- Enforce membership-scoped project visibility for non-super-admin users.
- Allow super admins to discover all projects for cross-portfolio operations.
- Keep project-scoped endpoints consistently addressable to support deterministic navigation.
- Return predictable access outcomes when project context is missing, invalid, or unauthorized.

## Role coverage for this feature
- `SUPER_ADMIN` can navigate all project contexts.
- Non-super-admin users navigate only projects where they have membership.
- Navigation behavior must stay consistent regardless of role once access is granted.

## Expected business outcomes
- Faster and more confident movement between project areas.
- Fewer navigation errors caused by unclear or inconsistent project scope.
- Better alignment between what users see in UI and what backend allows.

