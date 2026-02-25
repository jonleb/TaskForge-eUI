import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';

import { EUI_TABS, EuiTabsComponent, EuiTabComponent } from "@eui/components/eui-tabs";
import { EuiMessageBoxConfig, EuiMessageBoxService } from '@eui/components/eui-message-box';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    selector: 'one-comp',
    template: '111',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
    providers: [
        EuiMessageBoxService,
    ],
})
export class OneComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('handle-close: init component 1');
    }
    ngOnDestroy() {
        console.log('handle-close: destroy component 1');
    }
}

@Component({
    selector: 'two-comp',
    template: '222',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
    providers: [
        EuiMessageBoxService,
    ],    
})
export class TwoComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('handle-close: init component 2');
    }
    ngOnDestroy() {
        console.log('handle-close: destroy component 2');
    }
}

@Component({
    selector: 'three-comp',
    template: '333',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'id': crypto.randomUUID() },
    providers: [
        EuiMessageBoxService,
    ],    
})
export class ThreeComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log('handle-close: init component 3');
    }
    ngOnDestroy() {
        console.log('handle-close: destroy component 3');
    }
}

@Component({
    selector: 'handle-activate',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_LABEL,
        ...EUI_TABS,
        OneComponent,
        TwoComponent,
        ThreeComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        EuiMessageBoxService,
    ],    
})
export class HandleActivateComponent {

    @ViewChild('euiTabsHandleActivate') euiTabsHandleActivate: EuiTabsComponent;

    private euiMessageBoxService: EuiMessageBoxService = inject(EuiMessageBoxService);

    onTabClick(e: { tab: EuiTabComponent; index: number }) {
        if (e.tab.isHandleActivateTab) {
            const config = new EuiMessageBoxConfig({
                title: 'Message',
                content: '<p class="eui-u-text-paragraph">Do you want to open this tab ?</p>',
                accept: () => {
                    this.euiTabsHandleActivate.activateTab(e.index);
                },
            });

            this.euiMessageBoxService.openMessageBox(config);
        }
    }

}
