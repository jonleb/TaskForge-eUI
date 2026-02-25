import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'icon-svg',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class IconSvgComponent {

    public isCollapsed = false;
    public isCollapsed2 = false;

    public sidebarItemsIconSvg: EuiMenuItem[] = [
        { label: 'Item 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular' },
        { label: 'Item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular' },
        { label: 'Item 3', iconSvgName: 'bag:regular',
            children: [
                { label: 'Programme 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular' },
                { label: 'Programme 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular' },
                { label: 'Programme 3 disabled', url: 'INTERNAL ROUTE TO BE SET', disabled: true, iconSvgName: 'file:regular' },
            ],
        },
    ];

    public sidebarItemsIconSvgTypeClass: EuiMenuItem[] = [
        { label: 'Item 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'secondary' },
        { label: 'Item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'accent' },
        { label: 'Item 3', iconSvgName: 'bag:regular', iconTypeClass: 'info',
            children: [
                { label: 'Programme 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'success' },
                { label: 'Programme 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'danger' },
                { label: 'Programme 3 disabled', url: 'INTERNAL ROUTE TO BE SET', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];

    public onToggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    public onToggleCollapsed2(): void {
        this.isCollapsed2 = !this.isCollapsed2;
    }
}
