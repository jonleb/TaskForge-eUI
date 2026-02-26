import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiIconButtonComponent } from '@eui/components/eui-icon-button';
import { ProjectContextService, ProjectService, Project, ProjectMember } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP, ...EUI_BUTTON,
        EuiTemplateDirective, EuiIconButtonComponent,
    ],
})
export class MembersComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    members: ProjectMember[] = [];
    membersLoading = false;
    memberError = false;
    isManager = false;

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
        // Placeholder — implemented in STORY-004
    }

    openChangeRoleDialog(_member: ProjectMember): void {
        // Placeholder — implemented in STORY-005
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
