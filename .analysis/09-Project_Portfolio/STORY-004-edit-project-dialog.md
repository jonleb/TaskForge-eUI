# STORY-004: Frontend — Edit Project Settings Dialog

## Objectif

Permettre aux utilisateurs SUPER_ADMIN de modifier le nom et la description d'un projet via un dialogue d'édition accessible depuis la table du portfolio. La clé du projet est affichée en lecture seule (immuable). Utilise le endpoint existant `PATCH /api/projects/:projectId`.

---

## Prérequis

- STORY-003 terminée (table portfolio avec colonnes Status, filtre, pagination, recherche, tri).
- Endpoint `PATCH /api/projects/:projectId` déjà implémenté dans `mock/app/routes/project_routes.js`.

---

## Modifications

### 1. Modèles — `src/app/core/project/project.models.ts`

Ajouter l'interface :

```ts
export interface UpdateProjectPayload {
    name?: string;
    description?: string;
}
```

### 2. Barrel export — `src/app/core/project/index.ts`

Ajouter `UpdateProjectPayload` à la ligne d'export des modèles.

### 3. Service — `src/app/core/project/project.service.ts`

Ajouter la méthode :

```ts
updateProject(projectId: string, payload: UpdateProjectPayload): Observable<Project> {
    return this.http.patch<Project>(`/api/projects/${projectId}`, payload);
}
```

### 4. Service spec — `src/app/core/project/project.service.spec.ts`

Ajouter un test :
- `updateProject()` envoie PATCH avec le bon payload et retourne le projet mis à jour.

### 5. Composant — `src/app/features/projects/portfolio/portfolio.component.ts`

Ajouts :
- Import `EuiIconButtonComponent` depuis `@eui/components/eui-icon-button`.
- Ajouter `EuiIconButtonComponent` au tableau `imports`.
- `@ViewChild('editDialog') editDialog!: EuiDialogComponent;`
- `editForm: FormGroup` — champs `name` (required, minLength 2), `description` (optionnel).
- `selectedProject: Project | null = null` — projet en cours d'édition.
- `editError: string = ''` — message d'erreur inline (409).
- `openEditDialog(project: Project)` — peuple le formulaire avec les valeurs du projet, ouvre le dialogue.
- `onUpdateProject()` — valide le formulaire, appelle `projectService.updateProject()`, gère succès/erreur.
- `resetEditForm()` — réinitialise le formulaire et l'erreur au dismiss.

Comportement `onUpdateProject()` :
- Succès : ferme le dialogue, growl success `"{name} has been updated."`, recharge la liste.
- Erreur 409 : affiche `editError` inline (nom dupliqué).
- Autre erreur : growl error.

### 6. Template — `src/app/features/projects/portfolio/portfolio.component.html`

Colonne Actions — ajouter un bouton edit (SUPER_ADMIN uniquement) :

```html
<td data-col-label="Actions">
    @if (isSuperAdmin) {
        <eui-icon-button
            icon="edit"
            size="s"
            [ariaLabel]="'Edit ' + row.name"
            (buttonClick)="openEditDialog(row)">
        </eui-icon-button>
    }
    <button euiButton euiSecondary
            type="button"
            [attr.aria-label]="'Open ' + row.name"
            (click)="onOpenProject(row)">
        Open
    </button>
</td>
```

Dialogue d'édition (après le dialogue de création existant) :

```html
<eui-dialog #editDialog
    [title]="'Edit Project'"
    [acceptLabel]="'Save'"
    [width]="'500px'"
    [isHandleCloseOnAccept]="true"
    (accept)="onUpdateProject()"
    (dismiss)="resetEditForm()">

    <form [formGroup]="editForm" id="edit-project-form">
        @if (editError) {
            <eui-feedback-message euiDanger class="eui-u-mb-m" aria-live="polite">
                {{ editError }}
            </eui-feedback-message>
        }

        <!-- Key — lecture seule (texte, pas un input) -->
        <div euiInputGroup>
            <label euiLabel>Key</label>
            <p class="eui-u-f-bold">{{ selectedProject?.key }}</p>
        </div>

        <!-- Name — requis -->
        <div euiInputGroup>
            <label euiLabel [euiRequired]="true" for="ep-name">Name</label>
            <input euiInputText id="ep-name" formControlName="name"
                   aria-required="true"
                   [attr.aria-describedby]="editForm.get('name')?.invalid && editForm.get('name')?.touched ? 'ep-name-err' : null" />
            @if (editForm.get('name')?.invalid && editForm.get('name')?.touched) {
                <eui-feedback-message euiDanger id="ep-name-err">
                    @if (editForm.get('name')?.errors?.['required']) {
                        Project name is required
                    } @else {
                        Name must be at least 2 characters
                    }
                </eui-feedback-message>
            }
        </div>

        <!-- Description — optionnel -->
        <div euiInputGroup>
            <label euiLabel for="ep-description">Description</label>
            <textarea euiTextArea id="ep-description" formControlName="description"
                      rows="3"></textarea>
        </div>
    </form>
</eui-dialog>
```

### 7. Tests unitaires — `portfolio.component.spec.ts`

Nouveaux tests (~8) :

| # | Test | Détail |
|---|------|--------|
| 1 | Edit icon visible pour SUPER_ADMIN | Vérifier `eui-icon-button[icon="edit"]` présent dans le DOM |
| 2 | Edit icon masqué pour utilisateur normal | Vérifier absence du bouton |
| 3 | `openEditDialog()` peuple le formulaire | Appeler la méthode, vérifier `editForm.value` et `selectedProject` |
| 4 | Clé affichée en lecture seule | Vérifier que le texte de la clé est rendu (pas un input) |
| 5 | Update réussi — ferme dialogue, growl, recharge | Mock `updateProject` → `of(updatedProject)`, vérifier growl success + `getProjects` appelé |
| 6 | Erreur 409 — message inline | Mock `updateProject` → `throwError(409)`, vérifier `editError` |
| 7 | Autre erreur — growl error | Mock `updateProject` → `throwError(500)`, vérifier growl error |
| 8 | `resetEditForm()` réinitialise | Vérifier form reset + `editError = ''` + `selectedProject = null` |

### 8. Tests service — `project.service.spec.ts`

Ajouter 1 test :
- `updateProject()` envoie `PATCH /api/projects/:id` avec payload et retourne le projet.

---

## Composants eUI utilisés

| Composant | Import | Usage |
|-----------|--------|-------|
| `eui-icon-button` | `EuiIconButtonComponent` de `@eui/components/eui-icon-button` | Bouton edit dans la colonne Actions |
| `eui-dialog` | `EuiDialogComponent` de `@eui/components/eui-dialog` | Dialogue d'édition |
| `eui-feedback-message` | `EUI_FEEDBACK_MESSAGE` de `@eui/components/eui-feedback-message` | Erreurs inline |
| `input[euiInputText]` | `EuiInputTextComponent` de `@eui/components/eui-input-text` | Champ Name |
| `textarea[euiTextArea]` | `EuiTextareaComponent` de `@eui/components/eui-textarea` | Champ Description |
| `label[euiLabel]` | `EUI_LABEL` de `@eui/components/eui-label` | Labels formulaire |
| `EuiGrowlService` | de `@eui/core` | Notifications succès/erreur |

---

## Accessibilité

- `aria-label="Edit {project.name}"` sur chaque bouton icon.
- `aria-required="true"` sur le champ Name.
- `aria-describedby` liant le champ Name à son message d'erreur.
- `aria-live="polite"` sur le feedback message d'erreur inline.
- Labels avec `for`/`id` sur tous les champs du formulaire.
- Clé affichée en texte (pas un input disabled) pour éviter la confusion.
- Le dialogue est navigable au clavier (Tab, Enter, Escape) — géré nativement par `eui-dialog`.

---

## Critères d'acceptation

- [ ] SUPER_ADMIN voit le bouton edit sur chaque ligne
- [ ] Utilisateurs normaux ne voient pas le bouton edit
- [ ] Le dialogue affiche la clé en lecture seule (texte)
- [ ] Nom et description sont éditables
- [ ] Update réussi ferme le dialogue, affiche growl success, recharge la liste
- [ ] Conflit 409 affiche un message d'erreur inline
- [ ] Autres erreurs affichent un growl error
- [ ] Le formulaire se réinitialise au dismiss
- [ ] Tests unitaires passent (`npm run test:ci`)
- [ ] Build passe (`npx ng build --configuration=development`)
