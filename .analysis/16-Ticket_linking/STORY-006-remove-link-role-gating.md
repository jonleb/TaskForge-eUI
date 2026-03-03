# STORY-006: Frontend — Remove Link & Role Gating

## Objective

Add delete button per link (with confirmation dialog), role-based visibility for add/remove actions.

## UI Design

- Delete icon button per link row (eui-icon-button with eui-trash icon)
- Confirmation dialog before deletion
- Role gating: add/remove visible only to SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER
- REPORTER can only remove links they created
- VIEWER sees read-only list only

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add removeLink(), confirmation dialog |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add delete buttons, confirmation dialog |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add role gating tests |
| `src/assets/i18n/en.json` | Add i18n keys |
| `src/assets/i18n/fr.json` | Add i18n keys |
