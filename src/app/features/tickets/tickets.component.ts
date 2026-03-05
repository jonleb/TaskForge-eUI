import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
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
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
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
        ...EUI_ICON_BUTTON, ...EUI_INPUT_RADIO,
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
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly translate = inject(TranslateService);
    private readonly router = inject(Router);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;
    @ViewChild('editDialog') editDialog!: EuiDialogComponent;
    @ViewChild('assignDialog') assignDialog!: EuiDialogComponent;
    @ViewChild('statusDialog') statusDialog!: EuiDialogComponent;

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

    // Edit dialog state
    editItem: BacklogItem | null = null;
    editTitle = '';
    editDescription = '';
    editType: TicketType = 'STORY';
    editPriority: TicketPriority = 'MEDIUM';
    editStatus: WorkflowStatus = 'TO_DO';
    editAssigneeId: string | null = null;
    editMembers: ProjectMember[] = [];
    editError = '';

    // Assign dialog state
    assignItem: BacklogItem | null = null;
    assignMemberId: string | null = null;
    assignMembers: ProjectMember[] = [];
    assignError = '';
    canManageMap = new Map<string, boolean>();
    assigneeNameMap = new Map<string, string>();

    // Status dialog state
    statusItem: BacklogItem | null = null;
    statusValue: WorkflowStatus = 'TO_DO';
    statusError = '';

    ngOnInit(): void {
        this.breadcrumbService.setBreadcrumb([
            { id: 'tickets', label: this.translate.instant('tickets.breadcrumb.tickets'), link: null },
        ]);

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
                this.checkManagePermissions();
                this.loadAssigneeNames();
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
        this.router.navigate(
            ['/screen/projects', item.projectId, 'tickets', item.ticket_number],
            { state: { from: 'tickets' } },
        );
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
        return this.assigneeNameMap.get(item.assignee_id) || item.assignee_id;
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

    // ── Edit Dialog ──

    openEditDialog(item: BacklogItem): void {
        this.editItem = item;
        this.editTitle = item.title;
        this.editDescription = item.description || '';
        this.editType = item.type;
        this.editPriority = item.priority || 'MEDIUM';
        this.editStatus = item.status;
        this.editAssigneeId = item.assignee_id;
        this.editError = '';
        this.editMembers = [];

        this.projectService.getProjectMembers(item.projectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: members => {
                this.editMembers = members;
                this.cdr.markForCheck();
            },
        });

        this.cdr.detectChanges();
        this.editDialog.openDialog();
    }

    onEditTicket(): void {
        if (!this.editItem || !this.isEditFormValid()) return;
        const item = this.editItem;
        this.editError = '';

        this.projectService.updateTicket(item.projectId, item.ticket_number, {
            title: this.editTitle.trim(),
            description: this.editDescription.trim() || undefined,
            type: this.editType,
            priority: this.editPriority,
            status: this.editStatus,
            assignee_id: this.editAssigneeId,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.editDialog.closeDialog();
                const proj = this.projectMap.get(item.projectId);
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('tickets.growl.updated-summary'),
                    detail: this.translate.instant('tickets.growl.updated-detail', {
                        key: proj?.key ?? '', number: item.ticket_number,
                    }),
                });
                this.resetEditForm();
                this.loadTickets();
            },
            error: err => {
                this.editError = err.error?.message || this.translate.instant('tickets.error.update-default');
                this.cdr.markForCheck();
            },
        });
    }

    resetEditForm(): void {
        this.editItem = null;
        this.editTitle = '';
        this.editDescription = '';
        this.editType = 'STORY';
        this.editPriority = 'MEDIUM';
        this.editStatus = 'TO_DO';
        this.editAssigneeId = null;
        this.editMembers = [];
        this.editError = '';
    }

    isEditFormValid(): boolean {
        const len = this.editTitle.trim().length;
        return len >= 2 && len <= 200;
    }

    // ── Assign Dialog ──

    checkManagePermissions(): void {
        const projectIds = [...new Set(this.items.map(i => i.projectId))];
        if (projectIds.length === 0) return;

        const checks = projectIds.reduce((acc, pid) => {
            acc[pid] = this.permissionService.hasProjectRole(pid, 'PROJECT_ADMIN', 'PRODUCT_OWNER');
            return acc;
        }, {} as Record<string, import('rxjs').Observable<boolean>>);

        forkJoin(checks).pipe(takeUntil(this.destroy$)).subscribe(results => {
            Object.entries(results).forEach(([pid, allowed]) => this.canManageMap.set(pid, allowed));
            this.cdr.markForCheck();
        });
    }

    loadAssigneeNames(): void {
        const projectIds = [...new Set(this.items.map(i => i.projectId))];
        if (projectIds.length === 0) return;

        const memberCalls = projectIds.reduce((acc, pid) => {
            acc[pid] = this.projectService.getProjectMembers(pid);
            return acc;
        }, {} as Record<string, import('rxjs').Observable<ProjectMember[]>>);

        forkJoin(memberCalls).pipe(takeUntil(this.destroy$)).subscribe(results => {
            Object.values(results).forEach(members => {
                members.forEach(m => this.assigneeNameMap.set(m.userId, `${m.firstName} ${m.lastName}`));
            });
            this.cdr.markForCheck();
        });
    }

    canManage(item: BacklogItem): boolean {
        return this.canManageMap.get(item.projectId) ?? false;
    }

    openAssignDialog(item: BacklogItem): void {
        this.assignItem = item;
        this.assignMemberId = item.assignee_id;
        this.assignError = '';
        this.assignMembers = [];

        this.projectService.getProjectMembers(item.projectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: members => {
                this.assignMembers = members;
                this.cdr.markForCheck();
            },
        });

        this.cdr.detectChanges();
        this.assignDialog.openDialog();
    }

    onAssignTicket(): void {
        if (!this.assignItem) return;
        const item = this.assignItem;
        this.assignError = '';

        this.projectService.updateTicket(item.projectId, item.ticket_number, {
            assignee_id: this.assignMemberId,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.assignDialog.closeDialog();
                const proj = this.projectMap.get(item.projectId);
                const member = this.assignMembers.find(m => m.userId === this.assignMemberId);
                const name = member ? `${member.firstName} ${member.lastName}` : '—';
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('tickets.growl.assigned-summary'),
                    detail: this.translate.instant('tickets.growl.assigned-detail', {
                        key: proj?.key ?? '', number: item.ticket_number, name,
                    }),
                });
                this.resetAssignForm();
                this.loadTickets();
            },
            error: err => {
                this.assignError = err.error?.message || this.translate.instant('tickets.error.assign-default');
                this.cdr.markForCheck();
            },
        });
    }

    resetAssignForm(): void {
        this.assignItem = null;
        this.assignMemberId = null;
        this.assignMembers = [];
        this.assignError = '';
    }

    // ── Status Dialog ──

    openStatusDialog(item: BacklogItem): void {
        this.statusItem = item;
        this.statusValue = item.status;
        this.statusError = '';
        this.cdr.detectChanges();
        this.statusDialog.openDialog();
    }

    onChangeStatus(): void {
        if (!this.statusItem) return;
        const item = this.statusItem;
        this.statusError = '';

        this.projectService.updateTicket(item.projectId, item.ticket_number, {
            status: this.statusValue,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.statusDialog.closeDialog();
                const proj = this.projectMap.get(item.projectId);
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('tickets.growl.status-summary'),
                    detail: this.translate.instant('tickets.growl.status-detail', {
                        key: proj?.key ?? '', number: item.ticket_number,
                        status: this.translate.instant('workflow.status.' + this.statusValue),
                    }),
                });
                this.resetStatusForm();
                this.loadTickets();
            },
            error: err => {
                this.statusError = err.error?.message || this.translate.instant('tickets.error.status-default');
                this.cdr.markForCheck();
            },
        });
    }

    resetStatusForm(): void {
        this.statusItem = null;
        this.statusValue = 'TO_DO';
        this.statusError = '';
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


    onCardAction(action: 'edit' | 'assign' | 'change-status', item: BacklogItem): void {
        switch (action) {
            case 'edit':
                this.openEditDialog(item);
                break;
            case 'assign':
                this.openAssignDialog(item);
                break;
            case 'change-status':
                this.openStatusDialog(item);
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
