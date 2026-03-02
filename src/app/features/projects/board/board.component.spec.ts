import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock } from '../../../testing/test-providers';
import { BoardComponent } from './board.component';
import {
    ProjectContextService, ProjectService, Project,
    Workflow, BacklogListResponse, Sprint, ProjectMember, BacklogItem,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockWorkflows: Workflow[] = [
    {
        id: 'wf-1', projectId: '1', ticketType: 'STORY',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-01T00:00:00.000Z',
    },
    {
        id: 'wf-2', projectId: '1', ticketType: 'EPIC',
        statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], IN_REVIEW: [], DONE: [] },
        created_at: '2025-01-01T00:00:00.000Z',
    },
];

const mockBacklogResponse: BacklogListResponse = {
    data: [
        { id: '1', projectId: '1', type: 'STORY', title: 'Login feature', description: '', status: 'TO_DO', priority: 'HIGH', assignee_id: 'u1', epic_id: null, ticket_number: 1, created_by: '1', created_at: '', sprint_id: 'sp-1' },
        { id: '2', projectId: '1', type: 'BUG', title: 'Fix crash', description: '', status: 'IN_PROGRESS', priority: 'CRITICAL', assignee_id: 'u2', epic_id: null, ticket_number: 2, created_by: '1', created_at: '', sprint_id: 'sp-1' },
        { id: '3', projectId: '1', type: 'TASK', title: 'Write docs', description: '', status: 'DONE', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 3, created_by: '1', created_at: '', sprint_id: null },
        { id: '4', projectId: '1', type: 'STORY', title: 'Dashboard', description: '', status: 'TO_DO', priority: 'MEDIUM', assignee_id: 'u1', epic_id: null, ticket_number: 4, created_by: '1', created_at: '', sprint_id: 'sp-2' },
    ],
    total: 4, page: 1, limit: 1000,
};

const mockSprints: Sprint[] = [
    { id: 'sp-1', projectId: '1', name: 'Sprint 1', goal: '', status: 'ACTIVE', start_date: '2026-01-01', end_date: null, created_by: '1', created_at: '', updated_at: '' },
    { id: 'sp-2', projectId: '1', name: 'Sprint 2', goal: '', status: 'PLANNED', start_date: null, end_date: null, created_by: '1', created_at: '', updated_at: '' },
    { id: 'sp-3', projectId: '1', name: 'Sprint 3', goal: '', status: 'CLOSED', start_date: '2025-12-01', end_date: '2025-12-14', created_by: '1', created_at: '', updated_at: '' },
];

const mockMembers: ProjectMember[] = [
    { id: 'm1', userId: 'u1', role: 'DEVELOPER', joined_at: '', firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com' },
    { id: 'm2', userId: 'u2', role: 'DEVELOPER', joined_at: '', firstName: 'Bob', lastName: 'Jones', email: 'bob@test.com' },
];

describe('BoardComponent', () => {
    let fixture: ComponentFixture<BoardComponent>;
    let component: BoardComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let permissionMock: Record<string, ReturnType<typeof vi.fn>>;
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getWorkflows: vi.fn().mockReturnValue(of(mockWorkflows)),
            getBacklog: vi.fn().mockReturnValue(of(mockBacklogResponse)),
            getSprints: vi.fn().mockReturnValue(of(mockSprints)),
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            updateTicket: vi.fn().mockReturnValue(of(mockBacklogResponse.data[0])),
        };
        permissionMock = {
            isSuperAdmin: vi.fn().mockReturnValue(false),
            getUserId: vi.fn().mockReturnValue('99'),
            hasGlobalRole: vi.fn().mockReturnValue(false),
            getGlobalRole: vi.fn().mockReturnValue('USER'),
            getOriginalRole: vi.fn().mockReturnValue('USER'),
            setUser: vi.fn(),
            clear: vi.fn(),
            showAccessDenied: vi.fn(),
            hasProjectRole: vi.fn().mockReturnValue(of(true)),
        };
        growlServiceMock = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [BoardComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load board data when project is set', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(projectServiceMock.getWorkflows).toHaveBeenCalledWith('1');
        expect(projectServiceMock.getBacklog).toHaveBeenCalledWith('1', { _limit: 1000 });
        expect(projectServiceMock.getSprints).toHaveBeenCalledWith('1');
        expect(projectServiceMock.getProjectMembers).toHaveBeenCalledWith('1');
        expect(component.isLoading).toBe(false);
    });

    it('should derive columns from workflow statuses in order', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        // STORY has TO_DO, IN_PROGRESS, IN_REVIEW, DONE
        // EPIC has TO_DO, IN_PROGRESS, DONE (all already seen)
        expect(component.columns).toEqual(['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']);
    });

    it('should group tickets by status column', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        const todoTickets = component.getColumnTickets('TO_DO');
        expect(todoTickets.length).toBe(2); // tickets 1 and 4
        expect(todoTickets.map(t => t.ticket_number)).toEqual([1, 4]);

        const inProgressTickets = component.getColumnTickets('IN_PROGRESS');
        expect(inProgressTickets.length).toBe(1);
        expect(inProgressTickets[0].ticket_number).toBe(2);

        const doneTickets = component.getColumnTickets('DONE');
        expect(doneTickets.length).toBe(1);
        expect(doneTickets[0].ticket_number).toBe(3);
    });

    it('should filter tickets by sprint when sprint filter is set', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.selectedSprintId = 'sp-1';
        const todoTickets = component.getColumnTickets('TO_DO');
        expect(todoTickets.length).toBe(1);
        expect(todoTickets[0].ticket_number).toBe(1);

        const doneTickets = component.getColumnTickets('DONE');
        expect(doneTickets.length).toBe(0); // ticket 3 has no sprint
    });

    it('should exclude CLOSED sprints from filter dropdown', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        // sp-3 is CLOSED, should be excluded
        expect(component.sprints.length).toBe(2);
        expect(component.sprints.map(s => s.id)).toEqual(['sp-1', 'sp-2']);
    });

    it('should format status labels correctly', () => {
        expect(component.formatStatus('TO_DO')).toBe('To Do');
        expect(component.formatStatus('IN_PROGRESS')).toBe('In Progress');
        expect(component.formatStatus('IN_REVIEW')).toBe('In Review');
        expect(component.formatStatus('DONE')).toBe('Done');
    });

    it('should resolve assignee names from member map', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.getAssigneeName('u1')).toBe('Alice Smith');
        expect(component.getAssigneeName('u2')).toBe('Bob Jones');
        expect(component.getAssigneeName(null)).toBe('');
        expect(component.getAssigneeName('unknown')).toBe('');
    });

    it('should set hasError on load failure', () => {
        projectServiceMock.getWorkflows.mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.hasError).toBe(true);
        expect(component.isLoading).toBe(false);
    });

    it('should retry loading on retry()', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        projectServiceMock.getWorkflows.mockClear();
        component.retry();
        expect(projectServiceMock.getWorkflows).toHaveBeenCalledWith('1');
    });

    it('should announce filter change for screen readers', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.selectedSprintId = 'sp-1';
        component.onSprintFilterChange();
        expect(component.filterAnnouncement).toBeTruthy();
    });

    it('should determine canManage from permission service', () => {
        permissionMock.hasProjectRole.mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.canManage).toBe(true);
        expect(permissionMock.hasProjectRole).toHaveBeenCalledWith('1', 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER');
    });

    it('should determine canChangeStatus from permission service', () => {
        permissionMock.hasProjectRole.mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.canChangeStatus).toBe(true);
        expect(permissionMock.hasProjectRole).toHaveBeenCalledWith('1', 'PROJECT_ADMIN', 'PRODUCT_OWNER');
    });

    // --- STORY-002: Drag & Drop status transitions ---

    it('should call updateTicket on card drop to different column', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        const ticket = mockBacklogResponse.data[0]; // TO_DO ticket
        const fromContainer = { data: [ticket] };
        const toContainer = { data: [] as BacklogItem[] };
        const event = {
            previousContainer: fromContainer,
            container: toContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'IN_PROGRESS');

        expect(projectServiceMock.updateTicket).toHaveBeenCalledWith('1', 1, { status: 'IN_PROGRESS' });
    });

    it('should not call updateTicket when dropped in same column', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        const ticket = mockBacklogResponse.data[0];
        const sameContainer = { data: [ticket] };
        const event = {
            previousContainer: sameContainer,
            container: sameContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'TO_DO');

        expect(projectServiceMock.updateTicket).not.toHaveBeenCalled();
    });

    it('should show success growl and reload on successful transition', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock.getWorkflows.mockClear();

        const ticket = mockBacklogResponse.data[0];
        const fromContainer = { data: [ticket] };
        const toContainer = { data: [] as BacklogItem[] };
        const event = {
            previousContainer: fromContainer,
            container: toContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'IN_PROGRESS');

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success' }),
        );
        // Should reload board data
        expect(projectServiceMock.getWorkflows).toHaveBeenCalledWith('1');
    });

    it('should show error growl and reload on failed transition (400)', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        projectServiceMock.updateTicket.mockReturnValue(throwError(() => ({ status: 400 })));
        projectServiceMock.getWorkflows.mockClear();

        const ticket = mockBacklogResponse.data[0];
        const fromContainer = { data: [ticket] };
        const toContainer = { data: [] as BacklogItem[] };
        const event = {
            previousContainer: fromContainer,
            container: toContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'DONE');

        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error' }),
        );
        // Should reload to revert optimistic update
        expect(projectServiceMock.getWorkflows).toHaveBeenCalledWith('1');
    });

    it('should show forbidden message on 403 error', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        projectServiceMock.updateTicket.mockReturnValue(throwError(() => ({ status: 403 })));

        const ticket = mockBacklogResponse.data[0];
        const fromContainer = { data: [ticket] };
        const toContainer = { data: [] as BacklogItem[] };
        const event = {
            previousContainer: fromContainer,
            container: toContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'IN_PROGRESS');

        expect(component.dndAnnouncement).toBe('board.growl.transition-forbidden');
    });

    it('should set dndAnnouncement on successful drop', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();

        const ticket = mockBacklogResponse.data[0];
        const fromContainer = { data: [ticket] };
        const toContainer = { data: [] as BacklogItem[] };
        const event = {
            previousContainer: fromContainer,
            container: toContainer,
            previousIndex: 0,
            currentIndex: 0,
            item: { data: ticket },
        } as unknown as CdkDragDrop<BacklogItem[]>;

        component.onCardDrop(event, 'IN_PROGRESS');

        expect(component.dndAnnouncement).toBeTruthy();
    });

    it('should not show drag handle when no drag permission', () => {
        permissionMock.hasProjectRole.mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.canChangeStatus).toBe(false);
        const handles = fixture.nativeElement.querySelectorAll('.board-card__drag-handle');
        expect(handles.length).toBe(0);
    });

    it('should show drag handles when canChangeStatus is true', () => {
        permissionMock.hasProjectRole.mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.canChangeStatus).toBe(true);
        const handles = fixture.nativeElement.querySelectorAll('.board-card__drag-handle');
        expect(handles.length).toBeGreaterThan(0);
    });

    it('should show drag handle only for assigned tickets when DEVELOPER', () => {
        permissionMock.getUserId.mockReturnValue('u1'); // matches ticket 1 and 4 (assignee_id: 'u1')
        permissionMock.hasProjectRole.mockImplementation((_projectId: string, ...roles: string[]) => {
            // canManage: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER → true
            if (roles.length === 3 && roles.includes('DEVELOPER')) {
                return of(true);
            }
            // canChangeStatus: PROJECT_ADMIN, PRODUCT_OWNER → false
            if (roles.length === 2 && roles.includes('PROJECT_ADMIN') && roles.includes('PRODUCT_OWNER')) {
                return of(false);
            }
            // isDeveloper check: DEVELOPER alone → true
            if (roles.length === 1 && roles.includes('DEVELOPER')) {
                return of(true);
            }
            return of(false);
        });
        currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.canManage).toBe(true);
        expect(component.canChangeStatus).toBe(false);
        // Tickets assigned to u1: ticket 1 (TO_DO) and ticket 4 (TO_DO) → 2 drag handles
        // Ticket 2 (assignee u2) and ticket 3 (assignee null) → no drag handle
        const handles = fixture.nativeElement.querySelectorAll('.board-card__drag-handle');
        expect(handles.length).toBe(2);
    });
});
