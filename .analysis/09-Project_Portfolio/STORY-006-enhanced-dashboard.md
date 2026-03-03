# STORY-006: Frontend — Enhanced Project Dashboard

## Objectif

Améliorer le dashboard projet pour afficher des informations plus utiles : statut du projet, créateur (résolu depuis `created_by`), date de dernière mise à jour, et un tableau de membres remplaçant le simple compteur actuel.

---

## État actuel

### `DashboardComponent`

- Affiche : nom du projet (page header), clé, description, date de création, nombre de membres (compteur).
- Sections placeholder : "Recent Activity", "Open Tickets", "Sprint Progress" (Coming soon).
- Utilise `ProjectContextService.currentProject$` pour recevoir le projet courant.
- Appelle `ProjectService.getProjectMembers(projectId)` pour obtenir le nombre de membres.
- `OnPush` change detection, `DatePipe` pour le formatage des dates.
- 9 tests existants.

### Données disponibles

- `Project` : `id`, `key`, `name`, `description`, `created_by` (userId string), `created_at`, `updated_at`, `is_active`.
- `ProjectMember` : `id`, `userId`, `role`, `joined_at`, `firstName`, `lastName`, `email`.
- `GET /api/users/:userId` : retourne les détails d'un utilisateur (pour résoudre `created_by`).

### Composants eUI à utiliser

| Composant | Import | Usage |
|-----------|--------|-------|
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Badge statut Active/Inactive |
| `eui-table` | `EUI_TABLE` from `@eui/components/eui-table` | Tableau des membres |
| `EuiTemplateDirective` | from `@eui/components/directives` | Templates header/body du tableau |

---

## Modifications

### 1. `ProjectService` — ajouter `getUser(userId: string)`

Ajouter une méthode pour résoudre le `created_by` en nom d'utilisateur :

```typescript
getUser(userId: string): Observable<User> {
    return this.http.get<User>(`/api/users/${userId}`);
}
```

Ajouter une interface `User` minimale dans `project.models.ts` (ou réutiliser un type existant) :

```typescript
export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
```

Exporter depuis `index.ts`.

### 2. `DashboardComponent` — TypeScript

Modifications dans `dashboard.component.ts` :

- Importer `EUI_TABLE`, `EUI_CHIP`, `EuiTemplateDirective`.
- Ajouter propriétés :
  - `members: ProjectMember[]` (remplace `memberCount: number | null`).
  - `creatorName: string | null` — nom du créateur résolu.
  - `membersLoading: boolean` — état de chargement des membres.
- Modifier `loadMembers()` :
  - Stocker le tableau `members` au lieu de juste `members.length`.
  - Conserver `memberCount` comme getter calculé (`members.length`).
- Ajouter `loadCreator(userId: string)` :
  - Appelle `projectService.getUser(userId)`.
  - Stocke `creatorName = firstName + ' ' + lastName`.
  - En cas d'erreur : `creatorName = 'Unknown'`.
- Dans le subscribe de `currentProject$` : appeler `loadCreator(project.created_by)` en plus de `loadMembers()`.

### 3. `DashboardComponent` — Template HTML

Remplacer le template actuel par :

**Section métadonnées projet** (grille `<dl>`) :
- Key : `{{ project.key }}`
- Description : `{{ project.description || '—' }}`
- Status : `eui-chip` avec `euiSuccess`/`euiDanger` + texte "Active"/"Inactive" (même pattern que portfolio).
- Created by : `{{ creatorName ?? 'Loading…' }}`
- Created : `{{ project.created_at | date:'mediumDate' }}`
- Last updated : `{{ project.updated_at | date:'mediumDate' }}`

**Section tableau des membres** (remplace le compteur) :
- Titre `<h2>Team Members ({{ members.length }})</h2>` avec `aria-live="polite"`.
- `eui-table` avec colonnes : Name, Email, Role.
- `aria-label="Project team members"` sur le tableau.
- `scope="col"` sur les `<th>`, `data-col-label` sur les `<td>`.
- Template `noData` : message d'erreur ou "Loading…".
- `isAsync` + `[isLoading]="membersLoading"` pour l'état de chargement.

**Conserver les sections widgets placeholder** (inchangées).

### 4. `DashboardComponent` — SCSS

Ajouter styles pour la section membres :

```scss
.members-section {
    margin-top: 2rem;

    h2 {
        font-size: 1.1rem;
        margin: 0 0 1rem;
    }
}
```

### 5. Tests unitaires (~10 nouveaux tests)

| # | Test | Vérification |
|---|------|-------------|
| 1 | Affiche le chip "Active" pour un projet actif | `eui-chip` contient "Active" |
| 2 | Affiche le chip "Inactive" pour un projet inactif | `eui-chip` contient "Inactive" |
| 3 | Affiche le nom du créateur résolu | `creatorName` = "John Doe" |
| 4 | Affiche "Unknown" si la résolution du créateur échoue | `creatorName` = "Unknown" |
| 5 | Affiche la date `updated_at` formatée | HTML contient la date |
| 6 | Affiche le tableau des membres avec 3 lignes | 3 `<tr>` dans le body |
| 7 | Colonnes du tableau : Name, Email, Role | 3 `<th>` avec les bons labels |
| 8 | Affiche le nom complet (firstName + lastName) dans la colonne Name | "John Doe" |
| 9 | Gère l'erreur de chargement des membres | Message d'erreur affiché |
| 10 | `aria-label` présent sur le tableau des membres | Attribut vérifié |

### Tests existants à adapter

- Le test "should fetch and display member count" → adapter pour vérifier le tableau au lieu du compteur textuel.
- Le test "should display singular member" → peut être supprimé ou adapté (le tableau affiche les lignes, pas un compteur).
- Le test "should handle member fetch error" → adapter le message d'erreur.

---

## Fichiers modifiés

| Fichier | Type de modification |
|---------|---------------------|
| `src/app/core/project/project.models.ts` | Ajouter `UserInfo` |
| `src/app/core/project/project.service.ts` | Ajouter `getUser()` |
| `src/app/core/project/project.service.spec.ts` | Ajouter test pour `getUser()` |
| `src/app/core/project/index.ts` | Exporter `UserInfo` |
| `src/app/features/projects/dashboard/dashboard.component.ts` | Refactoring majeur |
| `src/app/features/projects/dashboard/dashboard.component.html` | Nouveau template |
| `src/app/features/projects/dashboard/dashboard.component.scss` | Styles membres |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Adapter + ~10 nouveaux tests |

---

## Accessibilité (a11y)

- [ ] Chip statut : texte "Active"/"Inactive" (pas couleur seule)
- [ ] Tableau membres : `aria-label`, `scope="col"`, `data-col-label`
- [ ] `aria-live="polite"` sur le compteur de membres dans le titre h2
- [ ] Hiérarchie de titres : h1 (page header) → h2 (Team Members, widgets)
- [ ] Pas de `<caption>` sur `eui-table` (utiliser `aria-label` — cf. pitfalls)

---

## Critères d'acceptation

- [ ] Le dashboard affiche le statut du projet (Active/Inactive) avec un chip coloré + texte
- [ ] Le nom du créateur est résolu et affiché (ou "Unknown" en cas d'erreur)
- [ ] La date de dernière mise à jour est affichée
- [ ] Les membres sont affichés dans un tableau (Name, Email, Role)
- [ ] États de chargement et d'erreur gérés pour les membres et le créateur
- [ ] Les tests existants adaptés passent
- [ ] ~10 nouveaux tests ajoutés
- [ ] `npm run test:ci` — tous les tests passent
- [ ] `npx ng build --configuration=development` — build OK
