import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import {
    TranslateTestingModule, provideEuiCoreMocks,
} from '../../../testing/test-providers';
import { TicketDetailComponent } from './ticket-detail.component';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
} from '../../../core/project';

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

describe('TicketDetailComponent', () => {
    let fixture: ComponentFixture<TicketDetailComponent>;
    let component: TicketDetailComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
    let svc: Record<string, ReturnType<typeof vi.fn>>;
    let router: { navigate: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        paramMap$ = new BehaviorSubject(convertToParamMap({ ticketNumber: '5' }));

        svc = {
            getTicket: vi.fn().mockReturnValue(of(mockTicket)),
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getBacklog: vi.fn(), getProject: vi.fn(), getUser: vi.fn(),
            createProject: vi.fn(), updateProject: vi.fn(),
            upsertMember: vi.fn(), removeMember: vi.fn(),
            searchCandidates: vi.fn(), getWorkflows: vi.fn(),
            createTicket: vi.fn(), getEpics: vi.fn(),
            updateTicket: vi.fn(), getComments: vi.fn(),
            addComment: vi.fn(), getActivity: vi.fn(),
            getProjects: vi.fn(),
        };

        router = { navigate: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [TicketDetailComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: svc },
                { provide: ActivatedRoute, useValue: { paramMap: paramMap$ } },
                { provide: Router, useValue: router },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TicketDetailComponent);
        component = fixture.componentInstance;
    });

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
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
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
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('ticket-detail.not-found');
    });

    it('should show error message', () => {
        svc['getTicket'].mockReturnValue(throwError(() => ({ status: 500 })));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const text = fixture.nativeElement.textContent;
        expect(text).toContain('ticket-detail.load-error');
    });
});
