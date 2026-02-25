import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    selector: 'with-tags',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class WithTagsComponent {

    public isCollapsed = false;

    public sidebarItems: EuiMenuItem[] = [
        { label: 'Notifications', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'eui-notifications', iconTypeClass: 'primary', tagLabel: '99k', tagTypeClass: 'info' },
        { label: 'Likes', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'circle-dashed:regular', iconTypeClass: 'danger', tagLabel: '115k', tagTypeClass: 'danger' },
        { label: 'Starred', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'eui-star-fill', iconTypeClass: 'accent', tagLabel: '50k', tagTypeClass: 'accent' },
        { label: 'Completed', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'circle-dashed:regular', iconTypeClass: 'success', tagLabel: '50', tagTypeClass: 'success' },
        { label: 'Warnings', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', disabled: true, iconSvgName: 'circle-dashed:regular', iconTypeClass: 'warning', tagLabel: '2', tagTypeClass: 'warning' },
    ];

    public onToggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
