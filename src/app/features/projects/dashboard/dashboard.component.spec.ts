import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { provideEuiCoreMocks, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { DashboardComponent } from './dashboard.component';
import { ProjectContextService, ProjectService, Project, ProjectMember, UserInfo } from '../../../core/project';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockMembers: ProjectMember[] = [
    { id: '1', userId: '1', role: 'PROJECT_ADMIN', joined_at: '2025-01-20', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: '2', userId: '2', role: 'DEVELOPER', joined_at: '2025-02-10', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { id: '3', userId: '3', role: 'VIEWER', joined_at: '2025-03-05', firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com' },
];

const mockUser: UserInfo = { id: '1', firstName: 'Super', lastName: 'Admin', email: 'superadmin@taskforge.local' };

describe('DashboardComponent', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let component: DashboardComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let breadcrumbMock: ReturnType<typeof createBreadcrumbServiceMock>;

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
            getUser: vi.fn().mockReturnValue(of(mockUser)),
            getProjects: vi.fn(),
            getProject: vi.fn(),
            createProject: vi.fn(),
            updateProject: vi.fn(),
        };
        breadcrumbMock = createBreadcrumbServiceMock();

        await TestBed.configureTestingModule({
            imports: [DashboardComponent, TranslateModule.forRoot()],
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
        expect(chip.textContent).toContain('Active');
    });

    it('should show Inactive chip when project is inactive', () => {
        currentProject$.next({ ...mockProject, is_active: false });
        fixture.detectChanges();
        const chip = fixture.nativeElement.querySelector('eui-chip');
        expect(chip).toBeTruthy();
        expect(chip.textContent).toContain('Inactive');
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
        expect(component.creatorName).toBe('Unknown');
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

    it('should load members when project is set', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(projectServiceMock['getProjectMembers']).toHaveBeenCalledWith('1');
        expect(component.members).toEqual(mockMembers);
    });

    it('should display member names in table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="Name"]');
        expect(cells.length).toBe(3);
        expect(cells[0].textContent).toContain('John Doe');
        expect(cells[1].textContent).toContain('Jane Smith');
        expect(cells[2].textContent).toContain('Bob Brown');
    });

    it('should display member emails in table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="Email"]');
        expect(cells.length).toBe(3);
        expect(cells[0].textContent).toContain('john@example.com');
    });

    it('should display member roles in table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const cells = fixture.nativeElement.querySelectorAll('td[data-col-label="Role"]');
        expect(cells.length).toBe(3);
        expect(cells[0].textContent).toContain('PROJECT_ADMIN');
    });

    it('should have aria-label on members table', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const table = fixture.nativeElement.querySelector('table[aria-label="Project team members"]');
        expect(table).toBeTruthy();
    });

    it('should show member count in heading', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        const h2 = fixture.nativeElement.querySelector('.members-section h2');
        expect(h2.textContent).toContain('3');
    });

    it('should set breadcrumb on project load', () => {
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(breadcrumbMock.setBreadcrumb).toHaveBeenCalledWith([
            { id: 'projects', label: 'Projects', link: '/screen/projects' },
            { id: 'project', label: 'TaskForge Core', link: null },
        ]);
    });

    it('should show dash for empty description', () => {
        currentProject$.next({ ...mockProject, description: '' });
        fixture.detectChanges();
        const dd = fixture.nativeElement.querySelectorAll('dd');
        expect(dd[1].textContent).toContain('\u2014');
    });

    it('should set memberError on members fetch failure', () => {
        projectServiceMock['getProjectMembers'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.memberError).toBe(true);
        expect(component.membersLoading).toBe(false);
    });
});
