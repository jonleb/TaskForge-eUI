# CR-2204 Navigation Consistency — Story Breakdown

## Context

The application has two navigation mechanisms that must stay in sync:
1. **Sidebar** — managed by `LayoutComponent`, which subscribes to `ProjectContextService.currentProject$` and switches between a global menu (Home, Tickets, Projects, Users) and a project-scoped menu (← All Projects, Dashboard, Members, Backlog, Sprints, Board, Settings).
2. **Breadcrumb** — managed by `EuiBreadcrumbService` (rendered in `LayoutComponent`'s `<eui-app-breadcrumb>`). Each page calls `breadcrumbService.setBreadcrumb([...])` in its `ngOnInit`.

### Current problems

| Problem | Root cause |
|---------|-----------|
| Double breadcrumb on ticket-detail page | `TicketDetailComponent` uses inline `<eui-page-breadcrumb>` instead of `breadcrumbService` — stacks below the layout's `<eui-app-breadcrumb>` |
| Sidebar switches to project menu when navigating from Tickets page | `navigateToTicket()` routes to `/screen/projects/:projectId/tickets/:ticketNumber`, activating `ProjectShellComponent` which calls `projectContext.setProject()` |
| Stale breadcrumbs on Members, Backlog, Sprints, Board, Settings | These components never call `breadcrumbService.setBreadcrumb()` — they inherit whatever the previous page set |

### Reference pattern (correct)

`DashboardComponent` and `PortfolioComponent` both:
- Inject `EuiBreadcrumbService`
- Call `setBreadcrumb([...])` inside their `currentProject$` subscription
- Do NOT use `<eui-page-breadcrumb>` in their templates

## Execution Order

```
STORY-001 (Fix ticket-detail breadcrumb — remove inline, use service)
    └── STORY-002 (Context-aware sidebar + breadcrumb from Tickets page)
            └── STORY-003 (Breadcrumb alignment for all project-scoped pages)
```

STORY-001 is a prerequisite for STORY-002 because STORY-002 adds context-aware logic to the breadcrumb service call introduced in STORY-001.

STORY-003 is independent of STORY-002 but ordered last because it's lower priority (cosmetic alignment vs. broken UX).

## Stories

| # | Title | Scope | Files |
|---|-------|-------|-------|
| STORY-001 | Fix ticket-detail double breadcrumb | ticket-detail | 3 files |
| STORY-002 | Context-aware sidebar when navigating from Tickets page | tickets + ticket-detail | 4 files |
| STORY-003 | Breadcrumb alignment for all project-scoped pages | 6 components | 12 files |

---

## STORY-001 — Fix Ticket-Detail Double Breadcrumb

### Scope

Replace the inline `<eui-page-breadcrumb>` in `TicketDetailComponent` with `breadcrumbService.setBreadcrumb()`, matching the pattern used by `DashboardComponent`.

### Current state

```html
<!-- ticket-detail.component.html -->
<eui-page>
    <eui-page-breadcrumb>
        <eui-breadcrumb>
            <eui-breadcrumb-item link="/screen/home" iconSvgName="home:outline"
                                 [ariaLabel]="'tickets.breadcrumb.home' | translate">
            </eui-breadcrumb-item>
            <eui-breadcrumb-item link="/screen/tickets"
                                 [label]="'ticket-detail.breadcrumb.tickets' | translate">
            </eui-breadcrumb-item>
            <eui-breadcrumb-item [label]="ticketKey"></eui-breadcrumb-item>
        </eui-breadcrumb>
    </eui-page-breadcrumb>
    ...
```

```typescript
// ticket-detail.component.ts — imports
import { EUI_BREADCRUMB } from '@eui/components/eui-breadcrumb';
// in @Component.imports: ...EUI_BREADCRUMB
// NO breadcrumbService injection
```

### Target state

```html
<!-- ticket-detail.component.html — NO <eui-page-breadcrumb> block -->
<eui-page>
    <eui-page-header [label]="ticketKey" [subLabel]="ticket?.title ?? ''">
    ...
```

```typescript
// ticket-detail.component.ts
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
// Remove: import { EUI_BREADCRUMB } from '@eui/components/eui-breadcrumb';
// Remove: ...EUI_BREADCRUMB from imports array

private readonly breadcrumbService = inject(EuiBreadcrumbService);

// Inside the currentProject$ + paramMap subscription, after ticket loads:
this.breadcrumbService.setBreadcrumb([
    { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
    { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
    { id: 'ticket', label: this.ticketKey, link: null },
]);
```

### TypeScript changes

1. Replace `import { EUI_BREADCRUMB }` with `import { EuiBreadcrumbService }`
2. Remove `...EUI_BREADCRUMB` from `@Component.imports`
3. Add `private readonly breadcrumbService = inject(EuiBreadcrumbService);`
4. In the `combineLatest` subscription `next` handler (after `this.ticket = ticket`), call `setBreadcrumb()` with the project-context trail: `Projects → ProjectName → TF-57`

### Template changes

1. Remove the entire `<eui-page-breadcrumb>...</eui-page-breadcrumb>` block (lines 2–13)

### Test changes

1. Add `import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb'`
2. Add `import { createBreadcrumbServiceMock } from '../../../testing/test-providers'`
3. Create `breadcrumbMock = createBreadcrumbServiceMock()` in `beforeEach`
4. Add `{ provide: EuiBreadcrumbService, useValue: breadcrumbMock }` to providers
5. Remove any DOM-based breadcrumb tests (`querySelector('eui-breadcrumb')`, etc.)
6. Add test: `should set breadcrumb via service after ticket loads` — assert `breadcrumbMock.setBreadcrumb` called with expected array

### i18n

No new keys needed — reuses existing `nav.projects` key.

### Acceptance criteria

- [ ] No double breadcrumb bar on ticket-detail page
- [ ] Breadcrumb shows `Projects → ProjectName → TF-57` (single line, in layout bar)
- [ ] Breadcrumb links are clickable and navigate correctly
- [ ] All existing ticket-detail tests pass
- [ ] Build passes

---

## STORY-002 — Context-Aware Sidebar When Navigating from Tickets Page

### Scope

When the user clicks a ticket card on the Tickets page, the sidebar should remain in global mode (Home, Tickets, Projects) and the breadcrumb should show `Tickets → TF-57`. When navigating from within a project (Backlog, Board, etc.), the sidebar stays in project mode and the breadcrumb shows `Projects → ProjectName → TF-57`.

### Mechanism: Router navigation state

Angular's `Router.navigate()` accepts an `extras.state` object that is persisted in the browser's `history.state`. This is the least invasive approach — no new routes, no query params in the URL.

### Current state

```typescript
// tickets.component.ts
navigateToTicket(item: BacklogItem): void {
    this.router.navigate(['/screen/projects', item.projectId, 'tickets', item.ticket_number]);
}
```

- No state passed → ticket-detail has no way to know the origin
- Route activates `ProjectShellComponent` → `projectContext.setProject()` → sidebar switches

### Target state

```typescript
// tickets.component.ts
navigateToTicket(item: BacklogItem): void {
    this.router.navigate(
        ['/screen/projects', item.projectId, 'tickets', item.ticket_number],
        { state: { from: 'tickets' } },
    );
}
```

```typescript
// ticket-detail.component.ts
private readonly location = inject(Location); // already injected
private navigatedFromTickets = false;

// In ngOnInit, before the combineLatest:
const navState = this.location.getState() as Record<string, unknown> | null;
this.navigatedFromTickets = navState?.['from'] === 'tickets';

// In the combineLatest next handler, after ticket loads:
if (this.navigatedFromTickets) {
    // Clear project context so sidebar stays global
    this.projectContext.clearProject();
    this.breadcrumbService.setBreadcrumb([
        { id: 'tickets', label: this.translate.instant('nav.tickets'), link: '/screen/tickets' },
        { id: 'ticket', label: this.ticketKey, link: null },
    ]);
} else {
    this.breadcrumbService.setBreadcrumb([
        { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
        { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
        { id: 'ticket', label: this.ticketKey, link: null },
    ]);
}
```

### Key design decisions

1. **`clearProject()` timing** — Must be called AFTER the ticket data has loaded (the `combineLatest` needs `currentProject$` to emit a non-null project to resolve the ticket). Calling it in the `next` handler ensures the data is already fetched.

2. **`location.getState()` vs `router.getCurrentNavigation()`** — `getCurrentNavigation()` is only available during route activation (in guards/resolvers). By the time `ngOnInit` runs, it returns `null`. `location.getState()` reads from `history.state` and is available at any time.

3. **Sidebar restoration** — When `clearProject()` is called, the layout's `currentProject$` subscription emits `null`, which triggers `filterSidebarItems()` → global menu. This is the existing mechanism, no changes needed in `LayoutComponent`.

4. **Back button** — `goBack()` uses `location.back()`, which returns to the Tickets page. The Tickets page's `ngOnInit` calls `breadcrumbService.setBreadcrumb([{ id: 'tickets', ... }])`, restoring the breadcrumb. The sidebar is already global because `clearProject()` was called.

### TypeScript changes — `tickets.component.ts`

1. Add `{ state: { from: 'tickets' } }` to `router.navigate()` in `navigateToTicket()`

### TypeScript changes — `ticket-detail.component.ts`

1. Add `private navigatedFromTickets = false;` property
2. In `ngOnInit`, before `combineLatest`: read `location.getState()` and set `navigatedFromTickets`
3. In `combineLatest` `next` handler: branch breadcrumb + `clearProject()` based on `navigatedFromTickets`

### Test changes — `tickets.component.spec.ts`

1. Update `navigateToTicket` test to assert `router.navigate` is called with state: `{ state: { from: 'tickets' } }`

### Test changes — `ticket-detail.component.spec.ts`

1. Add test: `should set global breadcrumb when navigated from tickets page` — mock `location.getState()` to return `{ from: 'tickets' }`, assert breadcrumb = `Tickets → TF-57` and `projectContext.clearProject()` called
2. Add test: `should set project breadcrumb when navigated from project context` — mock `location.getState()` to return `{}`, assert breadcrumb = `Projects → ProjectName → TF-57` and `clearProject()` NOT called
3. Add test: `should keep sidebar global when from tickets` — verify `clearProject()` is called

### i18n

No new keys — reuses `nav.tickets` and `nav.projects`.

### Acceptance criteria

- [ ] Clicking a card on the Tickets page → sidebar stays global (Home, Tickets, Projects, Users)
- [ ] Breadcrumb shows `Tickets → TF-57` when coming from Tickets page
- [ ] Clicking a ticket from Backlog/Board → sidebar stays project-scoped
- [ ] Breadcrumb shows `Projects → ProjectName → TF-57` when coming from project context
- [ ] Back button returns to the correct origin page
- [ ] All existing tests pass

---

## STORY-003 — Breadcrumb Alignment for All Project-Scoped Pages

### Scope

Add `breadcrumbService.setBreadcrumb()` calls to the 6 project-scoped components that currently don't set breadcrumbs. Each component already subscribes to `projectContext.currentProject$` — the breadcrumb call goes inside that subscription.

### Components and target breadcrumbs

| Component | File | Target breadcrumb |
|-----------|------|-------------------|
| `MembersComponent` | `src/app/features/projects/members/members.component.ts` | `Projects → ProjectName → Members` |
| `BacklogComponent` | `src/app/features/projects/backlog/backlog.component.ts` | `Projects → ProjectName → Backlog` |
| `SprintsComponent` | `src/app/features/projects/sprints/sprints.component.ts` | `Projects → ProjectName → Sprints` |
| `SprintPlanningComponent` | `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts` | `Projects → ProjectName → Sprints → SprintName` |
| `BoardComponent` | `src/app/features/projects/board/board.component.ts` | `Projects → ProjectName → Board` |
| `SettingsComponent` | `src/app/features/projects/settings/settings.component.ts` | `Projects → ProjectName → Settings` |

### Pattern (same for all 6 components)

```typescript
// 1. Add import
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';

// 2. Add injection
private readonly breadcrumbService = inject(EuiBreadcrumbService);

// 3. Inside currentProject$ subscription, after project is set:
this.breadcrumbService.setBreadcrumb([
    { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
    { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
    { id: 'page', label: this.translate.instant('nav.<page-key>'), link: null },
]);
```

### Per-component details

#### MembersComponent

- Subscription location: `ngOnInit` → `currentProject$.subscribe(project => { ... })`
- Insert `setBreadcrumb()` after `this.project = project;`
- Page label key: `nav.members`

#### BacklogComponent

- Subscription location: `ngOnInit` → `currentProject$.subscribe(project => { ... })`
- Insert `setBreadcrumb()` after `this.project = project;`
- Page label key: `nav.backlog`

#### SprintsComponent

- Subscription location: `ngOnInit` → `currentProject$.subscribe(project => { ... })`
- Insert `setBreadcrumb()` after `this.project = project;`
- Page label key: `nav.sprints`

#### SprintPlanningComponent

- Subscription location: `ngOnInit` → `currentProject$.subscribe(project => { ... })`
- Insert `setBreadcrumb()` after `this.project = project;`
- 4-level breadcrumb: `Projects → ProjectName → Sprints (link) → SprintName`
- The sprint name is loaded asynchronously — set initial breadcrumb with 3 levels, then update to 4 levels after sprint loads in `loadData()` next handler
- Sprints link: `/screen/projects/${project.id}/sprints`

```typescript
// In ngOnInit subscription:
this.breadcrumbService.setBreadcrumb([
    { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
    { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
    { id: 'sprints', label: this.translate.instant('nav.sprints'), link: `/screen/projects/${project.id}/sprints` },
]);

// In loadData() next handler, after this.sprint is set:
if (this.sprint && this.project) {
    this.breadcrumbService.setBreadcrumb([
        { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
        { id: 'project', label: this.project.name, link: `/screen/projects/${this.project.id}` },
        { id: 'sprints', label: this.translate.instant('nav.sprints'), link: `/screen/projects/${this.project.id}/sprints` },
        { id: 'sprint', label: this.sprint.name, link: null },
    ]);
}
```

#### BoardComponent

- Subscription location: `ngOnInit` → `currentProject$.subscribe(project => { ... })`
- Insert `setBreadcrumb()` after `this.project = project;`
- Page label key: `nav.board`

#### SettingsComponent

- Subscription location: `ngOnInit` → `currentProject$.pipe(switchMap(...)).subscribe(...)`
- The `switchMap` consumes the project before the subscription `next` handler. Insert `setBreadcrumb()` inside the `switchMap` callback, after `this.currentProjectId = project.id;`
- Page label key: `nav.settings`
- Note: `SettingsComponent` doesn't store `project` as a property — it only stores `currentProjectId`. Need to also capture `project.name` for the breadcrumb.

```typescript
// Inside switchMap callback:
this.breadcrumbService.setBreadcrumb([
    { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
    { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
    { id: 'settings', label: this.translate.instant('nav.settings'), link: null },
]);
```

### i18n

No new keys needed. All page labels already exist:
- `nav.members` = "Members"
- `nav.backlog` = "Backlog"
- `nav.sprints` = "Sprints"
- `nav.board` = "Board"
- `nav.settings` = "Settings"
- `nav.projects` = "Projects"

### Test changes (per component)

For each of the 6 components:
1. Add `import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb'`
2. Add `import { createBreadcrumbServiceMock } from '...'`
3. Create mock and add to providers
4. Add test: `should set breadcrumb via service when project loads`

### Acceptance criteria

- [ ] Every project-scoped page shows a correct breadcrumb trail in the layout bar
- [ ] Breadcrumb links navigate to the correct pages
- [ ] No stale breadcrumbs when switching between project pages
- [ ] SprintPlanningComponent shows 4-level breadcrumb after sprint loads
- [ ] All existing tests pass
- [ ] Build passes

---

## Technical Notes

- `EuiBreadcrumbService` is provided in `LayoutComponent` (via `providers: [EuiBreadcrumbService]`). All child components can inject it without adding their own provider.
- `setBreadcrumb()` replaces the entire breadcrumb array — no need to clear previous items.
- The layout's `<eui-app-breadcrumb>` always renders the Home icon as the first item. The service items appear after it. So `setBreadcrumb([{ id: 'tickets', label: 'Tickets' }])` renders as `Home → Tickets`.
- `location.getState()` returns `history.state` which persists across page refreshes but is lost on new navigations. This is acceptable — a direct URL access to a ticket-detail page will default to project-context breadcrumb.
- `clearProject()` on `ProjectContextService` emits `null` on `currentProject$`, which triggers the layout to rebuild the sidebar as global. This is the existing mechanism used by `ProjectShellComponent.ngOnDestroy()`.
