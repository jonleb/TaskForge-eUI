import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    // tslint:disable-next-line
    selector: 'has-action-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class HasActionIconsComponent {

    // tslint:disable:max-line-length
    public sidebarItems: EuiMenuItem[] = [
        {
            label: 'Home',
            url: '.',
            actionIcon: {
                label: 'test',
                icon: 'eui-arrow-right',
                color: 'info-100',
                action: () => alert('Action icon clicked'),
            }
        },
        { label: 'Module 1', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', actionIcon: { label: 'test', color: 'primary', icon: 'eui-ecl-data', action: () => alert('Clicked Action Icon') }, },
        { label: 'Module 2', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', actionIcon: { label: 'test', color: 'accent', icon: 'eui-ecl-package', action: () => alert('Clicked Action Icon') }, },
        { label: 'Module 3', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', actionIcon: { label: 'test', color: 'danger', icon: 'eui-search', action: () => alert('Clicked Action Icon') }, },
        { label: 'Module 4', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', visible: false, actionIcon: { label: 'test', color: 'success', icon: 'eui-arrow-right', action: () => alert('Clicked Action Icon') }, },
        { label: 'With children' },
        { label: 'Programming',
            children: [
                { label: 'Programme intro', actionIcon: { label: 'test', color: 'success', icon: 'eui-edit', action: () => this.actionClicked } },
                {
                    label: 'Programme 1',
                    urlExternal: 'https://www.google.com',
                    urlExternalTarget: '_blank',
                    iconTypeClass: 'secondary',
                    actionIcon: {
                        label: 'test',
                        icon: 'eui-delete',
                        color: 'danger',
                        action: () => alert('Action icon clicked'),
                    },
                },
                {
                    label: 'Programme 2',
                    urlExternal: 'https://www.google.com',
                    urlExternalTarget: '_blank',
                    iconTypeClass: 'accent',
                    actionIcon: {
                        label: 'test',
                        icon: 'eui-info',
                        color: 'info',
                        action: () => alert('Action icon clicked'),
                    },
                },
                {
                    label: 'Programme 3 disabled',
                    urlExternal: 'https://www.google.com',
                    urlExternalTarget: '_blank',
                    disabled: true,
                    iconTypeClass: 'warning',
                    actionIcon: {
                        label: 'test',
                        icon: 'eui-alert',
                        color: 'accent',
                        action: () => alert('Action icon clicked'),
                    },
                },
            ],
            actionIcon: {
                label: 'test',
                icon: 'eui-add',
                color: 'grey',
                action: () => alert('Action icon clicked'),
            },
        },
    ];

    actionClicked(event) {
        window.alert(`Action Item Clicked: ${event.toString()}`);
    }

}
