import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiMenuItem } from '@eui/components/eui-menu';
import { EUI_LAYOUT } from '@eui/components/layout';
import { EUI_BREADCRUMB, EuiBreadcrumbService } from '@eui/components/eui-breadcrumb';
import { AuthService, GlobalRole, PermissionService } from '../core/auth';
import { ProjectContextService, Project } from '../core/project';

interface SidebarItemMetadata {
    roles?: GlobalRole[];
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    imports: [
        TranslateModule,
        AsyncPipe,
        ...EUI_LAYOUT,
        ...EUI_ICON,
        ...EUI_USER_PROFILE,
        ...EUI_LANGUAGE_SELECTOR,
        ...EUI_BREADCRUMB,
    ],
    providers: [EuiBreadcrumbService],
})
export class LayoutComponent implements OnInit, OnDestroy {
    private readonly authService = inject(AuthService);
    private readonly permissionService = inject(PermissionService);
    private readonly projectContext = inject(ProjectContextService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly destroy$ = new Subject<void>();
    private readonly translate = inject(TranslateService);
    readonly breadcrumbService = inject(EuiBreadcrumbService);

    userRole = '';

    sidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [];
    private currentProject: Project | null = null;
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];

    ngOnInit(): void {
        // User profile already loaded by AppStarterService — read cached role
        this.userRole = this.permissionService.getOriginalRole();
        this.filterSidebarItems();

        this.projectContext.currentProject$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.currentProject = project;
            this.buildSidebar(project);
            this.cdr.markForCheck();
        });

        // Rebuild sidebar labels when language changes
        this.translate.onLangChange.pipe(
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.buildSidebar(this.currentProject);
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    logout(): void {
        this.permissionService.clear();
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }

    private filterSidebarItems(): void {
        const allItems: EuiMenuItem<SidebarItemMetadata>[] = [
            { label: this.translate.instant('nav.home'), url: 'screen/home' },
            { label: this.translate.instant('nav.tickets'), url: 'screen/tickets' },
            { label: this.translate.instant('nav.projects'), url: 'screen/projects' },
            { label: this.translate.instant('nav.users'), url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } },
        ];
        this.sidebarItems = allItems.filter(item => {
            const roles = item.metadata?.roles;
            if (!roles || roles.length === 0) {
                return true;
            }
            return this.permissionService.hasGlobalRole(...roles);
        });
    }

    private buildSidebar(project: Project | null): void {
        if (project) {
            const base = `screen/projects/${project.id}`;
            this.sidebarItems = [
                { label: this.translate.instant('nav.all-projects'), url: 'screen/projects' },
                { label: this.translate.instant('nav.dashboard'), url: base },
                { label: this.translate.instant('nav.members'), url: `${base}/members` },
                { label: this.translate.instant('nav.backlog'), url: `${base}/backlog` },
                { label: this.translate.instant('nav.sprints'), url: `${base}/sprints` },
                { label: this.translate.instant('nav.board'), url: `${base}/board` },
                { label: this.translate.instant('nav.settings'), url: `${base}/settings` },
            ];
        } else {
            this.filterSidebarItems();
        }
    }
}
