import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, switchMap, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
    Workflow, WorkflowStatus, TicketPriority, UpdateTicketPayload,
    TICKET_PRIORITIES,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

type EditableField = 'title' | 'description' | 'status' | 'priority' | 'assignee' | 'epic';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_CHIP, ...EUI_BUTTON, ...EUI_PROGRESS_BAR,
        ...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_TEXT, ...EUI_TEXTAREA,
        ...EUI_FEEDBACK_MESSAGE,
        EuiIconButtonComponent, DatePipe, TranslateModule, FormsModule,
    ],
})
export class TicketDetailComponent implements OnInit, OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly growlService = inject(EuiGrowlService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    ticket: BacklogItem | null = null;
    project: Project | null = null;
    members: ProjectMember[] = [];
    epics: BacklogItem[] = [];
    workflows: Workflow[] = [];
    isLoading = true;
    hasError = false;
    notFound = false;
    isSaving = false;

    // Role-based permissions
    canEdit = false;

    // Edit state
    editingFields = new Set<EditableField>();
    editTitle = '';
    editDescription = '';
    editStatus: WorkflowStatus = 'TO_DO';
    editPriority: TicketPriority = 'MEDIUM';
    editAssigneeId: string | null = null;
    editEpicId: string | null = null;

    readonly priorities = TICKET_PRIORITIES;

    ngOnInit(): void {
        combineLatest([
            this.projectContext.currentProject$.pipe(filter((p): p is Project => p !== null)),
            this.route.paramMap,
        ]).pipe(
            takeUntil(this.destroy$),
            switchMap(([project, params]) => {
                this.project = project;
                const ticketNumber = Number(params.get('ticketNumber'));
                this.isLoading = true;
                this.hasError = false;
                this.notFound = false;
                this.cdr.markForCheck();

                this.loadSupportData(project.id);
                this.determineCanEdit(project.id);

                return this.projectService.getTicket(project.id, ticketNumber);
            }),
        ).subscribe({
            next: ticket => {
                this.ticket = ticket;
                this.isLoading = false;
                this.syncEditFields();
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.isLoading = false;
                if (err?.status === 404) {
                    this.notFound = true;
                } else {
                    this.hasError = true;
                }
                this.cdr.markForCheck();
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get ticketKey(): string {
        if (!this.project || !this.ticket) return '';
        return `${this.project.key}-${this.ticket.ticket_number}`;
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    // --- Edit mode ---

    isEditing(field: EditableField): boolean {
        return this.editingFields.has(field);
    }

    startEdit(field: EditableField): void {
        this.editingFields.add(field);
        this.cdr.markForCheck();
    }

    cancelEdit(field: EditableField): void {
        this.editingFields.delete(field);
        this.syncEditFields();
        this.cdr.markForCheck();
    }

    cancelAllEdits(): void {
        this.editingFields.clear();
        this.syncEditFields();
        this.cdr.markForCheck();
    }

    get hasUnsavedChanges(): boolean {
        return this.editingFields.size > 0;
    }

    saveChanges(): void {
        if (!this.project || !this.ticket || this.isSaving) return;

        const payload: UpdateTicketPayload = {};
        if (this.editingFields.has('title') && this.editTitle.trim() !== this.ticket.title) {
            payload.title = this.editTitle.trim();
        }
        if (this.editingFields.has('description') && this.editDescription !== (this.ticket.description ?? '')) {
            payload.description = this.editDescription;
        }
        if (this.editingFields.has('status') && this.editStatus !== this.ticket.status) {
            payload.status = this.editStatus;
        }
        if (this.editingFields.has('priority') && this.editPriority !== this.ticket.priority) {
            payload.priority = this.editPriority;
        }
        if (this.editingFields.has('assignee') && this.editAssigneeId !== this.ticket.assignee_id) {
            payload.assignee_id = this.editAssigneeId;
        }
        if (this.editingFields.has('epic') && this.editEpicId !== this.ticket.epic_id) {
            payload.epic_id = this.editEpicId;
        }

        if (Object.keys(payload).length === 0) {
            this.cancelAllEdits();
            return;
        }

        this.isSaving = true;
        this.cdr.markForCheck();

        this.projectService.updateTicket(this.project.id, this.ticket.ticket_number, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: updated => {
                this.ticket = updated;
                this.editingFields.clear();
                this.syncEditFields();
                this.isSaving = false;
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('ticket-detail.growl.updated-summary'),
                    detail: this.translate.instant('ticket-detail.growl.updated-detail'),
                });
                this.cdr.markForCheck();
            },
            error: () => {
                this.isSaving = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('ticket-detail.growl.update-failed'),
                    detail: this.translate.instant('ticket-detail.growl.update-failed'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // --- Workflow transitions ---

    get allowedStatuses(): WorkflowStatus[] {
        const ticket = this.ticket;
        if (!ticket) return [];
        const wf = this.workflows.find(w => w.ticketType === ticket.type);
        if (!wf) return [];
        const transitions = wf.transitions[ticket.status];
        if (!transitions) return [ticket.status];
        return [ticket.status, ...transitions.filter(s => s !== ticket.status)];
    }

    // --- Display helpers ---

    getAssigneeName(): string {
        const ticket = this.ticket;
        if (!ticket?.assignee_id) return this.translate.instant('ticket-detail.unassigned');
        const member = this.members.find(m => m.userId === ticket.assignee_id);
        return member ? `${member.firstName} ${member.lastName}` : '—';
    }

    getEpicName(): string | null {
        if (!this.ticket?.epic_id) return null;
        return this.ticket.epic_id;
    }

    getCreatorName(): string {
        const ticket = this.ticket;
        if (!ticket) return '';
        const member = this.members.find(m => m.userId === ticket.created_by);
        return member ? `${member.firstName} ${member.lastName}` : ticket.created_by;
    }

    // --- Private ---

    private syncEditFields(): void {
        if (!this.ticket) return;
        this.editTitle = this.ticket.title;
        this.editDescription = this.ticket.description ?? '';
        this.editStatus = this.ticket.status;
        this.editPriority = this.ticket.priority ?? 'MEDIUM';
        this.editAssigneeId = this.ticket.assignee_id;
        this.editEpicId = this.ticket.epic_id;
    }

    private loadSupportData(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe(members => {
            this.members = members;
            this.cdr.markForCheck();
        });

        this.projectService.getWorkflows(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe(workflows => {
            this.workflows = workflows;
            this.cdr.markForCheck();
        });

        this.projectService.getEpics(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe(epics => {
            this.epics = epics;
            this.cdr.markForCheck();
        });
    }

    private determineCanEdit(projectId: string): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canEdit = true;
            this.cdr.markForCheck();
            return;
        }
        this.permissionService.hasProjectRole(
            projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER',
        ).pipe(takeUntil(this.destroy$)).subscribe(can => {
            if (can) {
                this.canEdit = true;
            } else {
                // REPORTER can only edit own tickets — check after ticket loads
                this.permissionService.hasProjectRole(projectId, 'REPORTER').pipe(
                    takeUntil(this.destroy$),
                ).subscribe(isReporter => {
                    if (isReporter && this.ticket) {
                        this.canEdit = this.ticket.created_by === this.permissionService.getUserId();
                    } else {
                        this.canEdit = false;
                    }
                    this.cdr.markForCheck();
                });
            }
            this.cdr.markForCheck();
        });
    }
}
