# STORY-000: Seed Backlog Data — 10 Tickets per Project (API, TF, DEMO)

## Goal

Populate the mock database with 10 backlog items per project for API Gateway (id=5, key=API), TaskForge Core (id=1, key=TF), and Demo Project (id=2, key=DEMO). This provides realistic test data with varied types, statuses, priorities, and assignees to exercise the new filter/card UI.

## Existing Data

Each project currently has only 1 item: the auto-seeded "Maintenance" EPIC (ticket_number=1) created by the bootstrap service. The last backlog-item ID in db.json is `"16"`.

### Project members (for assignee_id)

**TF (projectId=1):** userId 2 (PROJECT_ADMIN), 3 (PRODUCT_OWNER), 4 (DEVELOPER), 5 (REPORTER), 6 (VIEWER), 11 (DEVELOPER), 15 (PROJECT_ADMIN)

**DEMO (projectId=2):** userId 2 (PROJECT_ADMIN), 10 (PRODUCT_OWNER), 17 (DEVELOPER), 12 (REPORTER), 13 (VIEWER), 4 (DEVELOPER)

**API (projectId=5):** userId 15 (PROJECT_ADMIN), 11 (DEVELOPER), 22 (DEVELOPER), 5 (REPORTER)

## Seed Data

### TF (projectId=1) — 9 new items (ticket_number 2–10, existing Maintenance EPIC is #1)

| id | ticket_number | type | title | description | status | priority | assignee_id |
|----|---------------|------|-------|-------------|--------|----------|-------------|
| 17 | 2 | STORY | Implement user authentication flow | Add login, logout, and session management for all user roles | IN_PROGRESS | HIGH | 11 |
| 18 | 3 | BUG | Dashboard chart not rendering on Firefox | The pie chart on the dashboard page shows a blank area on Firefox 120+ | TO_DO | CRITICAL | null |
| 19 | 4 | TASK | Update project dependencies to latest versions | Run npm audit and upgrade all outdated packages | DONE | LOW | 4 |
| 20 | 5 | STORY | Add export to CSV for backlog items | Users should be able to export the current filtered backlog view as a CSV file | TO_DO | MEDIUM | 3 |
| 21 | 6 | BUG | Pagination resets when switching tabs | Navigating away from backlog and returning resets the page to 1 | IN_REVIEW | HIGH | 11 |
| 22 | 7 | TASK | Write unit tests for permission service | Cover all role-check branches in PermissionService | IN_PROGRESS | MEDIUM | 5 |
| 23 | 8 | STORY | Implement notification preferences | Allow users to configure email and in-app notification settings | TO_DO | LOW | null |
| 24 | 9 | BUG | Create ticket dialog does not clear on cancel | Reopening the create dialog after cancelling shows stale form data | DONE | HIGH | 2 |
| 25 | 10 | TASK | Set up CI pipeline for automated testing | Configure GitHub Actions to run test:ci and test:mock on every PR | IN_PROGRESS | MEDIUM | 15 |

### DEMO (projectId=2) — 9 new items (ticket_number 2–10)

| id | ticket_number | type | title | description | status | priority | assignee_id |
|----|---------------|------|-------|-------------|--------|----------|-------------|
| 26 | 2 | STORY | Create onboarding wizard for new users | Step-by-step guide that walks new users through project setup | IN_PROGRESS | HIGH | 17 |
| 27 | 3 | BUG | Sidebar menu flickers on page load | The sidebar briefly shows all items then collapses to the correct set | TO_DO | MEDIUM | null |
| 28 | 4 | TASK | Translate all labels to French | Complete the fr.json translation file for all existing i18n keys | DONE | LOW | 12 |
| 29 | 5 | STORY | Add dark mode support | Implement theme toggle using EuiThemeService for dark mode | TO_DO | MEDIUM | 10 |
| 30 | 6 | BUG | Member role dropdown shows wrong default | When editing a member role the dropdown pre-selects VIEWER instead of current role | IN_REVIEW | CRITICAL | 17 |
| 31 | 7 | TASK | Clean up unused CSS classes | Remove dead CSS from legacy components after the portfolio redesign | IN_PROGRESS | LOW | 4 |
| 32 | 8 | EPIC | Q1 2026 Feature Roadmap | Epic grouping all planned features for Q1 2026 delivery | TO_DO | null | 2 |
| 33 | 9 | STORY | Implement bulk ticket status update | Allow selecting multiple tickets and changing their status in one action | TO_DO | HIGH | null |
| 34 | 10 | BUG | Search filter does not reset on project switch | Switching projects keeps the previous search term active | DONE | MEDIUM | 10 |

### API (projectId=5) — 9 new items (ticket_number 2–10)

| id | ticket_number | type | title | description | status | priority | assignee_id |
|----|---------------|------|-------|-------------|--------|----------|-------------|
| 35 | 2 | STORY | Design rate limiting middleware | Implement token bucket rate limiter for all public API endpoints | IN_PROGRESS | CRITICAL | 11 |
| 36 | 3 | BUG | 502 errors on concurrent POST requests | Under load the gateway returns 502 for roughly 5% of POST requests | TO_DO | CRITICAL | 22 |
| 37 | 4 | TASK | Document all API endpoints in OpenAPI spec | Create a comprehensive openapi.yaml covering every route | DONE | MEDIUM | 5 |
| 38 | 5 | STORY | Add request/response logging | Log all incoming requests and outgoing responses with correlation IDs | IN_REVIEW | HIGH | 11 |
| 39 | 6 | BUG | Auth token refresh returns 401 instead of new token | The refresh endpoint rejects valid refresh tokens after server restart | TO_DO | HIGH | null |
| 40 | 7 | TASK | Migrate database schema to v2 | Run migration scripts to update the schema for the new membership model | IN_PROGRESS | MEDIUM | 22 |
| 41 | 8 | STORY | Implement webhook delivery system | Allow projects to register webhook URLs and receive event notifications | TO_DO | LOW | null |
| 42 | 9 | EPIC | API v2 Redesign | Epic for the complete API v2 overhaul including breaking changes | TO_DO | null | 15 |
| 43 | 10 | BUG | CORS headers missing on OPTIONS preflight | Browser preflight requests fail because OPTIONS responses lack CORS headers | DONE | HIGH | 11 |

## Implementation

Add the 27 new items to the `"backlog-items"` array in `mock/db/db.json`, right before the closing `]`. Each item follows the existing structure with `created_by` set to the assignee's userId (or `"system"` if unassigned) and `created_at` dates spread across Jan–Feb 2026.

## Files Changed

| File | Change |
|------|--------|
| `mock/db/db.json` | Add 27 backlog items (ids 17–43) |

## Acceptance Criteria

- [ ] TF project has 10 backlog items (1 existing + 9 new)
- [ ] DEMO project has 10 backlog items (1 existing + 9 new)
- [ ] API project has 10 backlog items (1 existing + 9 new)
- [ ] Each project has a mix of types: STORY, BUG, TASK, EPIC
- [ ] Each project has items in all 4 statuses: TO_DO, IN_PROGRESS, IN_REVIEW, DONE
- [ ] Each project has items with varied priorities: CRITICAL, HIGH, MEDIUM, LOW, null
- [ ] Some items have assignees, some are unassigned
- [ ] All existing backend tests still pass: `npm run test:mock`
- [ ] Existing frontend tests still pass: `npm run test:ci`
