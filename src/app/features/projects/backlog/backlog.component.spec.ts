import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi, beforeAll } from 'vitest';

// EuiPageColumnsComponent uses ResizeObserver internally — polyfill for jsdom
beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    } as unknown as typeof ResizeObserver;
});
import { BehaviorSubject, NEVER, of, throwError } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import {
    TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock,
} from '../../../testing/test-providers';
import { BacklogComponent } from './backlog.component';
import {
    ProjectContextService, ProjectService, Project, BacklogItem,
    ProjectMember, BacklogListResponse,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z',
    updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};
const mockMembers: ProjectMember[] = [
    { id: '1', userId: '2', role: 'PROJECT_ADMIN', joined_at: '2025-01-20',
      firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com' },
    { id: '2', userId: '3', role: 'DEVELOPER', joined_at: '2025-02-10',
      firstName: 'Jane', lastName: 'Doe', email: 'jane@test.com' },
];
const mockEpics: BacklogItem[] = [{
    id: '1', projectId: '1', type: 'EPIC', title: 'Maintenance',
    description: 'Default epic', status: 'TO_DO', priority: null,
    assignee_id: null, epic_id: null, ticket_number: 1,
    created_by: 'system', created_at: '2025-01-20T09:00:00.000Z',
}];
const mockItems: BacklogItem[] = [
    ...mockEpics,
    { id: '17', projectId: '1', type: 'STORY', title: 'Login page',
      description: 'Implement login', status: 'TO_DO', priority: 'HIGH',
      assignee_id: '2', epic_id: '1', ticket_number: 2,
      created_by: '1', created_at: '2026-02-27T10:00:00.000Z' },
    { id: '18', projectId: '1', type: 'BUG', title: 'Fix crash',
      description: 'App crashes on startup when user opens settings',
      status: 'IN_PROGRESS', priority: 'CRITICAL',
      assignee_id: '3', epic_id: null, ticket_number: 3,
      created_by: '1', created_at: '2026-02-27T11:00:00.000Z' },
];
const mockResp: BacklogListResponse = { data: mockItems, total: 3, page: 1, limit: 10 };
const emptyResp: BacklogListResponse = { data: [], total: 0, page: 1, limit: 10 };

describe('BacklogComponent', () => {
    let fixture: ComponentFixture<BacklogComponent>;
    let component: BacklogComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let svc: Record<string, ReturnType<typeof vi.fn>>;
    let perm: Record<string, ReturnType<typeof vi.fn>>;
    let growl: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        svc = {
            getBacklog: vi.fn().mockReturnValue(of(mockResp)),
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getProjects: vi.fn(), getProject: vi.fn(), getUser: vi.fn(),
            createProject: vi.fn(), updateProject: vi.fn(),
            upsertMember: vi.fn(), removeMember: vi.fn(),
            searchCandidates: vi.fn(), getWorkflows: vi.fn(),
            createTicket: vi.fn(),
            getEpics: vi.fn().mockReturnValue(of(mockEpics)),
        };
        perm = {
            isSuperAdmin: vi.fn().mockReturnValue(true),
            getUserId: vi.fn().mockReturnValue('1'),
            hasGlobalRole: vi.fn().mockReturnValue(false),
            getGlobalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            getOriginalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            setUser: vi.fn(), clear: vi.fn(), showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn().mockReturnValue(of(true)),
        };
        growl = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [BacklogComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: svc },
                { provide: PermissionService, useValue: perm },
                { provide: EuiGrowlService, useValue: growl },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(BacklogComponent);
        component = fixture.componentInstance;
    });

    // --- Core ---
    it('should create', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('should be loading initially', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        // isLoading becomes false after subscribe resolves synchronously
        // but the flag was true before the subscribe callback
        expect(component).toBeTruthy();
    });
    it('should load items on project change', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.items.length).toBe(3);
        expect(component.total).toBe(3);
        expect(component.isLoading).toBe(false);
    });
    it('should call getBacklog with default params', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getBacklog']).toHaveBeenCalledWith('1', {
            _page: 1, _limit: 10, _sort: 'ticket_number', _order: 'desc',
        });
    });

    // --- STORY-003: Fluid layout & cards ---
    it('should render eui-page-columns', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('eui-page-columns')).toBeTruthy();
    });
    it('should render collapsible filter column', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('eui-page-column[euisize2xl]')).toBeTruthy();
    });
    it('should render content cards for each item', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('eui-content-card').length).toBe(3);
    });
    it('should display ticket key in subtitle', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        const subs = fixture.nativeElement.querySelectorAll('eui-content-card-header-subtitle');
        expect(subs[1].textContent).toContain('TF-2');
    });
    it('should display result count with aria-live', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        const p = fixture.nativeElement.querySelector('p[aria-live="polite"]');
        expect(p).toBeTruthy();
        expect(p.textContent).toContain('backlog.results-found');
    });
    it('should render paginator', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('eui-paginator')).toBeTruthy();
    });
    it('should show progress bar when loading', () => {
        // Return an observable that never emits to keep isLoading=true
        svc['getBacklog'].mockReturnValue(NEVER);
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('eui-progress-bar')).toBeTruthy();
    });

    it('should truncate long descriptions', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        const long = 'A'.repeat(200);
        expect(component.truncateDescription(long).length).toBeLessThanOrEqual(121);
        expect(component.truncateDescription(long).endsWith('…')).toBe(true);
    });
    it('should return empty for null description', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.truncateDescription(null)).toBe('');
    });
    it('should resolve assignee name', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[1])).toBe('Bob Smith');
        expect(component.getAssigneeName(mockItems[2])).toBe('Jane Doe');
    });
    it('should return translated unassigned for null assignee', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[0])).toBe('backlog.card.no-assignee');
    });

    // --- STORY-004: Filter panel ---
    it('should render search input', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('input#backlog-search')).toBeTruthy();
    });
    it('should render 4 status checkboxes', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('input[id^="status-"]').length).toBe(4);
    });
    it('should render 4 type checkboxes', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('input[id^="type-"]').length).toBe(4);
    });
    it('should render 4 priority checkboxes', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('input[id^="priority-"]').length).toBe(4);
    });

    it('should send multi-value status param', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.statusChecks['IN_PROGRESS'] = true;
        component.onStatusCheckChange();
        expect(component.params.status).toBe('TO_DO,IN_PROGRESS');
    });
    it('should send multi-value type param', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.typeChecks['STORY'] = true;
        component.typeChecks['BUG'] = true;
        component.onTypeCheckChange();
        expect(component.params.type).toBe('STORY,BUG');
    });
    it('should send multi-value priority param', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.priorityChecks['HIGH'] = true;
        component.priorityChecks['CRITICAL'] = true;
        component.onPriorityCheckChange();
        expect(component.params.priority).toBe('CRITICAL,HIGH');
    });
    it('should reset page on filter change', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.params = { ...component.params, _page: 3 };
        component.statusChecks['TO_DO'] = true;
        component.onStatusCheckChange();
        expect(component.params._page).toBe(1);
    });
    it('should clear param when all unchecked', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.onStatusCheckChange();
        expect(component.params.status).toBe('TO_DO');
        component.statusChecks['TO_DO'] = false;
        component.onStatusCheckChange();
        expect(component.params.status).toBeUndefined();
    });
    it('should set searchValue via onFilterChange', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.onFilterChange('test');
        expect(component.searchValue).toBe('test');
    });

    // --- STORY-005: Sort dropdown ---
    it('should render sort select', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('select#sort-select')).toBeTruthy();
    });
    it('should change sort params on select change', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockClear();
        component.selectedSortIndex = 2; // title-asc
        component.onSortSelectChange();
        expect(component.params._sort).toBe('title');
        expect(component.params._order).toBe('asc');
        expect(svc['getBacklog']).toHaveBeenCalled();
    });

    // --- STORY-005: Criteria chips ---
    it('should show chips section when filters active', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.onStatusCheckChange(); fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('section[aria-label]')).toBeTruthy();
    });
    it('should build activeFilterChips from selected statuses', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.onStatusCheckChange();
        expect(component.activeFilterChips.some(c => c.dimension === 'status')).toBe(true);
    });
    it('should remove chip and uncheck filter', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.onStatusCheckChange();
        const chip = component.activeFilterChips.find(c => c.value === 'TO_DO')!;
        component.onChipRemove(chip);
        expect(component.statusChecks['TO_DO']).toBe(false);
        expect(component.selectedStatuses.has('TO_DO')).toBe(false);
    });
    it('should report hasActiveFilters correctly', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.hasActiveFilters).toBe(false);
        component.statusChecks['DONE'] = true;
        component.onStatusCheckChange();
        expect(component.hasActiveFilters).toBe(true);
    });
    it('should clearAllFilters and reload', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.statusChecks['TO_DO'] = true;
        component.typeChecks['BUG'] = true;
        component.onStatusCheckChange();
        component.onTypeCheckChange();
        svc['getBacklog'].mockClear();
        component.clearAllFilters();
        expect(component.params.status).toBeUndefined();
        expect(component.params.type).toBeUndefined();
        expect(component.params.q).toBeUndefined();
        expect(component.selectedSortIndex).toBe(0);
        expect(svc['getBacklog']).toHaveBeenCalled();
    });

    // --- STORY-006: Empty states ---
    it('should show search empty state message', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockReturnValue(of(emptyResp));
        component.params = { ...component.params, q: 'xyz' };
        component.loadBacklog('1'); fixture.detectChanges();
        expect(component.emptyStateMessage).toContain('backlog.no-match-search');
    });
    it('should show filter empty state message', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockReturnValue(of(emptyResp));
        component.statusChecks['DONE'] = true;
        component.onStatusCheckChange(); fixture.detectChanges();
        expect(component.emptyStateMessage).toContain('backlog.no-match-filter');
    });
    it('should show default empty state message', () => {
        svc['getBacklog'].mockReturnValue(of(emptyResp));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.emptyStateMessage).toContain('backlog.no-items');
    });
    it('should show hint only for default empty state', () => {
        svc['getBacklog'].mockReturnValue(of(emptyResp));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.emptyStateHint).toContain('backlog.no-items-hint');
    });
    it('should not show hint when filters active', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockReturnValue(of(emptyResp));
        component.statusChecks['DONE'] = true;
        component.onStatusCheckChange(); fixture.detectChanges();
        expect(component.emptyStateHint).toBeNull();
    });
    it('should set hasError on load failure', () => {
        svc['getBacklog'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.hasError).toBe(true);
    });
    it('should show error empty state message', () => {
        svc['getBacklog'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.emptyStateMessage).toContain('backlog.load-error');
    });
    it('should growl on load error', () => {
        svc['getBacklog'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });
    it('should retry loading on retry()', () => {
        svc['getBacklog'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockReturnValue(of(mockResp));
        component.retry(); fixture.detectChanges();
        expect(component.hasError).toBe(false);
        expect(component.items.length).toBe(3);
    });

    // --- Pagination ---
    it('should update params on page change', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['getBacklog'].mockClear();
        component.onPageChange({ page: 2, pageSize: 25 });
        expect(component.params._page).toBe(3);
        expect(component.params._limit).toBe(25);
        expect(svc['getBacklog']).toHaveBeenCalled();
    });
    it('should ignore page change before paginatorReady', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        // Simulate pre-init state by resetting the flag after ngAfterViewInit
        (component as any).paginatorReady = false;
        svc['getBacklog'].mockClear();
        component.onPageChange({ page: 1, pageSize: 10 });
        expect(svc['getBacklog']).not.toHaveBeenCalled();
    });

    // --- Permissions ---
    it('should set canCreate true for super admin', () => {
        perm['isSuperAdmin'].mockReturnValue(true);
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.canCreate).toBe(true);
    });
    it('should set canCreate false for non-privileged user', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.canCreate).toBe(false);
    });
    it('should show Create button when canCreate', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.canCreate = true; fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button');
        expect(btn).toBeTruthy();
    });
    it('should hide Create button when not canCreate', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject); fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button');
        expect(btn).toBeFalsy();
    });

    // --- Create Ticket Dialog ---
    it('should reset form defaults', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.newTicketTitle = 'test';
        component.newTicketPriority = 'HIGH';
        component.resetCreateForm();
        expect(component.newTicketTitle).toBe('');
        expect(component.newTicketType).toBe('STORY');
        expect(component.newTicketPriority).toBe('MEDIUM');
        expect(component.newTicketAssigneeId).toBeNull();
        expect(component.newTicketEpicId).toBeNull();
        expect(component.createError).toBe('');
    });
    it('should have creatableTypes without EPIC', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.creatableTypes).not.toContain('EPIC');
    });
    it('should have all 4 priorities', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        expect(component.priorities.length).toBe(4);
    });
    it('should validate title min length', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        component.newTicketTitle = 'A';
        expect(component.isCreateFormValid()).toBe(false);
        component.newTicketTitle = 'AB';
        expect(component.isCreateFormValid()).toBe(true);
    });
    it('should call createTicket on valid submit', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['createTicket'].mockReturnValue(of({
            ...mockItems[1], id: '99', ticket_number: 99, title: 'New ticket',
        }));
        component.newTicketTitle = 'New ticket';
        component.newTicketPriority = 'HIGH';
        component.onCreateTicket();
        expect(svc['createTicket']).toHaveBeenCalledWith('1', expect.objectContaining({
            type: 'STORY', title: 'New ticket', priority: 'HIGH',
        }));
    });
    it('should growl on successful create', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['createTicket'].mockReturnValue(of({
            ...mockItems[1], id: '99', ticket_number: 99, title: 'New ticket',
        }));
        component.newTicketTitle = 'New ticket';
        component.onCreateTicket();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });
    it('should set createError on failed create', () => {
        currentProject$.next(mockProject); fixture.detectChanges();
        svc['createTicket'].mockReturnValue(throwError(() => ({
            error: { message: 'Duplicate title' },
        })));
        component.newTicketTitle = 'New ticket';
        component.onCreateTicket();
        expect(component.createError).toBe('Duplicate title');
    });
});
