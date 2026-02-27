import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectContextService, ProjectService, Project, BacklogItem } from '../../../core/project';
import { PermissionService } from '../../../core/auth';

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP, ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE,
        TranslateModule,
    ],
})
export class BacklogComponent implements OnInit, OnDestroy {
    private readonly projectContext = inject(ProjectContextService);
    private readonly projectService = inject(ProjectService);
    private readonly permissionService = inject(PermissionService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly translate = inject(TranslateService);
    private readonly destroy$ = new Subject<void>();

    project: Project | null = null;
    projectKey = '';
    items: BacklogItem[] = [];
    isLoading = true;
    hasError = false;
    canCreate = false;

    /** Map of userId → display name for assignee resolution */
    private readonly assigneeMap = new Map<string, string>();

    ngOnInit(): void {
        this.projectContext.currentProject$.pipe(
            filter((p): p is Project => p !== null),
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.project = project;
            this.projectKey = project.key;
            this.cdr.markForCheck();
            this.determineCanCreate(project.id);
            this.loadItems(project.id);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadItems(projectId: string): void {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.markForCheck();

        this.projectService.getBacklog(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: items => {
                this.items = [...items].sort((a, b) => b.ticket_number - a.ticket_number);
                this.isLoading = false;
                this.cdr.markForCheck();
                this.loadAssignees(projectId);
            },
            error: () => {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    retry(): void {
        if (this.project) {
            this.loadItems(this.project.id);
        }
    }

    getAssigneeName(item: BacklogItem): string {
        if (!item.assignee_id) return '—';
        return this.assigneeMap.get(item.assignee_id) ?? '—';
    }

    getPriorityDirective(priority: string | null): string {
        switch (priority) {
            case 'CRITICAL': return 'danger';
            case 'HIGH': return 'warning';
            case 'MEDIUM': return 'info';
            default: return '';
        }
    }

    private loadAssignees(projectId: string): void {
        this.projectService.getProjectMembers(projectId).pipe(
            takeUntil(this.destroy$),
        ).subscribe({
            next: members => {
                this.assigneeMap.clear();
                members.forEach(m => this.assigneeMap.set(m.userId, `${m.firstName} ${m.lastName}`));
                this.cdr.markForCheck();
            },
        });
    }

    private determineCanCreate(projectId: string): void {
        if (this.permissionService.isSuperAdmin()) {
            this.canCreate = true;
            this.cdr.markForCheck();
            return;
        }
        this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER').pipe(
            takeUntil(this.destroy$),
        ).subscribe(can => {
            this.canCreate = can;
            this.cdr.markForCheck();
        });
    }
}
