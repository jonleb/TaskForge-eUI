import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { EuiGrowlService } from '@eui/core';
import {
    TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock,
} from '../../../testing/test-providers';
import { TicketDetailComponent } from './ticket-detail.component';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember, Workflow,
    LinkType, TicketLink,
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

describe('TicketDetailComponent', () => {
    let fixture: ComponentFixture<TicketDetailComponent>;
    let component: TicketDetailComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let svc: Record<string, ReturnType<typeof vi.fn>>;
    let perm: Record<string, ReturnType<typeof vi.fn>>;
    let growl: ReturnType<typeof createGrowlServiceMock>;
    let router: { navigate: ReturnType<typeof vi.fn> };

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

        await TestBed.configureTestingModule({
            imports: [TicketDetailComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: svc },
                { provide: PermissionService, useValue: perm },
                { provide: EuiGrowlService, useValue: growl },
                { provide: ActivatedRoute, useValue: { paramMap: paramMap$ } },
                { provide: Router, useValue: router },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TicketDetailComponent);
        component = fixture.componentInstance;
    });

    // --- STORY-004: Read-only layout ---

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

    it('should display ticket key and number', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.ticketKey).toBe('TF-5');
    });

    it('should display title', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const h2 = fixture.nativeElement.querySelector('h2');
        expect(h2.textContent).toContain('Login page redesign');
    });

    it('should display type chip', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('eui-chip');
        const chipTexts = Array.from(chips).map((c: any) => c.textContent.trim());
        expect(chipTexts).toContain('workflow.ticket-type.STORY');
    });

    it('should display status chip', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('eui-chip');
        const chipTexts = Array.from(chips).map((c: any) => c.textContent.trim());
        expect(chipTexts).toContain('workflow.status.IN_PROGRESS');
    });

    it('should display priority chip', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('eui-chip');
        const chipTexts = Array.from(chips).map((c: any) => c.textContent.trim());
        expect(chipTexts).toContain('ticket.priority.HIGH');
    });

    it('should display assignee name from members', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getAssigneeName()).toBe('Bob Smith');
    });

    it('should display description', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelector('.description-text');
        expect(dd.textContent).toContain('Redesign the login page');
    });

    it('should show "No description" when empty', () => {
        svc['getTicket'].mockReturnValue(of(mockTicketNoDesc));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const em = fixture.nativeElement.querySelector('.description-text em');
        expect(em).toBeTruthy();
        expect(em.textContent).toContain('ticket-detail.no-description');
    });

    it('should navigate back on goBack()', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.goBack();
        expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: expect.anything() });
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

    // --- STORY-005: Inline Edit & Save ---

    it('should show edit buttons when canEdit is true', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const editBtns = fixture.nativeElement.querySelectorAll('eui-icon-button[icon="eui-edit"]');
        expect(editBtns.length).toBeGreaterThan(0);
    });

    it('should hide edit buttons when canEdit is false', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const editBtns = fixture.nativeElement.querySelectorAll('eui-icon-button[icon="eui-edit"]');
        expect(editBtns.length).toBe(0);
    });

    it('should switch to edit mode on startEdit', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.isEditing('title')).toBe(false);
        component.startEdit('title');
        expect(component.isEditing('title')).toBe(true);
    });

    it('should show status dropdown with valid transitions', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        // IN_PROGRESS can go to IN_REVIEW or TO_DO
        const allowed = component.allowedStatuses;
        expect(allowed).toContain('IN_PROGRESS');
        expect(allowed).toContain('IN_REVIEW');
        expect(allowed).toContain('TO_DO');
        expect(allowed).not.toContain('DONE');
    });

    it('should call updateTicket on save', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        component.editTitle = 'Updated title';
        component.saveChanges();
        expect(svc['updateTicket']).toHaveBeenCalledWith('1', 5, { title: 'Updated title' });
    });

    it('should show growl on save success', () => {
        const updatedTicket = { ...mockTicket, title: 'Updated title' };
        svc['updateTicket'].mockReturnValue(of(updatedTicket));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        component.editTitle = 'Updated title';
        component.saveChanges();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on save error', () => {
        svc['updateTicket'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        component.editTitle = 'Updated title';
        component.saveChanges();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    it('should revert on cancel', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        component.editTitle = 'Changed';
        component.cancelEdit('title');
        expect(component.editTitle).toBe(mockTicket.title);
        expect(component.isEditing('title')).toBe(false);
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

    it('should show save bar when editing', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('description');
        fixture.detectChanges();
        const saveBar = fixture.nativeElement.querySelector('.save-bar');
        expect(saveBar).toBeTruthy();
    });

    it('should cancel all edits', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        component.startEdit('description');
        component.cancelAllEdits();
        expect(component.hasUnsavedChanges).toBe(false);
    });

    it('should not call updateTicket when no changes', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.startEdit('title');
        // editTitle is already synced to ticket.title, so no actual change
        component.saveChanges();
        expect(svc['updateTicket']).not.toHaveBeenCalled();
    });

    // --- STORY-006: Comments Section ---

    it('should load comments after ticket loads', () => {
        svc['getComments'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getComments']).toHaveBeenCalledWith('1', 5);
    });

    it('should display comment list', () => {
        const mockComments = [
            { id: 'c1', projectId: '1', ticketId: '17', ticketNumber: 5, authorId: '2', authorName: 'Bob Smith', content: 'Looks good', created_at: '2026-02-15T10:00:00.000Z' },
            { id: 'c2', projectId: '1', ticketId: '17', ticketNumber: 5, authorId: '3', authorName: 'Jane Doe', content: 'Needs review', created_at: '2026-02-16T10:00:00.000Z' },
        ];
        svc['getComments'].mockReturnValue(of(mockComments));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('.comment-item');
        expect(items.length).toBe(2);
    });

    it('should display author name and date in comment', () => {
        const mockComments = [
            { id: 'c1', projectId: '1', ticketId: '17', ticketNumber: 5, authorId: '2', authorName: 'Bob Smith', content: 'Test comment', created_at: '2026-02-15T10:00:00.000Z' },
        ];
        svc['getComments'].mockReturnValue(of(mockComments));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const author = fixture.nativeElement.querySelector('.comment-author');
        expect(author.textContent).toContain('Bob Smith');
        const content = fixture.nativeElement.querySelector('.comment-content');
        expect(content.textContent).toContain('Test comment');
    });

    it('should show empty state when no comments', () => {
        svc['getComments'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('ticket-detail.comments.empty');
    });

    it('should show add comment form when canEdit', () => {
        svc['getComments'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const textarea = fixture.nativeElement.querySelector('#new-comment');
        expect(textarea).toBeTruthy();
    });

    it('should hide add comment form when cannot edit', () => {
        svc['getComments'].mockReturnValue(of([]));
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const textarea = fixture.nativeElement.querySelector('#new-comment');
        expect(textarea).toBeFalsy();
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

    it('should clear textarea after successful submit', () => {
        svc['getComments'].mockReturnValue(of([]));
        svc['addComment'].mockReturnValue(of({ id: 'c1', content: 'New comment' }));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newCommentText = 'New comment';
        component.submitComment();
        expect(component.newCommentText).toBe('');
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    // --- STORY-007: Activity Timeline ---

    it('should load activity after ticket loads', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(svc['getActivity']).toHaveBeenCalledWith('1', 5);
    });

    it('should display activity entries', () => {
        const mockActivity = [
            { id: 'a1', projectId: '1', ticketId: '17', ticketNumber: 5, field: 'status', oldValue: 'TO_DO', newValue: 'IN_PROGRESS', changedBy: '2', created_at: '2026-02-12T10:00:00.000Z' },
            { id: 'a2', projectId: '1', ticketId: '17', ticketNumber: 5, field: 'priority', oldValue: 'MEDIUM', newValue: 'HIGH', changedBy: '3', created_at: '2026-02-13T10:00:00.000Z' },
        ];
        svc['getActivity'].mockReturnValue(of(mockActivity));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('.activity-item');
        expect(items.length).toBe(2);
    });

    it('should show empty state when no activity', () => {
        svc['getActivity'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('ticket-detail.activity.empty');
    });

    it('should resolve changer name from members', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.getChangerName('2')).toBe('Bob Smith');
        expect(component.getChangerName('unknown')).toBe('unknown');
    });

    it('should display activity section heading', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const headings = fixture.nativeElement.querySelectorAll('h3');
        const texts = Array.from(headings).map((h: Element) => h.textContent?.trim());
        expect(texts).toContain('ticket-detail.activity.title');
    });

    it('should show activity date', () => {
        const mockActivity = [
            { id: 'a1', projectId: '1', ticketId: '17', ticketNumber: 5, field: 'title', oldValue: 'Old', newValue: 'New', changedBy: '2', created_at: '2026-02-12T10:00:00.000Z' },
        ];
        svc['getActivity'].mockReturnValue(of(mockActivity));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dateEl = fixture.nativeElement.querySelector('.activity-date');
        expect(dateEl).toBeTruthy();
        expect(dateEl.textContent.trim()).toBeTruthy();
    });

    // --- STORY-016-004: Linked Tickets Section ---

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

    it('should display linked tickets list', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('.link-item');
        expect(items.length).toBe(2);
    });

    it('should display link label and ticket key', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const firstItem = fixture.nativeElement.querySelector('.link-item');
        expect(firstItem.textContent).toContain('blocks');
        expect(firstItem.textContent).toContain('TF-3');
    });

    it('should show empty state when no links', () => {
        svc['getTicketLinks'].mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('ticket-detail.links.empty');
    });

    it('should show linked tickets section heading', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const headings = fixture.nativeElement.querySelectorAll('h3');
        const texts = Array.from(headings).map((h: Element) => h.textContent?.trim());
        expect(texts).toContain('ticket-detail.links.title');
    });

    // --- STORY-016-005: Add Link Dialog ---

    it('should show add link button when canEdit', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('.section-header button');
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain('ticket-detail.links.add');
    });

    it('should hide add link button when cannot edit', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const sectionHeaders = fixture.nativeElement.querySelectorAll('.section-header button');
        expect(sectionHeaders.length).toBe(0);
    });

    it('should call createTicketLink on submitAddLink', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newLinkTypeId = 'lt1';
        component.newLinkTargetNumber = 10;
        // Mock the dialog ViewChild
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
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
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
        component.submitAddLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on link creation failure', () => {
        svc['createTicketLink'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.newLinkTypeId = 'lt1';
        component.newLinkTargetNumber = 10;
        component.addLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
        component.submitAddLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });

    // --- STORY-016-006: Remove Link & Role Gating ---

    it('should show delete button for each link when canEdit', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const trashBtns = fixture.nativeElement.querySelectorAll('.link-item eui-icon-button[icon="eui-trash"]');
        expect(trashBtns.length).toBe(2);
    });

    it('should hide delete buttons when cannot edit', () => {
        perm['isSuperAdmin'].mockReturnValue(false);
        perm['hasProjectRole'].mockReturnValue(of(false));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const trashBtns = fixture.nativeElement.querySelectorAll('.link-item eui-icon-button[icon="eui-trash"]');
        expect(trashBtns.length).toBe(0);
    });

    it('should call deleteTicketLink on removeLink', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
        component.removeLink();
        expect(svc['deleteTicketLink']).toHaveBeenCalledWith('1', 5, 'tl1');
    });

    it('should show growl on link deletion success', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
        component.removeLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'success' }));
    });

    it('should show growl on link deletion failure', () => {
        svc['deleteTicketLink'].mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        component.linkToDelete = mockTicketLinks[0];
        component.confirmDeleteLinkDialog = { openDialog: vi.fn(), closeDialog: vi.fn() } as any;
        component.removeLink();
        expect(growl.growl).toHaveBeenCalledWith(expect.objectContaining({ severity: 'error' }));
    });
});
