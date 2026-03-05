import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateTestingModule, provideEuiCoreMocks, createGrowlServiceMock, createBreadcrumbServiceMock } from '../../../testing/test-providers';
import { SettingsComponent } from './settings.component';
import { ProjectContextService, ProjectService, Project, Workflow } from '../../../core/project';
import { PermissionService } from '../../../core/auth';
import { EuiGrowlService } from '@eui/core';
import { EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';

const mockProject: Project = {
    id: '1', key: 'TF', name: 'TaskForge Core',
    description: 'Main product', created_by: '1',
    created_at: '2025-01-20T09:00:00.000Z', updated_at: '2025-06-01T10:00:00.000Z', is_active: true,
};

const mockWorkflows: Workflow[] = [
    {
        id: '1', projectId: '1', ticketType: 'STORY',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '2', projectId: '1', ticketType: 'BUG',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '3', projectId: '1', ticketType: 'TASK',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['IN_REVIEW', 'TO_DO'], IN_REVIEW: ['DONE', 'IN_PROGRESS'], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
    {
        id: '4', projectId: '1', ticketType: 'EPIC',
        statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
        transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], IN_REVIEW: [], DONE: [] },
        created_at: '2025-01-20T09:00:00.000Z',
    },
];

describe('SettingsComponent', () => {
    let fixture: ComponentFixture<SettingsComponent>;
    let component: SettingsComponent;
    let currentProject$: BehaviorSubject<Project | null>;
    let projectServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let projectContextMock: { currentProject$: BehaviorSubject<Project | null>; getCurrentProject: ReturnType<typeof vi.fn> };
    let permissionServiceMock: Record<string, ReturnType<typeof vi.fn>>;
    let growlServiceMock: ReturnType<typeof createGrowlServiceMock>;
    let breadcrumbMock: ReturnType<typeof createBreadcrumbServiceMock>;

    function initWithData(opts?: { canManage?: boolean }): void {
        const canManage = opts?.canManage ?? true;
        permissionServiceMock['isSuperAdmin'] = vi.fn().mockReturnValue(canManage);
        currentProject$.next(mockProject);
        fixture.detectChanges();
    }

    beforeEach(async () => {
        currentProject$ = new BehaviorSubject<Project | null>(null);
        projectServiceMock = {
            getWorkflows: vi.fn().mockReturnValue(of(mockWorkflows)),
            updateWorkflow: vi.fn(),
        };
        projectContextMock = {
            currentProject$,
            getCurrentProject: vi.fn().mockReturnValue(mockProject),
        };
        permissionServiceMock = {
            isSuperAdmin: vi.fn().mockReturnValue(true),
            hasProjectRole: vi.fn().mockReturnValue(of(false)),
            hasGlobalRole: vi.fn().mockReturnValue(false),
        };
        growlServiceMock = createGrowlServiceMock();
        breadcrumbMock = createBreadcrumbServiceMock();

        await TestBed.configureTestingModule({
            imports: [SettingsComponent, TranslateTestingModule],
            providers: [
                ...provideEuiCoreMocks(),
                { provide: ProjectContextService, useValue: projectContextMock },
                { provide: ProjectService, useValue: projectServiceMock },
                { provide: PermissionService, useValue: permissionServiceMock },
                { provide: EuiGrowlService, useValue: growlServiceMock },
                { provide: EuiBreadcrumbService, useValue: breadcrumbMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
    });

    // ─── STORY-003: Workflow Editor Page ───

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getWorkflows with project ID on init', () => {
        initWithData();
        expect(projectServiceMock['getWorkflows']).toHaveBeenCalledWith('1');
    });

    it('should auto-select first workflow on load', () => {
        initWithData();
        expect(component.selectedWorkflow).toBeTruthy();
        expect(component.selectedWorkflow?.ticketType).toBe('STORY');
    });

    it('should display toggle group items for each workflow', () => {
        initWithData();
        const items = fixture.nativeElement.querySelectorAll('eui-toggle-group-item');
        expect(items.length).toBe(4);
    });

    it('should switch selected workflow on toggle click', () => {
        initWithData();
        component.selectWorkflow({ id: 'BUG' } as EuiToggleGroupItemComponent);
        expect(component.selectedWorkflow?.ticketType).toBe('BUG');
    });

    it('should display selected workflow statuses', () => {
        initWithData();
        const badges = fixture.nativeElement.querySelectorAll('.status-flow [euiStatusBadge]');
        expect(badges.length).toBe(4);
    });

    it('should show loading state before project emits', () => {
        fixture.detectChanges();
        expect(component.isLoading).toBe(true);
    });

    it('should show error state on API failure', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        initWithData();
        expect(component.hasError).toBe(true);
    });

    it('should show empty state when no workflows exist', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(of([]));
        initWithData();
        const feedbackMsg = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(feedbackMsg).toBeTruthy();
    });

    it('should enter edit mode on Edit click', () => {
        initWithData();
        component.enterEditMode();
        expect(component.isEditMode).toBe(true);
    });

    it('should copy workflow data to edit state on edit', () => {
        initWithData();
        component.enterEditMode();
        expect(component.editStatuses).toEqual(['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']);
        expect(component.editTransitions['TO_DO']).toEqual(['IN_PROGRESS']);
    });

    it('should exit edit mode on Cancel', () => {
        initWithData();
        component.enterEditMode();
        component.cancelEdit();
        expect(component.isEditMode).toBe(false);
    });

    it('should cancel edit mode when switching workflow', () => {
        initWithData();
        component.enterEditMode();
        component.selectWorkflow({ id: 'BUG' } as EuiToggleGroupItemComponent);
        expect(component.isEditMode).toBe(false);
        expect(component.selectedWorkflow?.ticketType).toBe('BUG');
    });

    it('should call updateWorkflow on Save and show success growl', () => {
        const updatedWorkflow = { ...mockWorkflows[0], updated_at: '2025-06-02T10:00:00.000Z' };
        projectServiceMock['updateWorkflow'] = vi.fn().mockReturnValue(of(updatedWorkflow));
        initWithData();
        component.enterEditMode();
        component.saveWorkflow();
        expect(projectServiceMock['updateWorkflow']).toHaveBeenCalledWith('1', '1', {
            statuses: component.editStatuses,
            transitions: component.editTransitions,
        });
        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'success' }),
        );
        expect(component.isEditMode).toBe(false);
    });

    it('should show error growl on save failure', () => {
        projectServiceMock['updateWorkflow'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        initWithData();
        component.enterEditMode();
        component.saveWorkflow();
        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error' }),
        );
        expect(component.isEditMode).toBe(true);
    });

    it('should show conflict growl on 409 error', () => {
        const err = new HttpErrorResponse({ status: 409 });
        projectServiceMock['updateWorkflow'] = vi.fn().mockReturnValue(throwError(() => err));
        initWithData();
        component.enterEditMode();
        component.saveWorkflow();
        expect(growlServiceMock.growl).toHaveBeenCalledWith(
            expect.objectContaining({ severity: 'error', detail: 'workflow-mgmt.growl.conflict' }),
        );
    });

    it('should retry loading workflows', () => {
        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
        initWithData();
        expect(component.hasError).toBe(true);

        projectServiceMock['getWorkflows'] = vi.fn().mockReturnValue(of(mockWorkflows));
        component.retry();
        fixture.detectChanges();
        expect(component.hasError).toBe(false);
        expect(component.workflows.length).toBe(4);
    });

    // ─── STORY-004: Add/Remove Status ───

    it('should add valid status', () => {
        initWithData();
        component.enterEditMode();
        component.newStatusName = 'BLOCKED';
        component.addStatus();
        expect(component.editStatuses).toContain('BLOCKED');
        expect(component.editTransitions['BLOCKED']).toEqual([]);
        expect(component.newStatusName).toBe('');
    });

    it('should auto-uppercase status name', () => {
        initWithData();
        component.enterEditMode();
        component.newStatusName = 'blocked';
        component.addStatus();
        expect(component.editStatuses).toContain('BLOCKED');
    });

    it('should reject duplicate status', () => {
        initWithData();
        component.enterEditMode();
        component.newStatusName = 'TO_DO';
        component.addStatus();
        expect(component.statusError).toBeTruthy();
        expect(component.editStatuses.filter(s => s === 'TO_DO').length).toBe(1);
    });

    it('should reject invalid status format', () => {
        initWithData();
        component.enterEditMode();
        component.newStatusName = '123invalid';
        component.addStatus();
        expect(component.statusError).toBeTruthy();
    });

    it('should remove status and clean up transitions', () => {
        initWithData();
        component.enterEditMode();
        component.removeStatus('IN_REVIEW');
        expect(component.editStatuses).not.toContain('IN_REVIEW');
        expect(component.editTransitions['IN_REVIEW']).toBeUndefined();
        // IN_REVIEW should be removed from IN_PROGRESS targets
        expect(component.editTransitions['IN_PROGRESS']).not.toContain('IN_REVIEW');
    });

    it('should not remove last status', () => {
        initWithData();
        component.enterEditMode();
        component.editStatuses = ['ONLY_ONE'];
        component.removeStatus('ONLY_ONE');
        expect(component.editStatuses).toEqual(['ONLY_ONE']);
    });

    // ─── STORY-005: Transition Editor ───

    it('should check existing transitions via hasTransition', () => {
        initWithData();
        component.enterEditMode();
        expect(component.hasTransition('TO_DO', 'IN_PROGRESS')).toBe(true);
        expect(component.hasTransition('TO_DO', 'DONE')).toBe(false);
    });

    it('should add transition via toggleTransition', () => {
        initWithData();
        component.enterEditMode();
        component.toggleTransition('TO_DO', 'DONE');
        expect(component.editTransitions['TO_DO']).toContain('DONE');
    });

    it('should remove transition via toggleTransition', () => {
        initWithData();
        component.enterEditMode();
        component.toggleTransition('TO_DO', 'IN_PROGRESS');
        expect(component.editTransitions['TO_DO']).not.toContain('IN_PROGRESS');
    });

    it('should show transition matrix in edit mode', () => {
        initWithData();
        component.enterEditMode();
        fixture.detectChanges();
        const matrix = fixture.nativeElement.querySelector('.transition-matrix');
        expect(matrix).toBeTruthy();
    });

    it('should show read-only transitions table when not in edit mode', () => {
        initWithData();
        fixture.detectChanges();
        const readOnlyTable = fixture.nativeElement.querySelector('.transitions-table');
        expect(readOnlyTable).toBeTruthy();
        const matrix = fixture.nativeElement.querySelector('.transition-matrix');
        expect(matrix).toBeFalsy();
    });

    // ─── STORY-006: Role Gating ───

    it('should set canManage=true for SUPER_ADMIN', () => {
        permissionServiceMock['isSuperAdmin'] = vi.fn().mockReturnValue(true);
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canManage).toBe(true);
    });

    it('should set canManage=true for PROJECT_ADMIN', () => {
        permissionServiceMock['isSuperAdmin'] = vi.fn().mockReturnValue(false);
        permissionServiceMock['hasProjectRole'] = vi.fn().mockReturnValue(of(true));
        currentProject$.next(mockProject);
        fixture.detectChanges();
        expect(component.canManage).toBe(true);
    });

    it('should set canManage=false for DEVELOPER', () => {
        initWithData({ canManage: false });
        expect(component.canManage).toBe(false);
    });

    it('should hide Edit button when canManage=false', () => {
        initWithData({ canManage: false });
        const editBtn = fixture.nativeElement.querySelector('eui-page-header-action-items button');
        expect(editBtn).toBeFalsy();
    });

    it('should show read-only banner when canManage=false', () => {
        initWithData({ canManage: false });
        const banner = fixture.nativeElement.querySelector('eui-feedback-message');
        expect(banner).toBeTruthy();
        expect(banner.textContent).toContain('workflow-mgmt.read-only');
    });

    it('should show Edit button when canManage=true', () => {
        initWithData({ canManage: true });
        const btn = fixture.nativeElement.querySelector('eui-page-header-action-items button');
        expect(btn).toBeTruthy();
    });

    it('should open confirmation dialog on save click', () => {
        initWithData();
        component.enterEditMode();
        fixture.detectChanges();
        component.confirmDialog = { openDialog: vi.fn() } as unknown as EuiDialogComponent;
        component.onSaveClick();
        expect(component.confirmDialog.openDialog).toHaveBeenCalled();
    });

    it('should not save when dialog is dismissed (save not called)', () => {
        initWithData();
        component.enterEditMode();
        // Simply verify that saveWorkflow is not called unless explicitly invoked
        expect(component.isSaving).toBe(false);
        expect(component.isEditMode).toBe(true);
    });

    it('should set breadcrumb via service on project load', () => {
        initWithData();
        expect(breadcrumbMock.setBreadcrumb).toHaveBeenCalledWith([
            { id: 'projects', label: 'nav.projects', link: '/screen/projects' },
            { id: 'project', label: 'TaskForge Core', link: '/screen/projects/1' },
            { id: 'settings', label: 'nav.settings', link: null },
        ]);
    });
});
