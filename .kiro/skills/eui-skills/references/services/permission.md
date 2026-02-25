# PermissionService

User authorization based on rights and permissions.

## Data Model

Permissions come from user state as `rights` array:

```typescript
interface EuiUserRight {
  id: string;           // Right ID (maps to page/feature)
  permissions?: string[]; // Permissions within that right (maps to actions)
}

// Example user state
user: {
  rights: [
    { id: 'DASHBOARD', permissions: [] },
    { id: 'USER_MANAGEMENT', permissions: ['view', 'edit', 'delete'] },
    { id: 'REPORTS', permissions: ['view'] },
  ]
}
```

## Initialize Service

```typescript
import { EuiPermissionService } from '@eui/core';

@Injectable({ providedIn: 'root' })
export class AppStarterService {
  constructor(private permService: EuiPermissionService) {}

  initPermissions(userRights: EuiUserRight[]) {
    return this.permService.init(userRights);
  }
}
```

## Check Permissions in Code

```typescript
// Check if user has a right
this.permService.checkRight('USER_MANAGEMENT'); // true/false

// Check right + permission (dot-separated)
this.permService.checkAttributePermission('USER_MANAGEMENT.edit'); // true/false

// Multiple rights + permission
this.permService.checkAttributePermission('ADMIN.USER_MANAGEMENT.delete');
```

## Template Directive

Hide elements based on permissions:

```html
<!-- Show if user has right -->
<button *euiHasPermission="'USER_MANAGEMENT'">Manage Users</button>

<!-- Show if user has right + permission -->
<button *euiHasPermission="'USER_MANAGEMENT.delete'">Delete User</button>
```

## Subscribe to State

```typescript
this.permService.getState().subscribe(rights => {
  console.log('User rights:', rights);
});
```

## Update Permissions

```typescript
this.permService.updateState(newRights);
```

## Key Points

- Rights map to pages/features
- Permissions map to actions within a right
- Frontend permissions are for UX only - always protect backend endpoints
- Initialize after user data is loaded

## See Also

- [Full permission docs](../guides/showcase-dev-guide/docs/10-services/permission.md)
