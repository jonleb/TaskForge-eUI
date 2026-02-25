---
description: Creates many tabs to trigger scrolling, with add/close actions and active index controls.
id: scrollable-tabs
---

```html
<eui-tabs (tabClose)="onTabClosed($event)" [activeTabIndex]="activeTabIndex">
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [id]="tab.id" #scrollabletab isClosable>
            <eui-tab-header>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
            </eui-tab-header>
            <eui-tab-body>
                @if (scrollabletab.isActive) {
                    <dummy-comp [content]="tab.tabContent" />
                }
            </eui-tab-body>
        </eui-tab>
    }
</eui-tabs>
<button euiButton euiSizeS (click)="addTab()">Add a tab</button><br/>
<br/>
@for(_ of nbTab; let i = $index; track $index) {
    <button euiButton euiSizeS (click)="activeTabIndex = i" class="eui-u-mb-2xs eui-u-mr-2xs">Change activeTabIndex to {{ i }}</button>
}
```

```typescript
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, input } from '@angular/core';

import { EUI_TABS, EuiTabComponent } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'dummy-comp',
    template: '{{ content() }}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class DummyComponent implements OnInit, OnDestroy {
    readonly content = input('');

    ngOnInit() {
        console.log('scrollable-tabs: init dummy component: ' + this.content());
    }
    ngOnDestroy() {
        console.log('scrollable-tabs: destroy dummy component: ' + this.content());
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
```

