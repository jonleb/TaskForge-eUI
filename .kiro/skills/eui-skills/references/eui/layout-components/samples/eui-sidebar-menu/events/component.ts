import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    // tslint:disable-next-line
    selector: 'events',
    templateUrl: 'component.html',
    imports: [
        JsonPipe,
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class EventsComponent {
    public itemClicked: EuiMenuItem = {};
    public itemClicked2: EuiMenuItem = {};
    public isCollapsed = false;

    public sidebarItems: EuiMenuItem[] = [
        { label: "Home", iconSvgName: "eui-home", iconTypeClass: 'neutral-light', url: "screen/home" },
        {
            label: "Execute command",
            iconSvgName: "eui-star-fill",
            iconTypeClass: 'neutral-light',
            command: () => {
                alert("Command executed");
            },
        },
        {
            label: 'Execute command with action icon',
            iconSvgName: "eui-star-fill",
            iconTypeClass: 'neutral-light',
            command: () => {
                alert('Command executed');
            },
            actionIcon: {
                label: 'test',
                icon: 'eui-arrow-right',
                color: 'info',
                action: () => alert('Action icon clicked'),
            }
        },
        { label: 'External url - target: _blank (default)', urlExternal: 'https://www.google.com', urlExternalTarget: '_blank', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'External url - target: _parent', urlExternal: 'https://www.google.com', urlExternalTarget: '_parent', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'With children' },
        {
            label: 'Programming',
            iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light',
            actionIcon: { label: 'test', color: 'primary', icon: 'eui-arrow-right', action: () => alert('Clicked Action Icon') },
            children: [
                { label: 'Programme intro', actionIcon: { label: 'test', color: 'primary', icon: 'eui-ellipsis-vertical', action: () => alert('Clicked Action Icon')} },
                { label: 'Programme 1', url: './programme1', iconSvgName: 'file:regular', iconTypeClass: 'info' },
                { label: 'Programme 2', url: './programme2', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Programme 3 disabled', url: './programme3', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];

    public sidebarItemsProg = [
        { label: 'label 1 default active', link: true, active: true, id: 'id1' },
        { label: 'label 2', link: true, id: 'id2' },
        { label: 'label 3', link: true, id: 'id3' },
    ];

    public onSidebarItemClicked(item: EuiMenuItem): void {
        // this.itemClicked = item;
        console.log('item clicked', item);
    }

    public onSidebarItemClicked2(item: EuiMenuItem): void {
        // this.itemClicked2 = item;
        console.log('item clicked', item);
    }

    public onToggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
