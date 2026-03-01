import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock } from '../../../../testing/test-providers';
import { SprintPlanningComponent } from './sprint-planning.component';
import { ProjectContextService, ProjectService, Project, Sprint, BacklogListResponse } from '../../../../core/project';
import { PermissionService } from '../../../../core/auth';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: '', created_by: '1',
    created_at: '2025-01-20T00:00:00.000Z', updated_at: '2025-06-01T00:00:00.000Z', is_active: true,
};

const mockSprint: Sprint = {
    id: 'sp-2', projectId: '1', name: 'Sprint 2', goal: 'Active goal',
    status: 'ACTIVE', start_date: '2026-01-15', end_date: null,
    created_by: '1', created_at: '2026-01-15T00:00:00.000Z', updated_at: '2026-01-15T00:00:00.000Z',
};

const mockBacklogResponse: BacklogListResponse = {
    data: [
        { id: '1', projectId: '1', type: 'STORY', title: 'Available ticket', description: '', status: 'TO_DO', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 10, created_by: '1', created_at: '', sprint_id: null },
        { id: '2', projectId: '1', type: 'BUG', title: 'Sprint ticket', description: '', status: 'IN_PROGRESS', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 11, created_by: '1', created_at: '', sprint_id: 'sp-2' },
    ],
    total: 2, page: 1, limit: 1000,
};

describe('SprintPlanningComponent', () => {
    let fixture: ComponentFixture<SprintPlanningComponent>;
    let component: SprintPlanningComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let permissionMock: Record<string, ReturnType<typeof vi.fn>>;
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getSprints: vi.fn().mockReturnValue(of([mockSprint])),
            getBacklog: vi.fn().mockReturnValue(of(mockBacklogResponse)),
            assignSprintItems: vi.fn().mockReturnValue(of({ assigned: 1 })),
            removeSprintItem: vi.fn().mockReturnValue(of({ removed: true })),
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
            imports: [SprintPlanningComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'sp-2' } } } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SprintPlanningComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load sprint and tickets on init', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getSprints']).toHaveBeenCalledWith('1');
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1', { _limit: 1000 });
        expect(component.sprint).toEqual(mockSprint);
        expect(component.availableTickets.length).toBe(1);
        expect(component.sprintTickets.length).toBe(1);
    });

    it('should show available and sprint ticket sections', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sections = fixture.nativeElement.querySelectorAll('section[aria-label]');
        expect(sections.length).toBe(2);
    });

    it('should toggle ticket selection', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleSelection(10);
        expect(component.isSelected(10)).toBe(true);
        component.toggleSelection(10);
        expect(component.isSelected(10)).toBe(false);
    });

    it('should call assignSprintItems when assigning selected tickets', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleSelection(10);
        component.assignSelected();
        expect(projectServiceMock['assignSprintItems']).toHaveBeenCalledWith('1', 'sp-2', { ticket_numbers: [10] });
    });

    it('should call removeSprintItem when removing a ticket', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.removeTicket(11);
        expect(projectServiceMock['removeSprintItem']).toHaveBeenCalledWith('1', 'sp-2', 11);
    });

    it('should show error growl on assign failure', () => {
        projectServiceMock['assignSprintItems'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleSelection(10);
        component.assignSelected();
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should be read-only when canManage is false', () => {
        permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.isReadOnly).toBe(true);
    });

    it('should show checkboxes when canManage is true', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes.length).toBe(1);
    });

    it('should show remove buttons for sprint tickets when canManage', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const removeButtons = fixture.nativeElement.querySelectorAll('eui-icon-button');
        expect(removeButtons.length).toBe(1);
    });

    it('should show error state on load failure', () => {
        projectServiceMock['getSprints'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
    });

    describe('Ordering consistency (STORY-001)', () => {
        it('should sort sprintTickets by position ascending', () => {
            const unorderedResponse: BacklogListResponse = {
                data: [
                    { id: '3', projectId: '1', type: 'TASK', title: 'C', description: '', status: 'TO_DO', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 30, created_by: '1', created_at: '', sprint_id: 'sp-2', position: 3 },
                    { id: '1', projectId: '1', type: 'STORY', title: 'A', description: '', status: 'TO_DO', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 10, created_by: '1', created_at: '', sprint_id: 'sp-2', position: 1 },
                    { id: '2', projectId: '1', type: 'BUG', title: 'B', description: '', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee_id: null, epic_id: null, ticket_number: 20, created_by: '1', created_at: '', sprint_id: 'sp-2', position: 2 },
                ],
                total: 3, page: 1, limit: 1000,
            };
            projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of(unorderedResponse));
            currentProject$.next(mockProject);
            fixture.detectChanges();
            expect(component.sprintTickets.map(t => t.ticket_number)).toEqual([10, 20, 30]);
        });

        it('should sort availableTickets by position ascending', () => {
            const unorderedResponse: BacklogListResponse = {
                data: [
                    { id: '2', projectId: '1', type: 'BUG', title: 'B', description: '', status: 'TO_DO', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 20, created_by: '1', created_at: '', sprint_id: null, position: 5 },
                    { id: '1', projectId: '1', type: 'STORY', title: 'A', description: '', status: 'TO_DO', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 10, created_by: '1', created_at: '', sprint_id: null, position: 2 },
                ],
                total: 2, page: 1, limit: 1000,
            };
            projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of(unorderedResponse));
            currentProject$.next(mockProject);
            fixture.detectChanges();
            expect(component.availableTickets.map(t => t.ticket_number)).toEqual([10, 20]);
        });

        it('should fall back to ticket_number when position is undefined', () => {
            const noPositionResponse: BacklogListResponse = {
                data: [
                    { id: '2', projectId: '1', type: 'BUG', title: 'B', description: '', status: 'TO_DO', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 20, created_by: '1', created_at: '', sprint_id: 'sp-2' },
                    { id: '1', projectId: '1', type: 'STORY', title: 'A', description: '', status: 'TO_DO', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 5, created_by: '1', created_at: '', sprint_id: 'sp-2' },
                ],
                total: 2, page: 1, limit: 1000,
            };
            projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of(noPositionResponse));
            currentProject$.next(mockProject);
            fixture.detectChanges();
            expect(component.sprintTickets.map(t => t.ticket_number)).toEqual([5, 20]);
        });
    });
});
