import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'closing',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class ClosingComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService1(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnEscape: false,
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService2(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnClickOutside: true,
        });

        this.euiDialogService.openDialog(config);
    }

    public openWithService3(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasCloseButton: false,
        });

        this.euiDialogService.openDialog(config);
    }
}
