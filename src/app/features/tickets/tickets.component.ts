import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BREADCRUMB } from '@eui/components/eui-breadcrumb';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_TOGGLE_GROUP } from '@eui/components/eui-toggle-group';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BacklogItem, Project, ProjectMember, ProjectService, Sprint, WORKFLOW_STATUSES, TICKET_TYPES, TICKET_PRIORITIES, CREATABLE_TICKET_TYPES, WorkflowStatus, TicketType, TicketPriority } from '../../core/project';
import { TicketsService, TicketsListParams } from '../../core/tickets';
import { PermissionService } from '../../core/auth';

export interface FilterChip {
    key: string;
    dimension: 'search' | 'status' | 'type' | 'priority' | 'project' | 'sprint';
    value: string;
    label: string;
}

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_CHIP_LIST, ...EUI_BUTTON, ...EUI_FEEDBACK_MESSAGE,
        ...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_TEXT, ...EUI_TEXTAREA,
        EuiDialogComponent, EuiPaginatorComponent, ...EUI_CARD, ...EUI_DROPDOWN,
        ...EUI_INPUT_CHECKBOX, ...EUI_PROGRESS_BAR, ...EUI_ICON,
        ...EUI_BREADCRUMB, ...EUI_ICON_BUTTON, ...EUI_INPUT_RADIO,
        ...EUI_TOGGLE_GROUP, ...EUI_STATUS_BADGE,
        ...EUI_TABLE, EuiTemplateDirective,
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
    private readonly router = inject(Router);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;

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

    // Sort
    sortField = 'created_at';
    sortOrder: 'asc' | 'desc' = 'desc';

    // View toggle
    currentView: 'card' | 'table' = 'card';

    // Chip overflow
    readonly MAX_VISIBLE_CHIPS = 5;

    // Card expand state
    expandedCards = new Set<string>();

    // Dynamic filter builder
    visibleFilters = new Set<string>();
    filterDropdownValue: string | null = null;
    private readonly allFilterDimensions = [
        { value: 'status', label: 'tickets.filter.status-legend' },
        { value: 'type', label: 'tickets.filter.type-legend' },
        { value: 'priority', label: 'tickets.filter.priority-legend' },
    ];

    // Project filter
    userProjects: Project[] = [];
    projectMap = new Map<string, Project>();
    selectedProjectId: string | null = null;

    // Sprint filters
    selectedSprintId: string | null = null;
    availableSprints: Sprint[] = [];

    // Advanced filters collapse
    isAdvancedCollapsed = true;

    // Status filter (single-select dropdown)
    selectedStatusValue: WorkflowStatus | null = null;

    // Type filter (checkboxes — kept)
    readonly workflowStatuses = WORKFLOW_STATUSES;
    readonly ticketTypes = TICKET_TYPES;
    readonly priorities = TICKET_PRIORITIES;
    typeChecks: Record<TicketType, boolean> = { STORY: false, BUG: false, TASK: false, EPIC: false };
    selectedTypes = new Set<TicketType>();

    // Priority filter (single-select radio)
    selectedPriority: TicketPriority | null = null;

    // Create dialog state
    canCreate = false;
    creatableProjects: Project[] = [];
    selectedCreateProjectId: string | null = null;
    newTicketType: TicketType = 'STORY';
    newTicketTitle = '';
    newTicketDescription = '';
    newTicketPriority: TicketPriority = 'MEDIUM';
    newTicketAssigneeId: string | null = null;
    newTicketEpicId: string | null = null;
    creatableTypes = CREATABLE_TICKET_TYPES;
    dialogMembers: ProjectMember[] = [];
    dialogEpics: BacklogItem[] = [];
    createError = '';
    isCreating = false;

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
                this.determineCanCreate(projects);
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

    // Dynamic filter builder
    get availableFilterDimensions(): { value: string; label: string }[] {
        return this.allFilterDimensions.filter(d => !this.visibleFilters.has(d.value));
    }

    onAddFilter(dimension: string): void {
        if (dimension) {
            this.visibleFilters.add(dimension);
        }
        this.filterDropdownValue = null;
        this.cdr.markForCheck();
    }

    onRemoveFilter(dimension: string): void {
        this.visibleFilters.delete(dimension);
        switch (dimension) {
            case 'status':
                this.selectedStatusValue = null;
                this.onStatusSelectChange();
                break;
            case 'type':
                for (const t of this.ticketTypes) this.typeChecks[t] = false;
                this.onTypeCheckChange();
                break;
            case 'priority':
                this.selectedPriority = null;
                this.onPriorityRadioChange();
                break;
        }
    }

    onStatusSelectChange(): void {
        this.params = { ...this.params, status: this.selectedStatusValue || undefined, _page: 1 };
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

    onPriorityRadioChange(): void {
        this.params = { ...this.params, priority: this.selectedPriority || undefined, _page: 1 };
        this.loadTickets();
    }

    onProjectChange(): void {
        this.params = { ...this.params, project_id: this.selectedProjectId || undefined, _page: 1 };
        this.selectedSprintId = null;
        this.availableSprints = [];
        this.params = { ...this.params, sprint_id: undefined };
        if (this.selectedProjectId) {
            this.loadSprints(this.selectedProjectId);
        }
        this.loadTickets();
    }

    onSprintChange(): void {
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

    // Sort
    onSortFieldChange(): void {
        this.params = { ...this.params, _sort: this.sortField, _page: 1 };
        this.loadTickets();
    }

    onToggleSortOrder(): void {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        this.params = { ...this.params, _order: this.sortOrder, _page: 1 };
        this.loadTickets();
    }

    // View toggle
    onViewChange(view: 'card' | 'table'): void {
        this.currentView = view;
        this.cdr.markForCheck();
    }

    // Table sort
    onTableSort(sort: Sort[]): void {
        if (sort.length > 0) {
            this.sortField = sort[0].sort;
            this.sortOrder = sort[0].order.toLowerCase() as 'asc' | 'desc';
            this.params = { ...this.params, _sort: this.sortField, _order: this.sortOrder, _page: 1 };
            this.loadTickets();
        }
    }

    navigateToTicket(item: BacklogItem): void {
        this.router.navigate(['/screen/projects', item.projectId, 'tickets', item.ticket_number]);
    }

    // Chip overflow
    get visibleChips(): FilterChip[] {
        return this.activeFilterChips.slice(0, this.MAX_VISIBLE_CHIPS);
    }

    get hasOverflowChips(): boolean {
        return this.activeFilterChips.length > this.MAX_VISIBLE_CHIPS;
    }

    get overflowChipCount(): number {
        return this.activeFilterChips.length - this.MAX_VISIBLE_CHIPS;
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
        if (this.selectedSprintId) {
            const sprint = this.availableSprints.find(s => s.id === this.selectedSprintId);
            chips.push({ key: `sprint-${this.selectedSprintId}`, dimension: 'sprint', value: this.selectedSprintId, label: this.translate.instant('tickets.chip.sprint', { name: sprint?.name ?? this.selectedSprintId }) });
        }
        if (this.selectedStatusValue) {
            chips.push({ key: `status-${this.selectedStatusValue}`, dimension: 'status', value: this.selectedStatusValue, label: this.translate.instant('tickets.chip.status', { value: this.translate.instant('workflow.status.' + this.selectedStatusValue) }) });
        }
        for (const t of this.selectedTypes) {
            chips.push({ key: `type-${t}`, dimension: 'type', value: t, label: this.translate.instant('tickets.chip.type', { value: this.translate.instant('workflow.ticket-type.' + t) }) });
        }
        if (this.selectedPriority) {
            chips.push({ key: `priority-${this.selectedPriority}`, dimension: 'priority', value: this.selectedPriority, label: this.translate.instant('tickets.chip.priority', { value: this.translate.instant('ticket.priority.' + this.selectedPriority) }) });
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
                this.params = { ...this.params, project_id: undefined, sprint_id: undefined, _page: 1 };
                break;
            case 'sprint':
                this.selectedSprintId = null;
                this.params = { ...this.params, sprint_id: undefined, _page: 1 };
                break;
            case 'status':
                this.selectedStatusValue = null;
                this.onStatusSelectChange();
                return;
            case 'type':
                this.typeChecks[chip.value as TicketType] = false;
                this.onTypeCheckChange();
                return;
            case 'priority':
                this.selectedPriority = null;
                this.onPriorityRadioChange();
                return;
        }
        this.loadTickets();
    }

    clearAllFilters(): void {
        this.searchValue = '';
        this.selectedProjectId = null;
        this.selectedSprintId = null;
        this.availableSprints = [];
        this.selectedStatusValue = null;
        for (const t of this.ticketTypes) this.typeChecks[t] = false;
        this.selectedTypes.clear();
        this.selectedPriority = null;
        this.visibleFilters.clear();
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


    // ── Create Dialog ──

    determineCanCreate(projects: Project[]): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canCreate = true;
            this.creatableProjects = projects;
        } else {
            // All member projects allow creation (backend enforces role check)
            this.creatableProjects = projects;
            this.canCreate = projects.length > 0;
        }
    }

    openCreateDialog(): void {
        this.resetCreateForm();
        this.cdr.detectChanges();
        this.createDialog.openDialog();
    }

    onCreateProjectChange(): void {
        this.newTicketAssigneeId = null;
        this.newTicketEpicId = null;
        this.dialogMembers = [];
        this.dialogEpics = [];
        if (!this.selectedCreateProjectId) return;

        this.projectService.getProjectMembers(this.selectedCreateProjectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: members => {
                this.dialogMembers = members;
                this.cdr.markForCheck();
            },
        });
        this.projectService.getEpics(this.selectedCreateProjectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: epics => {
                this.dialogEpics = epics;
                this.cdr.markForCheck();
            },
        });
    }

    onCreateTicket(): void {
        if (!this.selectedCreateProjectId || !this.isCreateFormValid()) return;
        const projectId = this.selectedCreateProjectId;
        this.isCreating = true;
        this.createError = '';
        this.cdr.markForCheck();

        this.projectService.createTicket(projectId, {
            type: this.newTicketType,
            title: this.newTicketTitle.trim(),
            description: this.newTicketDescription.trim() || undefined,
            priority: this.newTicketPriority,
            assignee_id: this.newTicketAssigneeId,
            epic_id: this.newTicketEpicId,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: created => {
                this.createDialog.closeDialog();
                const proj = this.projectMap.get(projectId);
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('tickets.growl.created-summary'),
                    detail: this.translate.instant('tickets.growl.created-detail', {
                        key: proj?.key ?? '', number: created.ticket_number, title: created.title,
                    }),
                });
                this.resetCreateForm();
                this.loadTickets();
            },
            error: err => {
                this.createError = err.error?.message || this.translate.instant('tickets.error.create-default');
                this.isCreating = false;
                this.cdr.markForCheck();
            },
        });
    }

    resetCreateForm(): void {
        this.selectedCreateProjectId = null;
        this.newTicketType = 'STORY';
        this.newTicketTitle = '';
        this.newTicketDescription = '';
        this.newTicketPriority = 'MEDIUM';
        this.newTicketAssigneeId = null;
        this.newTicketEpicId = null;
        this.dialogMembers = [];
        this.dialogEpics = [];
        this.createError = '';
        this.isCreating = false;
    }

    isCreateFormValid(): boolean {
        const len = this.newTicketTitle.trim().length;
        return !!this.selectedCreateProjectId && len >= 2 && len <= 200;
    }

    // ── Card View (STORY-004) ──

    toggleCardExpand(itemId: string): void {
        if (this.expandedCards.has(itemId)) {
            this.expandedCards.delete(itemId);
        } else {
            this.expandedCards.add(itemId);
        }
        this.cdr.markForCheck();
    }


    onCardAction(action: 'edit' | 'delete' | 'assign' | 'change-status', item: BacklogItem): void {
        switch (action) {
            case 'edit':
                break;
            case 'delete':
                this.growlService.growl({
                    severity: 'info',
                    summary: this.translate.instant('tickets.card.action.delete'),
                    detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
                });
                break;
            case 'assign':
                this.growlService.growl({
                    severity: 'info',
                    summary: this.translate.instant('tickets.card.action.assign'),
                    detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
                });
                break;
            case 'change-status':
                this.growlService.growl({
                    severity: 'info',
                    summary: this.translate.instant('tickets.card.action.change-status'),
                    detail: `${this.getProjectKey(item)}-${item.ticket_number}`,
                });
                break;
        }
    }

    getStatusChipVariant(status: string): string {
        switch (status) {
            case 'DONE': return 'success';
            case 'IN_PROGRESS':
            case 'IN_REVIEW': return 'info';
            case 'TO_DO': return 'warning';
            default: return '';
        }
    }

}
