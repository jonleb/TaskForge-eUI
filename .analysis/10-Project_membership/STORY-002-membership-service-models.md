# STORY-002 : Frontend — MembershipService et modèles

## Objectif

Ajouter les interfaces, la constante de rôles projet, et les méthodes de service nécessaires pour communiquer avec les 3 endpoints de mutation membership créés en STORY-001. Étendre le `ProjectService` existant et les modèles dans `project.models.ts`.

## Code existant

- `src/app/core/project/project.models.ts` — interfaces `Project`, `ProjectMember`, `CreateProjectPayload`, `UpdateProjectPayload`, `UserInfo`, `ProjectListParams`, `ProjectListResponse`. Pas encore de `UpsertMemberPayload`, `MemberCandidate`, ni de constante `PROJECT_ROLES`.
- `src/app/core/project/project.service.ts` — `ProjectService` avec `getProjects()`, `getProject()`, `getProjectMembers()`, `createProject()`, `updateProject()`, `getUser()`. Pas encore de méthodes `upsertMember()`, `removeMember()`, `searchCandidates()`.
- `src/app/core/project/index.ts` — barrel export. Doit exporter les nouveaux types.
- `src/app/core/project/project.service.spec.ts` — tests existants utilisant `HttpTestingController` + vitest. Pattern : `beforeEach` configure `TestBed` avec `provideHttpClient` + `provideHttpClientTesting`, `afterEach` appelle `httpMock.verify()`. Chaque méthode a son `describe` avec assertions sur URL, méthode HTTP, body, et réponse typée.

## Plan d'implémentation

### 1. Mettre à jour `src/app/core/project/project.models.ts`

Ajouter après les interfaces existantes :

```typescript
export interface UpsertMemberPayload {
    userId: string;
    role: string;
}

export interface MemberCandidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const PROJECT_ROLES = [
    'PROJECT_ADMIN',
    'PRODUCT_OWNER',
    'DEVELOPER',
    'REPORTER',
    'VIEWER',
] as const;

export type ProjectRole = typeof PROJECT_ROLES[number];
```

Notes :
- `PROJECT_ROLES` est un tuple `as const` pour permettre le typage strict.
- `ProjectRole` est un type union dérivé pour typer le champ `role` dans les payloads si nécessaire.
- `MemberCandidate` correspond au format retourné par `GET /api/projects/:projectId/members/candidates`.

### 2. Mettre à jour `src/app/core/project/project.service.ts`

Ajouter 3 méthodes au `ProjectService` existant :

```typescript
upsertMember(projectId: string, payload: UpsertMemberPayload): Observable<ProjectMember> {
    return this.http.put<ProjectMember>(
        `/api/projects/${projectId}/members`,
        payload
    );
}

removeMember(projectId: string, userId: string): Observable<void> {
    return this.http.delete<void>(
        `/api/projects/${projectId}/members/${userId}`
    );
}

searchCandidates(projectId: string, query: string): Observable<MemberCandidate[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<MemberCandidate[]>(
        `/api/projects/${projectId}/members/candidates`,
        { params }
    );
}
```

Ajouter les imports nécessaires dans la ligne d'import des modèles : `UpsertMemberPayload`, `MemberCandidate`.

### 3. Mettre à jour `src/app/core/project/index.ts`

Ajouter les exports :

```typescript
export {
    Project, ProjectMember, CreateProjectPayload, UpdateProjectPayload,
    UserInfo, ProjectListParams, ProjectListResponse,
    UpsertMemberPayload, MemberCandidate, PROJECT_ROLES, ProjectRole
} from './project.models';
```

### 4. Mettre à jour `src/app/core/project/project.service.spec.ts`

Ajouter 3 blocs `describe` pour les nouvelles méthodes, en suivant le pattern existant :

#### `describe('upsertMember()', ...)`

| # | Test | Assertion |
|---|------|-----------|
| 1 | Envoie PUT avec le bon URL et payload | `req.request.method === 'PUT'`, `req.request.body === payload`, URL = `/api/projects/1/members` |
| 2 | Retourne le membre enrichi | Réponse typée `ProjectMember` avec `firstName`, `role`, etc. |
| 3 | Propage les erreurs 400 | `err.status === 400` |
| 4 | Propage les erreurs 403 | `err.status === 403` |

#### `describe('removeMember()', ...)`

| # | Test | Assertion |
|---|------|-----------|
| 1 | Envoie DELETE avec le bon URL | `req.request.method === 'DELETE'`, URL = `/api/projects/1/members/4` |
| 2 | Propage les erreurs 404 | `err.status === 404` |
| 3 | Propage les erreurs 403 | `err.status === 403` |

#### `describe('searchCandidates()', ...)`

| # | Test | Assertion |
|---|------|-----------|
| 1 | Envoie GET avec le paramètre q | `req.request.method === 'GET'`, `req.request.params.get('q') === 'leo'`, URL = `/api/projects/1/members/candidates` |
| 2 | Retourne un tableau de `MemberCandidate` | Réponse typée avec `id`, `firstName`, `lastName`, `email`, `role` |
| 3 | Retourne un tableau vide | `[]` |

Mock data pour les tests :

```typescript
const mockCandidate: MemberCandidate = {
    id: '23',
    firstName: 'Rachel',
    lastName: 'Moore',
    email: 'rachel.moore@taskforge.local',
    role: 'VIEWER',
};
```

## Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `src/app/core/project/project.models.ts` | Ajouter `UpsertMemberPayload`, `MemberCandidate`, `PROJECT_ROLES`, `ProjectRole` |
| `src/app/core/project/project.service.ts` | Ajouter `upsertMember()`, `removeMember()`, `searchCandidates()` |
| `src/app/core/project/index.ts` | Exporter les nouveaux types |
| `src/app/core/project/project.service.spec.ts` | Ajouter ~10 tests pour les 3 nouvelles méthodes |

## Critères d'acceptation

- [ ] `UpsertMemberPayload` interface créée avec `userId` et `role`
- [ ] `MemberCandidate` interface créée avec `id`, `firstName`, `lastName`, `email`, `role`
- [ ] `PROJECT_ROLES` constante exportée (tuple `as const`)
- [ ] `ProjectRole` type union exporté
- [ ] `upsertMember()` appelle `PUT /api/projects/:projectId/members` avec le payload
- [ ] `removeMember()` appelle `DELETE /api/projects/:projectId/members/:userId`
- [ ] `searchCandidates()` appelle `GET /api/projects/:projectId/members/candidates?q=...`
- [ ] Barrel export (`index.ts`) mis à jour
- [ ] Tests unitaires couvrent les 3 méthodes (~10 tests)
- [ ] Tous les tests frontend passent (`npm run test:ci`)
- [ ] Build passe (`npx ng build --configuration=development`)
