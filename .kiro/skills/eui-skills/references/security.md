# Security Guide

Authentication, authorization, and security interceptors for eUI applications.

## EU Login Integration

eUI applications use **EU Login** (formerly ECAS) for authentication via the **BFF (Backend-For-Frontend)** pattern:

- **Frontend**: No direct token handling. Uses session cookies.
- **Backend**: Handles OpenID Connect tokens, validates sessions.
- **Flow**: Backend redirects to EU Login → user authenticates → backend receives tokens → frontend gets session cookie.

### Required Interceptors

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  CorsSecurityInterceptor,
  CsrfPreventionInterceptor,
  EuLoginSessionTimeoutHandlingInterceptor,
} from '@eui/core';

providers: [
  { provide: HTTP_INTERCEPTORS, useClass: CorsSecurityInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CsrfPreventionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EuLoginSessionTimeoutHandlingInterceptor, multi: true },
]
```

### Backend Configuration

Configure ECAS client (`ecas-config.xml`) for JSON error responses:

```xml
<redirectionInterceptors>
  <redirectionInterceptor>eu.cec.digit.ecas.client.http.ajax.JsonAjaxRedirectionInterceptor</redirectionInterceptor>
</redirectionInterceptors>
```

## HTTP Interceptors

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  CorsSecurityInterceptor,
  CsrfPreventionInterceptor,
  EuLoginSessionTimeoutHandlingInterceptor,
} from '@eui/core';

providers: [
  { provide: HTTP_INTERCEPTORS, useClass: CorsSecurityInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CsrfPreventionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: EuLoginSessionTimeoutHandlingInterceptor, multi: true },
]
```

### CorsSecurityInterceptor

Sets `withCredentials: true` to send `JSESSIONID` cookie cross-domain. Required for EU Login protected APIs.

### CsrfPreventionInterceptor

Adds `X-Requested-With: XMLHttpRequest` header to prevent CSRF attacks.

### EuLoginSessionTimeoutHandlingInterceptor

Detects EU Login session timeout and triggers re-authentication.

**Backend config required** (`ecas-config.xml`):
```xml
<redirectionInterceptors>
  <redirectionInterceptor>eu.cec.digit.ecas.client.http.ajax.JsonAjaxRedirectionInterceptor</redirectionInterceptor>
</redirectionInterceptors>
```

### CachePreventionInterceptor

Sets `Cache-Control: No-cache` to prevent proxy caching.

## Authorization with PermissionService

User rights control access to pages and features.

### Data Model

```typescript
interface EuiUserRight {
  id: string;           // Right ID (page/feature)
  permissions?: string[]; // Actions within that right
}

// User state with rights
user: {
  rights: [
    { id: 'DASHBOARD', permissions: [] },
    { id: 'USER_MANAGEMENT', permissions: ['view', 'edit', 'delete'] },
  ]
}
```

### Initialize

```typescript
import { EuiPermissionService } from '@eui/core';

this.permissionService.init(userRights);
```

### Check in Code

```typescript
// Has right to access feature
this.permissionService.checkRight('USER_MANAGEMENT');

// Has specific permission
this.permissionService.checkAttributePermission('USER_MANAGEMENT.delete');
```

### Template Directive

```html
<button *euiHasPermission="'USER_MANAGEMENT.delete'">Delete</button>
```

## Route Guards

Protect routes based on permissions:

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EuiPermissionService } from '@eui/core';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private permissionService: EuiPermissionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRight = route.data['requiredRight'];
    
    if (this.permissionService.checkRight(requiredRight)) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
```

### Route Configuration

```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: { requiredRight: 'ADMIN' },
  },
];
```

## Security Best Practices

1. **Always use interceptors** - Register CORS, CSRF, and session timeout interceptors
2. **Backend validation** - Frontend permissions are for UX only; always validate on server
3. **Lazy load protected modules** - Don't bundle admin code for regular users
4. **Use route guards** - Prevent navigation to unauthorized routes

## See Also

- [PermissionService](services/permission.md)
- [Full interceptor docs](guides/showcase-dev-guide/docs/10-services/http-interceptors.md)
- [Full permission docs](guides/showcase-dev-guide/docs/10-services/permission.md)
