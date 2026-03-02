import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';
import {
    ProjectService, ProjectContextService, Project,
    BacklogItem, Workflow, Sprint,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule, TranslateModule, DragDropModule,
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_PROGRESS_BAR,
        ...EUI_STATUS_BADGE, ...EUI_SELECT, ...EUI_LABEL,
        ...EUI_ICON,
    ],
})
export class BoardComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    isLoading = true;
    hasError = false;
    canManage = false;
    canChangeStatus = false;
    private isDeveloper = false;

    /** Ordered unique statuses derived from all project workflows */
    columns: string[] = [];
    /** All workflows for transition validation */
    workflows: Workflow[] = [];
    /** All backlog items (unfiltered) */
    allTickets: BacklogItem[] = [];
    /** Sprints for the filter dropdown */
    sprints: Sprint[] = [];
    /** Members map for assignee display */
    memberMap = new Map<string, string>();
    /** Selected sprint filter (empty = all) */
    selectedSprintId = '';
    /** Announcement for screen readers */
    filterAnnouncement = '';
    /** DnD transition announcement for screen readers */
    dndAnnouncement = '';

    /** CDK drop list IDs for connecting all columns */
    get columnDropListIds(): string[] {
        return this.columns.map((_, i) => 'board-col-' + i);
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
            this.determineCanChangeStatus(project.id);
            this.loadBoardData(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /** Get tickets for a given status column, optionally filtered by sprint */
    getColumnTickets(status: string): BacklogItem[] {
        let tickets = this.allTickets.filter(t => t.status === status);
        if (this.selectedSprintId) {
            tickets = tickets.filter(t => t.sprint_id === this.selectedSprintId);
        }
        return tickets.sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));
    }

    /** Format status for display: TO_DO → To Do */
    formatStatus(status: string): string {
        return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /** Get assignee display name */
    getAssigneeName(assigneeId: string | null): string {
        if (!assigneeId) return '';
        return this.memberMap.get(assigneeId) ?? '';
    }
    /** Check if a specific ticket can be dragged (status change) by the current user */
    canDragTicket(ticket: BacklogItem): boolean {
        if (this.canChangeStatus) return true;
        if (this.isDeveloper) {
            return ticket.assignee_id === this.permissionService.getUserId();
        }
        return false;
    }

    /** Navigate to ticket detail */
    navigateToTicket(ticket: BacklogItem): void {
        if (this.project) {
            this.router.navigate(['/screen/projects', this.project.id, 'board', ticket.ticket_number]);
        }
    }

    /** Sprint filter changed */
    onSprintFilterChange(): void {
        const total = this.getFilteredTicketCount();
        this.filterAnnouncement = this.translate.instant('board.filter-announcement', { count: total });
        this.cdr.markForCheck();
    }

    /**
     * Handle card drop between columns — CDK DragDropModule.
     * eUI has no native drag & drop component; CDK is the standard approach.
     */
    onCardDrop(event: CdkDragDrop<BacklogItem[]>, targetStatus: string): void {
        if (!this.project) return;

        const ticket: BacklogItem = event.item.data;

        // Same column drop — no status change needed
        if (event.previousContainer === event.container) return;

        const fromStatus = ticket.status;
        const projectId = this.project.id;

        // Optimistic UI: move card to target column
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
        );
        this.cdr.markForCheck();

        // Call API to change status
        this.projectService.updateTicket(projectId, ticket.ticket_number, { status: targetStatus as any }).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.dndAnnouncement = this.translate.instant('board.dnd-success', {
                    ticket: '#' + ticket.ticket_number,
                    from: this.formatStatus(fromStatus),
                    to: this.formatStatus(targetStatus),
                });
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('board.growl.transition-success'),
                    detail: this.translate.instant('board.dnd-success', {
                        ticket: '#' + ticket.ticket_number,
                        from: this.formatStatus(fromStatus),
                        to: this.formatStatus(targetStatus),
                    }),
                });
                // Reload to ensure consistency
                this.loadBoardData(projectId);
            },
            error: (err) => {
                const message = err.status === 403
                    ? this.translate.instant('board.growl.transition-forbidden')
                    : this.translate.instant('board.growl.transition-invalid', {
                        from: this.formatStatus(fromStatus),
                        to: this.formatStatus(targetStatus),
                    });
                this.dndAnnouncement = message;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('board.growl.transition-error'),
                    detail: message,
                });
                // Reload to revert optimistic update
                this.loadBoardData(projectId);
            },
        });
    }

    retry(): void {
        if (this.project) {
            this.loadBoardData(this.project.id);
        }
    }

    loadBoardData(projectId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        forkJoin({
            workflows: this.projectService.getWorkflows(projectId),
            backlog: this.projectService.getBacklog(projectId, { _limit: 1000 }),
            sprints: this.projectService.getSprints(projectId),
            members: this.projectService.getProjectMembers(projectId),
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: ({ workflows, backlog, sprints, members }) => {
                this.workflows = workflows;
                this.columns = this.buildColumns(workflows);
                this.allTickets = backlog.data;
                this.sprints = sprints.filter(s => s.status !== 'CLOSED');
                this.memberMap = new Map(
                    members.map(m => [m.userId, `${m.firstName} ${m.lastName}`]),
                );
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    private buildColumns(workflows: Workflow[]): string[] {
        const seen = new Set<string>();
        const columns: string[] = [];
        for (const wf of workflows) {
            for (const status of wf.statuses) {
                if (!seen.has(status)) {
                    seen.add(status);
                    columns.push(status);
                }
            }
        }
        return columns;
    }

    private getFilteredTicketCount(): number {
        let tickets = this.allTickets;
        if (this.selectedSprintId) {
            tickets = tickets.filter(t => t.sprint_id === this.selectedSprintId);
        }
        return tickets.length;
    }

    private determineCanManage(projectId: string): void {
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canManage = can;
            this.cdr.markForCheck();
        });
    }
    private determineCanChangeStatus(projectId: string): void {
        this.isDeveloper = false;
        this.canChangeStatus = false;

        if (this.permissionService.isSuperAdmin()) {
            this.canChangeStatus = true;
            this.cdr.markForCheck();
            return;
        }

        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER').pipe(
            switchMap(can => {
                if (can) {
                    this.canChangeStatus = true;
                    return of(false); // no need to check DEVELOPER
                }
                // Not PROJECT_ADMIN/PRODUCT_OWNER — check if DEVELOPER
                return this.permissionService.hasProjectRole(projectId, 'DEVELOPER');
            }),
            takeUntil(this.destroy$),
        ).subscribe(isDev => {
            this.isDeveloper = isDev;
            this.cdr.markForCheck();
        });
    }
}
