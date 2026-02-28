import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project,
    Sprint, SprintStatus, BacklogItem,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-sprints',
    templateUrl: './sprints.component.html',
    styleUrls: ['./sprints.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_BUTTON, ...EUI_CARD,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_PROGRESS_BAR,
        ...EUI_INPUT_TEXT, ...EUI_TEXTAREA, ...EUI_LABEL, ...EUI_INPUT_GROUP,
        ...EUI_STATUS_BADGE,
        EuiDialogComponent, FormsModule, TranslateModule, DatePipe,
    ],
})
export class SprintsComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly router = inject(Router);
    private readonly destroy$ = new Subject<void>();

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;

    project: Project | null = null;
    sprints: Sprint[] = [];
    ticketCounts = new Map<string, number>();
    isLoading = true;
    hasError = false;
    canManage = false;
    closedCollapsed = true;

    // Create dialog state
    newSprintName = '';
    newSprintGoal = '';
    createError = '';

    get activeSprints(): Sprint[] {
        return this.sprints.filter(s => s.status === 'ACTIVE');
    }

    get plannedSprints(): Sprint[] {
        return this.sprints.filter(s => s.status === 'PLANNED');
    }

    get closedSprints(): Sprint[] {
        return this.sprints.filter(s => s.status === 'CLOSED');
    }

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.isLoading = true;
            this.hasError = false;
            this.cdr.markForCheck();
            this.determineCanManage(project.id);
            this.loadSprints(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadSprints(projectId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        this.projectService.getSprints(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: sprints => {
                this.sprints = sprints;
                this.isLoading = false;
                this.cdr.markForCheck();
                this.loadTicketCounts(projectId, sprints);
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    retry(): void {
        if (this.project) {
            this.loadSprints(this.project.id);
        }
    }

    openCreateDialog(): void {
        this.resetCreateForm();
        this.cdr.detectChanges();
        this.createDialog.openDialog();
    }

    onCreateSprint(): void {
        if (!this.project || !this.newSprintName.trim()) return;
        const projectId = this.project.id;
        const payload = {
            name: this.newSprintName.trim(),
            goal: this.newSprintGoal.trim() || undefined,
        };

        this.projectService.createSprint(projectId, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: sprint => {
                this.createDialog.closeDialog();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('sprint.growl.created-summary'),
                    detail: this.translate.instant('sprint.growl.created-detail', { name: sprint.name }),
                });
                this.resetCreateForm();
                this.loadSprints(projectId);
            },
            error: () => {
                this.createError = this.translate.instant('sprint.growl.error-detail');
                this.cdr.markForCheck();
            },
        });
    }

    resetCreateForm(): void {
        this.newSprintName = '';
        this.newSprintGoal = '';
        this.createError = '';
    }

    isCreateFormValid(): boolean {
        return this.newSprintName.trim().length >= 2;
    }

    startSprint(sprint: Sprint): void {
        if (!this.project) return;
        const projectId = this.project.id;

        this.projectService.updateSprintStatus(projectId, sprint.id, { status: 'ACTIVE' }).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('sprint.growl.started-summary'),
                    detail: this.translate.instant('sprint.growl.started-detail', { name: sprint.name }),
                });
                this.loadSprints(projectId);
            },
            error: () => {
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('sprint.growl.error-summary'),
                    detail: this.translate.instant('sprint.growl.error-detail'),
                });
            },
        });
    }

    closeSprint(sprint: Sprint): void {
        if (!this.project) return;
        const projectId = this.project.id;

        // Check for unresolved tickets
        const sprintTickets = this.getSprintTickets(sprint.id);
        const unresolvedTickets = sprintTickets.filter(t => t.status !== 'DONE');

        if (unresolvedTickets.length === 0) {
            this.doCloseSprint(projectId, sprint, false);
        } else {
            this.unresolvedTickets = unresolvedTickets;
            this.sprintToClose = sprint;
            this.cdr.detectChanges();
            this.closeConfirmDialog.openDialog();
        }
    }

    // Close confirmation dialog state
    @ViewChild('closeConfirmDialog') closeConfirmDialog!: EuiDialogComponent;
    sprintToClose: Sprint | null = null;
    unresolvedTickets: BacklogItem[] = [];

    onConfirmClose(): void {
        if (!this.project || !this.sprintToClose) return;
        this.doCloseSprint(this.project.id, this.sprintToClose, true);
    }

    resetCloseForm(): void {
        this.sprintToClose = null;
        this.unresolvedTickets = [];
    }

    getStatusVariant(status: SprintStatus): string {
        switch (status) {
            case 'ACTIVE': return 'success';
            case 'PLANNED': return 'info';
            case 'CLOSED': return 'secondary';
        }
    }

    getTicketCount(sprintId: string): number {
        return this.ticketCounts.get(sprintId) ?? 0;
    }

    navigateToPlanning(sprint: Sprint): void {
        if (this.project && sprint.status !== 'CLOSED') {
            this.router.navigate(['/screen/projects', this.project.id, 'sprints', sprint.id]);
        }
    }

    private doCloseSprint(projectId: string, sprint: Sprint, moveTickets: boolean): void {
        this.projectService.updateSprintStatus(projectId, sprint.id, {
            status: 'CLOSED',
            move_open_tickets_to_backlog: moveTickets,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                if (this.closeConfirmDialog) {
                    this.closeConfirmDialog.closeDialog();
                }
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('sprint.growl.closed-summary'),
                    detail: this.translate.instant('sprint.growl.closed-detail', { name: sprint.name }),
                });
                this.resetCloseForm();
                this.loadSprints(projectId);
            },
            error: () => {
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('sprint.growl.error-summary'),
                    detail: this.translate.instant('sprint.growl.error-detail'),
                });
            },
        });
    }

    private allBacklogItems: BacklogItem[] = [];

    private getSprintTickets(sprintId: string): BacklogItem[] {
        return this.allBacklogItems.filter(item => item.sprint_id === sprintId);
    }

    private loadTicketCounts(projectId: string, sprints: Sprint[]): void {
        if (sprints.length === 0) return;

        this.projectService.getBacklog(projectId, { _limit: 1000 }).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: res => {
                this.allBacklogItems = res.data;
                const counts = new Map<string, number>();
                for (const item of res.data) {
                    if (item.sprint_id) {
                        counts.set(item.sprint_id, (counts.get(item.sprint_id) ?? 0) + 1);
                    }
                }
                this.ticketCounts = counts;
                this.cdr.markForCheck();
            },
        });
    }

    private determineCanManage(projectId: string): void {
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canManage = can;
            this.cdr.markForCheck();
        });
    }
}
