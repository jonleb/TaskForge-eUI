import { Component } from '@angular/core';

import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'custom-header-footer',
    templateUrl: './component.html',
    imports: [...EUI_PAGE, ...EUI_SHOWCASE, ...EUI_ICON, ...EUI_SIDEBAR_MENU, ...EUI_BUTTON],
})
export class CustomHeaderFooterComponent {
    public sidebarItems: EuiMenuItem[] = [
         { label: 'Item 1', url: 'dummy-route-1', iconSvgName: 'eui-state-info', iconTypeClass: "primary" },
         { label: 'Item 2', url: 'dummy-route-2', iconSvgName: 'eui-state-warning', iconTypeClass: "warning" },
         { label: 'Item 3', url: 'dummy-route-3', iconSvgName: 'eui-state-danger', iconTypeClass: "danger" },
         { label: 'Item 4', url: 'dummy-route-4', iconSvgName: 'eui-state-success', iconTypeClass: "success" },
    ];
}
