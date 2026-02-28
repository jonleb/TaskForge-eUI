import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectContextService, ProjectService, Project, Workflow, UpdateWorkflowPayload } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_STATUS_BADGE, ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON, ...EUI_ICON, ...EUI_TOGGLE_GROUP,
        EuiIconButtonComponent, EuiDialogComponent,
        FormsModule, TranslateModule,
    ],
})
export class SettingsComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();

    @ViewChild('confirmDialog') confirmDialog!: EuiDialogComponent;

    workflows: Workflow[] = [];
    isLoading = true;
    hasError = false;

    // Selection
    selectedWorkflow: Workflow | null = null;

    // Edit mode
    isEditMode = false;
    editStatuses: string[] = [];
    editTransitions: Record<string, string[]> = {};
    isSaving = false;

    // Add status
    newStatusName = '';
    statusError = '';

    // Permission
    canManage = false;

    private currentProjectId = '';

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            switchMap(project => {
                this.currentProjectId = project.id;
                this.isLoading = true;
                this.hasError = false;
                this.isEditMode = false;
                this.cdr.markForCheck();
                this.determineCanManage(project.id);
                return this.projectService.getWorkflows(project.id);
            }),
            takeUntil(this.destroy$),
        ).subscribe({
            next: workflows => {
                this.workflows = workflows;
                this.isLoading = false;
                if (workflows.length > 0) {
                    this.selectedWorkflow = workflows[0];
                }
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    retry(): void {
        const project = this.projectContext.getCurrentProject();
        if (!project) return;
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();
        this.projectService.getWorkflows(project.id).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: workflows => {
                this.workflows = workflows;
                this.isLoading = false;
                if (workflows.length > 0 && !this.selectedWorkflow) {
                    this.selectedWorkflow = workflows[0];
                }
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    selectWorkflow(item: EuiToggleGroupItemComponent): void {
        const workflow = this.workflows.find(w => w.ticketType === item.id);
        if (workflow) {
            if (this.isEditMode) {
                this.cancelEdit();
            }
            this.selectedWorkflow = workflow;
            this.cdr.markForCheck();
        }
    }

    enterEditMode(): void {
        if (!this.selectedWorkflow) return;
        this.editStatuses = [...this.selectedWorkflow.statuses];
        this.editTransitions = {};
        for (const [key, targets] of Object.entries(this.selectedWorkflow.transitions)) {
            this.editTransitions[key] = [...(targets as string[])];
        }
        this.newStatusName = '';
        this.statusError = '';
        this.isEditMode = true;
        this.cdr.markForCheck();
    }

    cancelEdit(): void {
        this.isEditMode = false;
        this.newStatusName = '';
        this.statusError = '';
        this.cdr.markForCheck();
    }

    onSaveClick(): void {
        this.confirmDialog.openDialog();
    }

    saveWorkflow(): void {
        if (!this.selectedWorkflow) return;
        this.isSaving = true;
        this.cdr.markForCheck();

        const payload: UpdateWorkflowPayload = {
            statuses: this.editStatuses,
            transitions: this.editTransitions,
        };

        this.projectService.updateWorkflow(this.currentProjectId, this.selectedWorkflow.id, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: updated => {
                const idx = this.workflows.findIndex(w => w.id === updated.id);
                if (idx >= 0) {
                    this.workflows[idx] = updated;
                }
                this.selectedWorkflow = updated;
                this.isEditMode = false;
                this.isSaving = false;
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('workflow-mgmt.growl.updated-summary'),
                    detail: this.translate.instant('workflow-mgmt.growl.updated-detail'),
                });
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.isSaving = false;
                const detail = err?.status === 409
                    ? this.translate.instant('workflow-mgmt.growl.conflict')
                    : this.translate.instant('workflow-mgmt.growl.update-failed');
                this.growlService.growl({ severity: 'error', summary: this.translate.instant('workflow-mgmt.growl.update-failed'), detail });
                this.cdr.markForCheck();
            },
        });
    }

    // STORY-004: Add/Remove status
    addStatus(): void {
        const name = this.newStatusName.trim().toUpperCase();
        if (!name) return;

        if (!/^[A-Z][A-Z0-9_]{0,29}$/.test(name)) {
            this.statusError = this.translate.instant('workflow-mgmt.status-invalid');
            return;
        }
        if (this.editStatuses.includes(name)) {
            this.statusError = this.translate.instant('workflow-mgmt.status-duplicate');
            return;
        }

        this.editStatuses.push(name);
        this.editTransitions[name] = [];
        this.newStatusName = '';
        this.statusError = '';
        this.cdr.markForCheck();
    }

    removeStatus(status: string): void {
        if (this.editStatuses.length <= 1) return;

        this.editStatuses = this.editStatuses.filter(s => s !== status);
        delete this.editTransitions[status];
        for (const key of Object.keys(this.editTransitions)) {
            this.editTransitions[key] = this.editTransitions[key].filter(t => t !== status);
        }
        this.cdr.markForCheck();
    }

    // STORY-005: Transition helpers
    hasTransition(from: string, to: string): boolean {
        return (this.editTransitions[from] ?? []).includes(to);
    }

    toggleTransition(from: string, to: string): void {
        if (!this.editTransitions[from]) {
            this.editTransitions[from] = [];
        }
        const targets = this.editTransitions[from];
        const index = targets.indexOf(to);
        if (index >= 0) {
            targets.splice(index, 1);
        } else {
            targets.push(to);
        }
        this.cdr.markForCheck();
    }

    // Read-only helpers
    getTransitionTargets(workflow: Workflow, fromStatus: string): string[] {
        return workflow.transitions[fromStatus as keyof typeof workflow.transitions] ?? [];
    }

    // STORY-006: Permission check
    private determineCanManage(projectId: string): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canManage = true;
            this.cdr.markForCheck();
            return;
        }
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canManage = can;
            this.cdr.markForCheck();
        });
    }
}
