# FEATURE-010 Project Membership — Découpage en Stories

## Contexte

Cette feature permet aux gestionnaires autorisés (SUPER_ADMIN et PROJECT_ADMIN) de gérer les membres d'un projet : ajouter, modifier le rôle, et retirer des membres. Les utilisateurs non-gestionnaires peuvent voir les membres (déjà implémenté dans le Dashboard) mais ne peuvent pas les modifier.

L'application dispose actuellement de :
- Backend : `GET /api/projects/:projectId/members` (retourne les membres enrichis avec détails utilisateur), `requireProjectRole` middleware (SUPER_ADMIN bypass), `requireGlobalRole` middleware. Pas d'endpoints de mutation (add/update/remove).
- Backend : `GET /api/users` (retourne tous les utilisateurs, basique, sans pagination/recherche).
- Frontend : `DashboardComponent` affiche un tableau membres en lecture seule (Name, Email, Role). `ProjectService` a `getProjectMembers()`, `getUser()`. Interface `ProjectMember` existante.
- Routes projet : `projects.routes.ts` a `/:projectId` shell avec Dashboard enfant. Sidebar affiche Dashboard, Backlog, Board, Settings en contexte projet.
- Rôles projet gérés : `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER`.
- Seed data : 14 projets, 46 enregistrements project-members.
- `PermissionService` avec `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`.

## Composants eUI utilisés

| Composant | Import | Usage |
|-----------|--------|-------|
| `eui-table` | `EUI_TABLE` de `@eui/components/eui-table` | Tableau des membres |
| `eui-dialog` | `EuiDialogComponent` de `@eui/components/eui-dialog` | Dialogues ajout/modification/suppression |
| `eui-chip` | `EUI_CHIP` de `@eui/components/eui-chip` | Badge de rôle |
| `eui-icon-button` | de `@eui/components/eui-icon-button` | Boutons d'action par ligne |
| `eui-page` | `EUI_PAGE` de `@eui/components/eui-page` | Structure de page Members |
| `input[euiInputText]` | `EuiInputTextComponent` de `@eui/components/eui-input-text` | Champ recherche candidats |
| `select[euiSelect]` | de `@eui/components/eui-select` | Sélection de rôle |
| `label[euiLabel]` | de `@eui/components/eui-label` | Labels formulaire |
| `eui-feedback-message` | de `@eui/components/eui-feedback-message` | Erreurs inline |
| `EuiGrowlService` | de `@eui/core` | Notifications succès/erreur |

---

## Ordre d'exécution

Les stories doivent être implémentées dans cet ordre exact. Chaque story dépend de la précédente sauf indication contraire.

---

## STORY-001 : Backend — Endpoints de mutation membership

### Objectif
Créer les endpoints pour ajouter/modifier un membre (upsert), retirer un membre, et rechercher des candidats. Accès réservé aux gestionnaires (SUPER_ADMIN + PROJECT_ADMIN).

### Backend

1. Modifier `mock/app/routes/project_routes.js` — ajouter 3 endpoints :

   **PUT /api/projects/:projectId/members** (upsert)
   - Auth : `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')` (SUPER_ADMIN bypass via middleware).
   - Body : `{ userId: string, role: string }`.
   - Validation :
     - `userId` requis, doit correspondre à un utilisateur actif existant.
     - `role` requis, doit être dans `['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER']`.
     - Interdiction de muter un membership dont l'utilisateur cible a le rôle global `SUPER_ADMIN` (sauf si le requêteur est lui-même SUPER_ADMIN).
   - Comportement upsert :
     - Si le membre existe déjà : mettre à jour le `role`, retourner 200.
     - Si le membre n'existe pas : créer l'enregistrement avec `joined_at = now()`, retourner 201.
   - Réponse : le membre enrichi (même format que GET members).

   **DELETE /api/projects/:projectId/members/:userId**
   - Auth : `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')`.
   - Validation :
     - Le membership doit exister (sinon 404).
     - Interdiction de retirer un utilisateur dont le rôle global est `SUPER_ADMIN` (sauf si requêteur est SUPER_ADMIN).
   - Supprime l'enregistrement project-member.
   - Retourne 204 (no content).

   **GET /api/projects/:projectId/members/candidates?q=search**
   - Auth : `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')`.
   - Retourne les utilisateurs actifs (`is_active: true`) dont le `firstName`, `lastName` ou `email` correspond au terme de recherche `q` (case-insensitive, min 2 caractères).
   - Exclut les utilisateurs déjà membres du projet.
   - Réponse : `{ id, firstName, lastName, email, role }[]` (max 10 résultats).
   - Si `q` absent ou < 2 caractères : retourne `[]`.

2. Ajouter des tests d'intégration dans `mock/app/routes/project_routes.test.js` :
   - PUT upsert : ajout nouveau membre (201), mise à jour rôle existant (200), userId invalide (400), rôle invalide (400), protection SUPER_ADMIN (403), utilisateur inactif (400).
   - DELETE : suppression réussie (204), membre inexistant (404), protection SUPER_ADMIN (403).
   - GET candidates : recherche par nom/email, exclusion des membres existants, terme trop court retourne `[]`, max 10 résultats.
   - Accès non autorisé : DEVELOPER/REPORTER/VIEWER reçoivent 403 sur les 3 endpoints.

### Critères d'acceptation
- [ ] PUT upsert crée un nouveau membre (201) ou met à jour le rôle (200)
- [ ] PUT valide userId (utilisateur actif existant) et role (enum valide)
- [ ] PUT interdit la mutation de membership SUPER_ADMIN par un PROJECT_ADMIN
- [ ] DELETE supprime le membership (204)
- [ ] DELETE retourne 404 si membership inexistant
- [ ] DELETE interdit la suppression de membership SUPER_ADMIN par un PROJECT_ADMIN
- [ ] GET candidates retourne les utilisateurs actifs non-membres correspondant à la recherche
- [ ] GET candidates exclut les membres existants du projet
- [ ] GET candidates retourne max 10 résultats
- [ ] Seuls SUPER_ADMIN et PROJECT_ADMIN ont accès aux 3 endpoints
- [ ] Tests d'intégration couvrent tous les cas

---

## STORY-002 : Frontend — MembershipService et modèles

### Objectif
Créer le service frontend pour communiquer avec les nouveaux endpoints de membership.

### Frontend

1. Mettre à jour `src/app/core/project/project.models.ts` :
   - Ajouter `UpsertMemberPayload` : `{ userId: string, role: string }`.
   - Ajouter `MemberCandidate` : `{ id: string, firstName: string, lastName: string, email: string, role: string }`.
   - Ajouter constante `PROJECT_ROLES` : `['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER']`.

2. Mettre à jour `src/app/core/project/project.service.ts` — ajouter 3 méthodes :
   - `upsertMember(projectId: string, payload: UpsertMemberPayload): Observable<ProjectMember>`.
   - `removeMember(projectId: string, userId: string): Observable<void>`.
   - `searchCandidates(projectId: string, query: string): Observable<MemberCandidate[]>`.

3. Mettre à jour `src/app/core/project/index.ts` — exporter les nouveaux types.

4. Tests unitaires pour `ProjectService` :
   - `upsertMember` envoie PUT avec le bon payload.
   - `removeMember` envoie DELETE avec le bon URL.
   - `searchCandidates` envoie GET avec le paramètre `q`.

### Critères d'acceptation
- [ ] `UpsertMemberPayload` et `MemberCandidate` interfaces créées
- [ ] `PROJECT_ROLES` constante exportée
- [ ] `upsertMember()` appelle `PUT /api/projects/:projectId/members`
- [ ] `removeMember()` appelle `DELETE /api/projects/:projectId/members/:userId`
- [ ] `searchCandidates()` appelle `GET /api/projects/:projectId/members/candidates?q=...`
- [ ] Tests unitaires passent
- [ ] Build passe

---

## STORY-003 : Frontend — Page Members (tableau + route)

### Objectif
Créer une page Members dédiée sous le shell projet, avec un tableau listant les membres et leurs rôles. Les gestionnaires (SUPER_ADMIN, PROJECT_ADMIN) voient les boutons d'action. Cette page remplace la section membres du Dashboard.

### Frontend

1. Créer `src/app/features/projects/members/members.component.ts` :
   - Composant standalone, `OnPush`.
   - Injecte `ProjectContextService`, `ProjectService`, `PermissionService`, `ChangeDetectorRef`.
   - Propriétés : `members: ProjectMember[]`, `membersLoading`, `memberError`, `project: Project | null`.
   - Propriété calculée `isManager` : `true` si SUPER_ADMIN global OU si l'utilisateur courant a le rôle PROJECT_ADMIN dans le projet (vérifier via `req.projectRole` ou via la liste des membres).
   - Charge les membres via `projectService.getProjectMembers()` à l'init et quand le projet change.
   - Imports : `EUI_PAGE`, `EUI_TABLE`, `EUI_CHIP`, `EuiTemplateDirective`, `EuiIconButtonComponent`, `DatePipe`.

2. Créer `src/app/features/projects/members/members.component.html` :
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
           <table euiTable [data]="members" isAsync [isLoading]="membersLoading"
                  isTableResponsive aria-label="Project members">
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
                           @if (memberError) { Unable to load members. }
                           @else { No members found. }
                       </td>
                   </tr>
               </ng-template>
           </table>
       </eui-page-content>
   </eui-page>
   ```

3. Mettre à jour `src/app/features/projects/projects.routes.ts` :
   - Ajouter route enfant `{ path: 'members', component: MembersComponent }` sous `:projectId`.

4. Mettre à jour la sidebar dans `src/app/layout/layout.component.ts` — `buildSidebar()` :
   - Ajouter `{ label: 'Members', url: \`${base}/members\` }` après Dashboard.

5. Retirer la section membres du Dashboard (`dashboard.component.html` et `.ts`) :
   - Supprimer la section `<section class="members-section">` du template.
   - Supprimer les propriétés `members`, `membersLoading`, `memberError` et la méthode `loadMembers()` du composant.
   - Garder le reste du Dashboard intact (détails projet, widgets).

6. Tests unitaires :
   - Tableau affiche les membres (Name, Email, Role).
   - Boutons d'action visibles pour les gestionnaires, cachés pour les autres.
   - Bouton "Add Member" dans le header pour les gestionnaires.
   - État de chargement et d'erreur.
   - Route `members` accessible.

### Critères d'acceptation
- [ ] Page Members accessible via `/screen/projects/:projectId/members`
- [ ] Sidebar affiche le lien "Members"
- [ ] Tableau affiche Name, Email, Role pour chaque membre
- [ ] Colonne Actions visible uniquement pour SUPER_ADMIN et PROJECT_ADMIN
- [ ] Bouton "Add Member" dans le header pour les gestionnaires
- [ ] Section membres retirée du Dashboard
- [ ] États de chargement et d'erreur fonctionnels
- [ ] Markup accessible (aria-label, scope, data-col-label)
- [ ] Tests unitaires passent
- [ ] Build passe

---

## STORY-004 : Frontend — Dialogue d'ajout de membre

### Objectif
Permettre aux gestionnaires de rechercher un utilisateur candidat et de l'ajouter au projet avec un rôle sélectionné, via un dialogue.

### Frontend

1. Mettre à jour `src/app/features/projects/members/members.component.ts` :
   - Ajouter `@ViewChild('addDialog') addDialog: EuiDialogComponent`.
   - Ajouter propriétés : `candidates: MemberCandidate[]`, `candidateSearch: string`, `selectedCandidate: MemberCandidate | null`, `selectedRole: string`, `addError: string`.
   - `onCandidateSearch(term: string)` : si `term.length >= 2`, appeler `projectService.searchCandidates()` avec debounce 300ms. Sinon vider la liste.
   - `selectCandidate(candidate: MemberCandidate)` : sélectionner le candidat.
   - `openAddDialog()` : réinitialiser le formulaire, ouvrir le dialogue.
   - `onAddMember()` : appeler `projectService.upsertMember()` avec `selectedCandidate.id` et `selectedRole`. Succès : fermer dialogue, growl succès, recharger membres. Erreur : afficher message inline.
   - `resetAddForm()` : vider candidats, sélection, rôle, erreur.

2. Mettre à jour `src/app/features/projects/members/members.component.html` — ajouter le dialogue :
   ```html
   <eui-dialog #addDialog
       dialogTitle="Add Member"
       acceptLabel="Add"
       [isHandleCloseOnAccept]="true"
       (accept)="onAddMember()"
       (dismiss)="resetAddForm()">
       <div class="add-member-form">
           <label euiLabel for="candidateSearch">Search user</label>
           <input euiInputText id="candidateSearch"
               [(ngModel)]="candidateSearch"
               (ngModelChange)="onCandidateSearch($event)"
               placeholder="Type at least 2 characters..."
               aria-describedby="candidateSearchHelp" />
           <span id="candidateSearchHelp" class="eui-u-sr-only">
               Search by name or email to find users to add
           </span>

           @if (candidates.length > 0 && !selectedCandidate) {
               <ul class="candidate-list" role="listbox" aria-label="Search results">
                   @for (c of candidates; track c.id) {
                       <li role="option" tabindex="0"
                           (click)="selectCandidate(c)"
                           (keydown.enter)="selectCandidate(c)"
                           [attr.aria-selected]="false">
                           {{ c.firstName }} {{ c.lastName }} — {{ c.email }}
                       </li>
                   }
               </ul>
           }

           @if (selectedCandidate) {
               <div class="selected-candidate" aria-live="polite">
                   Selected: {{ selectedCandidate.firstName }} {{ selectedCandidate.lastName }}
                   ({{ selectedCandidate.email }})
               </div>
           }

           <label euiLabel for="roleSelect">Role</label>
           <select euiSelect id="roleSelect" [(ngModel)]="selectedRole"
                   aria-required="true">
               @for (r of projectRoles; track r) {
                   <option [value]="r">{{ r }}</option>
               }
           </select>

           @if (addError) {
               <eui-feedback-message type="error" aria-live="assertive">
                   {{ addError }}
               </eui-feedback-message>
           }
       </div>
   </eui-dialog>
   ```

3. Ajouter imports nécessaires : `FormsModule`, `EuiDialogComponent`, `EuiSelectComponent`, `EuiFeedbackMessageComponent`.

4. Tests unitaires :
   - Recherche candidats avec terme >= 2 caractères.
   - Sélection d'un candidat affiche son nom.
   - Ajout réussi ferme le dialogue, affiche growl, recharge les membres.
   - Erreur affiche message inline.
   - Formulaire réinitialisé à la fermeture.

### Critères d'acceptation
- [ ] Recherche de candidats fonctionne (min 2 caractères, debounce 300ms)
- [ ] Candidats déjà membres exclus des résultats
- [ ] Sélection d'un candidat affiche son nom
- [ ] Sélection de rôle parmi les 5 rôles projet
- [ ] Ajout réussi : ferme dialogue, growl succès, recharge membres
- [ ] Erreur : message inline dans le dialogue
- [ ] Formulaire réinitialisé à la fermeture/dismiss
- [ ] Accessibilité : labels, aria-required, listbox, keyboard navigation
- [ ] Tests unitaires passent
- [ ] Build passe

---

## STORY-005 : Frontend — Dialogue de changement de rôle

### Objectif
Permettre aux gestionnaires de modifier le rôle d'un membre existant via un dialogue de confirmation.

### Frontend

1. Mettre à jour `src/app/features/projects/members/members.component.ts` :
   - Ajouter `@ViewChild('changeRoleDialog') changeRoleDialog: EuiDialogComponent`.
   - Ajouter propriétés : `selectedMember: ProjectMember | null`, `newRole: string`, `changeRoleError: string`.
   - `openChangeRoleDialog(member: ProjectMember)` : stocker le membre, pré-remplir `newRole` avec le rôle actuel, ouvrir le dialogue.
   - `onChangeRole()` : appeler `projectService.upsertMember()` avec `selectedMember.userId` et `newRole`. Succès : fermer dialogue, growl succès, recharger membres. Erreur 403 (protection SUPER_ADMIN) : message inline. Autre erreur : growl erreur.
   - `resetChangeRoleForm()` : vider sélection et erreur.
   - Protection UI : si le membre cible a un rôle global SUPER_ADMIN et que l'utilisateur courant n'est pas SUPER_ADMIN, désactiver le bouton edit (`[euiDisabled]`).

2. Mettre à jour `src/app/features/projects/members/members.component.html` — ajouter le dialogue :
   ```html
   <eui-dialog #changeRoleDialog
       dialogTitle="Change Role"
       acceptLabel="Save"
       [isHandleCloseOnAccept]="true"
       (accept)="onChangeRole()"
       (dismiss)="resetChangeRoleForm()">
       @if (selectedMember) {
           <p>Change role for {{ selectedMember.firstName }} {{ selectedMember.lastName }}:</p>
           <label euiLabel for="newRoleSelect">New role</label>
           <select euiSelect id="newRoleSelect" [(ngModel)]="newRole"
                   aria-required="true">
               @for (r of projectRoles; track r) {
                   <option [value]="r">{{ r }}</option>
               }
           </select>
           @if (changeRoleError) {
               <eui-feedback-message type="error" aria-live="assertive">
                   {{ changeRoleError }}
               </eui-feedback-message>
           }
       }
   </eui-dialog>
   ```

3. Tests unitaires :
   - Dialogue s'ouvre avec le rôle actuel pré-sélectionné.
   - Changement de rôle réussi : ferme dialogue, growl, recharge.
   - Erreur 403 : message inline.
   - Formulaire réinitialisé à la fermeture.

### Critères d'acceptation
- [ ] Dialogue affiche le nom du membre et son rôle actuel pré-sélectionné
- [ ] Sélection parmi les 5 rôles projet
- [ ] Changement réussi : ferme dialogue, growl succès, recharge membres
- [ ] Erreur 403 (protection SUPER_ADMIN) : message inline
- [ ] Formulaire réinitialisé à la fermeture/dismiss
- [ ] Accessibilité : labels, aria-required
- [ ] Tests unitaires passent
- [ ] Build passe

---

## STORY-006 : Frontend — Suppression de membre avec confirmation

### Objectif
Permettre aux gestionnaires de retirer un membre du projet avec un dialogue de confirmation explicite.

### Frontend

1. Mettre à jour `src/app/features/projects/members/members.component.ts` :
   - Ajouter `@ViewChild('removeDialog') removeDialog: EuiDialogComponent`.
   - Ajouter propriétés : `memberToRemove: ProjectMember | null`, `removeError: string`.
   - `openRemoveDialog(member: ProjectMember)` : stocker le membre, ouvrir le dialogue.
   - `onRemoveMember()` : appeler `projectService.removeMember()` avec `projectId` et `memberToRemove.userId`. Succès : fermer dialogue, growl succès, recharger membres. Erreur 403 : message inline. Autre erreur : growl erreur.
   - `resetRemoveForm()` : vider sélection et erreur.
   - Protection UI : même logique que STORY-005 pour le bouton trash.

2. Mettre à jour `src/app/features/projects/members/members.component.html` — ajouter le dialogue :
   ```html
   <eui-dialog #removeDialog
       dialogTitle="Remove Member"
       acceptLabel="Remove"
       [isHandleCloseOnAccept]="true"
       (accept)="onRemoveMember()"
       (dismiss)="resetRemoveForm()">
       @if (memberToRemove) {
           <p>Are you sure you want to remove
              <strong>{{ memberToRemove.firstName }} {{ memberToRemove.lastName }}</strong>
              from this project?</p>
           <p>This action will revoke their access immediately.</p>
           @if (removeError) {
               <eui-feedback-message type="error" aria-live="assertive">
                   {{ removeError }}
               </eui-feedback-message>
           }
       }
   </eui-dialog>
   ```

3. Tests unitaires :
   - Dialogue affiche le nom du membre à retirer.
   - Suppression réussie : ferme dialogue, growl, recharge.
   - Erreur 403 : message inline.
   - Dismiss ferme sans action.

### Critères d'acceptation
- [ ] Dialogue de confirmation affiche le nom du membre
- [ ] Message explicite sur la révocation d'accès
- [ ] Suppression réussie : ferme dialogue, growl succès, recharge membres
- [ ] Erreur 403 (protection SUPER_ADMIN) : message inline
- [ ] Dismiss ferme le dialogue sans action
- [ ] Accessibilité : aria-live pour les erreurs
- [ ] Tests unitaires passent
- [ ] Build passe

---

## STORY-007 : Frontend — Détermination du rôle projet courant

### Objectif
Permettre au frontend de savoir si l'utilisateur courant est gestionnaire du projet (PROJECT_ADMIN ou SUPER_ADMIN) pour conditionner l'affichage des actions de mutation.

### Frontend

1. Mettre à jour `src/app/core/project/project-context.service.ts` (ou créer si nécessaire) :
   - Ajouter une propriété `currentUserProjectRole$: Observable<string | null>` qui émet le rôle projet de l'utilisateur courant.
   - Quand le projet change, chercher dans la liste des membres si l'utilisateur courant est membre et extraire son rôle.
   - Exposer `isProjectManager$: Observable<boolean>` = `true` si SUPER_ADMIN global OU PROJECT_ADMIN dans le projet.

2. Alternative plus simple : dans `MembersComponent`, après chargement des membres, vérifier si l'utilisateur courant (via `AuthService.currentUser`) est dans la liste avec rôle PROJECT_ADMIN, ou si `permissionService.isSuperAdmin()`.

3. Tests unitaires :
   - `isManager` = true pour SUPER_ADMIN.
   - `isManager` = true pour PROJECT_ADMIN du projet.
   - `isManager` = false pour DEVELOPER, REPORTER, VIEWER.
   - `isManager` = false pour un non-membre.

### Note
Cette story peut être intégrée directement dans STORY-003 si la logique reste simple (vérification locale dans le composant). Elle est séparée ici pour clarté, mais l'implémentation peut être fusionnée.

### Critères d'acceptation
- [ ] `isManager` correctement déterminé selon le rôle global et le rôle projet
- [ ] SUPER_ADMIN toujours gestionnaire
- [ ] PROJECT_ADMIN du projet est gestionnaire
- [ ] Autres rôles ne sont pas gestionnaires
- [ ] Tests unitaires passent

---

## Graphe de dépendances

```
STORY-001 (Backend — Endpoints mutation)
    └── STORY-002 (Frontend — Service + modèles)
            └── STORY-003 (Frontend — Page Members + route + sidebar)
                    ├── STORY-004 (Frontend — Dialogue ajout membre)
                    ├── STORY-005 (Frontend — Dialogue changement rôle)
                    └── STORY-006 (Frontend — Dialogue suppression membre)

STORY-007 (Détermination rôle projet) — intégrable dans STORY-003
```

## Notes techniques

- Le pattern upsert (PUT) simplifie la logique : un seul endpoint pour ajouter et modifier. Le frontend distingue visuellement les deux cas (dialogue "Add" vs dialogue "Change Role") mais le backend traite les deux de la même façon.
- La recherche de candidats (`GET .../candidates?q=`) exclut les membres existants côté serveur pour éviter les doublons dans l'UI.
- La protection SUPER_ADMIN est double : côté backend (403 si PROJECT_ADMIN tente de muter un SUPER_ADMIN) et côté UI (boutons désactivés via `[euiDisabled]`).
- `eui-dialog` capture `[acceptLabel]` à la création de l'overlay. Pour les dialogues avec label dynamique, setter la propriété avant `openDialog()` et forcer `cdr.detectChanges()`.
- `eui-icon-button` utilise `[euiDisabled]` et non `[disabled]`.
- Les icônes utilisent le format eUI : `icon="eui-edit"`, `icon="eui-trash"`.
- Le bouton "Add Member" est placé dans `<eui-page-header-action-items>` (pas dans `<eui-page-content>`).
- `eui-table` supprime `<caption>` — utiliser `aria-label` sur l'élément table.
- La section membres du Dashboard est retirée dans STORY-003 et remplacée par un lien "Members" dans la sidebar.
- `FormsModule` est nécessaire pour `ngModel` dans les dialogues (recherche candidats, sélection rôle).
- Le composant Members utilise `OnPush` + `cdr.markForCheck()` dans les callbacks async.
