import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    selector: 'one-comp',
    template: '111',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
})
export class OneComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('with-component: init component 1');
    }
    ngOnDestroy() {
        console.log('with-component: destroy component 1');
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
        console.log('with-component: init component 2');
    }
    ngOnDestroy() {
        console.log('with-component: destroy component 2');
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
        console.log('with-component: init component 3');
    }
    ngOnDestroy() {
        console.log('with-component: destroy component 3');
    }
}

@Component({
    selector: 'with-component',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_TABS,
        OneComponent,
        TwoComponent,
        ThreeComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithComponentComponent {

}
