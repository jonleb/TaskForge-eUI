import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {

    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'euiPrimary', tabContent: 'euiPrimary', variant: 'primary' },
        { tabLabel: 'Tab 2', tabSubLabel: 'euiSecondary', tabContent: 'euiSecondary', variant: 'secondary' },
        { tabLabel: 'Tab 3', tabSubLabel: 'euiInfo', tabContent: 'euiInfo', variant: 'info' },
        { tabLabel: 'Tab 4', tabSubLabel: 'euiSuccess', tabContent: 'euiSuccess', variant: 'success' },
        { tabLabel: 'Tab 5', tabSubLabel: 'euiWarning', tabContent: 'euiWarning', variant: 'warning' },
        { tabLabel: 'Tab 6', tabSubLabel: 'euiDanger', tabContent: 'euiDanger', variant: 'danger' },
    ];

}
