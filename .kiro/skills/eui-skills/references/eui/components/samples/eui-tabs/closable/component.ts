import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { EUI_TABS, EuiTabComponent } from "@eui/components/eui-tabs";
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'one-comp',
    template: '111',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class OneComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('closable: init component 1');
    }
    ngOnDestroy() {
        console.log('closable: destroy component 1');
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
        console.log('closable: init component 2');
    }
    ngOnDestroy() {
        console.log('closable: destroy component 2');
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
        console.log('closable: init component 3');
    }
    ngOnDestroy() {
        console.log('closable: destroy component 3');
    }
}

@Component({
    selector: 'closable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_TABS,
        OneComponent,
        TwoComponent,
        ThreeComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosableComponent {
    public activeTabIndex = 0;
    public isClosable = true;

    public onTabActivated(e: { tab: EuiTabComponent; index: number }) {
        this.activeTabIndex = e.index;
    }

    public onTabClosed(e: { tab: EuiTabComponent; index: number }): void {
        console.log('onTabClosed', e);
    }

    public toggleClosable(): void {
        this.isClosable = !this.isClosable;
    }

}
