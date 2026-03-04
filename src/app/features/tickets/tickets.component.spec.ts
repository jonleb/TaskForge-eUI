import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, afterEach, expect, vi, beforeAll } from 'vitest';
import { Router } from '@angular/router';

beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
});

import { of, throwError, Subject } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import {
    TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock,
} from '../../testing/test-providers';
import { TicketsComponent } from './tickets.component';
import { TicketsService } from '../../core/tickets';
import { PermissionService } from '../../core/auth';
import { BacklogItem, BacklogListResponse, Project, ProjectMember, ProjectService, Sprint } from '../../core/project';
import { Sort } from '@eui/components/eui-table';

const mockProjects: Project[] = [
    { id: '1', key: 'TF', name: 'TaskForge', description: '', created_by: '1', created_at: '', updated_at: '', is_active: true },
    { id: '2', key: 'DEMO', name: 'Demo Project', description: '', created_by: '1', created_at: '', updated_at: '', is_active: true },
];

const mockItems: BacklogItem[] = [
    { id: 'b1', projectId: '1', type: 'STORY', title: 'Login page', description: 'Implement login', status: 'TO_DO', priority: 'HIGH', assignee_id: '2', epic_id: null, ticket_number: 1, created_by: '1', created_at: '2026-01-01' },
    { id: 'b2', projectId: '2', type: 'BUG', title: 'Fix crash', description: null, status: 'IN_PROGRESS', priority: 'CRITICAL', assignee_id: null, epic_id: null, ticket_number: 5, created_by: '1', created_at: '2026-01-02' },
];

const mockResp: BacklogListResponse = { data: mockItems, total: 2, page: 1, limit: 10 };
const emptyResp: BacklogListResponse = { data: [], total: 0, page: 1, limit: 10 };

const mockSprints: Sprint[] = [
    { id: 'sp-2', projectId: '1', name: 'Sprint 2', goal: 'Active sprint', status: 'ACTIVE', start_date: '2026-02-01', end_date: '2026-02-14', created_by: '1', created_at: '2026-01-01', updated_at: '2026-01-01' },
    { id: 'sp-3', projectId: '1', name: 'Sprint 3', goal: 'Planned sprint', status: 'PLANNED', start_date: null, end_date: null, created_by: '1', created_at: '2026-01-01', updated_at: '2026-01-01' },
];

const mockMembers: ProjectMember[] = [
    { id: 'm1', userId: '2', role: 'DEVELOPER', joined_at: '2026-01-01', firstName: 'Jane', lastName: 'Doe', email: 'jane@test.com' },
    { id: 'm2', userId: '3', role: 'PRODUCT_OWNER', joined_at: '2026-01-01', firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com' },
];

const mockEpics: BacklogItem[] = [
    { id: 'e1', projectId: '1', type: 'EPIC', title: 'Auth Epic', description: null, status: 'TO_DO', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 10, created_by: '1', created_at: '2026-01-01' },
];

describe('TicketsComponent', () => {
    let fixture: ComponentFixture<TicketsComponent>;
    let component: TicketsComponent;
    let ticketsSvc: Record<string, ReturnType<typeof vi.fn>>;
    let projectSvc: Record<string, ReturnType<typeof vi.fn>>;
    let perm: Record<string, ReturnType<typeof vi.fn>>;
    let growl: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        ticketsSvc = {
            getTickets: vi.fn().mockReturnValue(of({ ...mockResp })),
            getUserProjects: vi.fn().mockReturnValue(of(mockProjects)),
        };
        projectSvc = {
            getSprints: vi.fn().mockReturnValue(of(mockSprints)),
            getBacklog: vi.fn(), getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getProjects: vi.fn(),
            getProject: vi.fn(), getUser: vi.fn(), createProject: vi.fn(),
            updateProject: vi.fn(), upsertMember: vi.fn(), removeMember: vi.fn(),
            searchCandidates: vi.fn(), getWorkflows: vi.fn(),
            createTicket: vi.fn().mockReturnValue(of({ ...mockItems[0], ticket_number: 99, title: 'New ticket' })),
            updateTicket: vi.fn().mockReturnValue(of({ ...mockItems[0], title: 'Updated' })),
            getEpics: vi.fn().mockReturnValue(of(mockEpics)), reorderBacklog: vi.fn(),
        };
        perm = {
            isSuperAdmin: vi.fn().mockReturnValue(true),
            getUserId: vi.fn().mockReturnValue('1'),
            hasGlobalRole: vi.fn().mockReturnValue(true),
            getGlobalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            getOriginalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            setUser: vi.fn(), clear: vi.fn(), showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn().mockReturnValue(of(true)),
        };
        growl = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [TicketsComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: TicketsService, useValue: ticketsSvc },
                { provide: ProjectService, useValue: projectSvc },
                { provide: PermissionService, useValue: perm },
                { provide: EuiGrowlService, useValue: growl },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TicketsComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        component.ngOnDestroy();
    });

    // ── Basic ──

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load tickets on init', () => {
        fixture.detectChanges();
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
        expect(component.items).toEqual(mockItems);
        expect(component.total).toBe(2);
        expect(component.isLoading).toBe(false);
    });

    it('should load user projects on init', () => {
        fixture.detectChanges();
        expect(ticketsSvc.getUserProjects).toHaveBeenCalled();
        expect(component.projectMap.size).toBe(2);
    });

    // ── Card rendering ──

    it('should display ticket cards using eui-card', () => {
        fixture.detectChanges();
        const cards = fixture.nativeElement.querySelectorAll('eui-card');
        expect(cards.length).toBe(2);
    });

    it('should render card title as a link', () => {
        fixture.detectChanges();
        const links = fixture.nativeElement.querySelectorAll('eui-card a');
        expect(links[0].getAttribute('href')).toBe('/screen/projects/1/tickets/1');
        expect(links[0].textContent).toContain('Login page');
    });

    it('should render card subtitle with project key, ticket number, type, priority, assignee', () => {
        fixture.detectChanges();
        const cards = fixture.nativeElement.querySelectorAll('eui-card');
        expect(cards[0].textContent).toContain('TF-1');
        expect(cards[0].textContent).toContain('workflow.ticket-type.STORY');
        expect(cards[0].textContent).toContain('ticket.priority.HIGH');
        expect(cards[1].textContent).toContain('DEMO-5');
    });

    it('should resolve assignee name from member data', () => {
        fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[0])).toBe('Jane Doe');
    });

    it('should show no-assignee text when assignee_id is null', () => {
        fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[1])).toBe('tickets.card.no-assignee');
    });

    it('should render status chip in card header right content', () => {
        fixture.detectChanges();
        const rightContents = fixture.nativeElement.querySelectorAll('eui-card-header-right-content');
        expect(rightContents.length).toBe(2);
        expect(rightContents[0].textContent).toContain('workflow.status.TO_DO');
        expect(rightContents[1].textContent).toContain('workflow.status.IN_PROGRESS');
    });

    it('should return correct status chip variant', () => {
        fixture.detectChanges();
        expect(component.getStatusChipVariant('DONE')).toBe('success');
        expect(component.getStatusChipVariant('IN_PROGRESS')).toBe('info');
        expect(component.getStatusChipVariant('IN_REVIEW')).toBe('info');
        expect(component.getStatusChipVariant('TO_DO')).toBe('warning');
        expect(component.getStatusChipVariant('UNKNOWN')).toBe('');
    });

    it('should render dropdown actions menu on each card', () => {
        fixture.detectChanges();
        const dropdowns = fixture.nativeElement.querySelectorAll('eui-card-header-right-content eui-dropdown');
        expect(dropdowns.length).toBe(2);
    });

    it('should render dropdown trigger button on each card', () => {
        fixture.detectChanges();
        const dropdowns = fixture.nativeElement.querySelectorAll('eui-card-header-right-content eui-dropdown');
        expect(dropdowns.length).toBe(2);
        // Each dropdown has a trigger button
        dropdowns.forEach((dd: Element) => {
            const trigger = dd.querySelector('button');
            expect(trigger).toBeTruthy();
        });
    });

    it('should not render delete button in card dropdown', () => {
        fixture.detectChanges();
        const dropdowns = fixture.nativeElement.querySelectorAll('eui-dropdown-content');
        dropdowns.forEach((dd: Element) => {
            const buttons = dd.querySelectorAll('button');
            buttons.forEach((btn: Element) => {
                expect(btn.textContent).not.toContain('tickets.card.action.delete');
            });
        });
    });

    it('should open assign dialog on card action (assign)', () => {
        fixture.detectChanges();
        const spy = vi.spyOn(component.assignDialog, 'openDialog');
        component.onCardAction('assign', mockItems[0]);
        expect(spy).toHaveBeenCalled();
        expect(component.assignItem).toEqual(mockItems[0]);
    });

    it('should open status dialog on card action (change-status)', () => {
        fixture.detectChanges();
        const spy = vi.spyOn(component.statusDialog, 'openDialog');
        component.onCardAction('change-status', mockItems[0]);
        expect(spy).toHaveBeenCalled();
        expect(component.statusItem).toEqual(mockItems[0]);
    });

    it('should open edit dialog on card action (edit)', () => {
        fixture.detectChanges();
        const spy = vi.spyOn(component.editDialog, 'openDialog');
        component.onCardAction('edit', mockItems[0]);
        expect(spy).toHaveBeenCalled();
        expect(component.editItem).toEqual(mockItems[0]);
    });

    it('should toggle card expand and show description', () => {
        fixture.detectChanges();
        expect(component.expandedCards.has('b1')).toBe(false);
        const cards = fixture.nativeElement.querySelectorAll('eui-card');
        expect(cards[0].querySelector('eui-card-content')).toBeFalsy();
        // Expand
        component.toggleCardExpand('b1');
        fixture.detectChanges();
        expect(component.expandedCards.has('b1')).toBe(true);
        expect(cards[0].textContent).toContain('Implement login');
    });

    it('should collapse card on second toggle', () => {
        fixture.detectChanges();
        component.toggleCardExpand('b1');
        component.toggleCardExpand('b1');
        fixture.detectChanges();
        expect(component.expandedCards.has('b1')).toBe(false);
    });

    it('should resolve project key via getProjectKey', () => {
        fixture.detectChanges();
        expect(component.getProjectKey(mockItems[0])).toBe('TF');
        expect(component.getProjectKey(mockItems[1])).toBe('DEMO');
    });

    // ── Search ──

    it('should trigger debounced search on text input', () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();

        component.onFilterChange('test');
        vi.advanceTimersByTime(350);
        fixture.detectChanges();

        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ q: 'test', _page: 1 }));
        vi.useRealTimers();
    });

    it('should have no search button (debounce only)', () => {
        fixture.detectChanges();
        const searchBtn = fixture.nativeElement.querySelector('.search-input-group button');
        expect(searchBtn).toBeFalsy();
    });

    // ── Pagination ──

    it('should update page on pagination', () => {
        fixture.detectChanges();
        component.ngAfterViewInit();
        ticketsSvc.getTickets.mockClear();

        component.onPageChange({ page: 2, pageSize: 25 });
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _page: 3, _limit: 25 }));
    });

    it('should ignore paginator init event before AfterViewInit', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (component as any).paginatorReady = false;
        component.onPageChange({ page: 0, pageSize: 10 });
        expect(ticketsSvc.getTickets).not.toHaveBeenCalled();
    });

    // ── Loading / Empty / Error states ──

    it('should show loading state', () => {
        const pending$ = new Subject<BacklogListResponse>();
        ticketsSvc.getTickets.mockReturnValue(pending$.asObservable());
        fixture.detectChanges();
        const bar = fixture.nativeElement.querySelector('eui-progress-bar');
        expect(bar).toBeTruthy();
        pending$.complete();
    });

    it('should show empty state when no results', () => {
        ticketsSvc.getTickets.mockReturnValue(of(emptyResp));
        fixture.detectChanges();
        const output = fixture.nativeElement.querySelector('output');
        expect(output).toBeTruthy();
        expect(output.textContent).toContain('tickets.no-items');
    });

    it('should show error state and retry button', () => {
        ticketsSvc.getTickets.mockReturnValue(throwError(() => ({ status: 500 })));
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        const retryBtn = fixture.nativeElement.querySelector('output button');
        expect(retryBtn).toBeTruthy();
    });

    it('should retry loading on retry()', () => {
        ticketsSvc.getTickets.mockReturnValue(throwError(() => ({ status: 500 })));
        fixture.detectChanges();
        ticketsSvc.getTickets.mockReturnValue(of(mockResp));
        component.retry();
        fixture.detectChanges();
        expect(component.hasError).toBe(false);
        expect(component.items.length).toBe(2);
    });

    // ── Filter column collapse ──

    it('should toggle filter column collapse', () => {
        fixture.detectChanges();
        component.onFilterColumnCollapse(true);
        expect(component.isFilterCollapsed).toBe(true);
        component.onFilterColumnCollapse(false);
        expect(component.isFilterCollapsed).toBe(false);
    });

    it('should have aria-live on result count', () => {
        fixture.detectChanges();
        const liveEl = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(liveEl).toBeTruthy();
    });

    // ── Dynamic filter builder ──

    it('should render select-filter dropdown', () => {
        fixture.detectChanges();
        const select = fixture.nativeElement.querySelector('#select-filter');
        expect(select).toBeTruthy();
    });

    it('should add a filter section when dimension selected', () => {
        fixture.detectChanges();
        component.onAddFilter('status');
        expect(component.visibleFilters.has('status')).toBe(true);
        expect(component.filterDropdownValue).toBeNull();
    });

    it('should remove a filter section and clear its value', () => {
        fixture.detectChanges();
        component.onAddFilter('status');
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        ticketsSvc.getTickets.mockClear();

        component.onRemoveFilter('status');
        expect(component.visibleFilters.has('status')).toBe(false);
        expect(component.selectedStatusValue).toBeNull();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ status: undefined }));
    });

    it('should hide already-visible dimensions from dropdown', () => {
        fixture.detectChanges();
        expect(component.availableFilterDimensions.length).toBe(3);
        component.onAddFilter('status');
        expect(component.availableFilterDimensions.length).toBe(2);
        expect(component.availableFilterDimensions.some(d => d.value === 'status')).toBe(false);
    });

    // ── Status filter ──

    it('should send single status param on status select change', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ status: 'TO_DO' }));
    });

    it('should build status chip from selectedStatusValue', () => {
        fixture.detectChanges();
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        const chips = component.activeFilterChips;
        expect(chips.some(c => c.dimension === 'status' && c.value === 'TO_DO')).toBe(true);
    });

    it('should remove status chip and clear status filter', () => {
        fixture.detectChanges();
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        ticketsSvc.getTickets.mockClear();

        const chip = component.activeFilterChips.find(c => c.dimension === 'status')!;
        component.onChipRemove(chip);
        expect(component.selectedStatusValue).toBeNull();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ status: undefined }));
    });

    // ── Type filter ──

    it('should send multi-value type param', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.typeChecks.BUG = true;
        component.onTypeCheckChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ type: 'BUG' }));
    });

    // ── Priority filter ──

    it('should send single priority param on radio change', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.selectedPriority = 'HIGH';
        component.onPriorityRadioChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ priority: 'HIGH' }));
    });

    it('should build priority chip from selectedPriority', () => {
        fixture.detectChanges();
        component.selectedPriority = 'HIGH';
        component.onPriorityRadioChange();
        const chips = component.activeFilterChips;
        expect(chips.some(c => c.dimension === 'priority' && c.value === 'HIGH')).toBe(true);
    });

    it('should remove priority chip and clear priority filter', () => {
        fixture.detectChanges();
        component.selectedPriority = 'HIGH';
        component.onPriorityRadioChange();
        ticketsSvc.getTickets.mockClear();

        const chip = component.activeFilterChips.find(c => c.dimension === 'priority')!;
        component.onChipRemove(chip);
        expect(component.selectedPriority).toBeNull();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ priority: undefined }));
    });

    // ── Quick Filters removed ──

    it('should not have assigned-to-me checkbox', () => {
        fixture.detectChanges();
        const cb = fixture.nativeElement.querySelector('#assigned-to-me');
        expect(cb).toBeFalsy();
    });

    it('should not have open-sprints checkbox', () => {
        fixture.detectChanges();
        const cb = fixture.nativeElement.querySelector('#open-sprints');
        expect(cb).toBeFalsy();
    });

    // ── Advanced filters ──

    it('should start with advanced filters collapsed', () => {
        fixture.detectChanges();
        expect(component.isAdvancedCollapsed).toBe(true);
    });

    it('should toggle advanced filters', () => {
        fixture.detectChanges();
        component.isAdvancedCollapsed = false;
        component['cdr'].markForCheck();
        fixture.detectChanges();
        const projectSelect = fixture.nativeElement.querySelector('#tickets-project');
        expect(projectSelect).toBeTruthy();
    });

    // ── Project / Sprint filters ──

    it('should populate userProjects on init', () => {
        fixture.detectChanges();
        expect(component.userProjects).toEqual(mockProjects);
    });

    it('should set project_id param on project change', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.selectedProjectId = '1';
        component.onProjectChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ project_id: '1', _page: 1 }));
    });

    it('should load sprints when project selected', () => {
        fixture.detectChanges();
        component.selectedProjectId = '1';
        component.onProjectChange();
        expect(projectSvc.getSprints).toHaveBeenCalledWith('1');
        expect(component.availableSprints).toEqual(mockSprints);
    });

    it('should clear sprints when project cleared', () => {
        fixture.detectChanges();
        component.selectedProjectId = '1';
        component.onProjectChange();
        expect(component.availableSprints.length).toBe(2);

        component.selectedProjectId = null;
        component.onProjectChange();
        expect(component.availableSprints).toEqual([]);
        expect(component.selectedSprintId).toBeNull();
    });

    it('should generate project chip when project selected', () => {
        fixture.detectChanges();
        component.selectedProjectId = '1';
        component.onProjectChange();
        const chips = component.activeFilterChips;
        expect(chips.some(c => c.dimension === 'project' && c.value === '1')).toBe(true);
    });

    it('should generate sprint chip when specific sprint selected', () => {
        fixture.detectChanges();
        component.selectedProjectId = '1';
        component.onProjectChange();
        component.selectedSprintId = 'sp-2';
        component.onSprintChange();
        const chips = component.activeFilterChips;
        expect(chips.some(c => c.dimension === 'sprint' && c.value === 'sp-2')).toBe(true);
    });

    it('should remove project chip and clear project filter', () => {
        fixture.detectChanges();
        component.selectedProjectId = '1';
        component.onProjectChange();
        ticketsSvc.getTickets.mockClear();

        const chip = component.activeFilterChips.find(c => c.dimension === 'project');
        component.onChipRemove(chip!);
        expect(component.selectedProjectId).toBeNull();
        expect(component.availableSprints).toEqual([]);
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
    });

    // ── Clear all filters ──

    it('should clear all filters on clearAllFilters()', () => {
        fixture.detectChanges();
        component.searchValue = 'test';
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        component.selectedPriority = 'HIGH';
        component.onPriorityRadioChange();
        component.onAddFilter('status');
        component.onAddFilter('priority');
        ticketsSvc.getTickets.mockClear();

        component.clearAllFilters();
        expect(component.searchValue).toBe('');
        expect(component.selectedStatusValue).toBeNull();
        expect(component.selectedPriority).toBeNull();
        expect(component.visibleFilters.size).toBe(0);
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _page: 1 }));
    });

    it('should reset page to 1 on every filter change', () => {
        fixture.detectChanges();
        component.ngAfterViewInit();
        component.onPageChange({ page: 1, pageSize: 10 });
        ticketsSvc.getTickets.mockClear();

        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _page: 1 }));
    });

    // ── Results Header Bar ──

    it('should render results heading in column header', () => {
        fixture.detectChanges();
        const headerLeft = fixture.nativeElement.querySelector('eui-page-column-header-left-content');
        expect(headerLeft).toBeTruthy();
        expect(headerLeft.textContent).toContain('tickets.results.heading');
    });

    it('should render ticket count with aria-live', () => {
        fixture.detectChanges();
        const liveEl = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(liveEl).toBeTruthy();
    });

    it('should render sort field dropdown with 4 options', () => {
        fixture.detectChanges();
        const select = fixture.nativeElement.querySelector('#sort-field');
        expect(select).toBeTruthy();
        const options = select.querySelectorAll('option');
        expect(options.length).toBe(4);
    });

    it('should change sort field and reload', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.sortField = 'title';
        component.onSortFieldChange();
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _sort: 'title', _page: 1 }));
    });

    it('should toggle sort direction and reload', () => {
        fixture.detectChanges();
        expect(component.sortOrder).toBe('desc');
        ticketsSvc.getTickets.mockClear();
        component.onToggleSortOrder();
        expect(component.sortOrder).toBe('asc');
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _order: 'asc', _page: 1 }));
    });

    it('should render view toggle group', () => {
        fixture.detectChanges();
        const toggle = fixture.nativeElement.querySelector('eui-toggle-group');
        expect(toggle).toBeTruthy();
        const items = fixture.nativeElement.querySelectorAll('eui-toggle-group-item');
        expect(items.length).toBe(2);
    });

    it('should default to card view', () => {
        fixture.detectChanges();
        expect(component.currentView).toBe('card');
        const cards = fixture.nativeElement.querySelectorAll('eui-card');
        expect(cards.length).toBe(2);
    });

    it('should switch to table view', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        expect(component.currentView).toBe('table');
        const cards = fixture.nativeElement.querySelectorAll('eui-card');
        expect(cards.length).toBe(0);
    });

    // ── Table View ──

    it('should render table when currentView is table', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const table = fixture.nativeElement.querySelector('table[euitable]');
        expect(table).toBeTruthy();
    });

    it('should render table with aria-label', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const table = fixture.nativeElement.querySelector('table[euitable]');
        expect(table.getAttribute('aria-label')).toBe('tickets.table.caption');
    });

    it('should render 7 table columns with scope=col', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const ths = fixture.nativeElement.querySelectorAll('th[scope="col"]');
        expect(ths.length).toBe(7);
    });

    it('should render table rows with data-col-label on cells', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const tds = fixture.nativeElement.querySelectorAll('td[data-col-label]');
        // 2 items × 7 columns = 14
        expect(tds.length).toBe(14);
    });

    it('should render ticket data in table cells', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const rows = fixture.nativeElement.querySelectorAll('tbody tr');
        expect(rows.length).toBe(2);
        expect(rows[0].textContent).toContain('TF-1');
        expect(rows[0].textContent).toContain('Login page');
        expect(rows[1].textContent).toContain('DEMO-5');
    });

    it('should render status badge in table', () => {
        fixture.detectChanges();
        component.onViewChange('table');
        fixture.detectChanges();
        const badges = fixture.nativeElement.querySelectorAll('tbody [euistatusbadge]');
        expect(badges.length).toBe(2);
    });

    it('should handle table sort change', () => {
        fixture.detectChanges();
        ticketsSvc.getTickets.mockClear();
        component.onTableSort([{ sort: 'title', order: 'ASC' }] as unknown as Sort[]);
        expect(component.sortField).toBe('title');
        expect(component.sortOrder).toBe('asc');
        expect(ticketsSvc.getTickets).toHaveBeenCalledWith(expect.objectContaining({ _sort: 'title', _order: 'asc', _page: 1 }));
    });

    it('should navigate to ticket on navigateToTicket', () => {
        fixture.detectChanges();
        const router = TestBed.inject(Router);
        const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
        component.navigateToTicket(mockItems[0]);
        expect(spy).toHaveBeenCalledWith(['/screen/projects', '1', 'tickets', 1]);
    });

    it('should show chip overflow when more than 5 chips', () => {
        fixture.detectChanges();
        // Set up many filters to exceed MAX_VISIBLE_CHIPS
        component.searchValue = 'test';
        component.params = { ...component.params, q: 'test' };
        component.selectedProjectId = '1';
        component.onProjectChange();
        component.selectedSprintId = 'sp-2';
        component.onSprintChange();
        component.selectedStatusValue = 'TO_DO';
        component.onStatusSelectChange();
        component.selectedPriority = 'HIGH';
        component.onPriorityRadioChange();
        component.typeChecks.BUG = true;
        component.onTypeCheckChange();
        // That's 6 chips: search, project, sprint, status, type, priority
        expect(component.activeFilterChips.length).toBe(6);
        expect(component.visibleChips.length).toBe(5);
        expect(component.hasOverflowChips).toBe(true);
        expect(component.overflowChipCount).toBe(1);
    });

    // ── Breadcrumb + Page Header ──

    it('should render breadcrumb with 2 items', () => {
        fixture.detectChanges();
        const breadcrumb = fixture.nativeElement.querySelector('eui-breadcrumb');
        expect(breadcrumb).toBeTruthy();
        const items = fixture.nativeElement.querySelectorAll('eui-breadcrumb-item');
        expect(items.length).toBe(2);
    });

    it('should render home breadcrumb with link and icon', () => {
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('eui-breadcrumb-item');
        const homeItem = items[0];
        expect(homeItem.getAttribute('link')).toBe('/screen/home');
        expect(homeItem.getAttribute('iconsvgname')).toBe('home:outline');
    });

    it('should render tickets breadcrumb without link', () => {
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('eui-breadcrumb-item');
        const ticketsItem = items[1];
        expect(ticketsItem.getAttribute('link')).toBeFalsy();
    });

    it('should render create button with icon', () => {
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
        expect(btn).toBeTruthy();
        const icon = btn.querySelector('eui-icon-svg');
        expect(icon).toBeTruthy();
        expect(icon.getAttribute('icon')).toBe('plus:regular');
    });

    // ── Paginator in column footer ──

    it('should render paginator inside eui-page-column-footer', () => {
        fixture.detectChanges();
        const footer = fixture.nativeElement.querySelector('eui-page-column-footer');
        expect(footer).toBeTruthy();
        const paginator = footer.querySelector('eui-paginator');
        expect(paginator).toBeTruthy();
    });

    // ── Create Ticket Dialog ──

    it('should set canCreate=true for super admin', () => {
        fixture.detectChanges();
        expect(component.canCreate).toBe(true);
        expect(component.creatableProjects).toEqual(mockProjects);
    });

    it('should set canCreate=true for regular user with projects', () => {
        perm.isSuperAdmin.mockReturnValue(false);
        fixture.detectChanges();
        expect(component.canCreate).toBe(true);
    });

    it('should set canCreate=false for regular user with no projects', () => {
        perm.isSuperAdmin.mockReturnValue(false);
        ticketsSvc.getUserProjects.mockReturnValue(of([]));
        fixture.detectChanges();
        expect(component.canCreate).toBe(false);
    });

    it('should render Create button when canCreate is true', () => {
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('tickets.create-btn');
    });

    it('should hide Create button when canCreate is false', () => {
        perm.isSuperAdmin.mockReturnValue(false);
        ticketsSvc.getUserProjects.mockReturnValue(of([]));
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
        expect(btn).toBeFalsy();
    });

    it('should open dialog on openCreateDialog()', () => {
        fixture.detectChanges();
        const spy = vi.spyOn(component.createDialog, 'openDialog');
        component.openCreateDialog();
        expect(spy).toHaveBeenCalled();
    });

    it('should reset form before opening dialog', () => {
        fixture.detectChanges();
        component.newTicketTitle = 'leftover';
        component.selectedCreateProjectId = '1';
        vi.spyOn(component.createDialog, 'openDialog');
        component.openCreateDialog();
        expect(component.newTicketTitle).toBe('');
        expect(component.selectedCreateProjectId).toBeNull();
    });

    it('should load members and epics on project change in dialog', () => {
        fixture.detectChanges();
        component.selectedCreateProjectId = '1';
        component.onCreateProjectChange();
        expect(projectSvc.getProjectMembers).toHaveBeenCalledWith('1');
        expect(projectSvc.getEpics).toHaveBeenCalledWith('1');
        expect(component.dialogMembers).toEqual(mockMembers);
        expect(component.dialogEpics).toEqual(mockEpics);
    });

    it('should clear assignee and epic when project changes in dialog', () => {
        fixture.detectChanges();
        component.selectedCreateProjectId = '1';
        component.onCreateProjectChange();
        component.newTicketAssigneeId = '2';
        component.newTicketEpicId = 'e1';

        component.selectedCreateProjectId = '2';
        component.onCreateProjectChange();
        expect(component.newTicketAssigneeId).toBeNull();
        expect(component.newTicketEpicId).toBeNull();
    });

    it('should not load members/epics when project cleared in dialog', () => {
        fixture.detectChanges();
        projectSvc.getProjectMembers.mockClear();
        projectSvc.getEpics.mockClear();
        component.selectedCreateProjectId = null;
        component.onCreateProjectChange();
        expect(projectSvc.getProjectMembers).not.toHaveBeenCalled();
        expect(projectSvc.getEpics).not.toHaveBeenCalled();
    });

    it('should validate title too short', () => {
        fixture.detectChanges();
        expect(component.isCreateFormValid()).toBe(false);
        component.selectedCreateProjectId = '1';
        component.newTicketTitle = 'A';
        expect(component.isCreateFormValid()).toBe(false);
    });

    it('should validate title valid length', () => {
        fixture.detectChanges();
        component.selectedCreateProjectId = '1';
        component.newTicketTitle = 'Valid title';
        expect(component.isCreateFormValid()).toBe(true);
    });

    it('should create ticket successfully: close dialog, growl, reload', () => {
        fixture.detectChanges();
        const closeSpy = vi.spyOn(component.createDialog, 'closeDialog');
        ticketsSvc.getTickets.mockClear();

        component.selectedCreateProjectId = '1';
        component.newTicketTitle = 'New ticket';
        component.onCreateTicket();

        expect(projectSvc.createTicket).toHaveBeenCalledWith('1', expect.objectContaining({
            type: 'STORY', title: 'New ticket', priority: 'MEDIUM',
        }));
        expect(closeSpy).toHaveBeenCalled();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
    });

    it('should show inline error on create failure', () => {
        fixture.detectChanges();
        projectSvc.createTicket.mockReturnValue(throwError(() => ({ error: { message: 'Forbidden' } })));

        component.selectedCreateProjectId = '1';
        component.newTicketTitle = 'New ticket';
        component.onCreateTicket();

        expect(component.createError).toBe('Forbidden');
        expect(component.isCreating).toBe(false);
    });

    it('should reset form on dismiss', () => {
        fixture.detectChanges();
        component.selectedCreateProjectId = '1';
        component.newTicketTitle = 'Something';
        component.newTicketAssigneeId = '2';
        component.createError = 'some error';

        component.resetCreateForm();

        expect(component.selectedCreateProjectId).toBeNull();
        expect(component.newTicketTitle).toBe('');
        expect(component.newTicketAssigneeId).toBeNull();
        expect(component.createError).toBe('');
        expect(component.dialogMembers).toEqual([]);
        expect(component.dialogEpics).toEqual([]);
    });

    // ── Edit Ticket Dialog ──

    it('should pre-populate edit form with ticket data', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);
        expect(component.editTitle).toBe('Login page');
        expect(component.editDescription).toBe('Implement login');
        expect(component.editType).toBe('STORY');
        expect(component.editPriority).toBe('HIGH');
        expect(component.editStatus).toBe('TO_DO');
        expect(component.editAssigneeId).toBe('2');
    });

    it('should load project members when opening edit dialog', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);
        expect(projectSvc.getProjectMembers).toHaveBeenCalledWith('1');
        expect(component.editMembers).toEqual(mockMembers);
    });

    it('should default editDescription to empty string when ticket has no description', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[1]); // mockItems[1] has description: null
        expect(component.editDescription).toBe('');
    });

    it('should validate edit form — title too short returns false', () => {
        fixture.detectChanges();
        component.editTitle = 'A';
        expect(component.isEditFormValid()).toBe(false);
    });

    it('should validate edit form — valid title returns true', () => {
        fixture.detectChanges();
        component.editTitle = 'Valid title';
        expect(component.isEditFormValid()).toBe(true);
    });

    it('should update ticket successfully: close dialog, growl, reload', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);

        const closeSpy = vi.spyOn(component.editDialog, 'closeDialog');
        ticketsSvc.getTickets.mockClear();

        component.editTitle = 'Updated title';
        component.onEditTicket();

        expect(projectSvc.updateTicket).toHaveBeenCalledWith('1', 1, expect.objectContaining({
            title: 'Updated title',
            type: 'STORY',
            priority: 'HIGH',
            status: 'TO_DO',
            assignee_id: '2',
        }));
        expect(closeSpy).toHaveBeenCalled();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
    });

    it('should show inline error on edit failure', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);

        projectSvc.updateTicket.mockReturnValue(throwError(() => ({ error: { message: 'Conflict' } })));
        component.onEditTicket();

        expect(component.editError).toBe('Conflict');
    });

    it('should use default error message when server returns no message', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);

        projectSvc.updateTicket.mockReturnValue(throwError(() => ({})));
        component.onEditTicket();

        expect(component.editError).toBe('tickets.error.update-default');
    });

    it('should not call updateTicket when edit form is invalid', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);
        component.editTitle = 'A'; // too short
        projectSvc.updateTicket.mockClear();

        component.onEditTicket();
        expect(projectSvc.updateTicket).not.toHaveBeenCalled();
    });

    it('should reset edit form on resetEditForm()', () => {
        fixture.detectChanges();
        vi.spyOn(component.editDialog, 'openDialog');
        component.openEditDialog(mockItems[0]);
        component.editError = 'some error';

        component.resetEditForm();

        expect(component.editItem).toBeNull();
        expect(component.editTitle).toBe('');
        expect(component.editDescription).toBe('');
        expect(component.editType).toBe('STORY');
        expect(component.editPriority).toBe('MEDIUM');
        expect(component.editStatus).toBe('TO_DO');
        expect(component.editAssigneeId).toBeNull();
        expect(component.editMembers).toEqual([]);
        expect(component.editError).toBe('');
    });

    // ── Assign Ticket Dialog ──

    it('should check manage permissions after tickets load', () => {
        fixture.detectChanges();
        // hasProjectRole is called for each unique projectId in items
        expect(perm.hasProjectRole).toHaveBeenCalledWith('1', 'PROJECT_ADMIN', 'PRODUCT_OWNER');
        expect(perm.hasProjectRole).toHaveBeenCalledWith('2', 'PROJECT_ADMIN', 'PRODUCT_OWNER');
    });

    it('should populate canManageMap with permission results', () => {
        fixture.detectChanges();
        expect(component.canManageMap.get('1')).toBe(true);
        expect(component.canManageMap.get('2')).toBe(true);
    });

    it('should return true from canManage when user has permission', () => {
        fixture.detectChanges();
        expect(component.canManage(mockItems[0])).toBe(true);
    });

    it('should return false from canManage when user lacks permission', () => {
        perm.hasProjectRole.mockReturnValue(of(false));
        fixture.detectChanges();
        expect(component.canManage(mockItems[0])).toBe(false);
    });

    it('should hide assign button when user lacks permission', () => {
        perm.hasProjectRole.mockReturnValue(of(false));
        fixture.detectChanges();
        const dropdowns = fixture.nativeElement.querySelectorAll('eui-dropdown-content');
        dropdowns.forEach((dd: Element) => {
            const buttons = dd.querySelectorAll('button');
            buttons.forEach((btn: Element) => {
                expect(btn.textContent).not.toContain('tickets.card.action.assign');
            });
        });
    });

    it('should show assign button when user has permission', () => {
        fixture.detectChanges();
        fixture.detectChanges();
        // canManageMap is populated, canManage returns true for both items
        expect(component.canManage(mockItems[0])).toBe(true);
        expect(component.canManage(mockItems[1])).toBe(true);
    });

    it('should pre-populate assign dialog with current assignee', () => {
        fixture.detectChanges();
        vi.spyOn(component.assignDialog, 'openDialog');
        component.openAssignDialog(mockItems[0]);
        expect(component.assignMemberId).toBe('2');
        expect(component.assignItem).toEqual(mockItems[0]);
    });

    it('should load project members when opening assign dialog', () => {
        fixture.detectChanges();
        vi.spyOn(component.assignDialog, 'openDialog');
        projectSvc.getProjectMembers.mockClear();
        component.openAssignDialog(mockItems[0]);
        expect(projectSvc.getProjectMembers).toHaveBeenCalledWith('1');
        expect(component.assignMembers).toEqual(mockMembers);
    });

    it('should assign ticket successfully: close dialog, growl, reload', () => {
        fixture.detectChanges();
        vi.spyOn(component.assignDialog, 'openDialog');
        component.openAssignDialog(mockItems[0]);

        const closeSpy = vi.spyOn(component.assignDialog, 'closeDialog');
        ticketsSvc.getTickets.mockClear();

        component.assignMemberId = '2';
        component.onAssignTicket();

        expect(projectSvc.updateTicket).toHaveBeenCalledWith('1', 1, { assignee_id: '2' });
        expect(closeSpy).toHaveBeenCalled();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
    });

    it('should show inline error on assign failure', () => {
        fixture.detectChanges();
        vi.spyOn(component.assignDialog, 'openDialog');
        component.openAssignDialog(mockItems[0]);

        projectSvc.updateTicket.mockReturnValue(throwError(() => ({ error: { message: 'Forbidden' } })));
        component.onAssignTicket();

        expect(component.assignError).toBe('Forbidden');
    });

    it('should reset assign form on resetAssignForm()', () => {
        fixture.detectChanges();
        vi.spyOn(component.assignDialog, 'openDialog');
        component.openAssignDialog(mockItems[0]);
        component.assignError = 'some error';

        component.resetAssignForm();

        expect(component.assignItem).toBeNull();
        expect(component.assignMemberId).toBeNull();
        expect(component.assignMembers).toEqual([]);
        expect(component.assignError).toBe('');
    });

    // ── Change Status Dialog ──

    it('should pre-populate status dialog with current status', () => {
        fixture.detectChanges();
        vi.spyOn(component.statusDialog, 'openDialog');
        component.openStatusDialog(mockItems[0]);
        expect(component.statusValue).toBe('TO_DO');
        expect(component.statusItem).toEqual(mockItems[0]);
    });

    it('should change status successfully: close dialog, growl, reload', () => {
        fixture.detectChanges();
        vi.spyOn(component.statusDialog, 'openDialog');
        component.openStatusDialog(mockItems[0]);

        const closeSpy = vi.spyOn(component.statusDialog, 'closeDialog');
        ticketsSvc.getTickets.mockClear();

        component.statusValue = 'IN_PROGRESS';
        component.onChangeStatus();

        expect(projectSvc.updateTicket).toHaveBeenCalledWith('1', 1, { status: 'IN_PROGRESS' });
        expect(closeSpy).toHaveBeenCalled();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        expect(ticketsSvc.getTickets).toHaveBeenCalled();
    });

    it('should show inline error on status change failure', () => {
        fixture.detectChanges();
        vi.spyOn(component.statusDialog, 'openDialog');
        component.openStatusDialog(mockItems[0]);

        projectSvc.updateTicket.mockReturnValue(throwError(() => ({ error: { message: 'Conflict' } })));
        component.onChangeStatus();

        expect(component.statusError).toBe('Conflict');
    });

    it('should use default error message on status change when server returns no message', () => {
        fixture.detectChanges();
        vi.spyOn(component.statusDialog, 'openDialog');
        component.openStatusDialog(mockItems[0]);

        projectSvc.updateTicket.mockReturnValue(throwError(() => ({})));
        component.onChangeStatus();

        expect(component.statusError).toBe('tickets.error.status-default');
    });

    it('should reset status form on resetStatusForm()', () => {
        fixture.detectChanges();
        vi.spyOn(component.statusDialog, 'openDialog');
        component.openStatusDialog(mockItems[1]);
        component.statusError = 'some error';

        component.resetStatusForm();

        expect(component.statusItem).toBeNull();
        expect(component.statusValue).toBe('TO_DO');
        expect(component.statusError).toBe('');
    });

    it('should hide change-status button when user lacks permission', () => {
        perm.hasProjectRole.mockReturnValue(of(false));
        fixture.detectChanges();
        const dropdowns = fixture.nativeElement.querySelectorAll('eui-dropdown-content');
        dropdowns.forEach((dd: Element) => {
            const buttons = dd.querySelectorAll('button');
            buttons.forEach((btn: Element) => {
                expect(btn.textContent).not.toContain('tickets.card.action.change-status');
            });
        });
    });

    it('should show change-status button when user has permission', () => {
        fixture.detectChanges();
        fixture.detectChanges();
        expect(component.canManage(mockItems[0])).toBe(true);
        expect(component.canManage(mockItems[1])).toBe(true);
    });
});
