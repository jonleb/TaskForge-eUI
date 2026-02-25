import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { EuiAppShellService, EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_INPUT_CHECKBOX } from "@eui/components/eui-input-checkbox";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_RADIO } from "@eui/components/eui-input-radio";

@Component({
    // eslint-disable-next-line
    selector: 'specific-content',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_RADIO,
        FormsModule,
    ],
})
export class SpecificContentComponent {

    closeAllSticky = false;
    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = 'Summary title';
    messageDetail = 'Message details';

    constructor(
        private asService: EuiAppShellService,
        private euiGrowlService: EuiGrowlService,
    ) { }

    public showGrowl(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl({
            severity: type,
            summary: summary || this.summaryTitle,
            detail: inputMessage },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }

    public showGrowlFilled(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl(
            {
                severity: type,
                summary: summary || this.summaryTitle,
                detail: inputMessage,
                filled: true
            },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }

    public showGrowlLongText(type: string) {
        this.showGrowl(type, 'Information',
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ut dolor a fermentum. Praesent sagittis in massa sed aliquam. Sed at tincidunt mi, id cursus justo. Suspendisse lacinia elementum sem a malesuada. Integer nunc magna, congue eu dolor sed, tristique tincidunt ante. Cras consequat fringilla libero, vel tempor nulla ultrices ac. Maecenas ornare, odio aliquam pulvinar tempor, turpis risus porttitor magna, eget tempor velit ligula at tellus. Donec urna arcu, tristique et posuere ac, aliquam ut velit.

        Aliquam ut arcu nec elit lacinia ultricies. Sed sem enim, placerat nec laoreet sit amet, fringilla vel arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin porta ipsum eget leo gravida, pretium tempor libero malesuada. Morbi malesuada nulla sit amet dui consectetur, sed bibendum sapien lacinia. Nullam gravida eget urna eget ullamcorper. Sed porttitor ex eu diam volutpat, vel tempor nulla pulvinar. Cras cursus pulvinar magna, non condimentum lectus scelerisque at. Etiam et lacinia arcu. Vestibulum faucibus auctor leo eget commodo.

        Donec porttitor dolor et feugiat facilisis. Sed aliquet sed dolor vitae mollis. Aenean nec euismod magna. Maecenas mollis ligula odio, pretium sagittis dolor vehicula quis. Sed sollicitudin tincidunt luctus. Etiam ultricies ac dui quis ultricies. Vivamus congue ut nisi vitae sagittis. Phasellus sit amet eros egestas, suscipit turpis at, pulvinar ante. Vivamus accumsan erat sit amet bibendum eleifend. Fusce a quam quis ipsum vulputate porttitor. Pellentesque dapibus ante vitae felis convallis, gravida aliquam massa accumsan. Etiam vehicula sodales elit fringilla gravida. Sed mattis neque vel neque molestie, quis imperdiet odio vehicula.

        Mauris quis nunc cursus, fringilla massa ut, semper ante. Sed ac ligula gravida, condimentum risus id, porttitor metus. Nam et ligula tempor, laoreet massa vel, eleifend nisl. Curabitur at nunc vitae dui lobortis maximus quis non nisi. Curabitur ut est ut lacus ultrices scelerisque id vel tortor. Morbi luctus ex faucibus, mollis erat non, dapibus nulla. Suspendisse fermentum sit amet ex nec sagittis. Vivamus eu suscipit nunc.

        `
        );
    }

    public showGrowlNoContent(type: string) {
        this.showGrowl(type, 'Information', null);
    }
    public showGrowlFilledNoContent(type: string) {
        this.showGrowlFilled(type, 'Information', null);
    }

    public showGrowlFilledLongText(type: string) {
        this.showGrowlFilled(type, 'Information',
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ut dolor a fermentum. Praesent sagittis in massa sed aliquam. Sed at tincidunt mi, id cursus justo. Suspendisse lacinia elementum sem a malesuada. Integer nunc magna, congue eu dolor sed, tristique tincidunt ante. Cras consequat fringilla libero, vel tempor nulla ultrices ac. Maecenas ornare, odio aliquam pulvinar tempor, turpis risus porttitor magna, eget tempor velit ligula at tellus. Donec urna arcu, tristique et posuere ac, aliquam ut velit.

        Aliquam ut arcu nec elit lacinia ultricies. Sed sem enim, placerat nec laoreet sit amet, fringilla vel arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin porta ipsum eget leo gravida, pretium tempor libero malesuada. Morbi malesuada nulla sit amet dui consectetur, sed bibendum sapien lacinia. Nullam gravida eget urna eget ullamcorper. Sed porttitor ex eu diam volutpat, vel tempor nulla pulvinar. Cras cursus pulvinar magna, non condimentum lectus scelerisque at. Etiam et lacinia arcu. Vestibulum faucibus auctor leo eget commodo.

        Donec porttitor dolor et feugiat facilisis. Sed aliquet sed dolor vitae mollis. Aenean nec euismod magna. Maecenas mollis ligula odio, pretium sagittis dolor vehicula quis. Sed sollicitudin tincidunt luctus. Etiam ultricies ac dui quis ultricies. Vivamus congue ut nisi vitae sagittis. Phasellus sit amet eros egestas, suscipit turpis at, pulvinar ante. Vivamus accumsan erat sit amet bibendum eleifend. Fusce a quam quis ipsum vulputate porttitor. Pellentesque dapibus ante vitae felis convallis, gravida aliquam massa accumsan. Etiam vehicula sodales elit fringilla gravida. Sed mattis neque vel neque molestie, quis imperdiet odio vehicula.

        Mauris quis nunc cursus, fringilla massa ut, semper ante. Sed ac ligula gravida, condimentum risus id, porttitor metus. Nam et ligula tempor, laoreet massa vel, eleifend nisl. Curabitur at nunc vitae dui lobortis maximus quis non nisi. Curabitur ut est ut lacus ultrices scelerisque id vel tortor. Morbi luctus ex faucibus, mollis erat non, dapibus nulla. Suspendisse fermentum sit amet ex nec sagittis. Vivamus eu suscipit nunc.

        `
        );
    }

    public showGrowlHTML(type: string) {
        this.showGrowl(type, 'Information',
        `This is a <strong>rich Html message</strong> with <a class="eui-u-text-link" routerLink=".">internal link</a>
        and <a class="eui-u-text-link-external" href="https://google.com" target="_blank">link to external</a> page.
        <p class="eui-u-text-paragraph">
            Sample of long file name:
            <a class="eui-u-text-link-external" href="https://www.europarl.europa.eu/ftu/pdf/en/FTU_1.3.8.pdf" target="_blank">
            File_export_14_03_2024_ref_777_333_111_FTU_1.3.8.pdf
            </a>
        </p>
        <p class="eui-u-text-paragraph">You can also display some technical data using the <strong>code</strong> html tag. Example :</p>
        <code class="eui-u-text-code">` + JSON.stringify(this.asService.state.deviceInfo) + `</code>
        `);
    }
    public showGrowlFilledHTML(type: string) {
        this.showGrowlFilled(type, 'Information',
        `This is a <strong>rich Html message</strong> with <a class="eui-u-text-link" routerLink=".">internal link</a>
        and <a class="eui-u-text-link-external" href="https://google.com" target="_blank">link to external</a> page.
        <p class="eui-u-text-paragraph">
            Sample of long file name:
            <a class="eui-u-text-link-external" href="https://www.europarl.europa.eu/ftu/pdf/en/FTU_1.3.8.pdf" target="_blank">
            File_export_14_03_2024_ref_777_333_111_FTU_1.3.8.pdf
            </a>
        </p>
        <p class="eui-u-text-paragraph">You can also display some technical data using the <strong>code</strong> html tag. Example :</p>
        <code class="eui-u-text-code">` + JSON.stringify(this.asService.state.deviceInfo) + `</code>
        `);
    }

    public clearGrowl() {
        this.euiGrowlService.clearGrowl();
    }

    public showGrowlCallback(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl({
            severity: type,
            summary: 'summary title',
            detail: inputMessage || this.messageDetail },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
            () => {
                alert('This is a click callback');
            },
        );
    }

    public closeAllStickyChanged($event: any) {
        this.euiGrowlService.isCloseAllSticky.next($event);
    }
}
