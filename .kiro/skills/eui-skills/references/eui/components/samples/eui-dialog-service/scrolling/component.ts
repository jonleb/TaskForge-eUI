import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

import { DummyTextComponent } from '../../dummy-components/dummy-text.component';

@Component({
    selector: 'scrolling',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class ScrollingComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        this.euiDialogService.openDialog(new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DummyTextComponent,
            },
            height: '30vh',
        }));
    }
}
