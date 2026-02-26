import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { provideEuiCoreMocks, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { DashboardComponent } from './dashboard.component';
import { ProjectContextService, ProjectService, Project, ProjectMember } from '../../../core/project';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockMembers: ProjectMember[] = [
    { id: '1', userId: '1', role: 'PROJECT_ADMIN', joined_at: '2025-01-20', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: '2', userId: '2', role: 'DEVELOPER', joined_at: '2025-02-01', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    { id: '3', userId: '3', role: 'VIEWER', joined_at: '2025-03-01', firstName: 'Bob', lastName: 'Lee', email: 'bob@example.com' },
];

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null>; getCurrentProject: ReturnType<typeof vi.fn> };
    let projectServiceMock: { getProjectMembers: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        projectContextMock = {
            currentProject$: new BehaviorSubject<Project | null>(null),
            getCurrentProject: vi.fn().mockReturnValue(null),
        };
        projectServiceMock = {
            getProjectMembers: vi.fn().mockReturnValue(of(mockMembers)),
        };

        await TestBed.configureTestingModule({
            imports: [
                DashboardComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: projectContextMock },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: EuiBreadcrumbService, useValue: createBreadcrumbServiceMock() },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display project details when project context is set', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.project).toEqual(mockProject);
        const html = fixture.nativeElement.innerHTML;
        expect(html).toContain('TF');
        expect(html).toContain('Main product');
    });

    it('should fetch and display member count', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(projectServiceMock.getProjectMembers).toHaveBeenCalledWith('1');
        expect(component.memberCount).toBe(3);
        expect(fixture.nativeElement.innerHTML).toContain('3 members');
    });

    it('should display singular "member" for count of 1', () => {
        projectServiceMock.getProjectMembers.mockReturnValue(of([mockMembers[0]]));
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.memberCount).toBe(1);
        expect(fixture.nativeElement.innerHTML).toContain('1 member');
    });

    it('should handle member fetch error gracefully', () => {
        projectServiceMock.getProjectMembers.mockReturnValue(throwError(() => new Error('Network error')));
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        expect(component.memberError).toBe(true);
        expect(component.memberCount).toBeNull();
        expect(fixture.nativeElement.innerHTML).toContain('Unable to load team info');
    });

    it('should show placeholder widget sections', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        const html = fixture.nativeElement.innerHTML;
        expect(html).toContain('Recent Activity');
        expect(html).toContain('Open Tickets');
        expect(html).toContain('Sprint Progress');
    });

    it('should react to project context changes', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.project?.name).toBe('TaskForge Core');

        const project2: Project = { ...mockProject, id: '2', key: 'DEMO', name: 'Demo Project', description: 'A demo' };
        projectServiceMock.getProjectMembers.mockReturnValue(of([mockMembers[0], mockMembers[1]]));
        projectContextMock.currentProject$.next(project2);
        fixture.detectChanges();

        expect(component.project?.name).toBe('Demo Project');
        expect(projectServiceMock.getProjectMembers).toHaveBeenCalledWith('2');
        expect(component.memberCount).toBe(2);
    });

    it('should have proper heading hierarchy with h2 for widgets', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        const h2s = fixture.nativeElement.querySelectorAll('h2');
        expect(h2s.length).toBe(3);
    });

    it('should have aria-live on member count region', () => {
        fixture.detectChanges();
        projectContextMock.currentProject$.next(mockProject);
        fixture.detectChanges();

        const liveRegion = fixture.nativeElement.querySelector('[aria-live="polite"]');
        expect(liveRegion).toBeTruthy();
    });
});
