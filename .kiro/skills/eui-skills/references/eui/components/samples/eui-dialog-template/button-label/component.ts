import { Component, ViewChild } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class ButtonLabelComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor(private translateService: TranslateService) {}

    public openDialog(): void {
        this.dialog.openDialog();
    }

    onDialogButtonClick(): void {
        this.translateService.use(this.translateService.currentLang === 'fr' ? 'en' : 'fr');
    }
}
