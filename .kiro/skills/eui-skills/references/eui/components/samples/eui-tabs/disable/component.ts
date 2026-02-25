import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';

import { EUI_TABS, EuiTabsComponent, EuiTabComponent } from "@eui/components/eui-tabs";
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'dummy-comp',
    template: '{{ content }}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class DummyComponent implements OnInit, OnDestroy {
    @Input() content = '';

    ngOnInit() {
        console.log('disable: init dummy component: ' + this.content);
    }
    ngOnDestroy() {
        console.log('disable: destroy dummy component: ' + this.content);
    }
}

@Component({
    selector: 'disable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_TABS,
        DummyComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisableComponent {

    public isDisabled = true;
    public activeTabIndex = 0;

    @ViewChild('euiTabs') euiTabs: EuiTabsComponent;

    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3' },
    ];

    public toggleDisable(): void {
        this.isDisabled = !this.isDisabled;

        if (this.activeTabIndex === 1 || this.activeTabIndex === 2) {
            this.euiTabs.activateTab(0);
        }
    }

    public onTabActivated(e: { tab: EuiTabComponent; index: number }) {
        this.activeTabIndex = e.index;
    }

}
