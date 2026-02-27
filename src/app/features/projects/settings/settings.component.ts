import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectContextService, ProjectService, Project, Workflow } from '../../../core/project';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_STATUS_BADGE, ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON, ...EUI_ICON,
        TranslateModule,
    ],
})
export class SettingsComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();

    workflows: Workflow[] = [];
    isLoading = true;
    hasError = false;

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            switchMap(project => {
                this.isLoading = true;
                this.hasError = false;
                this.cdr.markForCheck();
                return this.projectService.getWorkflows(project.id);
            }),
            takeUntil(this.destroy$),
        ).subscribe({
            next: workflows => {
                this.workflows = workflows;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    retry(): void {
        const project = this.projectContext.getCurrentProject();
        if (!project) return;
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();
        this.projectService.getWorkflows(project.id).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: workflows => {
                this.workflows = workflows;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    getTransitionTargets(workflow: Workflow, fromStatus: string): string[] {
        return workflow.transitions[fromStatus as keyof typeof workflow.transitions] ?? [];
    }
}
