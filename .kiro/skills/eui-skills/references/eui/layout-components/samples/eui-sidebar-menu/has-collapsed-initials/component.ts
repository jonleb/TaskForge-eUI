import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'has-collapsed-initials',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class HasCollapsedInitialsComponent {

    public isCollapsed = false;
    public isCollapsed2 = false;

    public sidebarItems: EuiMenuItem[] = [
        { label: 'Item 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular' },
        { label: 'Item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular' },
        { label: 'Item 3', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular' },
        { label: 'Item 4', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', visible: false },
        { label: 'Category section label' },
        { label: 'Programming',
            children: [
                { label: 'Programme 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'secondary' },
                { label: 'Programme 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Programme 3 disabled', url: 'INTERNAL ROUTE TO BE SET', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];

    public sidebarItemsIconSvgTypeClass: EuiMenuItem[] = [
        { label: 'Item 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'accent' },
        { label: 'Item 3', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'success' },
        { label: 'Item 4', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'warning', visible: false },
        { label: 'Category section label' },
        { label: 'Programming', iconSvgName: 'bag:regular', iconTypeClass: 'info',
            children: [
                { label: 'Programme 1', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'secondary' },
                { label: 'Programme 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
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
