import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";

@Component({
    selector: 'is-flat',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class isFlatComponent {

    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3' },
    ];
}
