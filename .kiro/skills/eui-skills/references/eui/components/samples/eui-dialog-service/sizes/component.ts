import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SELECT } from "@eui/components/eui-select";

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_SELECT,
        ...EUI_DIALOG,
    ],
    styles: ['ul li {list-style: initial}'],
})
export class SizesComponent {

    public dialogHeight = '50vh';
    public dialogWidth = '50vw';
    public hasMobileCustomSize = false;
    public optionsHeight = [
        { value: '', label: 'auto' },
        { value: '25vh', label: '25vh' },
        { value: '50vh', label: '50vh' },
        { value: '75vh', label: '75vh' },
        { value: '100vh', label: '100vh' },
    ];
    public optionsWidth = [
        { value: '', label: 'auto' },
        { value: '25vw', label: '25vw' },
        { value: '50vw', label: '50vw' },
        { value: '75vw', label: '75vw' },
        { value: '100vw', label: '100vw' },
    ];

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog with dynamic height & width sizes',
            content: 'Dialog content',
            height: this.dialogHeight,
            width: this.dialogWidth,
        });

        this.euiDialogService.openDialog(config);
    }

    public openCustomSizeWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Custom size Dialog',
            content: 'Dialog content',
            height: 'auto',
            width: '320px',
            hasMobileCustomSize: true,
        });

        this.euiDialogService.openDialog(config);
    }

    public openFullScreenWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Fullscreen Dialog',
            content: 'Dialog content screen',
            isFullScreen: true,
        });

        this.euiDialogService.openDialog(config);
    }

    public onHeightChange(target: EventTarget): void {
        this.dialogHeight = (target as HTMLSelectElement).value;
    }

    public onWidthChange(target: EventTarget): void {
        this.dialogWidth = (target as HTMLSelectElement).value;
    }
}
