import { Component, ChangeDetectionStrategy, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { EUI_TABS, EuiTabComponent, EuiTabsComponent } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'one-comp',
    template: '111',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class OneComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('using-router: init component 1');
    }
    ngOnDestroy() {
        console.log('using-router: destroy component 1');
    }
}

@Component({
    selector: 'two-comp',
    template: '222',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class TwoComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('using-router: init component 2');
    }
    ngOnDestroy() {
        console.log('using-router: destroy component 2');
    }
}

@Component({
    selector: 'three-comp',
    template: '333',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class ThreeComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('using-router: init component 3');
    }
    ngOnDestroy() {
        console.log('using-router: destroy component 3');
    }
}

@Component({
    selector: 'using-router',
    templateUrl: 'component.html',
    imports: [
        RouterModule,
        ...EUI_LABEL,
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsingRouterComponent {

    public activeTabIndex = 0;

    @ViewChild('euiTabs') euiTabs: EuiTabsComponent;

    constructor(private router: Router) {}

    public tabs = [
        { id: '1', tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1', url: '/style-guide/components/eui-tabs/tab-1' },
        { id: '2', tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2', url: '/style-guide/components/eui-tabs/tab-2' },
        { id: '3', tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3', url: '/style-guide/components/eui-tabs/tab-3' },
    ];

    ngOnInit(): void {
        this.activeTabIndex = this.tabs.findIndex(tab => tab.url === this.router.url) >= 0 ? this.tabs.findIndex(tab => tab.url === this.router.url) : 0;
        console.log(this.activeTabIndex)
    }

    public onTabClicked(e: { tab: EuiTabComponent; index: number }): void {
        this.router.navigateByUrl(this.tabs[e.index].url);
    }

}
