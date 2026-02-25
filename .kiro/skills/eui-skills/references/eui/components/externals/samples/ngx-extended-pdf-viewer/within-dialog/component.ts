import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: 'within-dialog',
    templateUrl: 'component.html',
    imports: [NgxExtendedPdfViewerModule, ...EUI_BUTTON, ...EUI_DIALOG],
    providers: [
        EuiDialogService,
    ],    
})
export class WithinDialogComponent {
    filepathNeme: string;

    @ViewChild('dialog') dialog: EuiDialogComponent;
    @Output() dialogOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

    public openDialog(): void {
        this.dialogOpen.emit(true);
        this.filepathNeme = 'assets/test_pdf.pdf';
        this.dialog.openDialog();
    }

    onClose() {
        this.filepathNeme = undefined;
        this.dialogOpen.emit(false);
    }

}
