import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { EuiGrowlService } from '@eui/core';
import {
    TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock,
} from '../../../testing/test-providers';
import { TicketDetailComponent } from './ticket-detail.component';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember, Workflow,
    LinkType, TicketLink,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

interface DialogMock { openDialog: ReturnType<typeof vi.fn>; closeDialog: ReturnType<typeof vi.fn> }

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

const mockTicket: BacklogItem = {
    id: '17', projectId: '1', type: 'STORY', title: 'Login page redesign',
    description: 'Redesign the login page with new branding',
    status: 'IN_PROGRESS', priority: 'HIGH',
    assignee_id: '2', epic_id: null, ticket_number: 5,
    created_by: '3', created_at: '2026-02-10T10:00:00.000Z',
};

const mockTicketNoDesc: BacklogItem = {
    ...mockTicket, id: '18', description: '', assignee_id: null,
};

const mockWorkflows: Workflow[] = [{
    id: 'wf1', projectId: '1', ticketType: 'STORY',
    statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
    transitions: {
        TO_DO: ['IN_PROGRESS'],
        IN_PROGRESS: ['IN_REVIEW', 'TO_DO'],
        IN_REVIEW: ['DONE', 'IN_PROGRESS'],
        DONE: [],
    },
    created_at: '2025-01-20T09:00:00.000Z',
}];

const mockEpics: BacklogItem[] = [{
    id: '1', projectId: '1', type: 'EPIC', title: 'Maintenance',
    description: '', status: 'TO_DO', priority: null,
    assignee_id: null, epic_id: null, ticket_number: 1,
    created_by: 'system', created_at: '2025-01-20T09:00:00.000Z',
}];

const mockLinkTypes: LinkType[] = [
    { id: 'lt1', name: 'Blocks', inward: 'is blocked by', outward: 'blocks', scope: 'global', created_at: '2025-01-01T00:00:00.000Z' },
    { id: 'lt2', name: 'Relates to', inward: 'relates to', outward: 'relates to', scope: 'global', created_at: '2025-01-01T00:00:00.000Z' },
];

const mockTicketLinks: TicketLink[] = [
    { id: 'tl1', projectId: '1', linkTypeId: 'lt1', sourceTicketNumber: 5, targetTicketNumber: 3, targetProjectId: '1', created_by: '2', created_at: '2026-02-20T10:00:00.000Z', linkTypeName: 'Blocks', linkLabel: 'blocks' },
    { id: 'tl2', projectId: '1', linkTypeId: 'lt2', sourceTicketNumber: 5, targetTicketNumber: 7, targetProjectId: '1', created_by: '3', created_at: '2026-02-21T10:00:00.000Z', linkTypeName: 'Relates to', linkLabel: 'relates to' },
];

const mockComments = [
    { id: 'c1', projectId: '1', ticketId: '17', ticketNumber: 5, authorId: '2', authorName: 'Bob Smith', content: 'Looks good', created_at: '2026-02-15T10:00:00.000Z' },
    { id: 'c2', projectId: '1', ticketId: '17', ticketNumber: 5, authorId: '3', authorName: 'Jane Doe', content: 'Needs review', created_at: '2026-02-16T10:00:00.000Z' },
];

const mockActivity = [
    { id: 'a1', projectId: '1', ticketId: '17', ticketNumber: 5, field: 'status', oldValue: 'TO_DO', newValue: 'IN_PROGRESS', changedBy: '2', created_at: '2026-02-12T10:00:00.000Z' },
    { id: 'a2', projectId: '1', ticketId: '17', ticketNumber: 5, field: 'priority', oldValue: 'MEDIUM', newValue: 'HIGH', changedBy: '3', created_at: '2026-02-13T10:00:00.000Z' },
];

describe('TicketDetailComponent', () => {
    let fixture: ComponentFixture<TicketDetailComponent>;
    let component: TicketDetailComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let svc: Record<string, ReturnType<typeof vi.fn>>;
    let perm: Record<string, ReturnType<typeof vi.fn>>;
    let growl: ReturnType<typeof createGrowlServiceMock>;
    let router: { navigate: ReturnType<typeof vi.fn> };
    let locationMock: { back: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        paramMap$ = new BehaviorSubject(convertToParamMap({ ticketNumber: '5' }));

        svc = {
            getTicket: vi.fn().mockReturnValue(of(mockTicket)),
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getWorkflows: vi.fn().mockReturnValue(of(mockWorkflows)),
            getEpics: vi.fn().mockReturnValue(of(mockEpics)),
            updateTicket: vi.fn().mockReturnValue(of(mockTicket)),
            getBacklog: vi.fn(), getProject: vi.fn(), getUser: vi.fn(),
            createProject: vi.fn(), updateProject: vi.fn(),
            upsertMember: vi.fn(), removeMember: vi.fn(),
            searchCandidates: vi.fn(), createTicket: vi.fn(),
            getComments: vi.fn().mockReturnValue(of([])),
            addComment: vi.fn(),
            getActivity: vi.fn().mockReturnValue(of([])),
            getProjects: vi.fn(),
            getLinkTypes: vi.fn().mockReturnValue(of(mockLinkTypes)),
            getTicketLinks: vi.fn().mockReturnValue(of(mockTicketLinks)),
            createTicketLink: vi.fn().mockReturnValue(of(mockTicketLinks[0])),
            deleteTicketLink: vi.fn().mockReturnValue(of(undefined)),
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
        router = { navigate: vi.fn() };
        locationMock = { back: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [TicketDetailComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                provideNoopAnimations(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: svc },
                { provide: PermissionService, useValue: perm },
                { provide: EuiGrowlService, useValue: growl },
                { provide: ActivatedRoute, useValue: { paramMap: paramMap$ } },
                { provide: Router, useValue: router },
                { provide: Location, useValue: locationMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TicketDetailComponent);
        component = fixture.componentInstance;
    });

    // --- Basic rendering ---

    it('should create', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load ticket on init', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getTicket']).toHaveBeenCalledWith('1', 5);
        expect(component.ticket).toEqual(mockTicket);
        expect(component.isLoading).toBe(false);
    });

    it('should display ticket key', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticketKey).toBe('TF-5');
    });

    it('should navigate back on goBack()', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.goBack();
        expect(locationMock.back).toHaveBeenCalled();
    });

    it('should set notFound on 404 error', () => {
        svc['getTicket'].mockReturnValue(throwError(() => ({ status: 404 })));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.notFound).toBe(true);
        expect(component.hasError).toBe(false);
    });

    it('should set hasError on non-404 error', () => {
        svc['getTicket'].mockReturnValue(throwError(() => ({ status: 500 })));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.hasError).toBe(true);
        expect(component.notFound).toBe(false);
    });

    it('should show not-found message', () => {
        svc['getTicket'].mockReturnValue(throwError(() => ({ status: 404 })));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('ticket-detail.not-found');
    });

    it('should show error message', () => {
        svc['getTicket'].mockReturnValue(throwError(() => ({ status: 500 })));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('ticket-detail.load-error');
    });

    // --- STORY-001: Breadcrumb + Header + Edit Toggle ---

    it('should render breadcrumb with 3 items', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('eui-breadcrumb-item');
        expect(items.length).toBe(3);
    });

    it('should show page header with ticket key as label', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticketKey).toBe('TF-5');
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
    });

    it('should show page header with ticket title as subLabel', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticket?.title).toBe('Login page redesign');
    });

    it('should show edit toggle button when canEdit', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btns = fixture.nativeElement.querySelectorAll('eui-page-header-action-items button[euibutton]');
        expect(btns.length).toBe(1);
        expect(btns[0].textContent.trim()).toContain('ticket-detail.edit-mode.toggle');
    });

    it('should hide edit toggle button when cannot edit', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btns = fixture.nativeElement.querySelectorAll('eui-page-header-action-items button[euibutton]');
        expect(btns.length).toBe(0);
    });

    it('should toggle isEditActive on toggleEditMode()', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.isEditActive).toBe(false);
        component.toggleEditMode();
        expect(component.isEditActive).toBe(true);
        component.toggleEditMode();
        expect(component.isEditActive).toBe(false);
    });

    it('should reset form when cancelling edit mode', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode(); // activate
        component.ticketForm.patchValue({ title: 'Changed' });
        component.toggleEditMode(); // deactivate
        expect(component.ticketForm.get('title')?.value).toBe(mockTicket.title);
    });

    // --- STORY-002: Reactive Forms + Fieldsets ---

    it('should initialize form with ticket data', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticketForm.get('title')?.value).toBe('Login page redesign');
        expect(component.ticketForm.get('status')?.value).toBe('IN_PROGRESS');
        expect(component.ticketForm.get('priority')?.value).toBe('HIGH');
        expect(component.ticketForm.get('assignee_id')?.value).toBe('2');
    });

    it('should render 4 fieldset sections', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const fieldsets = fixture.nativeElement.querySelectorAll('eui-fieldset');
        expect(fieldsets.length).toBe(4);
    });

    it('should show status dropdown with valid transitions', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const allowed = component.allowedStatuses;
        expect(allowed).toContain('IN_PROGRESS');
        expect(allowed).toContain('IN_REVIEW');
        expect(allowed).toContain('TO_DO');
        expect(allowed).not.toContain('DONE');
    });

    it('should call updateTicket on save', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        component.ticketForm.patchValue({ title: 'Updated title' });
        component.saveChanges();
        expect(svc['updateTicket']).toHaveBeenCalledWith('1', 5, { title: 'Updated title' });
    });

    it('should show growl on save success', () => {
        const updatedTicket = { ...mockTicket, title: 'Updated title' };
        svc['updateTicket'].mockReturnValue(of(updatedTicket));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        component.ticketForm.patchValue({ title: 'Updated title' });
        component.saveChanges();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on save error', () => {
        svc['updateTicket'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        component.ticketForm.patchValue({ title: 'Updated title' });
        component.saveChanges();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should not call updateTicket when no changes', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        component.saveChanges();
        expect(svc['updateTicket']).not.toHaveBeenCalled();
    });

    it('should reset form on onResetForm()', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        component.ticketForm.patchValue({ title: 'Changed' });
        component.onResetForm();
        expect(component.ticketForm.get('title')?.value).toBe(mockTicket.title);
    });

    // --- Read-only banner ---

    it('should show read-only banner when canEdit is false', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const banner = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(banner).toBeTruthy();
        expect(banner.textContent).toContain('ticket-detail.read-only');
    });

    it('should not show read-only banner when canEdit is true', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const banner = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(banner).toBeFalsy();
    });

    it('should determine canEdit for SUPER_ADMIN', () => {
        perm['isSuperAdmin'].mockReturnValue(true);
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canEdit).toBe(true);
    });

    it('should determine canEdit false for VIEWER', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canEdit).toBe(false);
    });

    // --- STORY-003: Tabs ---

    it('should render 4 tabs', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const tabHeaders = fixture.nativeElement.querySelectorAll('eui-tab-header-label');
        expect(tabHeaders.length).toBe(4);
    });

    it('should show comment count badge on comments tab', () => {
        svc['getComments'].mockReturnValue(of(mockComments));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const badge = fixture.nativeElement.querySelector('eui-tab-header-right-content eui-badge');
        expect(badge).toBeTruthy();
        expect(badge.textContent.trim()).toBe('2');
    });

    // --- STORY-004: Comments Discussion Thread ---

    it('should load comments after ticket loads', () => {
        svc['getComments'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getComments']).toHaveBeenCalledWith('1', 5);
    });

    it('should map comments to discussion thread items', () => {
        svc['getComments'].mockReturnValue(of(mockComments));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = component.commentThreadItems;
        expect(items.length).toBe(2);
        expect(items[0].author).toBe('Bob Smith');
        expect(items[0].body).toBe('Looks good');
    });

    it('should show empty state when no comments', () => {
        svc['getComments'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.comments.length).toBe(0);
    });

    it('should call addComment on submit', () => {
        svc['getComments'].mockReturnValue(of([]));
        svc['addComment'].mockReturnValue(of({ id: 'c1', content: 'New comment' }));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newCommentText = 'New comment';
        component.submitComment();
        expect(svc['addComment']).toHaveBeenCalledWith('1', 5, 'New comment');
    });

    it('should clear textarea after successful comment submit', () => {
        svc['getComments'].mockReturnValue(of([]));
        svc['addComment'].mockReturnValue(of({ id: 'c1', content: 'New comment' }));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newCommentText = 'New comment';
        component.submitComment();
        expect(component.newCommentText).toBe('');
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    // --- STORY-005: Activity Discussion Thread ---

    it('should load activity after ticket loads', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getActivity']).toHaveBeenCalledWith('1', 5);
    });

    it('should map activity to discussion thread items', () => {
        svc['getActivity'].mockReturnValue(of(mockActivity));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = component.activityThreadItems;
        expect(items.length).toBe(2);
        expect(items[0].author).toBe('Bob Smith');
        expect(items[0].typeClass).toBe('info');
    });

    it('should show empty state when no activity', () => {
        svc['getActivity'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.activity.length).toBe(0);
    });

    it('should resolve changer name from members', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getChangerName('2')).toBe('Bob Smith');
        expect(component.getChangerName('unknown')).toBe('unknown');
    });

    // --- STORY-006: Links Tab ---

    it('should load ticket links after ticket loads', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getTicketLinks']).toHaveBeenCalledWith('1', 5);
    });

    it('should load link types on init', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getLinkTypes']).toHaveBeenCalled();
    });

    it('should show empty state when no links', () => {
        svc['getTicketLinks'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticketLinks.length).toBe(0);
    });

    it('should call createTicketLink on submitAddLink', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newLinkTypeId = 'lt1';
        component.newLinkTargetNumber = 10;
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.submitAddLink();
        expect(svc['createTicketLink']).toHaveBeenCalledWith('1', 5, {
            linkTypeId: 'lt1',
            targetTicketNumber: 10,
        });
    });

    it('should show growl on link creation success', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newLinkTypeId = 'lt1';
        component.newLinkTargetNumber = 10;
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.submitAddLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on link creation failure', () => {
        svc['createTicketLink'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newLinkTypeId = 'lt1';
        component.newLinkTargetNumber = 10;
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.submitAddLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should call deleteTicketLink on removeLink', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.removeLink();
        expect(svc['deleteTicketLink']).toHaveBeenCalledWith('1', 5, 'tl1');
    });

    it('should show growl on link deletion success', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.removeLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on link deletion failure', () => {
        svc['deleteTicketLink'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as DialogMock as unknown as EuiDialogComponent;
        component.removeLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    // --- STORY-007: Page Footer ---

    it('should show page footer when isEditActive is true', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.toggleEditMode();
        fixture.detectChanges();
        const footer = fixture.nativeElement.querySelector('eui-page-footer');
        expect(footer).toBeTruthy();
    });

    it('should hide page footer when isEditActive is false', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const footer = fixture.nativeElement.querySelector('eui-page-footer');
        expect(footer).toBeFalsy();
    });

    // --- Display helpers ---

    it('should display assignee name from members', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getAssigneeName()).toBe('Bob Smith');
    });

    it('should show unassigned when no assignee', () => {
        svc['getTicket'].mockReturnValue(of(mockTicketNoDesc));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getAssigneeName()).toBe('ticket-detail.unassigned');
    });

    it('should show creator name from members', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getCreatorName()).toBe('Jane Doe');
    });
});