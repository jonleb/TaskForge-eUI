import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { EuiDialogComponent } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { ProjectContextService, ProjectService, Project, ProjectMember, MemberCandidate, PROJECT_ROLES } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_SELECT, ...EUI_LABEL, ...EUI_FEEDBACK_MESSAGE, ...EUI_INPUT_TEXT,
        EuiTemplateDirective, EuiIconButtonComponent, EuiDialogComponent,
        FormsModule,
    ],
})
export class MembersComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly destroy$ = new Subject<void>();

    @ViewChild('changeRoleDialog') changeRoleDialog!: EuiDialogComponent;
    @ViewChild('addDialog') addDialog!: EuiDialogComponent;

    project: Project | null = null;
    members: ProjectMember[] = [];
    membersLoading = false;
    memberError = false;
    isManager = false;

    // Add member dialog state
    candidates: MemberCandidate[] = [];
    candidateSearch = '';
    selectedCandidate: MemberCandidate | null = null;
    selectedAddRole = 'DEVELOPER';
    addError = '';
    candidateLoading = false;

    // Change role dialog state
    selectedMember: ProjectMember | null = null;
    newRole = '';
    changeRoleError = '';
    readonly projectRoles = PROJECT_ROLES;

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.members = [];
            this.membersLoading = true;
            this.memberError = false;
            this.isManager = false;
            this.cdr.markForCheck();
            this.loadMembers(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadMembers(projectId: string): void {
        this.membersLoading = true;
        this.memberError = false;
        this.cdr.markForCheck();

        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: members => {
                this.members = members;
                this.membersLoading = false;
                this.determineManagerStatus(members);
                this.cdr.markForCheck();
            },
            error: () => {
                this.memberError = true;
                this.membersLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    openAddDialog(): void {
        this.resetAddForm();
        this.cdr.detectChanges();
        this.addDialog.openDialog();
    }

    onCandidateSearch(): void {
        if (!this.project) return;
        if (this.candidateSearch.length < 2) {
            this.candidates = [];
            this.cdr.markForCheck();
            return;
        }
        this.candidateLoading = true;
        this.cdr.markForCheck();
        this.projectService.searchCandidates(this.project.id, this.candidateSearch).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: candidates => {
                this.candidates = candidates;
                this.candidateLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.candidates = [];
                this.candidateLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    selectCandidate(candidate: MemberCandidate): void {
        this.selectedCandidate = candidate;
        this.candidateSearch = '';
        this.candidates = [];
    }

    onAddMember(): void {
        if (!this.selectedCandidate || !this.project) return;

        const candidateName = `${this.selectedCandidate.firstName} ${this.selectedCandidate.lastName}`;
        const projectId = this.project.id;

        this.projectService.upsertMember(projectId, {
            userId: this.selectedCandidate.id,
            role: this.selectedAddRole,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.addDialog.closeDialog();
                this.growlService.growl({
                    severity: 'success',
                    summary: 'Member added',
                    detail: `${candidateName} has been added as ${this.selectedAddRole}.`,
                });
                this.resetAddForm();
                this.loadMembers(projectId);
            },
            error: (err) => {
                this.addError = err.error?.message || 'Could not add member. Please try again.';
                this.cdr.markForCheck();
            },
        });
    }

    resetAddForm(): void {
        this.candidates = [];
        this.candidateSearch = '';
        this.selectedCandidate = null;
        this.selectedAddRole = 'DEVELOPER';
        this.addError = '';
        this.candidateLoading = false;
    }

    openChangeRoleDialog(member: ProjectMember): void {
        this.selectedMember = member;
        this.newRole = member.role;
        this.changeRoleError = '';
        this.cdr.detectChanges();
        this.changeRoleDialog.openDialog();
    }

    onChangeRole(): void {
        if (!this.selectedMember || !this.project) return;

        const memberName = `${this.selectedMember.firstName} ${this.selectedMember.lastName}`;
        const projectId = this.project.id;

        this.projectService.upsertMember(projectId, {
            userId: this.selectedMember.userId,
            role: this.newRole,
        }).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                this.changeRoleDialog.closeDialog();
                this.growlService.growl({
                    severity: 'success',
                    summary: 'Role updated',
                    detail: `${memberName} is now ${this.newRole}.`,
                });
                this.resetChangeRoleForm();
                this.loadMembers(projectId);
            },
            error: (err) => {
                if (err.status === 403) {
                    this.changeRoleError = err.error?.message || 'Cannot modify membership of a super administrator.';
                } else {
                    this.growlService.growl({
                        severity: 'error',
                        summary: 'Update failed',
                        detail: err.error?.message || 'Could not update role. Please try again.',
                    });
                }
                this.cdr.markForCheck();
            },
        });
    }

    resetChangeRoleForm(): void {
        this.selectedMember = null;
        this.newRole = '';
        this.changeRoleError = '';
    }

    openRemoveDialog(_member: ProjectMember): void {
        // Placeholder — implemented in STORY-006
    }

    private determineManagerStatus(members: ProjectMember[]): void {
        if (this.permissionService.isSuperAdmin()) {
            this.isManager = true;
            return;
        }
        const userId = this.permissionService.getUserId();
        const currentMember = members.find(m => m.userId === userId);
        this.isManager = !!currentMember && currentMember.role === 'PROJECT_ADMIN';
    }
}
