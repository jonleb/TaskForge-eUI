import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    selector: 'with-icon-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
        ...EUI_ICON,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconBadgeComponent {

    public tabs = [
        { tabLabel: 'Tab 2', tabSubLabel: 'euiPrimary', tabContent: 'euiPrimary', variant: 'primary', icon: 'eui-state-info' },
        { tabLabel: 'Tab 2', tabSubLabel: 'euiSecondary', tabContent: 'euiSecondary', variant: 'secondary', icon: 'eui-state-info' },
        { tabLabel: 'Tab 3', tabSubLabel: 'euiInfo', tabContent: 'euiInfo', variant: 'info', icon: 'eui-state-info' },
        { tabLabel: 'Tab 4', tabSubLabel: 'euiSuccess', tabContent: 'euiSuccess', variant: 'success', icon: 'eui-state-success' },
        { tabLabel: 'Tab 5', tabSubLabel: 'euiWarning', tabContent: 'euiWarning', variant: 'warning', icon: 'eui-state-warning' },
        { tabLabel: 'Tab 6', tabSubLabel: 'euiDanger', tabContent: 'euiDanger', variant: 'danger', icon: 'eui-state-danger' },
    ];

}
