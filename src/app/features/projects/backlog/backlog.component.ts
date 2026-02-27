import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
    TicketType, TicketPriority, CREATABLE_TICKET_TYPES, TICKET_PRIORITIES,
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
        ...EUI_TEXTAREA, EuiDialogComponent, FormsModule,
        TranslateModule,
    ],
})
export class BacklogComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    @ViewChild('createDialog') createDialog!: EuiDialogComponent;

    project: Project | null = null;
    projectKey = '';
    items: BacklogItem[] = [];
    isLoading = true;
    hasError = false;
    canCreate = false;

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
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.projectKey = project.key;
            this.cdr.markForCheck();
            this.determineCanCreate(project.id);
            this.loadItems(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadItems(projectId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        this.projectService.getBacklog(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: res => {
                this.items = [...res.data].sort((a, b) => b.ticket_number - a.ticket_number);
                this.isLoading = false;
                this.cdr.markForCheck();
                this.loadAssignees(projectId);
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
            this.loadItems(this.project.id);
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
                this.loadItems(projectId);
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

        // Load epics for dropdown
        this.projectService.getEpics(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: epics => {
                this.epics = epics;
                this.cdr.markForCheck();
            },
        });

        // Load members for assignee dropdown (reuse if already loaded)
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
