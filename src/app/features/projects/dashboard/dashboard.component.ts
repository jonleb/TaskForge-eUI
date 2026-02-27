import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectContextService, ProjectService, Project, BacklogItem } from '../../../core/project';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_PAGE, ...EUI_CHIP, DatePipe, TranslateModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly breadcrumbService = inject(EuiBreadcrumbService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    creatorName: string | null = null;
    backlogItems: BacklogItem[] = [];
    backlogLoading = false;

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.creatorName = null;
            this.breadcrumbService.setBreadcrumb([
                { id: 'projects', label: this.translate.instant('nav.projects'), link: '/screen/projects' },
                { id: 'project', label: project.name, link: null },
            ]);
            this.cdr.markForCheck();
            this.loadCreator(project.created_by);
            this.loadBacklog(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
                this.creatorName = this.translate.instant('common.unknown');
                this.cdr.markForCheck();
            },
        });
    }

    private loadBacklog(projectId: string): void {
        this.backlogLoading = true;
        this.backlogItems = [];
        this.cdr.markForCheck();
        this.projectService.getBacklog(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: items => {
                this.backlogItems = items;
                this.backlogLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.backlogLoading = false;
                this.cdr.markForCheck();
            },
        });
    }
}
