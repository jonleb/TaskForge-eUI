import { Component, Injector, OnInit } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from '@eui/components/eui-alert';

import { FakeService } from './service';
import { DummyBodyWithProvidersServiceComponent } from '../../dummy-components/dummy-body-with-providers-service-component';

@Component({
    // eslint-disable-next-line
    selector: 'providers-service',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_ALERT,
    ],
    providers: [
        FakeService,
    ],
})
export class ProvidersServiceComponent implements OnInit {

    constructor(private euiDialogService: EuiDialogService, private fakeService: FakeService, private injector: Injector) {}

    ngOnInit(): void {
        this.fakeService.fake();
    }

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DummyBodyWithProvidersServiceComponent,
            },
        });

        this.euiDialogService.openDialog(config, this.injector);
    }

}
