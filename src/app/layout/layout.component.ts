import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiMenuItem } from '@eui/components/eui-menu';
import { EUI_LAYOUT } from '@eui/components/layout';
import { AuthService, GlobalRole, PermissionService } from '../core/auth';

interface SidebarItemMetadata {
    roles?: GlobalRole[];
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    imports: [
        TranslateModule,
        ...EUI_LAYOUT,
        ...EUI_ICON,
        ...EUI_USER_PROFILE,
        ...EUI_LANGUAGE_SELECTOR,
    ],
})
export class LayoutComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly permissionService = inject(PermissionService);
    private readonly router = inject(Router);
    private readonly cdr = inject(ChangeDetectorRef);

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
        this.authService.getCurrentUser().subscribe({
            next: profile => {
                this.userRole = profile.role;
                this.permissionService.setUser(profile);
                this.filterSidebarItems();
                this.cdr.markForCheck();
            },
            error: () => {
                this.userRole = '';
                this.filterSidebarItems();
                this.cdr.markForCheck();
            },
        });
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
}
