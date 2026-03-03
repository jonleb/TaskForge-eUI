# STORY-005: Backend — Seed Data Expansion

## Objectif

Enrichir les données de seed (`mock/db/db.json`) avec davantage de projets et de memberships pour rendre le portfolio réaliste lors des tests de pagination, recherche, tri et filtrage par statut.

---

## État actuel

### Projets (3)

| ID | Key | Name | Status |
|----|-----|------|--------|
| 1 | TF | TaskForge Core | active |
| 2 | DEMO | Demo Project | active |
| 3 | INFRA | Infrastructure | inactive |

### Utilisateurs : 26 (IDs 1–26)

Rôles globaux existants : 3 SUPER_ADMIN, 4 PROJECT_ADMIN, 3 PRODUCT_OWNER, 5 DEVELOPER, 4 REPORTER, 4 VIEWER, + divers inactifs.

### Project-members : 16 records

- TF (id=1) : 7 membres (users 2, 3, 4, 5, 6, 11, 15)
- DEMO (id=2) : 6 membres (users 2, 4, 10, 12, 13, 17)
- INFRA (id=3) : 3 membres (users 15, 16, 22)

---

## Données à ajouter

### Nouveaux projets (12)

| ID | Key | Name | Description | Status | created_by |
|----|-----|------|-------------|--------|------------|
| 4 | MOBILE | Mobile App | Cross-platform mobile application | active | 1 |
| 5 | API | API Gateway | Central API gateway and routing | active | 1 |
| 6 | DOCS | Documentation Portal | User and developer documentation | active | 2 |
| 7 | QA | Quality Assurance | Test automation and QA processes | active | 1 |
| 8 | SEC | Security Audit | Security review and compliance | active | 1 |
| 9 | DESIGN | Design System | UI/UX design tokens and guidelines | active | 2 |
| 10 | DATA | Data Pipeline | ETL and data processing workflows | active | 1 |
| 11 | LEGACY | Legacy Migration | Migration from legacy systems | inactive | 1 |
| 12 | POC | Proof of Concept | Experimental features and spikes | inactive | 2 |
| 13 | PERF | Performance Lab | Load testing and benchmarks | active | 1 |
| 14 | I18N | Internationalization | Multi-language support | active | 2 |
| 15 | ARCHIVE | Archived Project | Completed project — read-only | inactive | 1 |

Résultat : 15 projets total (11 actifs, 4 inactifs).

### Nouveaux project-members (~30 records)

Objectifs de distribution :
- Chaque nouveau projet a 2–4 membres.
- Les utilisateurs réguliers (`developer` id=4, `olivia.anderson` id=21, `diana.brown` id=11, `jack.martinez` id=17) sont membres de 4–6 projets chacun pour tester la pagination côté utilisateur normal.
- Varier les rôles projet (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER).
- Certains utilisateurs inactifs (id=7, 9) restent membres de projets pour vérifier que le filtre `is_active` sur les projets (pas les users) fonctionne correctement.

Distribution proposée :

| member_id | projectId | userId | role |
|-----------|-----------|--------|------|
| 17 | 4 | 18 | PROJECT_ADMIN |
| 18 | 4 | 4 | DEVELOPER |
| 19 | 4 | 17 | DEVELOPER |
| 20 | 4 | 14 | REPORTER |
| 21 | 5 | 15 | PROJECT_ADMIN |
| 22 | 5 | 11 | DEVELOPER |
| 23 | 5 | 22 | DEVELOPER |
| 24 | 5 | 5 | REPORTER |
| 25 | 6 | 2 | PROJECT_ADMIN |
| 26 | 6 | 12 | REPORTER |
| 27 | 6 | 6 | VIEWER |
| 28 | 7 | 25 | PROJECT_ADMIN |
| 29 | 7 | 4 | DEVELOPER |
| 30 | 7 | 11 | DEVELOPER |
| 31 | 8 | 18 | PROJECT_ADMIN |
| 32 | 8 | 17 | DEVELOPER |
| 33 | 9 | 2 | PROJECT_ADMIN |
| 34 | 9 | 16 | PRODUCT_OWNER |
| 35 | 9 | 13 | VIEWER |
| 36 | 10 | 15 | PROJECT_ADMIN |
| 37 | 10 | 4 | DEVELOPER |
| 38 | 10 | 22 | DEVELOPER |
| 39 | 11 | 18 | PROJECT_ADMIN |
| 40 | 11 | 11 | DEVELOPER |
| 41 | 12 | 2 | PROJECT_ADMIN |
| 42 | 12 | 17 | DEVELOPER |
| 43 | 13 | 25 | PROJECT_ADMIN |
| 44 | 13 | 4 | DEVELOPER |
| 45 | 14 | 2 | PROJECT_ADMIN |
| 46 | 14 | 11 | DEVELOPER |

Résultat : 46 project-members total.

### Couverture par utilisateur régulier (projets actifs visibles)

| User | ID | Projets actifs visibles |
|------|----|------------------------|
| developer | 4 | TF, DEMO, MOBILE, QA, DATA, PERF (6) |
| diana.brown | 11 | TF, API, QA, I18N (4) |
| jack.martinez | 17 | DEMO, MOBILE, SEC, POC* (3 actifs) |
| olivia.anderson | 21 | aucun (user inactif, ne peut pas se connecter) |

*POC est inactif → non visible pour les utilisateurs normaux.

---

## Modifications

### Fichier unique : `mock/db/db.json`

1. Ajouter 12 objets dans le tableau `projects` (IDs 4–15).
2. Ajouter 30 objets dans le tableau `project-members` (IDs 17–46).
3. Ne pas modifier les utilisateurs ni les projets/membres existants.

### Aucun changement de code

Pas de modification de `project_routes.js` ni d'autres fichiers source.

---

## Vérification

Après modification :
- `npm run test:mock` — tous les tests mock existants passent.
- `npm run test:ci` — tous les tests frontend existants passent.
- `git checkout mock/db/db.json` après les tests mock pour restaurer la DB.

---

## Critères d'acceptation

- [ ] Au moins 15 projets total dans les données de seed
- [ ] Mix de projets actifs et inactifs (≥ 3 inactifs)
- [ ] Plusieurs utilisateurs ont des memberships dans 4+ projets
- [ ] Les tests mock existants passent (`npm run test:mock`)
- [ ] Les tests frontend existants passent (`npm run test:ci`)
- [ ] Aucun changement de code — données uniquement
