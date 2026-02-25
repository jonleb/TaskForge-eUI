import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'has-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class HasIconsComponent {

    public sidebarItems: EuiMenuItem[] = [
        { label: 'Item 1', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular' },
        { label: 'Item 2', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular' },
        { label: 'Item 3', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular' },
        { label: 'Item 4', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular', visible: false },
        { label: 'Item 5 - custom icon', url: 'INTERNAL ROUTE TO BE SET', iconSvgUrl: 'assets/images/eui-logo.svg', iconTypeClass: 'neutral-light' },
        { label: 'Category section (no url)' },
        { label: 'Programming', expanded: true,
            children: [
                { label: 'Programme 1', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'secondary' },
                { label: 'Programme 2', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Programme 3 disabled', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];

    constructor() {}
}
