import { Component, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { EuiGrowlService } from '@eui/core';
import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    selector: 'file-types',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_POPOVER,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class FileTypesComponent {
    @ViewChild('popover') popover: EuiPopoverComponent;

    selectedIcon: string;
    selectedSet: 'eui' | 'sharp' | 'outline' = 'eui';
    selectedSize = 'm';
    selectedColor = 'neutral';
    selectedDescription = '';

    euiFileTypes = [
        { type: 'archive', sprite: 'eui-file-archive', fill: 'accent-dark' },
        { type: 'audio', sprite: 'eui-file-audio', fill: 'info' },
        { type: 'code', sprite: 'eui-file-code', fill: '' },
        { type: 'cpp', sprite: 'eui-file-cpp', fill: '' },
        { type: 'css', sprite: 'eui-file-css', fill: '' },
        { type: 'csv', sprite: 'eui-file-csv', fill: '' },
        { type: 'doc', sprite: 'eui-file-doc', fill: 'primary', description: 'MS Office Word text file' },
        { type: 'download', sprite: 'eui-file-download', fill: '' }, // file-arrow-down:regular
        { type: 'empty', sprite: 'eui-file-empty', fill: '' },
        { type: 'html', sprite: 'eui-file-html', fill: '' },
        { type: 'image', sprite: 'eui-file-image', fill: 'success' },
        { type: 'image/jpeg', sprite: 'eui-file-jpg', fill: '' },
        { type: 'markdown', sprite: 'eui-file-md', fill: '' },
        { type: 'odp', sprite: 'eui-file-odp', fill: 'danger-light', description: 'OpenDocument Presentation file (Open/Libre Office)' },
        { type: 'odt', sprite: 'eui-file-odt', fill: 'primary', description: 'OpenDocument Text file (Open/Libre Office)' },
        { type: 'ods', sprite: 'eui-file-ods', fill: 'success-light', description: 'OpenDocument Spreadsheet file (Open/Libre Office)' },
        { type: 'pdf', sprite: 'eui-file-pdf', fill: 'danger' },
        { type: 'image/png', sprite: 'eui-file-png', fill: '' },
        { type: 'ppt', sprite: 'eui-file-ppt', fill: 'danger-light', description: 'MS Office Powerpoint presentation file' },
        { type: 'image/svg', sprite: 'eui-file-svg', fill: '' },
        { type: 'text', sprite: 'eui-file-text', fill: '' },
        { type: 'txt', sprite: 'eui-file-txt', fill: '' },
        { type: 'upload', sprite: 'eui-file-upload', fill: '' },
        { type: 'video', sprite: 'eui-file-video', fill: 'warning' },
        { type: 'x', sprite: 'eui-file-x', fill: 'warning' },
        { type: 'excel', sprite: 'eui-file-xls', fill: 'success-light', description: 'MS Office Excel spreadsheet file' },
        { type: 'zip', sprite: 'eui-file-zip', fill: '' },
    ];

    constructor( private clipboard: Clipboard,
                 public growlService: EuiGrowlService, ) {
    }

    public copySourceToClipboard( icon: any, set?: any, size?: any, hue?: any ) {
        let code: string = '<eui-icon-svg icon="' + icon;
        if (this.selectedSet !== 'eui') {
            code += ':' + this.selectedSet;
        }
        if (this.selectedSize !== 'm') {
            code += '" size="' + this.selectedSize;
        }
        if (this.selectedColor !== 'neutral') {
            code += '" fillColor="' + this.selectedColor;
        }
        code += '" />';
        this.clipboard.copy(code);
        this.growlService.growlInfo('The code source has been successfully copied to clipboard.');
    }
    public openPopover(e: any, icon?: any, set?: any, size?: any, hue?: any, description?: any) {
        this.selectedIcon = icon;
        this.selectedSet = set;
        this.selectedSize = size;
        this.selectedColor = hue;
        this.selectedDescription = description;
        this.popover.openPopover(e.target);
    }
}
