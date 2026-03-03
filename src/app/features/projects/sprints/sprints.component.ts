import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project,
    Sprint, SprintStatus, BacklogItem,
    UpdateTicketPayload, WorkflowStatus, TicketPriority,
    WORKFLOW_STATUSES, TICKET_PRIORITIES, ProjectMember,
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
        ...EUI_STATUS_BADGE, ...EUI_ICON, ...EUI_SELECT,
        EuiDialogComponent, EuiTooltipDirective, DragDropModule,
        FormsModule, TranslateModule, DatePipe,
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

    // Edit dialog state
    @ViewChild('editDialog') editDialog!: EuiDialogComponent;
    editingItem: BacklogItem | null = null;
    editDialogTitle = '';
    editError = '';
    projectMembers: ProjectMember[] = [];
    workflowStatuses = WORKFLOW_STATUSES;
    priorities = TICKET_PRIORITIES;
    editForm = {
        title: '',
        description: '',
        status: '' as WorkflowStatus,
        priority: null as TicketPriority | null,
        assignee_id: null as string | null,
    };

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
            this.loadProjectMembers(project.id);
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

    openEditDialog(item: BacklogItem, sprint: Sprint): void {
        this.editingItem = item;
        this.editDialogTitle = this.translate.instant('sprint.dialog.edit-title', {
            ticket: '#' + item.ticket_number,
            title: item.title,
        });
        this.editForm = {
            title: item.title,
            description: item.description,
            status: item.status,
            priority: item.priority,
            assignee_id: item.assignee_id,
        };
        this.editError = '';
        this.cdr.detectChanges();
        this.editDialog.openDialog();
    }

    onSaveEdit(): void {
        if (!this.project || !this.editingItem || !this.editForm.title.trim()) return;

        const payload: UpdateTicketPayload = {
            title: this.editForm.title.trim(),
            description: this.editForm.description,
            status: this.editForm.status,
            priority: this.editForm.priority,
            assignee_id: this.editForm.assignee_id,
        };

        this.projectService.updateTicket(this.project.id, this.editingItem.ticket_number, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.editDialog.closeDialog();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('sprint.growl.edit-success'),
                    detail: this.translate.instant('sprint.growl.edit-detail', {
                        ticket: '#' + this.editingItem!.ticket_number,
                    }),
                });
                this.resetEditForm();
                this.loadSprints(this.project!.id);
            },
            error: () => {
                this.editError = this.translate.instant('sprint.growl.edit-error');
                this.cdr.markForCheck();
            },
        });
    }

    resetEditForm(): void {
        this.editingItem = null;
        this.editDialogTitle = '';
        this.editError = '';
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

    allBacklogItems: BacklogItem[] = [];
    reorderAnnouncement = '';

    getSprintItems(sprintId: string): BacklogItem[] {
        return this.allBacklogItems
            .filter(item => item.sprint_id === sprintId)
            .sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));
    }

    onIssueDrop(event: CdkDragDrop<BacklogItem[]>, sprint: Sprint): void {
        if (event.previousIndex === event.currentIndex || !this.project) return;

        const items = [...this.getSprintItems(sprint.id)];
        moveItemInArray(items, event.previousIndex, event.currentIndex);

        const reorderPayload = items.map((item, index) => ({
            ticket_number: item.ticket_number,
            position: index + 1,
        }));

        // Screen reader announcement
        const movedItem = items[event.currentIndex];
        this.reorderAnnouncement = this.translate.instant('sprint.reorder-announcement', {
            ticket: '#' + movedItem.ticket_number,
            position: event.currentIndex + 1,
            total: items.length,
        });

        const projectId = this.project.id;
        this.projectService.reorderBacklog(projectId, { items: reorderPayload }).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                reorderPayload.forEach(rp => {
                    const item = this.allBacklogItems.find(i => i.ticket_number === rp.ticket_number);
                    if (item) item.position = rp.position;
                });
                this.cdr.markForCheck();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('sprint.growl.reorder-success'),
                });
            },
            error: () => {
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('sprint.growl.error-summary'),
                    detail: this.translate.instant('sprint.growl.reorder-error'),
                });
                this.loadSprints(projectId);
            },
        });
    }

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

    private loadProjectMembers(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe(members => {
            this.projectMembers = members;
            this.cdr.markForCheck();
        });
    }
}
