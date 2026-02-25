import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiMenuItem } from '@eui/components/eui-menu';
import { EUI_LAYOUT } from '@eui/components/layout';
import { AuthService, PermissionService } from '../core/auth';

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

    userRole = '';

    sidebarItems: EuiMenuItem[] = [
        { label: 'Home', url: 'screen/home' },
        { label: 'Module 1', url: 'screen/module1', children: [
            { label: 'page 1', url: 'screen/module1/page1' },
            { label: 'page 2', url: 'screen/module1/page2' },
        ] },
        { label: 'Module 2', url: 'screen/module2' },
    ];
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
            },
            error: () => this.userRole = '',
        });
    }

    logout(): void {
        this.permissionService.clear();
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
}
