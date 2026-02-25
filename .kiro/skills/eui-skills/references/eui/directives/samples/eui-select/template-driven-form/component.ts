import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiGrowlService } from '@eui/core';

@Component({
    // tslint:disable-next-line
    selector: 'template-driven-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_SELECT,
        JsonPipe,
    ],
    providers: [EuiGrowlService],
})
export class TemplateDrivenFormsComponent {

    public isReadonly = false;
    public isDisabled = false;
    public model: string;
    public options: {value: string; label: string; selected?: boolean; disabled?: boolean}[] = [
        { value: 'jan2021', label: 'January 2021' },
        { value: 'feb2021', label: 'February 2021' },
        { value: 'mar2021', label: 'March 2021' },
        { value: 'apr2021', label: 'April 2021' },
        { value: 'may2021', label: 'May 2021' },
        { value: 'jun2021', label: 'June 2021' },
        { value: 'jul2021', label: 'July 2021' },
        { value: 'aug2021', label: 'August 2021' },
        { value: 'sep2021', label: 'September 2021' },
        { value: 'oct2021', label: 'October 2021', disabled: true },
        { value: 'nov2021', label: 'November 2021', disabled: true },
        { value: 'dec2021', label: 'December 2021' },
        { value: 'jan2022', label: 'January 2022' },
        { value: 'feb2022', label: 'February 2022' },
        { value: 'mar2022', label: 'March 2022' },
        { value: 'apr2022', label: 'April 2022' },
        { value: 'may2022', label: 'May 2022' },
        { value: 'jun2022', label: 'June 2022' },
        { value: 'jul2022', label: 'July 2022' },
        { value: 'aug2022', label: 'August 2022' },
        { value: 'sep2022', label: 'September 2022' },
        { value: 'oct2022', label: 'October 2022' },
        { value: 'nov2022', label: 'November 2022' },
        { value: 'dec2022', label: 'December 2022' },
    ];

    constructor(public growlService: EuiGrowlService) { }

    public changeValue() {
        const value = this.options[Math.floor(Math.random() * this.options.length)].value;
        this.model = value;
    }

    public onSubmitModel(form: NgForm) {
        console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

}
