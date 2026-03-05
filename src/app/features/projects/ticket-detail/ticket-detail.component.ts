import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, switchMap, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PROGRESS_BAR } from '@eui/components/eui-progress-bar';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { EuiDialogComponent, EUI_DIALOG } from '@eui/components/eui-dialog';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_TABS } from '@eui/components/eui-tabs';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_DISCUSSION_THREAD, EuiDiscussionThreadItem } from '@eui/components/eui-discussion-thread';
import { EuiGrowlService } from '@eui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
    ProjectContextService, ProjectService, Project, BacklogItem, ProjectMember,
    Workflow, WorkflowStatus, TicketPriority, TicketType, UpdateTicketPayload,
    TICKET_PRIORITIES, TICKET_TYPES, TicketComment, ActivityEntry, LinkType, TicketLink,
    CreateTicketLinkPayload,
} from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_BUTTON, ...EUI_PROGRESS_BAR,
        ...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_TEXT, ...EUI_TEXTAREA,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_DIALOG,
        ...EUI_FIELDSET, ...EUI_INPUT_GROUP, ...EUI_TABS, ...EUI_BADGE,
        ...EUI_DISCUSSION_THREAD,
        EuiIconButtonComponent, DatePipe, TranslateModule, ReactiveFormsModule, FormsModule,
    ],
})
export class TicketDetailComponent implements OnInit, OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly location = inject(Location);
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly growlService = inject(EuiGrowlService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly translate = inject(TranslateService);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
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

    // Global edit mode toggle (replaces per-field editingFields)
    isEditActive = false;

    // Reactive form
    ticketForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
        type: new FormControl<TicketType>('STORY'),
        status: new FormControl<WorkflowStatus>('TO_DO'),
        priority: new FormControl<TicketPriority>('MEDIUM'),
        assignee_id: new FormControl<string | null>(null),
        description: new FormControl('', [Validators.maxLength(2000)]),
        epic_id: new FormControl<string | null>(null),
    });

    readonly priorities = TICKET_PRIORITIES;
    readonly ticketTypes = TICKET_TYPES;

    // Comments
    comments: TicketComment[] = [];
    newCommentText = '';
    isAddingComment = false;

    // Activity
    activity: ActivityEntry[] = [];

    // Links
    ticketLinks: TicketLink[] = [];
    linkTypes: LinkType[] = [];
    newLinkTypeId = '';
    newLinkTargetNumber: number | null = null;
    linkToDelete: TicketLink | null = null;

    @ViewChild('addLinkDialog') addLinkDialog!: EuiDialogComponent;
    @ViewChild('confirmDeleteLinkDialog') confirmDeleteLinkDialog!: EuiDialogComponent;
    @ViewChild('addCommentDialog') addCommentDialog!: EuiDialogComponent;

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
                this.patchFormFromTicket();
                this.loadComments();
                this.loadActivity();
                this.loadTicketLinks();

                // Set breadcrumb via service (project-context trail)
                this.breadcrumbService.setBreadcrumb([
                    { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
                    { id: 'project', label: this.project!.name, link: `/screen/projects/${this.project!.id}` },
                    { id: 'ticket', label: this.ticketKey, link: null },
                ]);

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
        this.location.back();
    }

    // --- Edit mode toggle ---

    toggleEditMode(): void {
        this.isEditActive = !this.isEditActive;
        if (!this.isEditActive) {
            this.patchFormFromTicket();
        }
        this.cdr.markForCheck();
    }

    onResetForm(): void {
        this.patchFormFromTicket();
    }

    saveChanges(): void {
        if (!this.project || !this.ticket || this.isSaving) return;
        if (this.ticketForm.invalid) return;

        const formVal = this.ticketForm.getRawValue();
        const payload: UpdateTicketPayload = {};

        if (formVal.title?.trim() !== this.ticket.title) {
            payload.title = formVal.title?.trim();
        }
        if (formVal.type !== this.ticket.type) {
            payload.type = formVal.type ?? undefined;
        }
        if (formVal.description !== (this.ticket.description ?? '')) {
            payload.description = formVal.description ?? '';
        }
        if (formVal.status !== this.ticket.status) {
            payload.status = formVal.status ?? undefined;
        }
        if (formVal.priority !== this.ticket.priority) {
            payload.priority = formVal.priority;
        }
        if (formVal.assignee_id !== this.ticket.assignee_id) {
            payload.assignee_id = formVal.assignee_id;
        }
        if (formVal.epic_id !== this.ticket.epic_id) {
            payload.epic_id = formVal.epic_id;
        }

        if (Object.keys(payload).length === 0) {
            this.toggleEditMode();
            return;
        }

        this.isSaving = true;
        this.cdr.markForCheck();

        this.projectService.updateTicket(this.project.id, this.ticket.ticket_number, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: updated => {
                this.ticket = updated;
                this.isEditActive = false;
                this.patchFormFromTicket();
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
        const ticket = this.ticket;
        if (!ticket?.epic_id) return null;
        const epic = this.epics.find(e => e.id === ticket.epic_id);
        return epic ? epic.title : ticket.epic_id;
    }

    getCreatorName(): string {
        const ticket = this.ticket;
        if (!ticket) return '';
        const member = this.members.find(m => m.userId === ticket.created_by);
        return member ? `${member.firstName} ${member.lastName}` : ticket.created_by;
    }

    // --- Discussion thread items ---

    get commentThreadItems(): EuiDiscussionThreadItem[] {
        return this.comments.map(c => ({
            id: c.id,
            typeClass: 'secondary',
            author: c.authorName,
            date: c.created_at,
            body: c.content,
        }));
    }

    get activityThreadItems(): EuiDiscussionThreadItem[] {
        return this.activity.map(a => ({
            id: a.id,
            typeClass: 'info',
            author: this.getChangerName(a.changedBy),
            date: a.created_at,
            body: this.translate.instant('ticket-detail.activity.changed', {
                user: this.getChangerName(a.changedBy),
                field: a.field, oldValue: a.oldValue, newValue: a.newValue,
            }),
        }));
    }

    // --- Activity ---

    loadActivity(): void {
        if (!this.project || !this.ticket) return;
        this.projectService.getActivity(this.project.id, this.ticket.ticket_number).pipe(
            takeUntil(this.destroy$),
        ).subscribe(activity => {
            this.activity = activity;
            this.cdr.markForCheck();
        });
    }

    getChangerName(changedBy: string): string {
        const member = this.members.find(m => m.userId === changedBy);
        return member ? `${member.firstName} ${member.lastName}` : changedBy;
    }

    // --- Comments ---

    loadComments(): void {
        if (!this.project || !this.ticket) return;
        this.projectService.getComments(this.project.id, this.ticket.ticket_number).pipe(
            takeUntil(this.destroy$),
        ).subscribe(comments => {
            this.comments = comments;
            this.cdr.markForCheck();
        });
    }

    openAddCommentDialog(): void {
        this.newCommentText = '';
        this.cdr.detectChanges();
        this.addCommentDialog.openDialog();
    }

    submitComment(): void {
        if (!this.project || !this.ticket || this.isAddingComment || !this.newCommentText.trim()) return;
        this.isAddingComment = true;
        this.addCommentDialog.closeDialog();
        this.cdr.markForCheck();

        this.projectService.addComment(this.project.id, this.ticket.ticket_number, this.newCommentText.trim()).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.newCommentText = '';
                this.isAddingComment = false;
                this.loadComments();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('ticket-detail.comments.growl.added'),
                    detail: this.translate.instant('ticket-detail.comments.growl.added'),
                });
                this.cdr.markForCheck();
            },
            error: () => {
                this.isAddingComment = false;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('ticket-detail.comments.growl.failed'),
                    detail: this.translate.instant('ticket-detail.comments.growl.failed'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // --- Links ---

    loadTicketLinks(): void {
        if (!this.project || !this.ticket) return;
        this.projectService.getTicketLinks(this.project.id, this.ticket.ticket_number).pipe(
            takeUntil(this.destroy$),
        ).subscribe(links => {
            this.ticketLinks = links;
            this.cdr.markForCheck();
        });
    }

    getLinkedTicketKey(link: TicketLink): string {
        if (!this.project) return `#${link.targetTicketNumber}`;
        return `${this.project.key}-${link.targetTicketNumber}`;
    }

    canDeleteLink(): boolean {
        if (this.permissionService.isSuperAdmin()) return true;
        if (this.canEdit) return true;
        return false;
    }

    openAddLinkDialog(): void {
        this.newLinkTypeId = this.linkTypes.length > 0 ? this.linkTypes[0].id : '';
        this.newLinkTargetNumber = null;
        this.cdr.detectChanges();
        this.addLinkDialog.openDialog();
    }

    submitAddLink(): void {
        if (!this.project || !this.ticket || !this.newLinkTypeId || !this.newLinkTargetNumber) return;
        this.addLinkDialog.closeDialog();

        const payload: CreateTicketLinkPayload = {
            linkTypeId: this.newLinkTypeId,
            targetTicketNumber: this.newLinkTargetNumber,
        };

        this.projectService.createTicketLink(this.project.id, this.ticket.ticket_number, payload).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.loadTicketLinks();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('ticket-detail.links.growl.created'),
                    detail: this.translate.instant('ticket-detail.links.growl.created'),
                });
                this.cdr.markForCheck();
            },
            error: () => {
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('ticket-detail.links.growl.create-failed'),
                    detail: this.translate.instant('ticket-detail.links.growl.create-failed'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    confirmRemoveLink(link: TicketLink): void {
        this.linkToDelete = link;
        this.cdr.detectChanges();
        this.confirmDeleteLinkDialog.openDialog();
    }

    removeLink(): void {
        if (!this.project || !this.ticket || !this.linkToDelete) return;
        this.confirmDeleteLinkDialog.closeDialog();

        this.projectService.deleteTicketLink(this.project.id, this.ticket.ticket_number, this.linkToDelete.id).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.linkToDelete = null;
                this.loadTicketLinks();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('ticket-detail.links.growl.deleted'),
                    detail: this.translate.instant('ticket-detail.links.growl.deleted'),
                });
                this.cdr.markForCheck();
            },
            error: () => {
                this.linkToDelete = null;
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('ticket-detail.links.growl.delete-failed'),
                    detail: this.translate.instant('ticket-detail.links.growl.delete-failed'),
                });
                this.cdr.markForCheck();
            },
        });
    }

    // --- Private ---

    private patchFormFromTicket(): void {
        if (!this.ticket) return;
        this.ticketForm.patchValue({
            title: this.ticket.title,
            type: this.ticket.type,
            description: this.ticket.description ?? '',
            status: this.ticket.status,
            priority: this.ticket.priority ?? 'MEDIUM',
            assignee_id: this.ticket.assignee_id,
            epic_id: this.ticket.epic_id,
        });
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

        this.projectService.getLinkTypes().pipe(
            takeUntil(this.destroy$),
        ).subscribe(types => {
            this.linkTypes = types;
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