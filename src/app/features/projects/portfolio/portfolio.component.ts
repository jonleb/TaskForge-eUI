import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';
import { ProjectService, Project } from '../../../core/project';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_BUTTON,
        EuiTemplateDirective,
    ],
})
export class PortfolioComponent implements OnInit {
    private readonly projectService = inject(ProjectService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly growlService = inject(EuiGrowlService);

    projects: Project[] = [];
    loading = false;
    hasError = false;

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects(): void {
        this.loading = true;
        this.hasError = false;
        this.projectService.getProjects().subscribe({
            next: projects => {
                this.projects = projects;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.projects = [];
                this.loading = false;
                this.hasError = true;
                this.growlService.growl({
                    severity: 'error',
                    summary: 'Load failed',
                    detail: 'Could not load projects. Please try again.',
                });
                this.cdr.markForCheck();
            },
        });
    }

    onOpenProject(project: Project): void {
        this.router.navigate(['screen/projects', project.id]);
    }
}
