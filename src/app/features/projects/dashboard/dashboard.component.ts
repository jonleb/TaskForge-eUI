import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { ProjectContextService, ProjectService, Project, ProjectMember } from '../../../core/project';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP, EuiTemplateDirective, DatePipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    members: ProjectMember[] = [];
    membersLoading = false;
    memberError = false;
    creatorName: string | null = null;

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.members = [];
            this.membersLoading = true;
            this.memberError = false;
            this.creatorName = null;
            this.breadcrumbService.setBreadcrumb([
                { id: 'projects', label: 'Projects', link: '/screen/projects' },
                { id: 'project', label: project.name, link: null },
            ]);
            this.cdr.markForCheck();
            this.loadMembers(project.id);
            this.loadCreator(project.created_by);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadMembers(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: members => {
                this.members = members;
                this.membersLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.memberError = true;
                this.membersLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    private loadCreator(userId: string): void {
        this.projectService.getUser(userId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: user => {
                this.creatorName = `${user.firstName} ${user.lastName}`;
                this.cdr.markForCheck();
            },
            error: () => {
                this.creatorName = 'Unknown';
                this.cdr.markForCheck();
            },
        });
    }
}
