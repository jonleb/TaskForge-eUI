import { AfterContentInit, Component, inject } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EuiAppShellService, EuiMenuItem } from '@eui/core';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_ALERT,
    ],
})
export class DefaultComponent implements AfterContentInit {
    private asService = inject(EuiAppShellService);

    menuItems: EuiMenuItem[] = [
        { label: 'Home', url: './home', iconSvgName: 'eui-home' },
        { label: 'Module 1 (Misc items)', iconSvgName: 'circle-dashed:regular', children: [
            { label: 'disabled item', disabled: true },
            { label: 'Page 1', url: './module1/page1', command: () => {
                alert('Command Executed');
            } },
            { label: 'Page 2 with icon and long text label', iconSvgName: 'user:regular' },
            { label: 'Page 3 with icon, very long text label and sub-menu items', iconSvgName: 'user:regular', children: [
                { label: 'Item 1', url: '', iconSvgName: 'folder-open:regular' },
                { label: 'Item 2 with long text label is displayed on multiple lines', url: '', iconSvgName: 'folder-open:regular' },
                { label: 'Item 3', url: '', iconSvgName: 'folder-open:regular' },
            ]},
            { label: 'Page 4', url: './module1/page1', command: () => {
                alert('Command Executed');
            } },
            { label: 'Page 5 should be hidden', url: './module1/page1', visible: false, command: () => {
                alert('Command Executed');
            } },
        ]},
        { label: 'Module 2 (external links)', active: false, children: [
            { label: 'External page _blank target', urlExternal: 'https://google.com', urlExternalTarget: '_blank', iconSvgName: 'user:regular' },
            { label: 'External page _parent target', urlExternal: 'https://google.com', urlExternalTarget: '_parent', iconSvgName: 'user:regular' },
        ]},
        { label: 'Module 3', children: [
            { label: 'Page 1', iconSvgName: 'user:regular', children: [
                { label: 'Item 1', url: '', iconSvgName: 'folder-open:regular' },
                { label: 'Item 2 with long text label is displayed on multiple lines', url: '', iconSvgName: 'folder-open:regular' },
                { label: 'Item 3', url: '', iconSvgName: 'folder-open:regular' },
            ]},
            { label: 'Page 2', iconSvgName: 'user:regular' },
        ] },
        { label: 'Module 4 (disabled)', disabled: true },
        { label: 'Module 5 with very long label', children: [
            { label: 'Page 1 with icon and long text label', iconSvgName: 'user:regular', url: './module1/page1', command: () => {
                alert('Command Executed');
            } },
            { label: 'Page 2 with icon and long text label', iconSvgName: 'user:regular' },
            { label: 'Page 3 with icon, long text label and sub-menu items', iconSvgName: 'user:regular'},
        ]},
        { label: 'Module 6 (iconSvgUrl)', iconSvgUrl: 'assets/images/eui-logo.svg' },
    ];

    // don't use this, it's just for demo purposes
    ngAfterContentInit(): void {
        this.asService.setState({
            ...this.asService.state,
            hasHeader: true,
        });
    }
}
