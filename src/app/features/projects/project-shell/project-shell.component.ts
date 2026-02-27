import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { EuiGrowlService } from '@eui/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService, ProjectContextService } from '../../../core/project';

@Component({
    selector: 'app-project-shell',
    template: '<router-outlet />',
    imports: [RouterOutlet],
})
export class ProjectShellComponent implements OnInit, OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly projectService = inject(ProjectService);
    private readonly projectContext = inject(ProjectContextService);
    private readonly growlService = inject(EuiGrowlService);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => this.projectService.getProject(params['projectId'])),
            takeUntil(this.destroy$),
        ).subscribe({
            next: project => {
                this.projectContext.setProject(project);
            },
            error: (err) => {
                const message = err.status === 403
                    ? this.translate.instant('shell.error.no-access')
                    : this.translate.instant('shell.error.not-found');
                this.growlService.growl({
                    severity: 'error',
                    summary: this.translate.instant('shell.growl.nav-error-summary'),
                    detail: message,
                });
                this.router.navigate(['screen/projects']);
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.projectContext.clearProject();
    }
}
