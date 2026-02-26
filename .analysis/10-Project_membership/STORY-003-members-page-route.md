# STORY-003 : Frontend — Page Members (tableau + route)

## Objectif

Créer une page Members dédiée sous le shell projet, avec un tableau listant les membres et leurs rôles. Les gestionnaires (SUPER_ADMIN global ou PROJECT_ADMIN du projet) voient les boutons d'action (edit, delete) et le bouton "Add Member". Ajouter la route et le lien sidebar. Retirer la section membres du Dashboard.

## Code existant

- `src/app/features/projects/projects.routes.ts` — route `:projectId` avec `ProjectShellComponent` et enfant `DashboardComponent` sur `''`. Pas de route `members`.
- `src/app/layout/layout.component.ts` — `buildSidebar()` construit la sidebar projet avec Dashboard, Backlog, Board, Settings. Pas de lien Members.
- `src/app/features/projects/dashboard/dashboard.component.ts` — charge les membres via `projectService.getProjectMembers()`, affiche un tableau Name/Email/Role. Propriétés : `members`, `membersLoading`, `memberError`, `loadMembers()`.
- `src/app/features/projects/dashboard/dashboard.component.html` — section `<section class="members-section">` avec `<h2>Team Members (count)</h2>` et `<table euiTable>`.
- `src/app/features/projects/dashboard/dashboard.component.spec.ts` — 20 tests dont ~8 testent la section membres (load, display, error, aria-label, count).
- `src/app/core/project/project-context.service.ts` — `currentProject$` observable, `getCurrentProject()`.
- `src/app/core/auth/permission.service.ts` — `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`.
- `src/app/core/project/project.models.ts` — `ProjectMember`, `PROJECT_ROLES`.
- `src/app/core/project/project.service.ts` — `getProjectMembers()`, `upsertMember()`, `removeMember()`, `searchCandidates()`.

## Plan d'implémentation

### 1. Créer `src/app/features/projects/members/members.component.ts`

Composant standalone, `OnPush`.

```typescript
@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP,
        EuiTemplateDirective, EuiIconButtonComponent,
        EuiButtonDirective, EuiPrimaryDirective,
    ],
})
```

Injections : `ProjectContextService`, `ProjectService`, `PermissionService`, `ChangeDetectorRef`, `AuthService`.

Propriétés :
- `project: Project | null = null`
- `members: ProjectMember[] = []`
- `membersLoading = false`
- `memberError = false`
- `isManager = false` — `true` si SUPER_ADMIN global OU si l'utilisateur courant est PROJECT_ADMIN dans la liste des membres

Logique `ngOnInit` :
- S'abonner à `projectContext.currentProject$` (filter non-null).
- Quand le projet change : stocker, charger les membres, déterminer `isManager`.

Méthode `loadMembers(projectId)` :
- Appeler `projectService.getProjectMembers(projectId)`.
- Au succès : stocker les membres, déterminer `isManager` (chercher l'utilisateur courant dans la liste, vérifier si son rôle est PROJECT_ADMIN, ou si `permissionService.isSuperAdmin()`).
- À l'erreur : `memberError = true`.

Méthodes placeholder (implémentées dans STORY-004/005/006) :
- `openAddDialog()` — vide pour l'instant
- `openChangeRoleDialog(member: ProjectMember)` — vide
- `openRemoveDialog(member: ProjectMember)` — vide

### 2. Créer `src/app/features/projects/members/members.component.html`

```html
<eui-page>
    <eui-page-header label="Members">
        @if (isManager) {
            <eui-page-header-action-items>
                <button euiButton euiPrimary (click)="openAddDialog()">Add Member</button>
            </eui-page-header-action-items>
        }
    </eui-page-header>
    <eui-page-content>
        <table euiTable
               [data]="members"
               isAsync
               [isLoading]="membersLoading"
               isTableResponsive
               aria-label="Project members">

            <ng-template euiTemplate="header">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    @if (isManager) {
                        <th scope="col">Actions</th>
                    }
                </tr>
            </ng-template>

            <ng-template let-row euiTemplate="body">
                <tr>
                    <td data-col-label="Name">{{ row.firstName }} {{ row.lastName }}</td>
                    <td data-col-label="Email">{{ row.email }}</td>
                    <td data-col-label="Role">
                        <eui-chip euiSizeS [ariaLabel]="row.role">{{ row.role }}</eui-chip>
                    </td>
                    @if (isManager) {
                        <td data-col-label="Actions">
                            <eui-icon-button icon="eui-edit"
                                [attr.aria-label]="'Change role of ' + row.firstName + ' ' + row.lastName"
                                (click)="openChangeRoleDialog(row)">
                            </eui-icon-button>
                            <eui-icon-button icon="eui-trash"
                                [attr.aria-label]="'Remove ' + row.firstName + ' ' + row.lastName"
                                (click)="openRemoveDialog(row)">
                            </eui-icon-button>
                        </td>
                    }
                </tr>
            </ng-template>

            <ng-template euiTemplate="noData">
                <tr>
                    <td class="eui-u-text-center" [attr.colspan]="isManager ? 4 : 3">
                        @if (memberError) {
                            Unable to load members.
                        } @else {
                            No members found.
                        }
                    </td>
                </tr>
            </ng-template>
        </table>
    </eui-page-content>
</eui-page>
```

### 3. Créer `src/app/features/projects/members/members.component.scss`

Minimal — espacement entre les boutons d'action si nécessaire :
```scss
eui-icon-button + eui-icon-button {
    margin-left: 0.25rem;
}
```

### 4. Mettre à jour `src/app/features/projects/projects.routes.ts`

Ajouter la route enfant `members` sous `:projectId` :

```typescript
import { MembersComponent } from './members/members.component';

export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'members', component: MembersComponent },
        ],
    },
];
```

### 5. Mettre à jour `src/app/layout/layout.component.ts` — `buildSidebar()`

Ajouter le lien Members après Dashboard :

```typescript
private buildSidebar(project: Project | null): void {
    if (project) {
        const base = `screen/projects/${project.id}`;
        this.sidebarItems = [
            { label: '← All Projects', url: 'screen/projects' },
            { label: 'Dashboard', url: base },
            { label: 'Members', url: `${base}/members` },
            { label: 'Backlog', url: `${base}/backlog` },
            { label: 'Board', url: `${base}/board` },
            { label: 'Settings', url: `${base}/settings` },
        ];
    } else {
        this.filterSidebarItems();
    }
}
```

### 6. Retirer la section membres du Dashboard

**`dashboard.component.html`** — supprimer toute la `<section class="members-section">...</section>`.

**`dashboard.component.ts`** — supprimer :
- Propriétés : `members`, `membersLoading`, `memberError`
- Méthode : `loadMembers()`
- L'appel `this.loadMembers(project.id)` dans le subscribe
- L'import `EUI_TABLE` et `EuiTemplateDirective` (plus utilisés)
- L'import `ProjectMember` du modèle (plus utilisé)

Garder : `project`, `creatorName`, `loadCreator()`, `EUI_PAGE`, `EUI_CHIP`, `DatePipe`.

**`dashboard.component.spec.ts`** — supprimer les tests qui référencent la section membres :
- `should load members when project is set`
- `should display member names in table`
- `should display member emails in table`
- `should display member roles in table`
- `should have aria-label on members table`
- `should show member count in heading`
- `should set memberError on members fetch failure`

Garder les tests de détails projet, creator, breadcrumb, chips, etc. (~13 tests restants).

### 7. Créer `src/app/features/projects/members/members.component.spec.ts`

Tests unitaires (~15 tests) :

| # | Test | Assertion |
|---|------|-----------|
| 1 | should create | composant créé |
| 2 | should load members when project is set | `getProjectMembers` appelé, `members` peuplé |
| 3 | should display member names in table | `td[data-col-label="Name"]` contient les noms |
| 4 | should display member emails in table | `td[data-col-label="Email"]` contient les emails |
| 5 | should display member roles as chips | `eui-chip` contient le rôle |
| 6 | should have aria-label on table | `table[aria-label="Project members"]` |
| 7 | should have scope="col" on headers | `th[scope="col"]` |
| 8 | should show "Add Member" button for SUPER_ADMIN | bouton visible |
| 9 | should show action buttons for SUPER_ADMIN | `eui-icon-button` visible |
| 10 | should hide "Add Member" button for non-manager | bouton absent |
| 11 | should hide action column for non-manager | pas de `th` Actions |
| 12 | should show action buttons for PROJECT_ADMIN member | bouton visible quand l'utilisateur est PROJECT_ADMIN dans le projet |
| 13 | should set memberError on fetch failure | `memberError = true` |
| 14 | should show error message in noData template | texte "Unable to load members" |
| 15 | should show "No members found" when empty | texte affiché |

Mock setup :
- `ProjectContextService` : `currentProject$` = `BehaviorSubject`
- `ProjectService` : `getProjectMembers` = `vi.fn().mockReturnValue(of(mockMembers))`
- `PermissionService` : `isSuperAdmin()` = `vi.fn()`
- `AuthService` : `currentUser` avec `userId` pour la vérification du rôle projet

### 8. Mettre à jour `src/app/layout/layout.component.spec.ts`

Mettre à jour le test `should switch to project-scoped sidebar when a project is set` pour vérifier que "Members" est dans la liste :

```typescript
expect(labels).toContain('Members');
```

Mettre à jour le test `should build correct project-scoped URLs` pour vérifier l'URL members :

```typescript
expect(urls).toContain('screen/projects/42/members');
```

## Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `src/app/features/projects/members/members.component.ts` | Nouveau — composant Members |
| `src/app/features/projects/members/members.component.html` | Nouveau — template |
| `src/app/features/projects/members/members.component.scss` | Nouveau — styles minimaux |
| `src/app/features/projects/members/members.component.spec.ts` | Nouveau — ~15 tests |
| `src/app/features/projects/projects.routes.ts` | Ajouter route `members` |
| `src/app/layout/layout.component.ts` | Ajouter "Members" dans `buildSidebar()` |
| `src/app/layout/layout.component.spec.ts` | Mettre à jour 2 tests sidebar |
| `src/app/features/projects/dashboard/dashboard.component.ts` | Retirer membres (propriétés, méthode, imports) |
| `src/app/features/projects/dashboard/dashboard.component.html` | Retirer section membres |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Retirer ~7 tests membres |

## Critères d'acceptation

- [ ] Page Members accessible via `/screen/projects/:projectId/members`
- [ ] Sidebar affiche le lien "Members" entre Dashboard et Backlog
- [ ] Tableau affiche Name, Email, Role (chip) pour chaque membre
- [ ] Colonne Actions visible uniquement pour SUPER_ADMIN et PROJECT_ADMIN
- [ ] Bouton "Add Member" dans `eui-page-header-action-items` pour les gestionnaires
- [ ] Boutons edit/trash avec `icon="eui-edit"` / `icon="eui-trash"` et `aria-label`
- [ ] Section membres retirée du Dashboard
- [ ] Dashboard conserve les détails projet, creator, widgets
- [ ] États de chargement et d'erreur fonctionnels
- [ ] Markup accessible : `aria-label` sur table, `scope="col"`, `data-col-label`
- [ ] `isManager` = true pour SUPER_ADMIN global OU PROJECT_ADMIN du projet
- [ ] `isManager` = false pour DEVELOPER, REPORTER, VIEWER
- [ ] Tests unitaires Members (~15 tests) passent
- [ ] Tests Dashboard mis à jour (~13 tests) passent
- [ ] Tests Layout mis à jour passent
- [ ] Tous les tests frontend passent (`npm run test:ci`)
- [ ] Build passe (`npx ng build --configuration=development`)
