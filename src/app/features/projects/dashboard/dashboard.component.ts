import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { ProjectContextService, ProjectService, Project } from '../../../core/project';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_PAGE, DatePipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    memberCount: number | null = null;
    memberError = false;

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.memberCount = null;
            this.memberError = false;
            this.breadcrumbService.setBreadcrumb([
                { id: 'projects', label: 'Projects', link: '/screen/projects' },
                { id: 'project', label: project.name, link: null },
            ]);
            this.cdr.markForCheck();
            this.loadMembers(project.id);
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
                this.memberCount = members.length;
                this.cdr.markForCheck();
            },
            error: () => {
                this.memberError = true;
                this.cdr.markForCheck();
            },
        });
    }
}
