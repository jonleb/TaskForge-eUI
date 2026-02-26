import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, throwError, Subject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { EuiGrowlService } from '@eui/core';
import { provideEuiCoreMocks } from '../../../testing/test-providers';
import { ProjectShellComponent } from './project-shell.component';
import { ProjectService, ProjectContextService, Project } from '../../../core/project';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

describe('ProjectShellComponent', () => {
    let component: ProjectShellComponent;
    let fixture: ComponentFixture<ProjectShellComponent>;
    let projectServiceMock: { getProject: ReturnType<typeof vi.fn> };
    let projectContextMock: { setProject: ReturnType<typeof vi.fn>; clearProject: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };
    let router: Router;
    let paramsSubject: Subject<Record<string, string>>;

    beforeEach(async () => {
        paramsSubject = new Subject();
        projectServiceMock = { getProject: vi.fn().mockReturnValue(of(mockProject)) };
        projectContextMock = { setProject: vi.fn(), clearProject: vi.fn() };
        growlServiceMock = { growl: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [
                ProjectShellComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: ProjectContextService, useValue: projectContextMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: ActivatedRoute, useValue: { params: paramsSubject.asObservable() } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectShellComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockResolvedValue(true);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch project and set context on route param change', () => {
        fixture.detectChanges();
        paramsSubject.next({ projectId: '1' });

        expect(projectServiceMock.getProject).toHaveBeenCalledWith('1');
        expect(projectContextMock.setProject).toHaveBeenCalledWith(mockProject);
    });

    it('should handle 404 error with growl and redirect', () => {
        projectServiceMock.getProject.mockReturnValue(
            throwError(() => ({ status: 404, error: { message: 'Not found' } })),
        );

        fixture.detectChanges();
        paramsSubject.next({ projectId: '999' });

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Navigation error',
            detail: 'Project not found.',
        });
        expect(router.navigate).toHaveBeenCalledWith(['screen/projects']);
    });

    it('should handle 403 error with growl and redirect', () => {
        projectServiceMock.getProject.mockReturnValue(
            throwError(() => ({ status: 403, error: { message: 'Forbidden' } })),
        );

        fixture.detectChanges();
        paramsSubject.next({ projectId: '3' });

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Navigation error',
            detail: 'You do not have access to this project.',
        });
        expect(router.navigate).toHaveBeenCalledWith(['screen/projects']);
    });

    it('should clear project context on destroy', () => {
        fixture.detectChanges();
        paramsSubject.next({ projectId: '1' });

        component.ngOnDestroy();

        expect(projectContextMock.clearProject).toHaveBeenCalled();
    });

    it('should update context when navigating between projects', () => {
        const project2: Project = { ...mockProject, id: '2', key: 'DEMO', name: 'Demo Project' };
        fixture.detectChanges();

        paramsSubject.next({ projectId: '1' });
        expect(projectContextMock.setProject).toHaveBeenCalledWith(mockProject);

        projectServiceMock.getProject.mockReturnValue(of(project2));
        paramsSubject.next({ projectId: '2' });
        expect(projectContextMock.setProject).toHaveBeenCalledWith(project2);
    });
});
