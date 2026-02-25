import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS, EuiTabComponent } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {

    public tabs = [
        { tabLabel: 'Tab 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabContent: 'Content 3' },
    ];

    public onTabActivated(e: { tab: EuiTabComponent; index: number }): void {
        console.log('onTabActivated', e);
    }

    public onTabClosed(e: { tab: EuiTabComponent; index: number }): void {
        console.log('onTabClosed', e);
    }

    public onTabClicked(e: { tab: EuiTabComponent; index: number }): void {
        console.log('onTabClicked', e);
    }

}
