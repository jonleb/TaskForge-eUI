import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
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
    readonly breadcrumbService = inject(EuiBreadcrumbService);

    userRole = '';

    private readonly allSidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [
        { label: 'Home', url: 'screen/home' },
        { label: 'Projects', url: 'screen/projects' },
        { label: 'Users', url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } },
    ];
    sidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [];
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];

    ngOnInit(): void {
        // User profile already loaded by AppStarterService — read cached role
        this.userRole = this.permissionService.getGlobalRole();
        this.filterSidebarItems();

        this.projectContext.currentProject$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(project => {
            this.buildSidebar(project);
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
        this.sidebarItems = this.allSidebarItems.filter(item => {
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
                { label: '← All Projects', url: 'screen/projects' },
                { label: 'Dashboard', url: base },
                { label: 'Backlog', url: `${base}/backlog` },
                { label: 'Board', url: `${base}/board` },
                { label: 'Settings', url: `${base}/settings` },
            ];
        } else {
            this.filterSidebarItems();
        }
    }
}
