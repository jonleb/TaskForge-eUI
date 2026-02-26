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
import { ProjectService, Project, ProjectListResponse } from '../../../core/project';
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

const mockListResponse: ProjectListResponse = {
    data: mockProjects,
    total: 2,
    page: 1,
    limit: 10,
};

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
        updateProject: ReturnType<typeof vi.fn>;
    };
    let permissionServiceMock: { isSuperAdmin: ReturnType<typeof vi.fn> };
    let growlServiceMock: { growl: ReturnType<typeof vi.fn> };
    let router: Router;

    beforeEach(async () => {
        projectServiceMock = {
            getProjects: vi.fn().mockReturnValue(of(mockListResponse)),
            createProject: vi.fn(),
            updateProject: vi.fn(),
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

    it('should load projects on init with default params', () => {
        fixture.detectChanges();
        expect(projectServiceMock.getProjects).toHaveBeenCalledWith({
            _page: 1, _limit: 10, _sort: 'name', _order: 'asc',
        });
        expect(component.projects).toEqual(mockProjects);
        expect(component.total).toBe(2);
        expect(component.loading).toBe(false);
    });

    it('should handle error and set hasError flag', () => {
        projectServiceMock.getProjects.mockReturnValue(throwError(() => new Error('Network error')));
        fixture.detectChanges();
        expect(component.projects).toEqual([]);
        expect(component.total).toBe(0);
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

        projectServiceMock.getProjects.mockReturnValue(of(mockListResponse));
        component.loadProjects();
        expect(component.hasError).toBe(false);
        expect(component.projects).toEqual(mockProjects);
    });

    it('should handle empty project list', () => {
        projectServiceMock.getProjects.mockReturnValue(of({ data: [], total: 0, page: 1, limit: 10 }));
        fixture.detectChanges();
        expect(component.projects).toEqual([]);
        expect(component.total).toBe(0);
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
            name: 'New Project', key: 'NEW', description: 'A new project',
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
            error: { message: 'Project name already exists' }, status: 409,
        });
        projectServiceMock.createProject.mockReturnValue(throwError(() => errorResponse));
        fixture.detectChanges();
        component.createForm.setValue({ name: 'Duplicate', key: '', description: '' });
        component.onCreateProject();
        expect(component.createError).toBe('Project name already exists');
    });

    it('should show growl on non-409 error', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Server error' }, status: 500,
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

    // ─── Search ──────────────────────────────────────────────────────

    it('should call getProjects with search param after debounce', () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        projectServiceMock.getProjects.mockClear();

        component.onFilterChange('task');
        vi.advanceTimersByTime(300);

        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ q: 'task', _page: 1 }),
        );
        vi.useRealTimers();
    });

    it('should reset page to 1 on search', () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        component.params = { ...component.params, _page: 3 };
        projectServiceMock.getProjects.mockClear();

        component.onFilterChange('demo');
        vi.advanceTimersByTime(300);

        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ _page: 1 }),
        );
        vi.useRealTimers();
    });

    it('should not call getProjects before debounce completes', () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        projectServiceMock.getProjects.mockClear();

        component.onFilterChange('task');
        vi.advanceTimersByTime(100);

        expect(projectServiceMock.getProjects).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200);
        expect(projectServiceMock.getProjects).toHaveBeenCalled();
        vi.useRealTimers();
    });

    // ─── Sort ────────────────────────────────────────────────────────

    it('should call getProjects with sort params on sort change', () => {
        fixture.detectChanges();
        projectServiceMock.getProjects.mockClear();

        component.onSortChange([{ sort: 'key', order: 'asc' }]);

        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ _sort: 'key', _order: 'asc', _page: 1 }),
        );
    });

    it('should reset page to 1 on sort change', () => {
        fixture.detectChanges();
        component.params = { ...component.params, _page: 5 };
        projectServiceMock.getProjects.mockClear();

        component.onSortChange([{ sort: 'name', order: 'desc' }]);

        expect(component.params._page).toBe(1);
    });

    // ─── Pagination ──────────────────────────────────────────────────

    it('should call getProjects with page params on page change', () => {
        fixture.detectChanges();
        component.ngAfterViewInit(); // set paginatorReady
        projectServiceMock.getProjects.mockClear();

        component.onPageChange({ page: 1, pageSize: 25 });

        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ _page: 2, _limit: 25 }),
        );
    });

    it('should ignore paginator init event before AfterViewInit', () => {
        // Do NOT call fixture.detectChanges() which triggers ngOnInit
        // Instead manually test the guard
        projectServiceMock.getProjects.mockClear();

        component.onPageChange({ page: 0, pageSize: 10 });

        expect(projectServiceMock.getProjects).not.toHaveBeenCalled();
    });

    // ─── Empty state message ─────────────────────────────────────────

    it('should return error message when hasError is true', () => {
        component.hasError = true;
        expect(component.emptyStateMessage).toBe('Could not load projects. Please try again.');
    });

    it('should return search message when q param is set', () => {
        component.hasError = false;
        component.params = { ...component.params, q: 'something' };
        expect(component.emptyStateMessage).toBe('No projects match your search criteria.');
    });

    it('should return default message when no filters', () => {
        component.hasError = false;
        component.params = { _page: 1, _limit: 10, _sort: 'name', _order: 'asc' };
        expect(component.emptyStateMessage).toBe('No projects available.');
    });

    // ─── Status filter (STORY-003) ───────────────────────────────────

    it('should show status toggle group for SUPER_ADMIN', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(true);
        fixture.detectChanges();
        const toggleGroup = fixture.nativeElement.querySelector('eui-toggle-group');
        expect(toggleGroup).toBeTruthy();
        expect(toggleGroup.getAttribute('aria-label')).toBe('Filter projects by status');

        const items = fixture.nativeElement.querySelectorAll('eui-toggle-group-item');
        expect(items.length).toBe(3);
    });

    it('should hide status toggle group for regular user', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(false);
        fixture.detectChanges();
        const toggleGroup = fixture.nativeElement.querySelector('eui-toggle-group');
        expect(toggleGroup).toBeNull();
    });

    it('should call loadProjects with is_active=true when active filter selected', () => {
        fixture.detectChanges();
        projectServiceMock.getProjects.mockClear();

        component.onStatusFilterChange({ id: 'status-active' } as any);

        expect(component.activeStatusFilter).toBe('active');
        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ is_active: 'true', _page: 1 }),
        );
    });

    it('should call loadProjects with is_active=false when inactive filter selected', () => {
        fixture.detectChanges();
        projectServiceMock.getProjects.mockClear();

        component.onStatusFilterChange({ id: 'status-inactive' } as any);

        expect(component.activeStatusFilter).toBe('inactive');
        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ is_active: 'false', _page: 1 }),
        );
    });

    it('should reset page to 1 on status filter change', () => {
        fixture.detectChanges();
        component.params = { ...component.params, _page: 3 };
        projectServiceMock.getProjects.mockClear();

        component.onStatusFilterChange({ id: 'status-active' } as any);

        expect(component.params._page).toBe(1);
    });

    it('should clear is_active param when "All" filter selected', () => {
        fixture.detectChanges();
        component.onStatusFilterChange({ id: 'status-active' } as any);
        projectServiceMock.getProjects.mockClear();

        component.onStatusFilterChange({ id: 'status-all' } as any);

        expect(component.activeStatusFilter).toBe('all');
        expect(projectServiceMock.getProjects).toHaveBeenCalledWith(
            expect.objectContaining({ is_active: undefined }),
        );
    });

    // ─── Status column (STORY-003) ───────────────────────────────────

    it('should display "Active" chip for active projects', () => {
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('eui-chip');
        expect(chips.length).toBeGreaterThan(0);
        const activeChip = chips[0];
        expect(activeChip.textContent.trim()).toBe('Active');
    });

    it('should display "Inactive" chip for inactive projects', () => {
        const inactiveProject: Project = {
            ...mockProjects[0], id: '99', name: 'Archived', is_active: false,
        };
        projectServiceMock.getProjects.mockReturnValue(of({
            data: [inactiveProject], total: 1, page: 1, limit: 10,
        }));
        fixture.detectChanges();
        const chips = fixture.nativeElement.querySelectorAll('eui-chip');
        expect(chips.length).toBe(1);
        expect(chips[0].textContent.trim()).toBe('Inactive');
    });

    // ─── Empty state messages for status filter (STORY-003) ──────────

    it('should return active filter message when activeStatusFilter is "active"', () => {
        component.hasError = false;
        component.params = { _page: 1, _limit: 10, _sort: 'name', _order: 'asc' };
        component.activeStatusFilter = 'active';
        expect(component.emptyStateMessage).toBe('No active projects found.');
    });

    it('should return inactive filter message when activeStatusFilter is "inactive"', () => {
        component.hasError = false;
        component.params = { _page: 1, _limit: 10, _sort: 'name', _order: 'asc' };
        component.activeStatusFilter = 'inactive';
        expect(component.emptyStateMessage).toBe('No inactive projects found.');
    });

    // ─── Edit dialog (STORY-004) ─────────────────────────────────────

    it('should show edit icon button for SUPER_ADMIN', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(true);
        fixture.detectChanges();
        const editBtns = fixture.nativeElement.querySelectorAll('eui-icon-button[icon="eui-edit"]');
        expect(editBtns.length).toBe(mockProjects.length);
    });

    it('should hide edit icon button for regular user', () => {
        permissionServiceMock.isSuperAdmin.mockReturnValue(false);
        fixture.detectChanges();
        const editBtns = fixture.nativeElement.querySelectorAll('eui-icon-button[icon="eui-edit"]');
        expect(editBtns.length).toBe(0);
    });

    it('should populate editForm when openEditDialog is called', () => {
        fixture.detectChanges();
        component.openEditDialog(mockProjects[0]);
        expect(component.selectedProject).toEqual(mockProjects[0]);
        expect(component.editForm.get('name')?.value).toBe('TaskForge Core');
        expect(component.editForm.get('description')?.value).toBe('Main product');
    });

    it('should show project key as read-only text in edit dialog', () => {
        fixture.detectChanges();
        component.openEditDialog(mockProjects[0]);
        // Key is displayed as read-only text (not a form control) in the edit dialog
        expect(component.selectedProject?.key).toBe('TF');
        // editForm should NOT have a 'key' control
        expect(component.editForm.get('key')).toBeNull();
    });

    it('should close dialog, show growl, and reload on successful update', () => {
        const updatedProject = { ...mockProjects[0], name: 'Updated Name' };
        projectServiceMock.updateProject.mockReturnValue(of(updatedProject));
        fixture.detectChanges();

        component.openEditDialog(mockProjects[0]);
        component.editForm.patchValue({ name: 'Updated Name' });
        projectServiceMock.getProjects.mockClear();

        component.onUpdateProject();

        expect(projectServiceMock.updateProject).toHaveBeenCalledWith('1', {
            name: 'Updated Name',
            description: 'Main product',
        });
        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Project updated',
            detail: 'Updated Name has been updated.',
        });
        expect(projectServiceMock.getProjects).toHaveBeenCalled();
        expect(component.selectedProject).toBeNull();
    });

    it('should show inline error on 409 conflict during update', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'A project with this name already exists' }, status: 409,
        });
        projectServiceMock.updateProject.mockReturnValue(throwError(() => errorResponse));
        fixture.detectChanges();

        component.openEditDialog(mockProjects[0]);
        component.editForm.patchValue({ name: 'Duplicate' });
        component.onUpdateProject();

        expect(component.editError).toBe('A project with this name already exists');
    });

    it('should show growl on non-409 update error', () => {
        const errorResponse = new HttpErrorResponse({
            error: { message: 'Server error' }, status: 500,
        });
        projectServiceMock.updateProject.mockReturnValue(throwError(() => errorResponse));
        fixture.detectChanges();

        component.openEditDialog(mockProjects[0]);
        component.editForm.patchValue({ name: 'Test' });
        component.onUpdateProject();

        expect(growlServiceMock.growl).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Update failed',
            detail: 'Server error',
        });
    });

    it('should reset edit form on resetEditForm()', () => {
        fixture.detectChanges();
        component.openEditDialog(mockProjects[0]);
        component.editError = 'some error';

        component.resetEditForm();

        expect(component.editForm.get('name')?.value).toBeNull();
        expect(component.editError).toBe('');
        expect(component.selectedProject).toBeNull();
    });

    it('should not call updateProject when edit form is invalid', () => {
        fixture.detectChanges();
        component.openEditDialog(mockProjects[0]);
        component.editForm.patchValue({ name: '' });
        component.onUpdateProject();
        expect(projectServiceMock.updateProject).not.toHaveBeenCalled();
    });
});
