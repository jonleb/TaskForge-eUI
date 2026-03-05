import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
    TicketType, TicketPriority, WorkflowStatus,
    CREATABLE_TICKET_TYPES, TICKET_PRIORITIES, TICKET_TYPES, WORKFLOW_STATUSES,
    BacklogListParams, ReorderPayload,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

interface FilterChip {
    key: string;
    dimension: 'search' | 'status' | 'type' | 'priority';
    value: string;
    label: string;
}

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA, EuiDialogComponent, EuiPaginatorComponent,
        ...EUI_CONTENT_CARD, ...EUI_CARD, ...EUI_INPUT_CHECKBOX,
        ...EUI_PROGRESS_BAR, ...EUI_ICON_BUTTON, ...EUI_ICON,
        EuiTooltipDirective, DragDropModule,
        FormsModule, TranslateModule, RouterLink,
    ],
})
export class BacklogComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();
    private paginatorReady = false;

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;

    project: Project | null = null;
    projectKey = '';
    items: BacklogItem[] = [];
    total = 0;
    isLoading = true;
    hasError = false;
    canCreate = false;

    params: BacklogListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'position',
        _order: 'asc',
    };

    // Filter column state
    isFilterCollapsed = false;
    searchValue = '';

    // Multi-value checkbox filter state
    readonly workflowStatuses = WORKFLOW_STATUSES;
    readonly ticketTypes = TICKET_TYPES;

    statusChecks: Record<WorkflowStatus, boolean> = {
        TO_DO: false, IN_PROGRESS: false, IN_REVIEW: false, DONE: false,
    };
    typeChecks: Record<TicketType, boolean> = {
        STORY: false, BUG: false, TASK: false, EPIC: false,
    };
    priorityChecks: Record<TicketPriority, boolean> = {
        CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false,
    };

    selectedStatuses = new Set<WorkflowStatus>();
    selectedTypes = new Set<TicketType>();
    selectedPriorities = new Set<TicketPriority>();

    // Sort dropdown
    readonly sortOptions = [
        { label: 'backlog.sort.position', sort: 'position', order: 'asc' as const },
        { label: 'backlog.sort.ticket-desc', sort: 'ticket_number', order: 'desc' as const },
        { label: 'backlog.sort.ticket-asc', sort: 'ticket_number', order: 'asc' as const },
        { label: 'backlog.sort.title-asc', sort: 'title', order: 'asc' as const },
        { label: 'backlog.sort.title-desc', sort: 'title', order: 'desc' as const },
        { label: 'backlog.sort.priority', sort: 'priority', order: 'asc' as const },
        { label: 'backlog.sort.status', sort: 'status', order: 'asc' as const },
    ];
    selectedSortIndex = 0;

    // Dialog form state
    newTicketType: TicketType = 'STORY';
    newTicketTitle = '';
    newTicketDescription = '';
    newTicketPriority: TicketPriority = 'MEDIUM';
    newTicketAssigneeId: string | null = null;
    newTicketEpicId: string | null = null;
    creatableTypes = CREATABLE_TICKET_TYPES;
    priorities = TICKET_PRIORITIES;
    epics: BacklogItem[] = [];
    members: ProjectMember[] = [];
    createError = '';
    isCreating = false;

    private readonly assigneeMap = new Map<string, string>();

    // Reorder state (STORY-003 / STORY-004)
    canReorder = false;
    originalPositions = new Map<number, number>();
    isSaving = false;
    reorderAnnouncement = '';

    ngOnInit(): void {
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(q => {
            this.params = { ...this.params, q: q || undefined, _page: 1 };
            if (this.project) this.loadBacklog(this.project.id);
        });

        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.projectKey = project.key;
            this.breadcrumbService.setBreadcrumb([
                { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
                { id: 'project', label: project.name, link: `/screen/projects/${project.id}` },
                { id: 'backlog', label: this.translate.instant('nav.backlog'), link: null },
            ]);
            this.cdr.markForCheck();
            this.determineCanCreate(project.id);
            this.determineCanReorder(project.id);
            this.loadBacklog(project.id);
        });
    }

    ngAfterViewInit(): void {
        this.paginatorReady = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadBacklog(projectId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        this.projectService.getBacklog(projectId, this.params).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: res => {
                this.items = res.data;
                this.total = res.total;
                this.isLoading = false;
                this.storeOriginalPositions();
                this.cdr.markForCheck();
                this.loadAssignees(projectId);
            },
            error: () => {
                this.items = [];
                this.total = 0;
                this.hasError = true;
                this.isLoading = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('backlog.growl.load-failed-summary'),
                    detail: this.translate.instant('backlog.growl.load-failed-detail'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // --- Filter handlers ---

    onFilterChange(value: string): void {
        this.searchValue = value;
        this.searchSubject.next(value);
    }

    onStatusCheckChange(): void {
        this.selectedStatuses.clear();
        for (const [key, checked] of Object.entries(this.statusChecks)) {
            if (checked) this.selectedStatuses.add(key as WorkflowStatus);
        }
        this.params = {
            ...this.params,
            status: this.selectedStatuses.size > 0 ? [...this.selectedStatuses].join(',') : undefined,
            _page: 1,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    onTypeCheckChange(): void {
        this.selectedTypes.clear();
        for (const [key, checked] of Object.entries(this.typeChecks)) {
            if (checked) this.selectedTypes.add(key as TicketType);
        }
        this.params = {
            ...this.params,
            type: this.selectedTypes.size > 0 ? [...this.selectedTypes].join(',') : undefined,
            _page: 1,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    onPriorityCheckChange(): void {
        this.selectedPriorities.clear();
        for (const [key, checked] of Object.entries(this.priorityChecks)) {
            if (checked) this.selectedPriorities.add(key as TicketPriority);
        }
        this.params = {
            ...this.params,
            priority: this.selectedPriorities.size > 0 ? [...this.selectedPriorities].join(',') : undefined,
            _page: 1,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    onFilterColumnCollapse(collapsed: boolean): void {
        this.isFilterCollapsed = collapsed;
    }

    // --- Sort ---

    onSortSelectChange(): void {
        const opt = this.sortOptions[this.selectedSortIndex];
        this.params = { ...this.params, _sort: opt.sort, _order: opt.order, _page: 1 };
        if (this.project) this.loadBacklog(this.project.id);
    }

    // --- Pagination ---

    onPageChange(event: { page: number; pageSize: number }): void {
        if (!this.paginatorReady) return;
        this.params = { ...this.params, _page: event.page + 1, _limit: event.pageSize };
        if (this.project) this.loadBacklog(this.project.id);
    }

    // --- Chips ---

    get activeFilterChips(): FilterChip[] {
        const chips: FilterChip[] = [];
        if (this.params.q) {
            chips.push({
                key: 'q', dimension: 'search', value: this.params.q,
                label: this.translate.instant('backlog.chip.search', { term: this.params.q }),
            });
        }
        for (const s of this.selectedStatuses) {
            chips.push({
                key: `status-${s}`, dimension: 'status', value: s,
                label: this.translate.instant('backlog.chip.status', { value: this.translate.instant('workflow.status.' + s) }),
            });
        }
        for (const t of this.selectedTypes) {
            chips.push({
                key: `type-${t}`, dimension: 'type', value: t,
                label: this.translate.instant('backlog.chip.type', { value: this.translate.instant('workflow.ticket-type.' + t) }),
            });
        }
        for (const p of this.selectedPriorities) {
            chips.push({
                key: `priority-${p}`, dimension: 'priority', value: p,
                label: this.translate.instant('backlog.chip.priority', { value: this.translate.instant('ticket.priority.' + p) }),
            });
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
                if (this.project) this.loadBacklog(this.project.id);
                return;
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
    }

    clearAllFilters(): void {
        this.searchValue = '';
        this.params = { ...this.params, q: undefined, _page: 1 };
        for (const key of Object.keys(this.statusChecks)) this.statusChecks[key as WorkflowStatus] = false;
        for (const key of Object.keys(this.typeChecks)) this.typeChecks[key as TicketType] = false;
        for (const key of Object.keys(this.priorityChecks)) this.priorityChecks[key as TicketPriority] = false;
        this.selectedStatuses.clear();
        this.selectedTypes.clear();
        this.selectedPriorities.clear();
        this.params = { ...this.params, status: undefined, type: undefined, priority: undefined };
        this.selectedSortIndex = 0;
        this.params = { ...this.params, _sort: 'position', _order: 'asc' };
        if (this.project) this.loadBacklog(this.project.id);
    }

    // --- Empty states ---

    get emptyStateMessage(): string {
        if (this.hasError) return this.translate.instant('backlog.load-error');
        if (this.params.q) return this.translate.instant('backlog.no-match-search');
        if (this.hasActiveFilters) return this.translate.instant('backlog.no-match-filter');
        return this.translate.instant('backlog.no-items');
    }

    get emptyStateHint(): string | null {
        if (!this.hasError && !this.params.q && !this.hasActiveFilters) {
            return this.translate.instant('backlog.no-items-hint');
        }
        return null;
    }

    retry(): void {
        this.hasError = false;
        if (this.project) this.loadBacklog(this.project.id);
    }

    // --- Reorder ---

    get isReorderMode(): boolean {
        return this.canReorder
            && this.params._sort === 'position'
            && !this.hasActiveFilters;
    }

    get hasReorderChanges(): boolean {
        return this.items.some(item =>
            item.position !== this.originalPositions.get(item.ticket_number),
        );
    }

    moveUp(index: number): void {
        if (index <= 0) return;
        const temp = this.items[index];
        this.items[index] = this.items[index - 1];
        this.items[index - 1] = temp;
        this.updateLocalPositions();
    }

    moveDown(index: number): void {
        if (index >= this.items.length - 1) return;
        const temp = this.items[index];
        this.items[index] = this.items[index + 1];
        this.items[index + 1] = temp;
        this.updateLocalPositions();
    }

    onBacklogDrop(event: CdkDragDrop<BacklogItem[]>): void {
        if (event.previousIndex === event.currentIndex) return;
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
        this.updateLocalPositions();

        const movedItem = this.items[event.currentIndex];
        this.reorderAnnouncement = this.translate.instant('backlog.reorder.announcement', {
            ticket: '#' + movedItem.ticket_number,
            position: event.currentIndex + 1,
            total: this.items.length,
        });
        this.cdr.markForCheck();
    }

    discardReorder(): void {
        this.items = this.items
            .map(item => ({ ...item, position: this.originalPositions.get(item.ticket_number) ?? item.position }))
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        this.cdr.markForCheck();
    }

    saveReorder(): void {
        if (!this.project || this.isSaving) return;
        this.isSaving = true;
        this.cdr.markForCheck();

        const payload: ReorderPayload = {
            items: this.items.map((item, i) => ({
                ticket_number: item.ticket_number,
                position: i + 1,
            })),
        };

        this.projectService.reorderBacklog(this.project.id, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.isSaving = false;
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('backlog.reorder.growl.saved'),
                });
                this.storeOriginalPositions();
                this.cdr.markForCheck();
            },
            error: () => {
                this.isSaving = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('backlog.reorder.growl.save-failed'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    private updateLocalPositions(): void {
        this.items = this.items.map((item, i) => ({ ...item, position: i + 1 }));
        this.cdr.markForCheck();
    }

    private storeOriginalPositions(): void {
        this.originalPositions.clear();
        this.items.forEach(item => {
            this.originalPositions.set(item.ticket_number, item.position ?? 0);
        });
    }

    // --- Helpers ---

    getAssigneeName(item: BacklogItem): string {
        if (!item.assignee_id) return this.translate.instant('backlog.card.no-assignee');
        return this.assigneeMap.get(item.assignee_id) ?? '—';
    }

    truncateDescription(desc: string | null | undefined, max = 120): string {
        if (!desc) return '';
        return desc.length > max ? desc.substring(0, max) + '…' : desc;
    }

    // --- Create Ticket Dialog ---

    openCreateDialog(): void {
        this.resetCreateForm();
        this.loadDialogData();
        this.cdr.detectChanges();
        this.createDialog.openDialog();
    }

    onCreateTicket(): void {
        if (!this.project || !this.isCreateFormValid()) return;
        this.isCreating = true;
        this.createError = '';
        this.cdr.markForCheck();

        const projectId = this.project.id;
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
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('backlog.growl.created-summary'),
                    detail: this.translate.instant('backlog.growl.created-detail', {
                        key: this.projectKey, number: created.ticket_number, title: created.title,
                    }),
                });
                this.resetCreateForm();
                this.loadBacklog(projectId);
            },
            error: err => {
                this.createError = err.error?.message || this.translate.instant('backlog.error.create-default');
                this.isCreating = false;
                this.cdr.markForCheck();
            },
        });
    }

    resetCreateForm(): void {
        this.newTicketType = 'STORY';
        this.newTicketTitle = '';
        this.newTicketDescription = '';
        this.newTicketPriority = 'MEDIUM';
        this.newTicketAssigneeId = null;
        this.newTicketEpicId = null;
        this.createError = '';
        this.isCreating = false;
    }

    isCreateFormValid(): boolean {
        const len = this.newTicketTitle.trim().length;
        return len >= 2 && len <= 200;
    }

    private loadDialogData(): void {
        if (!this.project) return;
        const projectId = this.project.id;
        this.projectService.getEpics(projectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: epics => { this.epics = epics; this.cdr.markForCheck(); },
        });
        if (this.members.length === 0) {
            this.projectService.getProjectMembers(projectId).pipe(takeUntil(this.destroy$)).subscribe({
                next: members => { this.members = members; this.cdr.markForCheck(); },
            });
        }
    }

    private loadAssignees(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(takeUntil(this.destroy$)).subscribe({
            next: members => {
                this.assigneeMap.clear();
                this.members = members;
                members.forEach(m => this.assigneeMap.set(m.userId, `${m.firstName} ${m.lastName}`));
                this.cdr.markForCheck();
            },
        });
    }

    private determineCanCreate(projectId: string): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canCreate = true;
            this.cdr.markForCheck();
            return;
        }
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canCreate = can;
            this.cdr.markForCheck();
        });
    }

    private determineCanReorder(projectId: string): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canReorder = true;
            this.cdr.markForCheck();
            return;
        }
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canReorder = can;
            this.cdr.markForCheck();
        });
    }
}
