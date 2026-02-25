import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ],
})
export class DefaultComponent {
    public sidebarItems: EuiMenuItem [] = [
        { label: 'Root item 1', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Root item 2', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Category section label' },
        { label: 'Root item 3', url: 'INTERNAL ROUTE TO BE SET', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Root item 4 with childs',
            children: [
                { label: 'Item 1', url: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'warning' },
                { label: 'Item 2', url: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Item 3 -disabled', url: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];
}
