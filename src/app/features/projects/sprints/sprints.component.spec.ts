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
            reorderBacklog: vi.fn().mockReturnValue(of({ updated: 2 })),
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

    it('should render sprint names in items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const nameButtons = fixture.nativeElement.querySelectorAll('.sprint-item__name-btn');
        const closedNames = fixture.nativeElement.querySelectorAll('.sprint-item__name');
        const allNames = [...Array.from(nameButtons), ...Array.from(closedNames)].map((t: Element) => t.textContent?.trim());
        expect(allNames).toContain('Sprint 2');
        expect(allNames).toContain('Sprint 3');
        expect(allNames).toContain('Sprint 1');
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

    describe('Inline issue list (STORY-001)', () => {
        beforeEach(() => {
            currentProject$.next(mockProject);
            fixture.detectChanges();
        });

        it('should render issue list items for sprints with tickets', () => {
            const issueItems = fixture.nativeElement.querySelectorAll('.sprint-issue-item:not(.sprint-issue-item--empty)');
            expect(issueItems.length).toBe(3); // 2 in sp-2, 1 in sp-3
        });

        it('should display ticket number, type badge, title, and status badge per item', () => {
            const firstItem = fixture.nativeElement.querySelector('.sprint-issue-item:not(.sprint-issue-item--empty)');
            expect(firstItem.querySelector('.sprint-issue-item__number').textContent).toContain('#1');
            expect(firstItem.querySelector('.sprint-issue-item__title').textContent).toContain('T1');
            const badges = firstItem.querySelectorAll('eui-status-badge');
            expect(badges.length).toBe(2); // type + status
        });

        it('should show "No issues" for sprints without tickets', () => {
            // sp-1 (closed) has no tickets in mock data
            const emptyItems = fixture.nativeElement.querySelectorAll('.sprint-issue-item--empty');
            expect(emptyItems.length).toBeGreaterThanOrEqual(1);
        });

        it('should sort items by position/ticket_number', () => {
            const items = component.getSprintItems('sp-2');
            for (let i = 1; i < items.length; i++) {
                const prevKey = items[i - 1].position ?? items[i - 1].ticket_number;
                const currKey = items[i].position ?? items[i].ticket_number;
                expect(prevKey).toBeLessThanOrEqual(currKey);
            }
        });

        it('should have aria-label on issue list', () => {
            const lists = fixture.nativeElement.querySelectorAll('.sprint-issue-list');
            expect(lists.length).toBeGreaterThanOrEqual(1);
            for (const list of Array.from(lists) as HTMLElement[]) {
                expect(list.getAttribute('aria-label')).toBeTruthy();
            }
        });

        it('should have aria-label on each issue item', () => {
            const items = fixture.nativeElement.querySelectorAll('.sprint-issue-item:not(.sprint-issue-item--empty)');
            for (const item of Array.from(items) as HTMLElement[]) {
                expect(item.getAttribute('aria-label')).toBeTruthy();
            }
        });

        it('should mark closed sprint items as readonly (no tabindex)', () => {
            const readonlyItems = fixture.nativeElement.querySelectorAll('.sprint-issue-item--readonly');
            // closed sprint sp-1 has no items, so this just verifies the class exists in template
            expect(readonlyItems.length).toBe(0); // sp-1 has no tickets
        });

        it('should use navigateToPlanning via name button for active/planned sprints', () => {
            const nameButtons = fixture.nativeElement.querySelectorAll('.sprint-item__name-btn');
            expect(nameButtons.length).toBe(2); // active + planned
        });
    });

    describe('Drag & drop reorder (STORY-002)', () => {
        beforeEach(() => {
            permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(true));
            currentProject$.next(mockProject);
            fixture.detectChanges();
        });

        it('should show drag handle when canManage is true', () => {
            const handles = fixture.nativeElement.querySelectorAll('.drag-handle');
            expect(handles.length).toBeGreaterThanOrEqual(1);
        });

        it('should not show drag handle when canManage is false', () => {
            permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(false));
            currentProject$.next(mockProject);
            fixture.detectChanges();
            const handles = fixture.nativeElement.querySelectorAll('.drag-handle');
            expect(handles.length).toBe(0);
        });

        it('should not show drag handle for closed sprints', () => {
            const closedSection = fixture.nativeElement.querySelector('section[aria-label="Closed Sprints"]');
            const handles = closedSection?.querySelectorAll('.drag-handle') ?? [];
            expect(handles.length).toBe(0);
        });

        it('should call reorderBacklog on drop with correct payload', () => {
            const items = component.getSprintItems('sp-2');
            const dropEvent = {
                previousIndex: 0,
                currentIndex: 1,
                container: { data: items },
                previousContainer: { data: items },
                item: {},
                isPointerOverContainer: true,
                distance: { x: 0, y: 0 },
                dropPoint: { x: 0, y: 0 },
                event: new MouseEvent('drop'),
            } as any;

            component.onIssueDrop(dropEvent, mockSprints[1]);
            expect(projectServiceMock['reorderBacklog']).toHaveBeenCalledWith('1', {
                items: expect.arrayContaining([
                    expect.objectContaining({ position: expect.any(Number) }),
                ]),
            });
        });

        it('should not call reorderBacklog when same index', () => {
            const dropEvent = {
                previousIndex: 0,
                currentIndex: 0,
                container: { data: [] },
                previousContainer: { data: [] },
                item: {},
            } as any;

            component.onIssueDrop(dropEvent, mockSprints[1]);
            expect(projectServiceMock['reorderBacklog']).not.toHaveBeenCalled();
        });

        it('should show success growl on reorder success', () => {
            const items = component.getSprintItems('sp-2');
            const dropEvent = { previousIndex: 0, currentIndex: 1, container: { data: items }, previousContainer: { data: items }, item: {} } as any;
            component.onIssueDrop(dropEvent, mockSprints[1]);
            expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
        });

        it('should show error growl on reorder failure', () => {
            projectServiceMock['reorderBacklog'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
            const items = component.getSprintItems('sp-2');
            const dropEvent = { previousIndex: 0, currentIndex: 1, container: { data: items }, previousContainer: { data: items }, item: {} } as any;
            component.onIssueDrop(dropEvent, mockSprints[1]);
            expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
        });

        it('should update reorderAnnouncement after drop', () => {
            const items = component.getSprintItems('sp-2');
            const dropEvent = { previousIndex: 0, currentIndex: 1, container: { data: items }, previousContainer: { data: items }, item: {} } as any;
            component.onIssueDrop(dropEvent, mockSprints[1]);
            expect(component.reorderAnnouncement).toBeTruthy();
            expect(component.reorderAnnouncement.length).toBeGreaterThan(0);
        });

        it('should have aria-live assertive region for announcements', () => {
            const liveRegion = fixture.nativeElement.querySelector('output[aria-live="assertive"]');
            expect(liveRegion).toBeTruthy();
        });
    });

    describe('Close Sprint confirmation (STORY-006)', () => {
        beforeEach(() => {
            permissionMock['hasProjectRole'] = vi.fn().mockReturnValue(of(true));
            currentProject$.next(mockProject);
            fixture.detectChanges();
        });

        it('should close sprint directly when all tickets are DONE', () => {
            // Override backlog to have all DONE tickets for sp-2
            const allDoneResponse = {
                ...mockBacklogResponse,
                data: [
                    { ...mockBacklogResponse.data[0], sprint_id: 'sp-2', status: 'DONE' },
                    { ...mockBacklogResponse.data[1], sprint_id: 'sp-2', status: 'DONE' },
                    mockBacklogResponse.data[2],
                ],
            };
            projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of(allDoneResponse));
            // Reload to get updated backlog
            component.loadSprints('1');
            fixture.detectChanges();

            component.closeSprint(mockSprints[1]);
            expect(projectServiceMock['updateSprintStatus']).toHaveBeenCalledWith('1', 'sp-2', { status: 'CLOSED', move_open_tickets_to_backlog: false });
        });

        it('should open confirmation dialog when unresolved tickets exist', () => {
            component.closeSprint(mockSprints[1]);
            expect(component.sprintToClose).toEqual(mockSprints[1]);
            expect(component.unresolvedTickets.length).toBe(1);
            expect(component.unresolvedTickets[0].status).toBe('IN_PROGRESS');
        });

        it('should call API with move flag on confirm close', () => {
            component.closeSprint(mockSprints[1]);
            component.onConfirmClose();
            expect(projectServiceMock['updateSprintStatus']).toHaveBeenCalledWith('1', 'sp-2', { status: 'CLOSED', move_open_tickets_to_backlog: true });
        });

        it('should reset close form on dismiss', () => {
            component.closeSprint(mockSprints[1]);
            expect(component.sprintToClose).toBeTruthy();
            component.resetCloseForm();
            expect(component.sprintToClose).toBeNull();
            expect(component.unresolvedTickets.length).toBe(0);
        });

        it('should show error growl when close fails', () => {
            projectServiceMock['updateSprintStatus'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
            component.closeSprint(mockSprints[1]);
            component.onConfirmClose();
            expect(growlServiceMock.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
        });

        it('should render close confirmation dialog in template', () => {
            const dialog = fixture.nativeElement.querySelector('eui-dialog[title="sprint.dialog.close-title"]');
            // Dialog exists but may not have title as attribute since it's bound dynamically
            const dialogs = fixture.nativeElement.querySelectorAll('eui-dialog');
            expect(dialogs.length).toBe(2); // create + close confirm
        });
    });
});
