# STORY-002: Frontend — Admin User Service

## Goal

Create an Angular service that encapsulates all HTTP calls to the admin user management endpoints (`/api/admin/users`). This service is the single point of contact between the frontend components and the backend admin API. It also defines all TypeScript interfaces for the admin user domain.

## Prerequisites

- STORY-001 complete — all 6 admin endpoints exist and are tested
- `AuthService` pattern established in `src/app/core/auth/auth.service.ts` (inject HttpClient, return typed Observables)
- `auth.interceptor.ts` automatically attaches the Bearer token to all `/api/*` requests
- Auth models pattern in `src/app/core/auth/auth.models.ts` (interfaces + type aliases)

## Current State

- `UsersComponent` exists at `src/app/features/admin/users/users.component.ts` — placeholder
- No admin user service or models exist
- Backend endpoints ready: `GET /api/admin/users`, `GET /api/admin/users/:userId`, `POST /api/admin/users`, `POST /api/admin/users/:userId/reset-password`, `PATCH /api/admin/users/:userId/deactivate`, `PATCH /api/admin/users/:userId/reactivate`

## Implementation Plan

### 1. Create `src/app/features/admin/users/admin-user.models.ts`

Interfaces and types for the admin user domain. Kept in the feature folder (not `core/`) because these are specific to the admin module.

```typescript
export type UserRole = 'SUPER_ADMIN' | 'PROJECT_ADMIN' | 'PRODUCT_OWNER' | 'DEVELOPER' | 'REPORTER' | 'VIEWER';

export interface AdminUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    global_role: string;
    firstName: string;
    lastName: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminUserListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    is_active?: 'true' | 'false';
}

export interface AdminUserListResponse {
    data: AdminUser[];
    total: number;
    page: number;
    limit: number;
}

export interface CreateUserRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}

export interface CreateUserResponse {
    user: AdminUser;
    temporaryPassword: string;
}

export interface ResetPasswordResponse {
    temporaryPassword: string;
}
```

### 2. Create `src/app/features/admin/users/admin-user.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    AdminUser,
    AdminUserListParams,
    AdminUserListResponse,
    CreateUserRequest,
    CreateUserResponse,
    ResetPasswordResponse,
} from './admin-user.models';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
    private static readonly BASE_URL = '/api/admin/users';

    private readonly http = inject(HttpClient);

    getUsers(params: AdminUserListParams = {}): Observable<AdminUserListResponse> {
        let httpParams = new HttpParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                httpParams = httpParams.set(key, String(value));
            }
        });
        return this.http.get<AdminUserListResponse>(AdminUserService.BASE_URL, { params: httpParams });
    }

    getUser(userId: string): Observable<AdminUser> {
        return this.http.get<AdminUser>(`${AdminUserService.BASE_URL}/${userId}`);
    }

    createUser(data: CreateUserRequest): Observable<CreateUserResponse> {
        return this.http.post<CreateUserResponse>(AdminUserService.BASE_URL, data);
    }

    resetPassword(userId: string): Observable<ResetPasswordResponse> {
        return this.http.post<ResetPasswordResponse>(
            `${AdminUserService.BASE_URL}/${userId}/reset-password`,
            {}
        );
    }

    deactivateUser(userId: string): Observable<AdminUser> {
        return this.http.patch<AdminUser>(
            `${AdminUserService.BASE_URL}/${userId}/deactivate`,
            {}
        );
    }

    reactivateUser(userId: string): Observable<AdminUser> {
        return this.http.patch<AdminUser>(
            `${AdminUserService.BASE_URL}/${userId}/reactivate`,
            {}
        );
    }
}
```

**Design notes:**
- `providedIn: 'root'` — tree-shakable singleton, consistent with `AuthService`
- `HttpParams` built dynamically from the params object, skipping undefined/null/empty values
- Empty body `{}` for POST reset-password and PATCH deactivate/reactivate — the backend doesn't expect a body but Angular's HttpClient requires one for POST/PATCH
- No error handling in the service — errors bubble up as HttpErrorResponse to the calling component, which decides how to display them (growl, inline error, etc.)


### 3. Create `src/app/features/admin/users/admin-user.service.spec.ts`

Following the same pattern as `auth.service.spec.ts`: `provideHttpClient(withInterceptorsFromDi())` + `provideHttpClientTesting()` + `HttpTestingController`.

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { AdminUserService } from './admin-user.service';
import { AdminUser, CreateUserRequest, AdminUserListResponse, CreateUserResponse, ResetPasswordResponse } from './admin-user.models';
```

#### Test cases

##### Service creation
- `should be created`

##### `getUsers()`
- Calls `GET /api/admin/users` with no params when called with empty object
- Passes `_page` and `_limit` as query params
- Passes `q` as query param for search
- Passes `is_active` as query param for status filter
- Passes `_sort` and `_order` as query params for sorting
- Passes all params together when all are provided
- Skips undefined/null/empty string params (does not send them as query params)
- Returns typed `AdminUserListResponse`

##### `getUser()`
- Calls `GET /api/admin/users/:userId`
- Returns typed `AdminUser`

##### `createUser()`
- Calls `POST /api/admin/users` with request body
- Returns typed `CreateUserResponse` with `user` and `temporaryPassword`

##### `resetPassword()`
- Calls `POST /api/admin/users/:userId/reset-password` with empty body
- Returns typed `ResetPasswordResponse` with `temporaryPassword`

##### `deactivateUser()`
- Calls `PATCH /api/admin/users/:userId/deactivate` with empty body
- Returns typed `AdminUser` with `is_active: false`

##### `reactivateUser()`
- Calls `PATCH /api/admin/users/:userId/reactivate` with empty body
- Returns typed `AdminUser` with `is_active: true`

#### Mock data for tests

```typescript
const mockUser: AdminUser = {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@taskforge.local',
    role: 'SUPER_ADMIN',
    global_role: 'SUPER_ADMIN',
    firstName: 'Super',
    lastName: 'Admin',
    is_active: true,
    created_at: '2025-01-15T10:00:00.000Z',
    updated_at: '2025-01-15T10:00:00.000Z',
};

const mockListResponse: AdminUserListResponse = {
    data: [mockUser],
    total: 1,
    page: 1,
    limit: 10,
};

const mockCreateResponse: CreateUserResponse = {
    user: { ...mockUser, id: '99', username: 'newuser' },
    temporaryPassword: 'aB3dEf7hIj2k',
};

const mockResetResponse: ResetPasswordResponse = {
    temporaryPassword: 'xY9zAb3cDe4f',
};
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/features/admin/users/admin-user.models.ts` | Interfaces and types |
| `src/app/features/admin/users/admin-user.service.ts` | HTTP service |
| `src/app/features/admin/users/admin-user.service.spec.ts` | Unit tests |

## Files NOT Modified

- No backend changes
- No routing changes
- No component changes (UsersComponent stays as placeholder until STORY-003)
- No changes to `core/auth/` files

## Design Decisions

- **Models in feature folder** — `admin-user.models.ts` lives in `src/app/features/admin/users/` rather than `src/app/core/` because these types are specific to the admin user management feature. If other features need them later, they can be moved to a shared location.
- **`UserRole` type alias** — uses a union of string literals matching the backend's `VALID_ROLES` array. This provides compile-time safety for role values.
- **`AdminUserListParams` with optional fields** — all query params are optional because the backend has sensible defaults. The service skips undefined/null/empty values when building `HttpParams`.
- **`is_active` as string `'true'|'false'`** — matches the backend's query param parsing (`req.query.is_active === 'true'`). Using string instead of boolean avoids `HttpParams` serialization issues.
- **No caching** — the service makes fresh HTTP calls on every method invocation. Caching would add complexity and staleness issues for an admin CRUD screen where data changes frequently.
- **No error transformation** — errors propagate as `HttpErrorResponse` to the caller. The component layer (STORY-003+) will handle error display (growl, inline messages) based on status codes.
- **Empty body for POST/PATCH** — `resetPassword()`, `deactivateUser()`, `reactivateUser()` send `{}` as the body. Angular's `HttpClient.post()` and `HttpClient.patch()` require a body argument; the backend ignores it for these endpoints.

## Acceptance Criteria

- [ ] `AdminUserService` is `providedIn: 'root'` and injectable
- [ ] `getUsers()` calls `GET /api/admin/users` with correct query params serialization
- [ ] `getUsers()` skips undefined/null/empty params
- [ ] `getUser()` calls `GET /api/admin/users/:userId`
- [ ] `createUser()` calls `POST /api/admin/users` with the request body
- [ ] `resetPassword()` calls `POST /api/admin/users/:userId/reset-password`
- [ ] `deactivateUser()` calls `PATCH /api/admin/users/:userId/deactivate`
- [ ] `reactivateUser()` calls `PATCH /api/admin/users/:userId/reactivate`
- [ ] All methods return correctly typed Observables
- [ ] All interfaces match the backend API contract from STORY-001
- [ ] Unit tests cover all 6 methods with `HttpTestingController`
- [ ] Unit tests verify HTTP method, URL, query params, and request body
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
