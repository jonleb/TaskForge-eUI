# STORY-001 : Backend — Endpoints de mutation membership

## Objectif

Créer trois endpoints pour gérer les membres d'un projet : upsert (ajout/modification de rôle), suppression, et recherche de candidats. Accès réservé aux gestionnaires (SUPER_ADMIN global + PROJECT_ADMIN du projet).

## Code existant

- `mock/app/routes/project_routes.js` — contient `GET /api/projects`, `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members`, `POST /api/projects`, `PATCH /api/projects/:projectId`. Les 3 nouveaux endpoints s'ajoutent dans le même fichier, dans le bloc `db.then(db => { ... })`.
- `mock/app/middleware/authorize.js` — `requireProjectRole(db, ...roles)` vérifie le membership projet. SUPER_ADMIN bypass automatique (sets `req.projectRole = 'SUPER_ADMIN'`). `requireGlobalRole(...roles)` vérifie le rôle global.
- `mock/app/middleware/auth.js` — `authMiddleware` valide le JWT et set `req.user` avec `{ userId, username, role }`.
- `mock/db/db.json` — collection `project-members` (46 enregistrements, IDs string "1" à "46"). Collection `users` (26 enregistrements). Collection `projects` (14 enregistrements).
- `mock/app/routes/project_routes.test.js` — tests existants pour GET/POST/PATCH projects et GET members. Helper `getTokenFor(username)` disponible.

### Utilisateurs clés pour les tests

| Username | ID | Rôle global | Actif | Membership projet 1 (TF) |
|----------|-----|-------------|-------|---------------------------|
| `superadmin` | 1 | SUPER_ADMIN | ✓ | — (bypass) |
| `projectadmin` | 2 | PROJECT_ADMIN | ✓ | PROJECT_ADMIN |
| `developer` | 4 | DEVELOPER | ✓ | DEVELOPER |
| `viewer` | 6 | VIEWER | ✓ | VIEWER |
| `rachel.moore` | 23 | VIEWER | ✓ | aucun |
| `leo.lopez` | 24 | VIEWER | ✓ | aucun |
| `inactive_user` | 7 | DEVELOPER | ✗ | aucun |
| `alice.smith` | 8 | SUPER_ADMIN | ✓ | aucun |

## Plan d'implémentation

### 1. Ajouter `PUT /api/projects/:projectId/members` dans `project_routes.js`

Endpoint upsert : ajoute un nouveau membre ou met à jour le rôle d'un membre existant.

```
PUT /api/projects/:projectId/members
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN')
  Body: { userId: string, role: string }
```

#### Pipeline de traitement

```
1. Valider le body
   - userId requis (string non vide)
   - role requis, doit être dans ALL_PROJECT_ROLES

2. Vérifier que l'utilisateur cible existe et est actif
   - Chercher dans db.get('users').find({ id: userId })
   - Si non trouvé ou is_active === false → 400

3. Protection SUPER_ADMIN
   - Si l'utilisateur cible a role === 'SUPER_ADMIN' (rôle global)
     ET que le requêteur n'est PAS SUPER_ADMIN (req.user.role !== 'SUPER_ADMIN')
     → 403 "Cannot modify membership of a super administrator"

4. Upsert
   - Chercher membership existant: db.get('project-members').find({ projectId, userId })
   - Si existe: mettre à jour role → 200
   - Si n'existe pas: créer avec id auto-incrémenté, joined_at = now() → 201

5. Réponse: membre enrichi (même format que GET members)
   { id, userId, role, joined_at, firstName, lastName, email }
```

#### Réponses d'erreur

| Status | Condition | Body |
|--------|-----------|------|
| 400 | userId manquant | `{ "message": "userId is required" }` |
| 400 | role invalide | `{ "message": "Invalid role. Must be one of: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER" }` |
| 400 | Utilisateur inexistant ou inactif | `{ "message": "User not found or inactive" }` |
| 403 | PROJECT_ADMIN tente de muter un SUPER_ADMIN | `{ "message": "Cannot modify membership of a super administrator" }` |
| 403 | Rôle insuffisant (DEVELOPER, REPORTER, VIEWER) | `{ "message": "Forbidden" }` (via `requireProjectRole`) |

### 2. Ajouter `DELETE /api/projects/:projectId/members/:userId` dans `project_routes.js`

```
DELETE /api/projects/:projectId/members/:userId
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN')
```

#### Pipeline de traitement

```
1. Chercher le membership: db.get('project-members').find({ projectId, userId })
   - Si non trouvé → 404

2. Protection SUPER_ADMIN
   - Chercher l'utilisateur cible dans db.get('users')
   - Si role global === 'SUPER_ADMIN' ET requêteur n'est pas SUPER_ADMIN → 403

3. Supprimer l'enregistrement project-member
   - db.get('project-members').remove({ id: membership.id }).write()

4. Retourner 204 (no content)
```

#### Réponses d'erreur

| Status | Condition | Body |
|--------|-----------|------|
| 404 | Membership inexistant | `{ "message": "Member not found" }` |
| 403 | PROJECT_ADMIN tente de supprimer un SUPER_ADMIN | `{ "message": "Cannot modify membership of a super administrator" }` |
| 403 | Rôle insuffisant | `{ "message": "Forbidden" }` (via `requireProjectRole`) |

### 3. Ajouter `GET /api/projects/:projectId/members/candidates` dans `project_routes.js`

**Important** : cette route doit être déclarée AVANT `GET /api/projects/:projectId/members` pour éviter que Express interprète `candidates` comme un `:userId` param. Alternativement, la placer après le GET members existant mais avec le chemin complet `/api/projects/:projectId/members/candidates`.

```
GET /api/projects/:projectId/members/candidates?q=search
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN')
```

#### Pipeline de traitement

```
1. Extraire le paramètre q (query string)
   - Si absent ou longueur < 2 → retourner []

2. Récupérer les IDs des membres actuels du projet
   - db.get('project-members').filter({ projectId }).map('userId').value()

3. Chercher les utilisateurs actifs correspondants
   - db.get('users').value().filter(u =>
       u.is_active === true
       && !memberUserIds.includes(u.id)
       && (firstName, lastName ou email contient q, case-insensitive)
     )

4. Limiter à 10 résultats

5. Mapper vers le format de réponse (sans password)
   { id, firstName, lastName, email, role }
```

#### Réponses

| Status | Condition | Body |
|--------|-----------|------|
| 200 | Succès | `[{ id, firstName, lastName, email, role }]` (max 10) |
| 200 | q absent ou < 2 chars | `[]` |
| 403 | Rôle insuffisant | `{ "message": "Forbidden" }` |

### 4. Fonction helper : `enrichMember(db, member)`

Extraire la logique d'enrichissement (déjà présente dans GET members) en fonction réutilisable :

```javascript
function enrichMember(db, member) {
    const user = db.get('users').find({ id: member.userId }).value();
    return {
        id: member.id,
        userId: member.userId,
        role: member.role,
        joined_at: member.joined_at,
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
    };
}
```

Refactorer le GET members existant pour utiliser cette fonction.

### 5. Tests d'intégration dans `project_routes.test.js`

Ajouter 3 blocs `describe` :

#### `describe('PUT /api/projects/:projectId/members', ...)`

| # | Test | Utilisateur | Expected |
|---|------|-------------|----------|
| 1 | Ajout nouveau membre (201) | `superadmin` | 201, membre enrichi retourné, `joined_at` défini |
| 2 | Mise à jour rôle existant (200) | `superadmin` | 200, rôle mis à jour |
| 3 | userId manquant | `superadmin` | 400 |
| 4 | Rôle invalide | `superadmin` | 400 |
| 5 | Utilisateur inexistant | `superadmin` | 400 |
| 6 | Utilisateur inactif | `superadmin` | 400 |
| 7 | Protection SUPER_ADMIN : PROJECT_ADMIN tente de muter un SUPER_ADMIN | `projectadmin` | 403 |
| 8 | SUPER_ADMIN peut muter un autre SUPER_ADMIN | `superadmin` | 200 ou 201 |
| 9 | DEVELOPER reçoit 403 | `developer` | 403 |
| 10 | VIEWER reçoit 403 | `viewer` | 403 |
| 11 | Sans token | — | 401 |

**Note** : les tests qui mutent la DB (ajout/update) doivent utiliser des combinaisons projectId/userId qui n'interfèrent pas entre eux. Utiliser le projet 1 (TF) et des utilisateurs non-membres comme `rachel.moore` (id 23) ou `leo.lopez` (id 24).

#### `describe('DELETE /api/projects/:projectId/members/:userId', ...)`

| # | Test | Utilisateur | Expected |
|---|------|-------------|----------|
| 1 | Suppression réussie (204) | `superadmin` | 204 |
| 2 | Membre inexistant (404) | `superadmin` | 404 |
| 3 | Protection SUPER_ADMIN : PROJECT_ADMIN tente de supprimer un SUPER_ADMIN | `projectadmin` | 403 |
| 4 | DEVELOPER reçoit 403 | `developer` | 403 |
| 5 | Sans token | — | 401 |

**Note** : le test de suppression réussie doit d'abord ajouter un membre (via PUT) puis le supprimer, pour ne pas casser les données seed.

#### `describe('GET /api/projects/:projectId/members/candidates', ...)`

| # | Test | Utilisateur | Expected |
|---|------|-------------|----------|
| 1 | Recherche par prénom | `superadmin` | 200, résultats correspondants |
| 2 | Recherche par email | `superadmin` | 200, résultats correspondants |
| 3 | Exclut les membres existants | `superadmin` | 200, aucun membre actuel dans les résultats |
| 4 | Terme trop court (< 2 chars) | `superadmin` | 200, `[]` |
| 5 | Terme absent | `superadmin` | 200, `[]` |
| 6 | Max 10 résultats | `superadmin` | 200, `length <= 10` |
| 7 | Ne retourne pas les utilisateurs inactifs | `superadmin` | 200, pas d'utilisateur inactif |
| 8 | Ne retourne pas le password | `superadmin` | 200, `password` undefined |
| 9 | PROJECT_ADMIN du projet a accès | `projectadmin` | 200 |
| 10 | DEVELOPER reçoit 403 | `developer` | 403 |
| 11 | Sans token | — | 401 |

## Ordre de déclaration des routes

L'ordre dans `project_routes.js` est important pour Express. La route `candidates` doit être déclarée AVANT la route `GET /api/projects/:projectId/members` existante, sinon Express interprétera `candidates` comme la valeur du paramètre `:userId` (s'il existait) ou causera un conflit. Comme la route GET members existante n'a pas de paramètre après `/members`, il n'y a pas de conflit direct, mais par convention on place les routes plus spécifiques en premier.

Ordre recommandé dans le fichier :
```
GET  /api/projects
GET  /api/projects/:projectId
GET  /api/projects/:projectId/members/candidates  ← NOUVEAU
GET  /api/projects/:projectId/members              (existant)
PUT  /api/projects/:projectId/members              ← NOUVEAU
DELETE /api/projects/:projectId/members/:userId     ← NOUVEAU
POST /api/projects
PATCH /api/projects/:projectId
```

## Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `mock/app/routes/project_routes.js` | Ajouter 3 endpoints (PUT, DELETE, GET candidates) + helper `enrichMember()` |
| `mock/app/routes/project_routes.test.js` | Ajouter 3 blocs `describe` (~27 tests) |

## Critères d'acceptation

- [ ] PUT upsert crée un nouveau membre (201) avec `joined_at` et retourne le membre enrichi
- [ ] PUT upsert met à jour le rôle d'un membre existant (200) et retourne le membre enrichi
- [ ] PUT valide `userId` (utilisateur actif existant) — 400 sinon
- [ ] PUT valide `role` (enum valide) — 400 sinon
- [ ] PUT interdit la mutation de membership SUPER_ADMIN par un PROJECT_ADMIN — 403
- [ ] PUT autorise SUPER_ADMIN à muter un autre SUPER_ADMIN
- [ ] DELETE supprime le membership (204)
- [ ] DELETE retourne 404 si membership inexistant
- [ ] DELETE interdit la suppression de membership SUPER_ADMIN par un PROJECT_ADMIN — 403
- [ ] GET candidates retourne les utilisateurs actifs non-membres correspondant à la recherche
- [ ] GET candidates exclut les membres existants du projet
- [ ] GET candidates retourne max 10 résultats
- [ ] GET candidates retourne `[]` si `q` absent ou < 2 caractères
- [ ] GET candidates ne retourne pas les utilisateurs inactifs
- [ ] GET candidates ne retourne pas le champ `password`
- [ ] Seuls SUPER_ADMIN et PROJECT_ADMIN ont accès aux 3 endpoints (DEVELOPER/REPORTER/VIEWER → 403)
- [ ] Sans token → 401 sur les 3 endpoints
- [ ] Tests d'intégration couvrent tous les cas (~27 tests)
- [ ] Tous les tests mock server passent (`npm run test:mock`)
- [ ] DB restaurée après les tests (`git checkout mock/db/db.json`)
