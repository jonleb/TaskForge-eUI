import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
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
        console.log('add-tab: init dummy component: ' + this.content);
    }
    ngOnDestroy() {
        console.log('add-tab: destroy dummy component: ' + this.content);
    }
}

@Component({
    selector: 'add-tab',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_TABS,
        DummyComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTabComponent {
    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3' },
    ];

    public addTab(): void {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        this.tabs.push({ tabLabel: 'Tab xx ' + randomId, tabSubLabel: 'Tab xx Sublabel ' + randomId, tabContent: 'Content xx ' + randomId });
    }

}
