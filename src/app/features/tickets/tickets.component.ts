import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BacklogItem, Project, ProjectService, Sprint, WORKFLOW_STATUSES, TICKET_TYPES, TICKET_PRIORITIES, WorkflowStatus, TicketType, TicketPriority } from '../../core/project';
import { TicketsService, TicketsListParams } from '../../core/tickets';
import { PermissionService } from '../../core/auth';

export interface FilterChip {
    key: string;
    dimension: 'search' | 'status' | 'type' | 'priority' | 'project' | 'assignee' | 'sprint';
    value: string;
    label: string;
}

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON, ...EUI_SELECT, ...EUI_LABEL,
        ...EUI_INPUT_TEXT, EuiPaginatorComponent, ...EUI_CONTENT_CARD, ...EUI_CARD,
        ...EUI_INPUT_CHECKBOX, ...EUI_PROGRESS_BAR, ...EUI_ICON,
        FormsModule, TranslateModule, RouterLink,
    ],
})
export class TicketsComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly ticketsService = inject(TicketsService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    items: BacklogItem[] = [];
    total = 0;
    isLoading = true;
    hasError = false;

    params: TicketsListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'created_at',
        _order: 'desc',
    };

    // Filter state
    isFilterCollapsed = false;
    searchValue = '';

    // Project filter
    userProjects: Project[] = [];
    projectMap = new Map<string, Project>();
    selectedProjectId: string | null = null;

    // Assigned to me
    assignedToMe = false;

    // Sprint filters
    openSprintsChecked = false;
    selectedSprintId: string | null = null;
    availableSprints: Sprint[] = [];

    // Checkbox filter state
    readonly workflowStatuses = WORKFLOW_STATUSES;
    readonly ticketTypes = TICKET_TYPES;
    readonly priorities = TICKET_PRIORITIES;

    statusChecks: Record<WorkflowStatus, boolean> = { TO_DO: false, IN_PROGRESS: false, IN_REVIEW: false, DONE: false };
    typeChecks: Record<TicketType, boolean> = { STORY: false, BUG: false, TASK: false, EPIC: false };
    priorityChecks: Record<TicketPriority, boolean> = { CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false };

    selectedStatuses = new Set<WorkflowStatus>();
    selectedTypes = new Set<TicketType>();
    selectedPriorities = new Set<TicketPriority>();

    ngOnInit(): void {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(q => {
            this.params = { ...this.params, q: q || undefined, _page: 1 };
            this.loadTickets();
        });

        this.ticketsService.getUserProjects().pipe(takeUntil(this.destroy$)).subscribe({
            next: projects => {
                this.userProjects = projects;
                projects.forEach(p => this.projectMap.set(p.id, p));
                this.cdr.markForCheck();
            },
        });

        this.loadTickets();
    }

    ngAfterViewInit(): void {
        this.paginatorReady = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadTickets(): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        this.ticketsService.getTickets(this.params).pipe(takeUntil(this.destroy$)).subscribe({
            next: res => {
                this.items = res.data;
                this.total = res.total;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.items = [];
                this.total = 0;
                this.growlService.growl(
                    { severity: 'error', summary: this.translate.instant('tickets.growl.load-failed-summary'), detail: this.translate.instant('tickets.growl.load-failed-detail') },
                );
                this.cdr.markForCheck();
            },
        });
    }

    onFilterChange(value: string): void {
        this.searchValue = value;
        this.searchSubject.next(value);
    }

    onSearchSubmit(): void {
        this.params = { ...this.params, q: this.searchValue || undefined, _page: 1 };
        this.loadTickets();
    }

    onStatusCheckChange(): void {
        this.selectedStatuses.clear();
        for (const s of this.workflowStatuses) {
            if (this.statusChecks[s]) this.selectedStatuses.add(s);
        }
        this.params = { ...this.params, status: this.selectedStatuses.size ? [...this.selectedStatuses].join(',') : undefined, _page: 1 };
        this.loadTickets();
    }

    onTypeCheckChange(): void {
        this.selectedTypes.clear();
        for (const t of this.ticketTypes) {
            if (this.typeChecks[t]) this.selectedTypes.add(t);
        }
        this.params = { ...this.params, type: this.selectedTypes.size ? [...this.selectedTypes].join(',') : undefined, _page: 1 };
        this.loadTickets();
    }

    onPriorityCheckChange(): void {
        this.selectedPriorities.clear();
        for (const p of this.priorities) {
            if (this.priorityChecks[p]) this.selectedPriorities.add(p);
        }
        this.params = { ...this.params, priority: this.selectedPriorities.size ? [...this.selectedPriorities].join(',') : undefined, _page: 1 };
        this.loadTickets();
    }

    onProjectChange(): void {
        this.params = { ...this.params, project_id: this.selectedProjectId || undefined, _page: 1 };
        // Clear sprint selection when project changes
        this.selectedSprintId = null;
        this.availableSprints = [];
        this.params = { ...this.params, sprint_id: this.openSprintsChecked ? 'open' : undefined };
        if (this.selectedProjectId) {
            this.loadSprints(this.selectedProjectId);
        }
        this.loadTickets();
    }

    onAssignedToMeChange(): void {
        this.params = { ...this.params, assignee_id: this.assignedToMe ? this.permissionService.getUserId() : undefined, _page: 1 };
        this.loadTickets();
    }

    onOpenSprintsChange(): void {
        if (this.openSprintsChecked) {
            this.selectedSprintId = null;
            this.params = { ...this.params, sprint_id: 'open', _page: 1 };
        } else {
            this.params = { ...this.params, sprint_id: undefined, _page: 1 };
        }
        this.loadTickets();
    }

    onSprintChange(): void {
        if (this.selectedSprintId) {
            this.openSprintsChecked = false;
        }
        this.params = { ...this.params, sprint_id: this.selectedSprintId || undefined, _page: 1 };
        this.loadTickets();
    }

    loadSprints(projectId: string): void {
        this.projectService.getSprints(projectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: sprints => {
                this.availableSprints = sprints;
                this.cdr.markForCheck();
            },
        });
    }

    onFilterColumnCollapse(collapsed: boolean): void {
        this.isFilterCollapsed = collapsed;
    }

    onPageChange(event: { page: number; pageSize: number }): void {
        if (!this.paginatorReady) return;
        this.params = { ...this.params, _page: event.page + 1, _limit: event.pageSize };
        this.loadTickets();
    }

    get activeFilterChips(): FilterChip[] {
        const chips: FilterChip[] = [];
        if (this.searchValue) {
            chips.push({ key: 'search', dimension: 'search', value: this.searchValue, label: this.translate.instant('tickets.chip.search', { term: this.searchValue }) });
        }
        if (this.selectedProjectId) {
            const proj = this.projectMap.get(this.selectedProjectId);
            chips.push({ key: 'project', dimension: 'project', value: this.selectedProjectId, label: this.translate.instant('tickets.chip.project', { name: proj?.name ?? this.selectedProjectId }) });
        }
        if (this.assignedToMe) {
            chips.push({ key: 'assignee', dimension: 'assignee', value: 'me', label: this.translate.instant('tickets.chip.assigned-to-me') });
        }
        if (this.openSprintsChecked) {
            chips.push({ key: 'open-sprints', dimension: 'sprint', value: 'open', label: this.translate.instant('tickets.chip.open-sprints') });
        } else if (this.selectedSprintId) {
            const sprint = this.availableSprints.find(s => s.id === this.selectedSprintId);
            chips.push({ key: `sprint-${this.selectedSprintId}`, dimension: 'sprint', value: this.selectedSprintId, label: this.translate.instant('tickets.chip.sprint', { name: sprint?.name ?? this.selectedSprintId }) });
        }
        for (const s of this.selectedStatuses) {
            chips.push({ key: `status-${s}`, dimension: 'status', value: s, label: this.translate.instant('tickets.chip.status', { value: this.translate.instant('workflow.status.' + s) }) });
        }
        for (const t of this.selectedTypes) {
            chips.push({ key: `type-${t}`, dimension: 'type', value: t, label: this.translate.instant('tickets.chip.type', { value: this.translate.instant('workflow.ticket-type.' + t) }) });
        }
        for (const p of this.selectedPriorities) {
            chips.push({ key: `priority-${p}`, dimension: 'priority', value: p, label: this.translate.instant('tickets.chip.priority', { value: this.translate.instant('ticket.priority.' + p) }) });
        }
        return chips;
    }

    get hasActiveFilters(): boolean {
        return this.activeFilterChips.length > 0;
    }

    onChipRemove(chip: FilterChip): void {
        switch (chip.dimension) {
            case 'search':
                this.searchValue = '';
                this.params = { ...this.params, q: undefined, _page: 1 };
                break;
            case 'project':
                this.selectedProjectId = null;
                this.availableSprints = [];
                this.selectedSprintId = null;
                this.params = { ...this.params, project_id: undefined, sprint_id: this.openSprintsChecked ? 'open' : undefined, _page: 1 };
                break;
            case 'assignee':
                this.assignedToMe = false;
                this.params = { ...this.params, assignee_id: undefined, _page: 1 };
                break;
            case 'sprint':
                if (chip.value === 'open') {
                    this.openSprintsChecked = false;
                } else {
                    this.selectedSprintId = null;
                }
                this.params = { ...this.params, sprint_id: undefined, _page: 1 };
                break;
            case 'status':
                this.statusChecks[chip.value as WorkflowStatus] = false;
                this.onStatusCheckChange();
                return;
            case 'type':
                this.typeChecks[chip.value as TicketType] = false;
                this.onTypeCheckChange();
                return;
            case 'priority':
                this.priorityChecks[chip.value as TicketPriority] = false;
                this.onPriorityCheckChange();
                return;
        }
        this.loadTickets();
    }

    clearAllFilters(): void {
        this.searchValue = '';
        this.selectedProjectId = null;
        this.assignedToMe = false;
        this.openSprintsChecked = false;
        this.selectedSprintId = null;
        this.availableSprints = [];
        for (const s of this.workflowStatuses) this.statusChecks[s] = false;
        for (const t of this.ticketTypes) this.typeChecks[t] = false;
        for (const p of this.priorities) this.priorityChecks[p] = false;
        this.selectedStatuses.clear();
        this.selectedTypes.clear();
        this.selectedPriorities.clear();
        this.params = { _page: 1, _limit: this.params._limit, _sort: this.params._sort, _order: this.params._order };
        this.loadTickets();
    }

    get emptyStateMessage(): string {
        if (this.hasError) return this.translate.instant('tickets.load-error');
        if (this.hasActiveFilters || this.searchValue) return this.translate.instant('tickets.no-match-filter');
        return this.translate.instant('tickets.no-items');
    }

    retry(): void {
        this.loadTickets();
    }

    getProjectKey(item: BacklogItem): string {
        return this.projectMap.get(item.projectId)?.key ?? item.projectId;
    }

    getAssigneeName(item: BacklogItem): string {
        if (!item.assignee_id) return this.translate.instant('tickets.card.no-assignee');
        return item.assignee_id;
    }

    truncateDescription(desc: string | null | undefined, max = 120): string {
        if (!desc) return '';
        return desc.length > max ? desc.substring(0, max) + '…' : desc;
    }
}
