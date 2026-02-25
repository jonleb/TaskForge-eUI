# FEATURE-006 Admin Users - Business Summary

## Business objective
Give super admins a safe and reliable way to manage user lifecycle so platform access stays controlled and operational.

## Front-end business needs
- Provide a dedicated administration page where super admins can manage users.
- Allow super admins to find users quickly with search, status filters, and pagination.
- Allow secure user creation with immediate display of a one-time temporary password.
- Allow password reset with clear confirmation and one-time temporary password display.
- Allow deactivation and reactivation with explicit confirmation to reduce accidental actions.
- Prevent non-super-admin users from accessing admin users pages and actions.
- Show clear conflict or denial feedback when protected admin actions are blocked.

## Backend business needs
- Enforce super-admin-only access for all admin user management endpoints.
- Provide deterministic user listing behavior for paging, filtering, sorting, and search.
- Enforce email normalization and uniqueness for user creation.
- Generate temporary passwords securely and persist only hashed values.
- Support password reset, deactivation, and reactivation with stable, predictable outcomes.
- Block deactivation of the last active `SUPER_ADMIN` to prevent admin lockout.
- Record auditable events for sensitive actions such as password reset and user deactivation.

## Role coverage for this feature
- Primary actor: `SUPER_ADMIN`.
- Restricted actor: non-super-admin authenticated users must be blocked from admin user management.
- Managed users: accounts can be active or inactive, with controlled reactivation workflows.

## Expected business outcomes
- Stronger control over who can access the platform.
- Faster and safer operational handling of user account issues.
- Reduced risk of privilege-loss incidents through last-super-admin safeguards.
- Better compliance and traceability for high-impact user administration actions.
