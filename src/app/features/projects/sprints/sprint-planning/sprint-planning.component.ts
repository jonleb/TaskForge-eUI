import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project,
    Sprint, BacklogItem,
} from '../../../../core/project';
import { PermissionService } from '../../../../core/auth';

@Component({
    selector: 'app-sprint-planning',
    templateUrl: './sprint-planning.component.html',
    styleUrls: ['./sprint-planning.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_BUTTON, ...EUI_CARD, ...EUI_CHIP,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_PROGRESS_BAR,
        ...EUI_ICON_BUTTON, ...EUI_INPUT_CHECKBOX, ...EUI_STATUS_BADGE,
        ...EUI_ICON, EuiTooltipDirective, DragDropModule,
        TranslateModule,
    ],
})
export class SprintPlanningComponent implements OnInit, OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    sprint: Sprint | null = null;
    availableTickets: BacklogItem[] = [];
    sprintTickets: BacklogItem[] = [];
    selectedTicketNumbers = new Set<number>();
    isLoading = true;
    hasError = false;
    canManage = false;
    reorderAnnouncement = '';

    get isReadOnly(): boolean {
        return !this.canManage || this.sprint?.status === 'CLOSED';
    }

    get pageTitle(): string {
        return this.sprint
            ? `${this.translate.instant('sprint.planning.title')}: ${this.sprint.name}`
            : this.translate.instant('sprint.planning.title');
    }

    ngOnInit(): void {
        const sprintId = this.route.snapshot.paramMap.get('sprintId') ?? '';

        this.projectContext.currentProject$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(project => {
            if (!project) return;
            this.project = project;
            this.determineCanManage(project.id);
            this.loadData(project.id, sprintId);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadData(projectId: string, sprintId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        forkJoin({
            sprints: this.projectService.getSprints(projectId),
            backlog: this.projectService.getBacklog(projectId, { _limit: 1000 }),
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: ({ sprints, backlog }) => {
                this.sprint = sprints.find(s => s.id === sprintId) ?? null;
                const sortByPosition = (a: BacklogItem, b: BacklogItem) =>
                    (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number);
                this.availableTickets = backlog.data.filter(item => !item.sprint_id).sort(sortByPosition);
                this.sprintTickets = backlog.data.filter(item => item.sprint_id === sprintId).sort(sortByPosition);
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

    toggleSelection(ticketNumber: number): void {
        if (this.selectedTicketNumbers.has(ticketNumber)) {
            this.selectedTicketNumbers.delete(ticketNumber);
        } else {
            this.selectedTicketNumbers.add(ticketNumber);
        }
    }

    isSelected(ticketNumber: number): boolean {
        return this.selectedTicketNumbers.has(ticketNumber);
    }

    assignSelected(): void {
        if (!this.project || !this.sprint || this.selectedTicketNumbers.size === 0) return;
        const projectId = this.project.id;
        const sprintId = this.sprint.id;

        this.projectService.assignSprintItems(projectId, sprintId, {
            ticket_numbers: Array.from(this.selectedTicketNumbers),
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.selectedTicketNumbers.clear();
                this.loadData(projectId, sprintId);
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

    removeTicket(ticketNumber: number): void {
        if (!this.project || !this.sprint) return;
        const projectId = this.project.id;
        const sprintId = this.sprint.id;

        this.projectService.removeSprintItem(projectId, sprintId, ticketNumber).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => this.loadData(projectId, sprintId),
            error: () => {
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('sprint.growl.error-summary'),
                    detail: this.translate.instant('sprint.growl.error-detail'),
                });
            },
        });
    }

    onSprintTicketDrop(event: CdkDragDrop<BacklogItem[]>): void {
        if (event.previousIndex === event.currentIndex || !this.project) return;

        moveItemInArray(this.sprintTickets, event.previousIndex, event.currentIndex);

        const reorderPayload = this.sprintTickets.map((item, index) => ({
            ticket_number: item.ticket_number,
            position: index + 1,
        }));

        const movedItem = this.sprintTickets[event.currentIndex];
        this.reorderAnnouncement = this.translate.instant('sprint.planning.reorder-announcement', {
            ticket: '#' + movedItem.ticket_number,
            position: event.currentIndex + 1,
            total: this.sprintTickets.length,
        });

        const projectId = this.project.id;
        this.projectService.reorderBacklog(projectId, { items: reorderPayload }).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
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
                if (this.project && this.sprint) {
                    this.loadData(this.project.id, this.sprint.id);
                }
            },
        });
    }

    goBack(): void {
        if (this.project) {
            this.router.navigate(['/screen/projects', this.project.id, 'sprints']);
        }
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
