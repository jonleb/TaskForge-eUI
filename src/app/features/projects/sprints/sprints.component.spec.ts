import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock } from '../../../testing/test-providers';
import { SprintsComponent } from './sprints.component';
import { ProjectContextService, ProjectService, Project, Sprint, BacklogListResponse } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockSprints: Sprint[] = [
    { id: 'sp-1', projectId: '1', name: 'Sprint 1', goal: 'Done goal', status: 'CLOSED', start_date: '2026-01-01', end_date: '2026-01-14', created_by: '1', created_at: '2026-01-01T00:00:00.000Z', updated_at: '2026-01-14T00:00:00.000Z' },
    { id: 'sp-2', projectId: '1', name: 'Sprint 2', goal: 'Active goal', status: 'ACTIVE', start_date: '2026-01-15', end_date: null, created_by: '1', created_at: '2026-01-15T00:00:00.000Z', updated_at: '2026-01-15T00:00:00.000Z' },
    { id: 'sp-3', projectId: '1', name: 'Sprint 3', goal: '', status: 'PLANNED', start_date: null, end_date: null, created_by: '1', created_at: '2026-02-01T00:00:00.000Z', updated_at: '2026-02-01T00:00:00.000Z' },
];

const mockBacklogResponse: BacklogListResponse = {
    data: [
        { id: '1', projectId: '1', type: 'STORY', title: 'T1', description: '', status: 'IN_PROGRESS', priority: 'HIGH', assignee_id: null, epic_id: null, ticket_number: 1, created_by: '1', created_at: '', sprint_id: 'sp-2' },
        { id: '2', projectId: '1', type: 'BUG', title: 'T2', description: '', status: 'DONE', priority: 'LOW', assignee_id: null, epic_id: null, ticket_number: 2, created_by: '1', created_at: '', sprint_id: 'sp-2' },
        { id: '3', projectId: '1', type: 'TASK', title: 'T3', description: '', status: 'TO_DO', priority: 'MEDIUM', assignee_id: null, epic_id: null, ticket_number: 3, created_by: '1', created_at: '', sprint_id: 'sp-3' },
    ],
    total: 3, page: 1, limit: 1000,
};

describe('SprintsComponent', () => {
    let fixture: ComponentFixture<SprintsComponent>;
    let component: SprintsComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let permissionMock: Record<string, ReturnType<typeof vi.fn>>;
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getSprints: vi.fn().mockReturnValue(of(mockSprints)),
            createSprint: vi.fn().mockReturnValue(of(mockSprints[2])),
            updateSprintStatus: vi.fn().mockReturnValue(of(mockSprints[1])),
            getBacklog: vi.fn().mockReturnValue(of(mockBacklogResponse)),
            getProjectMembers: vi.fn().mockReturnValue(of([])),
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
            hasProjectRole: vi.fn().mockReturnValue(of(false)),
        };
        growlServiceMock = createGrowlServiceMock();

        await TestBed.configureTestingModule({
            imports: [SprintsComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SprintsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load sprints when project is set', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getSprints']).toHaveBeenCalledWith('1');
        expect(component.sprints).toEqual(mockSprints);
        expect(component.isLoading).toBe(false);
    });

    it('should group sprints by status', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.activeSprints.length).toBe(1);
        expect(component.plannedSprints.length).toBe(1);
        expect(component.closedSprints.length).toBe(1);
    });

    it('should show error state on load failure', () => {
        projectServiceMock['getSprints'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        const errorMsg = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(errorMsg).toBeTruthy();
    });

    it('should show empty state when no sprints', () => {
        projectServiceMock['getSprints'] = vi.fn().mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const msg = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(msg.textContent).toContain('sprint.no-sprints');
    });

    it('should hide Create Sprint button when canManage is false', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const buttons = fixture.nativeElement.querySelectorAll('eui-page-header-action-items button');
        expect(buttons.length).toBe(0);
    });

    it('should show Create Sprint button when canManage is true', () => {
        permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('sprint.create-btn');
    });

    it('should call startSprint and show growl on success', () => {
        permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.startSprint(mockSprints[2]);
        expect(projectServiceMock['updateSprintStatus']).toHaveBeenCalledWith('1', 'sp-3', { status: 'ACTIVE' });
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show error growl when startSprint fails', () => {
        projectServiceMock['updateSprintStatus'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();

        component.startSprint(mockSprints[2]);
        expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should load ticket counts from backlog', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1', { _limit: 1000 });
        expect(component.getTicketCount('sp-2')).toBe(2);
        expect(component.getTicketCount('sp-3')).toBe(1);
    });

    it('should render sprint names in cards', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const titles = fixture.nativeElement.querySelectorAll('eui-card-header-title');
        const titleTexts = Array.from(titles).map((t: Element) => t.textContent?.trim());
        expect(titleTexts).toContain('Sprint 2');
        expect(titleTexts).toContain('Sprint 3');
    });

    it('should render status badges', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const badges = fixture.nativeElement.querySelectorAll('eui-status-badge');
        expect(badges.length).toBeGreaterThanOrEqual(3);
    });

    it('should have page header', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
    });

    it('should have aria-label sections', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sections = fixture.nativeElement.querySelectorAll('section[aria-label]');
        expect(sections.length).toBe(3);
    });
});
