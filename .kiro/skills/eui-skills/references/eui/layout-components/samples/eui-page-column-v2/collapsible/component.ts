import { Component } from '@angular/core';

import { EUI_PAGE } from '@eui/components/eui-page-v2';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'is-collapsible',
    templateUrl: './component.html',
    imports: [...EUI_PAGE, ...EUI_SIDEBAR_MENU, ...EUI_SLIDE_TOGGLE, ...EUI_SHOWCASE],
})
export class ColumnCollapsibleComponent {

    public isColumnCollapsed = false;

    public sidebarItems = [
        { label: 'Item 1', url: 'dummy-route-1', iconSvgName: 'eui-state-info', iconTypeClass: "primary" },
        { label: 'Item 2', url: 'dummy-route-2', iconSvgName: 'eui-state-warning', iconTypeClass: "warning" },
        { label: 'Item 3', url: 'dummy-route-3', iconSvgName: 'eui-state-danger', iconTypeClass: "danger" },
        { label: 'Item 4', url: 'dummy-route-4', iconSvgName: 'eui-state-success', iconTypeClass: "success" },
    ];

    public onToggleColumnCollapsed(event: boolean) {
        this.isColumnCollapsed = event;
    }
}
