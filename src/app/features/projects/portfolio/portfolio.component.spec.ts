import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { EuiGrowlService } from '@eui/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { provideEuiCoreMocks, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { PortfolioComponent } from './portfolio.component';
import { ProjectService, Project } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

const mockProjects: Project[] = [
    {
        id: '1', key: 'TF', name: 'TaskForge Core',
        description: 'Main product', created_by: '1',
        created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
    },
    {
        id: '2', key: 'DEMO', name: 'Demo Project',
        description: 'Sandbox project', created_by: '2',
        created_at: '2025-03-01T14:00:00.000Z', updated_at: '2025-05-15T11:00:00.000Z', is_active: true,
    },
];

const createdProject: Project = {
    id: '4', key: 'NEW', name: 'New Project',
    description: 'A new project', created_by: '1',
    created_at: '2026-02-26T10:00:00.000Z', updated_at: '2026-02-26T10:00:00.000Z', is_active: true,
};

describe('PortfolioComponent', () => {
    let component: PortfolioComponent;
    let fixture: ComponentFixture<PortfolioComponent>;
    let projectServiceMock: {
        getProjects: ReturnType<typeof vi.fn>;
        createProject: ReturnType<typeof vi.fn>;
    };
    let permissionServiceMock: { isSuperAdmin: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };
    let router: Router;

    beforeEach(async () => {
        projectServiceMock = {
            getProjects: vi.fn().mockReturnValue(of(mockProjects)),
            createProject: vi.fn(),
        };
        permissionServiceMock = { isSuperAdmin: vi.fn().mockReturnValue(false) };
        growlServiceMock = { growl: vi.fn() };

        await TestBed.configureTestingModule({
            imports: [
                PortfolioComponent,
                TranslateModule.forRoot(),
            ],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: EuiBreadcrumbService, useValue: createBreadcrumbServiceMock() },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PortfolioComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        vi.spyOn(router, 'navigate').mockResolvedValue(true);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load projects on init', () => {
        fixture.detectChanges();
        expect(projectServiceMock.getProjects).toHaveBeenCalled();
        expect(component.projects).toEqual(mockProjects);
        expect(component.loading).toBe(false);
    });

    it('should handle error and set hasError flag', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('Network error')));
        fixture.detectChanges();
        expect(component.projects).toEqual([]);
        expect(component.hasError).toBe(true);
    });

    it('should show growl on load error', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('fail')));
        fixture.detectChanges();
        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Load failed',
            detail: 'Could not load projects. Please try again.',
        });
    });

    it('should navigate to project on onOpenProject()', () => {
        fixture.detectChanges();
        component.onOpenProject(mockProjects[0]);
        expect(router.navigate).toHaveBeenCalledWith(['screen/projects', '1']);
    });

    it('should retry loading on loadProjects() call', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('fail')));
        fixture.detectChanges();
        expect(component.hasError).toBe(true);

        projectServiceMock.getProjects.mockReturnValue(of(mockProjects));
        component.loadProjects();
        expect(component.hasError).toBe(false);
        expect(component.projects).toEqual(mockProjects);
    });

    it('should handle empty project list', () => {
        projectServiceMock.getProjects.mockReturnValue(of([]));
        fixture.detectChanges();
        expect(component.projects).toEqual([]);
        expect(component.hasError).toBe(false);
    });

    // ─── Create Project button visibility ────────────────────────────

    it('should hide "Create Project" button when user is not SUPER_ADMIN', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(false);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
        expect(btn).toBeNull();
    });

    it('should show "Create Project" button when user is SUPER_ADMIN', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector('button[aria-haspopup="dialog"]');
        expect(btn).toBeTruthy();
        expect(btn?.textContent?.trim()).toBe('Create Project');
    });

    // ─── Create form validation ──────────────────────────────────────

    it('should require name field', () => {
        fixture.detectChanges();
        component.createForm.get('name')?.markAsTouched();
        expect(component.createForm.get('name')?.invalid).toBe(true);
    });

    it('should validate name minimum length', () => {
        fixture.detectChanges();
        component.createForm.get('name')?.setValue('A');
        expect(component.createForm.get('name')?.invalid).toBe(true);

        component.createForm.get('name')?.setValue('AB');
        expect(component.createForm.get('name')?.valid).toBe(true);
    });

    it('should allow empty key (optional)', () => {
        fixture.detectChanges();
        component.createForm.get('key')?.setValue('');
        expect(component.createForm.get('key')?.valid).toBe(true);
    });

    it('should validate key format when provided', () => {
        fixture.detectChanges();
        component.createForm.get('key')?.setValue('A');
        expect(component.createForm.get('key')?.invalid).toBe(true);

        component.createForm.get('key')?.setValue('AB');
        expect(component.createForm.get('key')?.valid).toBe(true);

        component.createForm.get('key')?.setValue('TOOLONGKEYYY');
        expect(component.createForm.get('key')?.invalid).toBe(true);

        component.createForm.get('key')?.setValue('ab!');
        expect(component.createForm.get('key')?.invalid).toBe(true);
    });

    it('should not submit when form is invalid', () => {
        fixture.detectChanges();
        component.onCreateProject();
        expect(projectServiceMock.createProject).not.toHaveBeenCalled();
    });

    // ─── Create flow ─────────────────────────────────────────────────

    it('should call projectService.createProject() on valid form submit', () => {
        projectServiceMock.createProject.mockReturnValue(of(createdProject));
        fixture.detectChanges();

        component.createForm.setValue({ name: 'New Project', key: 'NEW', description: 'A new project' });
        component.onCreateProject();

        expect(projectServiceMock.createProject).toHaveBeenCalledWith({
            name: 'New Project',
            key: 'NEW',
            description: 'A new project',
        });
    });

    it('should navigate to new project on successful creation', () => {
        projectServiceMock.createProject.mockReturnValue(of(createdProject));
        fixture.detectChanges();

        component.createForm.setValue({ name: 'New Project', key: '', description: '' });
        component.onCreateProject();

        expect(router.navigate).toHaveBeenCalledWith(['screen/projects', '4']);
    });

    it('should show success growl on creation', () => {
        projectServiceMock.createProject.mockReturnValue(of(createdProject));
        fixture.detectChanges();

        component.createForm.setValue({ name: 'New Project', key: '', description: '' });
        component.onCreateProject();

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Project created',
            detail: 'New Project (NEW) has been created.',
        });
    });

    it('should show inline error on 409 conflict', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Project name already exists' },
            status: 409,
        });
        projectServiceMock.createProject.mockReturnValue(throwError(() => errorResponse));
        fixture.detectChanges();

        component.createForm.setValue({ name: 'Duplicate', key: '', description: '' });
        component.onCreateProject();

        expect(component.createError).toBe('Project name already exists');
    });

    it('should show growl on non-409 error', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Server error' },
            status: 500,
        });
        projectServiceMock.createProject.mockReturnValue(throwError(() => errorResponse));
        fixture.detectChanges();

        component.createForm.setValue({ name: 'Test', key: '', description: '' });
        component.onCreateProject();

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Creation failed',
            detail: 'Server error',
        });
    });

    it('should reset form on resetCreateForm()', () => {
        fixture.detectChanges();
        component.createForm.setValue({ name: 'Test', key: 'TST', description: 'desc' });
        component.createError = 'some error';

        component.resetCreateForm();

        expect(component.createForm.get('name')?.value).toBeNull();
        expect(component.createError).toBe('');
    });

    // ─── Key input auto-uppercase ────────────────────────────────────

    it('should auto-uppercase key input', () => {
        fixture.detectChanges();
        const event = { target: { value: 'abc123' } } as unknown as Event;
        component.onKeyInput(event);
        expect((event.target as HTMLInputElement).value).toBe('ABC123');
    });

    it('should strip non-alphanumeric characters from key input', () => {
        fixture.detectChanges();
        const event = { target: { value: 'AB-C!2' } } as unknown as Event;
        component.onKeyInput(event);
        expect((event.target as HTMLInputElement).value).toBe('ABC2');
    });
});
