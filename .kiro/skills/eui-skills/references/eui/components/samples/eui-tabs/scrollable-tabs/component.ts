import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';

import { EUI_TABS, EuiTabComponent } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'dummy-comp',
    template: '{{ content }}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class DummyComponent implements OnInit, OnDestroy {
    @Input() content = '';

    ngOnInit() {
        console.log('scrollable-tabs: init dummy component: ' + this.content);
    }
    ngOnDestroy() {
        console.log('scrollable-tabs: destroy dummy component: ' + this.content);
    }
}

@Component({
    selector: 'scrollable-tabs',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_TABS,
        DummyComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollableTabsComponent {

    public activeTabIndex = 0;
    public adjectives = ["Awesome", "Bright", "Creative", "Dynamic", "Energetic"];
    public nouns = ["Tiger", "Eagle", "Panther", "Phoenix", "Dragon"];
    public subDescriptors = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
    public _nbTab = 10;
    public tabs = [];

    private id = 1;

    get nbTab(): number[] {
        return Array.from({ length: this._nbTab });
      }

    ngOnInit(): void {
        for (let i = 1; i <= this._nbTab; i++) {
            const randomAdjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
            const randomNoun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
            const randomSubDescriptor = this.subDescriptors[Math.floor(Math.random() * this.subDescriptors.length)];

            this.tabs.push({
                id: this.id,
                tabLabel: `${randomAdjective} ${randomNoun} ${i}`,
                tabSubLabel: `Tab Sublabel ${randomSubDescriptor} ${i}`,
                tabContent: `Content of the tab ${i}`,
            });

            this.id ++;
        }
    }

    public addTab(): void {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        this.tabs.push({ id: this.id, tabLabel: 'Tab xx ' + randomId, tabSubLabel: 'Tab xx Sublabel ' + randomId, tabContent: 'Content xx ' + randomId });

        this.id ++;
    }

    public onTabClosed(e: { tab: EuiTabComponent; index: number }) {
        this.tabs = this.tabs.filter(t => t.id !== e.tab.id);
    }

}
