import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { TranslateTestingModule, provideEuiCoreMocks, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { DashboardComponent } from './dashboard.component';
import { ProjectContextService, ProjectService, Project, UserInfo, BacklogItem } from '../../../core/project';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockUser: UserInfo = { id: '1', firstName: 'Super', lastName: 'Admin', email: 'superadmin@taskforge.local' };

const mockBacklogItems: BacklogItem[] = [
    {
        id: '1', projectId: '1', type: 'EPIC', title: 'Maintenance',
        description: 'Default epic for maintenance and operational tasks',
        status: 'TO_DO', created_by: 'system', created_at: '2025-01-20T09:00:00.000Z',
    },
];

describe('DashboardComponent', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let component: DashboardComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let breadcrumbMock: ReturnType<typeof createBreadcrumbServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getUser: vi.fn().mockReturnValue(of(mockUser)),
            getBacklog: vi.fn().mockReturnValue(of(mockBacklogItems)),
            getProjects: vi.fn(),
            getProject: vi.fn(),
            createProject: vi.fn(),
            updateProject: vi.fn(),
        };
        breadcrumbMock = createBreadcrumbServiceMock();

        await TestBed.configureTestingModule({
            imports: [DashboardComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: { currentProject$ } },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: EuiBreadcrumbService, useValue: breadcrumbMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show project name in page header', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const header = fixture.nativeElement.querySelector('eui-page-header');
        expect(header).toBeTruthy();
        // label is an Angular input binding, check rendered text content
        expect(header.textContent).toContain('TaskForge Core');
    });

    it('should display project key', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[0].textContent).toContain('TF');
    });

    it('should display project description', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[1].textContent).toContain('Main product');
    });

    it('should show Active chip when project is active', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chip = fixture.nativeElement.querySelector('eui-chip');
        expect(chip).toBeTruthy();
        expect(chip.textContent).toContain('common.active');
    });

    it('should show Inactive chip when project is inactive', () => {
        currentProject$.next({ ...mockProject, is_active: false });
        fixture.detectChanges();
        const chip = fixture.nativeElement.querySelector('eui-chip');
        expect(chip).toBeTruthy();
        expect(chip.textContent).toContain('common.inactive');
    });

    it('should display creator name after loading', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[3].textContent).toContain('Super Admin');
    });

    it('should call getUser with created_by id', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getUser']).toHaveBeenCalledWith('1');
    });

    it('should show "Unknown" when creator fetch fails', () => {
        projectServiceMock['getUser'] = vi.fn().mockReturnValue(throwError(() => new Error('Not found')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.creatorName).toBe('common.unknown');
    });

    it('should display last updated date', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[5].textContent.trim()).toBeTruthy();
    });

    it('should display created date', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[4].textContent.trim()).toBeTruthy();
    });

    it('should set breadcrumb on project load', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(breadcrumbMock.setBreadcrumb).toHaveBeenCalledWith([
            { id: 'projects', label: 'nav.projects', link: '/screen/projects' },
            { id: 'project', label: 'TaskForge Core', link: null },
        ]);
    });

    it('should show dash for empty description', () => {
        currentProject$.next({ ...mockProject, description: '' });
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[1].textContent).toContain('\u2014');
    });

    it('should call getBacklog with project ID on init', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getBacklog']).toHaveBeenCalledWith('1');
    });

    it('should display backlog count', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const backlogSection = fixture.nativeElement.querySelector('.backlog-summary');
        expect(backlogSection.textContent).toContain('dashboard.backlog-count');
    });

    it('should display maintenance epic title', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const listItems = fixture.nativeElement.querySelectorAll('.backlog-list li');
        expect(listItems.length).toBe(1);
        expect(listItems[0].textContent).toContain('Maintenance');
    });

    it('should show ticket type chip for backlog item', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('.backlog-list eui-chip');
        expect(chips.length).toBe(1);
        expect(chips[0].textContent).toContain('workflow.ticket-type.EPIC');
    });

    it('should show empty state when no backlog items', () => {
        projectServiceMock['getBacklog'] = vi.fn().mockReturnValue(of([]));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const backlogSection = fixture.nativeElement.querySelector('.backlog-summary');
        expect(backlogSection.textContent).toContain('dashboard.no-backlog-items');
    });

    it('should display backlog heading with i18n key', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const heading = fixture.nativeElement.querySelector('.backlog-summary h2');
        expect(heading.textContent).toContain('dashboard.backlog-heading');
    });

});
