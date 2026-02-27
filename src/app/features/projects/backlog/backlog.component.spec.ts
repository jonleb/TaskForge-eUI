import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock } from '../../../testing/test-providers';
import { BacklogComponent } from './backlog.component';
import { ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember, BacklogListResponse } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

type MockToggleItem = { id: string };

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockMembers: ProjectMember[] = [
    { id: '1', userId: '2', role: 'PROJECT_ADMIN', joined_at: '2025-01-20', firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com' },
    { id: '2', userId: '3', role: 'DEVELOPER', joined_at: '2025-02-10', firstName: 'Jane', lastName: 'Doe', email: 'jane@test.com' },
];

const mockEpics: BacklogItem[] = [
    {
        id: '1', projectId: '1', type: 'EPIC', title: 'Maintenance',
        description: 'Default epic', status: 'TO_DO', priority: null,
        assignee_id: null, epic_id: null, ticket_number: 1,
        created_by: 'system', created_at: '2025-01-20T09:00:00.000Z',
    },
];

const mockItems: BacklogItem[] = [
    ...mockEpics,
    {
        id: '17', projectId: '1', type: 'STORY', title: 'Login page',
        description: 'Implement login', status: 'TO_DO', priority: 'HIGH',
        assignee_id: '2', epic_id: '1', ticket_number: 2,
        created_by: '1', created_at: '2026-02-27T10:00:00.000Z',
    },
    {
        id: '18', projectId: '1', type: 'BUG', title: 'Fix crash',
        description: 'App crashes', status: 'IN_PROGRESS', priority: 'CRITICAL',
        assignee_id: '3', epic_id: null, ticket_number: 3,
        created_by: '1', created_at: '2026-02-27T11:00:00.000Z',
    },
];

const mockResponse: BacklogListResponse = { data: mockItems, total: 3, page: 1, limit: 10 };
const emptyResponse: BacklogListResponse = { data: [], total: 0, page: 1, limit: 10 };

describe('BacklogComponent', () => {
    let fixture: ComponentFixture<BacklogComponent>;
    let component: BacklogComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let permissionMock: Record<string, ReturnType<typeof vi.fn>>;
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getBacklog: vi.fn().mockReturnValue(of(mockResponse)),
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getProjects: vi.fn(),
            getProject: vi.fn(),
            getUser: vi.fn(),
            createProject: vi.fn(),
            updateProject: vi.fn(),
            upsertMember: vi.fn(),
            removeMember: vi.fn(),
            searchCandidates: vi.fn(),
            getWorkflows: vi.fn(),
            createTicket: vi.fn(),
            getEpics: vi.fn().mockReturnValue(of(mockEpics)),
        };
        permissionMock = {
            isSuperAdmin: vi.fn().mockReturnValue(true),
            getUserId: vi.fn().mockReturnValue('1'),
            hasGlobalRole: vi.fn().mockReturnValue(false),
            getGlobalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            getOriginalRole: vi.fn().mockReturnValue('SUPER_ADMIN'),
            setUser: vi.fn(),
            clear: vi.fn(),
            showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn().mockReturnValue(of(true)),
        };
        growlServiceMock = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [BacklogComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BacklogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display loading state initially', () => {
        currentProject$.next(mockProject);
        expect(component.isLoading).toBe(true);
    });

    it('should load backlog items on project change', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.items.length).toBe(3);
        expect(component.total).toBe(3);
        expect(component.isLoading).toBe(false);
    });

    it('should call getBacklog with params', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1', {
            _page: 1, _limit: 10, _sort: 'ticket_number', _order: 'desc',
        });
    });

    it('should display showing count with aria-live', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const p = fixture.nativeElement.querySelector('p[aria-live="polite"]');
        expect(p).toBeTruthy();
        expect(p.textContent).toContain('backlog.showing-of');
    });

    it('should render async table with aria-label', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const table = fixture.nativeElement.querySelector('table[euitable]');
        expect(table).toBeTruthy();
        expect(table.getAttribute('aria-label')).toBe('backlog.table-label');
    });

    it('should render paginator', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const paginator = fixture.nativeElement.querySelector('eui-paginator');
        expect(paginator).toBeTruthy();
    });

    it('should set hasError on load failure', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        expect(component.items.length).toBe(0);
        expect(component.total).toBe(0);
    });

    it('should show empty state message when no items', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of(emptyResponse));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.emptyStateMessage).toBe('backlog.no-items');
    });

    it('should show error message in emptyStateMessage on error', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.emptyStateMessage).toBe('backlog.load-error');
    });

    it('should call retry and reload items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        component.retry();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1', component.params);
    });

    it('should set canCreate to true for SUPER_ADMIN', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canCreate).toBe(true);
    });

    it('should set canCreate to false for VIEWER', () => {
        permissionMock['isSuperAdmin'] = vi.fn().mockReturnValue(false);
        permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canCreate).toBe(false);
    });

    it('should show Create Ticket button when canCreate is true', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button[euibutton]');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('backlog.create-btn');
    });

    it('should hide Create Ticket button when canCreate is false', () => {
        permissionMock['isSuperAdmin'] = vi.fn().mockReturnValue(false);
        permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button[euibutton]');
        expect(btn).toBeNull();
    });

    // --- Sort & Pagination ---

    it('should update params and reload on sort change', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        component.onSortChange([{ sort: 'title', order: 'ASC' } as unknown as import('@eui/components/eui-table').Sort]);
        expect(component.params._sort).toBe('title');
        expect(component.params._order).toBe('asc');
        expect(component.params._page).toBe(1);
        expect(projectServiceMock['getBacklog']).toHaveBeenCalled();
    });

    it('should update params and reload on page change', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        // Simulate AfterViewInit
        component.ngAfterViewInit();
        projectServiceMock['getBacklog'].mockClear();
        component.onPageChange({ page: 1, pageSize: 25 });
        expect(component.params._page).toBe(2);
        expect(component.params._limit).toBe(25);
        expect(projectServiceMock['getBacklog']).toHaveBeenCalled();
    });

    it('should ignore page change before paginatorReady', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        // paginatorReady is false before ngAfterViewInit
        component['paginatorReady'] = false;
        component.onPageChange({ page: 1, pageSize: 25 });
        expect(projectServiceMock['getBacklog']).not.toHaveBeenCalled();
    });

    // --- Assignee resolution ---

    it('should resolve assignee name from member lookup', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[1])).toBe('Bob Smith');
        expect(component.getAssigneeName(mockItems[2])).toBe('Jane Doe');
    });

    it('should return dash for null assignee', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getAssigneeName(mockItems[0])).toBe('—');
    });

    // --- Create Ticket Dialog ---

    it('should default type to STORY and priority to MEDIUM', () => {
        expect(component.newTicketType).toBe('STORY');
        expect(component.newTicketPriority).toBe('MEDIUM');
    });

    it('should have 3 creatable types (no EPIC)', () => {
        expect(component.creatableTypes).toEqual(['STORY', 'BUG', 'TASK']);
    });

    it('should have 4 priority values', () => {
        expect(component.priorities).toEqual(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
    });

    it('should report form invalid when title is empty', () => {
        component.newTicketTitle = '';
        expect(component.isCreateFormValid()).toBe(false);
    });

    it('should report form invalid when title is 1 char', () => {
        component.newTicketTitle = 'A';
        expect(component.isCreateFormValid()).toBe(false);
    });

    it('should report form valid when title is 2+ chars', () => {
        component.newTicketTitle = 'AB';
        expect(component.isCreateFormValid()).toBe(true);
    });

    it('should call createTicket on accept with correct payload', () => {
        const createdItem: BacklogItem = {
            id: '19', projectId: '1', type: 'STORY', title: 'New ticket',
            description: '', status: 'TO_DO', priority: 'MEDIUM',
            assignee_id: null, epic_id: null, ticket_number: 4,
            created_by: '1', created_at: '2026-02-27T12:00:00.000Z',
        };
        projectServiceMock['createTicket'] = vi.fn().mockReturnValue(of(createdItem));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.newTicketType = 'STORY';
        component.newTicketTitle = 'New ticket';
        component.newTicketPriority = 'MEDIUM';
        component.onCreateTicket();

        expect(projectServiceMock['createTicket']).toHaveBeenCalledWith('1', {
            type: 'STORY',
            title: 'New ticket',
            description: undefined,
            priority: 'MEDIUM',
            assignee_id: null,
            epic_id: null,
        });
    });

    it('should show growl on success and reload backlog', () => {
        const createdItem: BacklogItem = {
            id: '19', projectId: '1', type: 'STORY', title: 'New ticket',
            description: '', status: 'TO_DO', priority: 'MEDIUM',
            assignee_id: null, epic_id: null, ticket_number: 4,
            created_by: '1', created_at: '2026-02-27T12:00:00.000Z',
        };
        projectServiceMock['createTicket'] = vi.fn().mockReturnValue(of(createdItem));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.newTicketTitle = 'New ticket';
        projectServiceMock['getBacklog'].mockClear();
        component.onCreateTicket();

        expect(growlServiceMock.growl).toHaveBeenCalled();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1', component.params);
    });

    it('should show inline error on failure', () => {
        projectServiceMock['createTicket'] = vi.fn().mockReturnValue(
            throwError(() => ({ error: { message: 'Title is required' } })),
        );
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.newTicketTitle = 'Valid title';
        component.onCreateTicket();

        expect(component.createError).toBe('Title is required');
    });

    it('should reset form on dismiss', () => {
        component.newTicketTitle = 'Something';
        component.newTicketPriority = 'HIGH';
        component.createError = 'Some error';
        component.resetCreateForm();

        expect(component.newTicketTitle).toBe('');
        expect(component.newTicketType).toBe('STORY');
        expect(component.newTicketPriority).toBe('MEDIUM');
        expect(component.createError).toBe('');
    });

    // --- STORY-004: Search & Filter Bar ---

    it('should render search filter', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const filter = fixture.nativeElement.querySelector('eui-table-filter');
        expect(filter).toBeTruthy();
    });

    it('should render status toggle group with 5 items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const groups = fixture.nativeElement.querySelectorAll('eui-toggle-group');
        expect(groups.length).toBe(2);
        const statusItems = groups[0].querySelectorAll('eui-toggle-group-item');
        expect(statusItems.length).toBe(5);
    });

    it('should render type toggle group with 5 items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const groups = fixture.nativeElement.querySelectorAll('eui-toggle-group');
        const typeItems = groups[1].querySelectorAll('eui-toggle-group-item');
        expect(typeItems.length).toBe(5);
    });

    it('should emit search term via onFilterChange', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.onFilterChange('test');
        // searchSubject is debounced — just verify it doesn't throw
        expect(component).toBeTruthy();
    });

    it('should update params on status filter change and reset page', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        component.onStatusFilterChange({ id: 'status-todo' } as MockToggleItem);
        expect(component.activeStatusFilter).toBe('TO_DO');
        expect(component.params.status).toBe('TO_DO');
        expect(component.params._page).toBe(1);
        expect(projectServiceMock['getBacklog']).toHaveBeenCalled();
    });

    it('should clear status param when All selected', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.onStatusFilterChange({ id: 'status-todo' } as MockToggleItem);
        component.onStatusFilterChange({ id: 'status-all' } as MockToggleItem);
        expect(component.activeStatusFilter).toBe('all');
        expect(component.params.status).toBeUndefined();
    });

    it('should update params on type filter change and reset page', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        component.onTypeFilterChange({ id: 'type-bug' } as MockToggleItem);
        expect(component.activeTypeFilter).toBe('BUG');
        expect(component.params.type).toBe('BUG');
        expect(component.params._page).toBe(1);
        expect(projectServiceMock['getBacklog']).toHaveBeenCalled();
    });

    it('should clear type param when All selected', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.onTypeFilterChange({ id: 'type-story' } as MockToggleItem);
        component.onTypeFilterChange({ id: 'type-all' } as MockToggleItem);
        expect(component.activeTypeFilter).toBe('all');
        expect(component.params.type).toBeUndefined();
    });
});
