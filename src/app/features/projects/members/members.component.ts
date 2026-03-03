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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
        TranslateModule,
    ],
})
export class MembersComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    @ViewChild('changeRoleDialog') changeRoleDialog!: EuiDialogComponent;
    @ViewChild('addDialog') addDialog!: EuiDialogComponent;
    @ViewChild('removeDialog') removeDialog!: EuiDialogComponent;

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

    // Remove member dialog state
    memberToRemove: ProjectMember | null = null;
    removeError = '';

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
                    summary: this.translate.instant('members.growl.added-summary'),
                    detail: this.translate.instant('members.growl.added-detail', { name: candidateName, role: this.selectedAddRole }),
                });
                this.resetAddForm();
                this.loadMembers(projectId);
            },
            error: (err) => {
                this.addError = err.error?.message || this.translate.instant('members.error.add-default');
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
                    summary: this.translate.instant('members.growl.role-updated-summary'),
                    detail: this.translate.instant('members.growl.role-updated-detail', { name: memberName, role: this.newRole }),
                });
                this.resetChangeRoleForm();
                this.loadMembers(projectId);
            },
            error: (err) => {
                if (err.status === 403) {
                    this.changeRoleError = err.error?.message || this.translate.instant('members.error.super-admin-modify');
                } else {
                    this.growlService.growl({
                        severity: 'error',
                        summary: this.translate.instant('members.growl.update-failed-summary'),
                        detail: err.error?.message || this.translate.instant('members.growl.update-failed-detail'),
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

    openRemoveDialog(member: ProjectMember): void {
        this.memberToRemove = member;
        this.removeError = '';
        this.cdr.detectChanges();
        this.removeDialog.openDialog();
    }

    onRemoveMember(): void {
        if (!this.memberToRemove || !this.project) return;

        const memberName = `${this.memberToRemove.firstName} ${this.memberToRemove.lastName}`;
        const projectId = this.project.id;

        this.projectService.removeMember(projectId, this.memberToRemove.userId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: () => {
                this.removeDialog.closeDialog();
                this.growlService.growl({
                    severity: 'success',
                    summary: this.translate.instant('members.growl.removed-summary'),
                    detail: this.translate.instant('members.growl.removed-detail', { name: memberName }),
                });
                this.resetRemoveForm();
                this.loadMembers(projectId);
            },
            error: (err) => {
                if (err.status === 403) {
                    this.removeError = err.error?.message || this.translate.instant('members.error.super-admin-remove');
                } else {
                    this.growlService.growl({
                        severity: 'error',
                        summary: this.translate.instant('members.growl.remove-failed-summary'),
                        detail: err.error?.message || this.translate.instant('members.growl.remove-failed-detail'),
                    });
                }
                this.cdr.markForCheck();
            },
        });
    }

    resetRemoveForm(): void {
        this.memberToRemove = null;
        this.removeError = '';
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
