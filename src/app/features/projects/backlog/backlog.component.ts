import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
    TicketType, TicketPriority, CREATABLE_TICKET_TYPES, TICKET_PRIORITIES,
    BacklogListParams,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA, EuiDialogComponent, EuiTemplateDirective,
        EuiPaginatorComponent, ...EUI_TOGGLE_GROUP, FormsModule, TranslateModule,
    ],
})
export class BacklogComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
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
        _sort: 'ticket_number',
        _order: 'desc',
    };

    activeStatusFilter: 'all' | 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' = 'all';
    activeTypeFilter: 'all' | TicketType = 'all';

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

    /** Map of userId → display name for assignee resolution */
    private readonly assigneeMap = new Map<string, string>();

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
            this.cdr.markForCheck();
            this.determineCanCreate(project.id);
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

    onSortChange(sort: Sort[]): void {
        if (sort.length > 0) {
            this.params = {
                ...this.params,
                _sort: sort[0].sort,
                _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
                _page: 1,
            };
        }
        if (this.project) this.loadBacklog(this.project.id);
    }

    onPageChange(event: { page: number; pageSize: number }): void {
        if (!this.paginatorReady) return;
        this.params = {
            ...this.params,
            _page: event.page + 1,
            _limit: event.pageSize,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    onFilterChange(searchTerm: string): void {
        this.searchSubject.next(searchTerm);
    }

    onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
        const filterMap: Record<string, typeof this.activeStatusFilter> = {
            'status-all': 'all',
            'status-todo': 'TO_DO',
            'status-inprogress': 'IN_PROGRESS',
            'status-inreview': 'IN_REVIEW',
            'status-done': 'DONE',
        };
        this.activeStatusFilter = filterMap[item.id] ?? 'all';
        this.params = {
            ...this.params,
            status: this.activeStatusFilter === 'all' ? undefined : this.activeStatusFilter,
            _page: 1,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    onTypeFilterChange(item: EuiToggleGroupItemComponent): void {
        const filterMap: Record<string, typeof this.activeTypeFilter> = {
            'type-all': 'all',
            'type-story': 'STORY',
            'type-bug': 'BUG',
            'type-task': 'TASK',
            'type-epic': 'EPIC',
        };
        this.activeTypeFilter = filterMap[item.id] ?? 'all';
        this.params = {
            ...this.params,
            type: this.activeTypeFilter === 'all' ? undefined : this.activeTypeFilter,
            _page: 1,
        };
        if (this.project) this.loadBacklog(this.project.id);
    }

    retry(): void {
        if (this.project) {
            this.loadBacklog(this.project.id);
        }
    }

    getAssigneeName(item: BacklogItem): string {
        if (!item.assignee_id) return '—';
        return this.assigneeMap.get(item.assignee_id) ?? '—';
    }

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

    get emptyStateMessage(): string {
        if (this.hasError) {
            return this.translate.instant('backlog.load-error');
        }
        if (this.params.q) {
            return this.translate.instant('backlog.no-match-search');
        }
        if (this.params.status || this.params.type) {
            return this.translate.instant('backlog.no-match-filter');
        }
        return this.translate.instant('backlog.no-items');
    }

    private loadDialogData(): void {
        if (!this.project) return;
        const projectId = this.project.id;

        this.projectService.getEpics(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: epics => {
                this.epics = epics;
                this.cdr.markForCheck();
            },
        });

        if (this.members.length === 0) {
            this.projectService.getProjectMembers(projectId).pipe(
                takeUntil(this.destroy$),
            ).subscribe({
                next: members => {
                    this.members = members;
                    this.cdr.markForCheck();
                },
            });
        }
    }

    private loadAssignees(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
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
}
