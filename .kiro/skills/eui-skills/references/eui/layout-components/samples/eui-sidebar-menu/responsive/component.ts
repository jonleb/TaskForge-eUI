import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EuiMenuItem } from '@eui/base';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SIDEBAR_MENU } from '@eui/components/eui-sidebar-menu';

@Component({
    // tslint:disable-next-line
    selector: 'responsive',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgFor,
        ...EUI_SIDEBAR_MENU,
        ...EUI_BUTTON,
    ],
})
export class ResponsiveComponent {
    // tslint:disable:max-line-length
    public sidebarItems: EuiMenuItem[] = [
        { label: 'Module 1', url: './module1', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Module 2', url: './module2', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { label: 'Module 3', url: './module3', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light' },
        { id: 'test', label: 'Module 4', url: './module4', iconSvgName: 'bag:regular', iconTypeClass: 'neutral-light', visible: false },
        { label: 'With children' },
        { label: 'Programming',
            children: [
                { label: 'Programme intro', url: '' },
                { label: 'Programme 1', url: './programme1', iconSvgName: 'file:regular', iconTypeClass: 'info' },
                { label: 'Programme 2', url: './programme2', iconSvgName: 'file:regular', iconTypeClass: 'accent' },
                { label: 'Programme 3 disabled', url: './programme3', disabled: true, iconSvgName: 'file:regular', iconTypeClass: 'warning' },
            ],
        },
    ];

    public menuSize = 6;
    public menuSizes = [
        { label: 'col-2', value: '2' },
        { label: 'col-4', value: '4' },
        { label: 'col-6', value: '6', default: true },
        { label: 'col-8', value: '8' },
        { label: 'col-10', value: '10' },
        { label: 'col-12', value: '12' },
    ];

    constructor() {}
}
