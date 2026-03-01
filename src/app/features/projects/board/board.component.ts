import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
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
        FormsModule, TranslateModule,
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_PROGRESS_BAR,
        ...EUI_STATUS_BADGE, ...EUI_SELECT, ...EUI_LABEL,
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

    /** Navigate to ticket detail */
    navigateToTicket(ticket: BacklogItem): void {
        if (this.project) {
            this.router.navigate(['/screen/projects', this.project.id, 'backlog', ticket.ticket_number]);
        }
    }

    /** Sprint filter changed */
    onSprintFilterChange(): void {
        const total = this.getFilteredTicketCount();
        this.filterAnnouncement = this.translate.instant('board.filter-announcement', { count: total });
        this.cdr.markForCheck();
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
}
