import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EuiGrowlService } from '@eui/core';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock } from '../../../testing/test-providers';
import { BacklogComponent } from './backlog.component';
import { ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

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
            getBacklog: vi.fn().mockReturnValue(of(mockItems)),
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

    it('should display backlog items in table after load', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const rows = fixture.nativeElement.querySelectorAll('tbody tr');
        expect(rows.length).toBe(3);
    });

    it('should display ticket number as KEY-N format', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.field.ticket-number"]');
        expect(cells[0].textContent).toContain('TF-3');
        expect(cells[1].textContent).toContain('TF-2');
        expect(cells[2].textContent).toContain('TF-1');
    });

    it('should display type chip with i18n key', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.field.type"] eui-chip');
        expect(chips.length).toBe(3);
        expect(chips[0].textContent.trim()).toContain('workflow.ticket-type.BUG');
    });

    it('should display dash for null priority (EPIC items)', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const priorityCells = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.priority.label"]');
        const epicCell = priorityCells[2];
        expect(epicCell.textContent.trim()).toBe('—');
    });

    it('should display priority chip for items with priority', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const priorityCells = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.priority.label"]');
        const criticalChip = priorityCells[0].querySelector('eui-chip');
        expect(criticalChip).toBeTruthy();
        expect(criticalChip.textContent.trim()).toContain('ticket.priority.CRITICAL');
    });

    it('should display assignee name from member lookup', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const assigneeCells = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.field.assignee"]');
        expect(assigneeCells[0].textContent.trim()).toBe('Jane Doe');
        expect(assigneeCells[1].textContent.trim()).toBe('Bob Smith');
    });

    it('should display dash for null assignee', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const assigneeCells = fixture.nativeElement.querySelectorAll('td[data-col-label="ticket.field.assignee"]');
        expect(assigneeCells[2].textContent.trim()).toBe('—');
    });

    it('should display error state with retry button', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const error = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(error).toBeTruthy();
        const retryBtn = fixture.nativeElement.querySelector('button[euibutton]');
        expect(retryBtn).toBeTruthy();
    });

    it('should display empty state when no items', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const info = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(info).toBeTruthy();
        expect(info.textContent).toContain('backlog.no-items');
    });

    it('should call retry and reload items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        projectServiceMock['getBacklog'].mockClear();
        component.retry();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1');
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

    // --- STORY-005: Create Ticket Dialog tests ---

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

    it('should default type to STORY and priority to MEDIUM', () => {
        expect(component.newTicketType).toBe('STORY');
        expect(component.newTicketPriority).toBe('MEDIUM');
    });

    it('should have 3 creatable types (no EPIC)', () => {
        expect(component.creatableTypes).toEqual(['STORY', 'BUG', 'TASK']);
        expect(component.creatableTypes).not.toContain('EPIC');
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
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1');
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
});
