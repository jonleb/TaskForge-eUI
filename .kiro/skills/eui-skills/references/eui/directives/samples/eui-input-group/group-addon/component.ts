import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'group-addon',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        EuiMaxLengthDirective,
        NgxMaskDirective,
        JsonPipe,
    ],
    providers: [
        provideNgxMask(),
    ],
})
export class GroupAddonComponent implements OnInit {
    public formValidation: FormGroup;
    public selectOptions: any[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];
    public countries: any[] = [
        { id: 1, name: 'Austria', iso: 'AT' },
        { id: 2, name: 'Belgium', iso: 'BE' },
        { id: 3, name: 'Bulgaria', iso: 'BG' },
        { id: 4, name: 'Croatia', iso: 'HR' },
        { id: 5, name: 'Cyprus', iso: 'CY' },
        { id: 6, name: 'Czechia', iso: 'CZ' },
        { id: 7, name: 'Denmark', iso: 'DK' },
        { id: 8, name: 'Estonia', iso: 'EE' },
        { id: 9, name: 'Finland', iso: 'FI' },
        { id: 10, name: 'France', iso: 'FR' },
        { id: 11, name: 'Germany', iso: 'DE' },
        { id: 12, name: 'Greece', iso: 'GR' },
        { id: 13, name: 'Hungary', iso: 'HU' },
        { id: 14, name: 'Ireland', iso: 'IE' },
        { id: 15, name: 'Italy', iso: 'IT' },
        { id: 16, name: 'Latvia', iso: 'LV' },
        { id: 17, name: 'Lithuania', iso: 'LT' },
        { id: 18, name: 'Luxembourg', iso: 'LU' },
        { id: 19, name: 'Malta', iso: 'MT' },
        { id: 20, name: 'Netherlands', iso: 'NL' },
        { id: 21, name: 'Poland', iso: 'PL' },
        { id: 22, name: 'Portugal', iso: 'PT' },
        { id: 23, name: 'Romania', iso: 'RO' },
        { id: 24, name: 'Slovakia', iso: 'SK' },
        { id: 25, name: 'Slovenia', iso: 'SI' },
        { id: 26, name: 'Spain', iso: 'ES' },
        { id: 27, name: 'Sweden', iso: 'SE' },
        { id: 28, name: 'Other', iso: 'XX' },
    ];
    private fb: FormBuilder = inject(FormBuilder);
    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            userValue: [null, [Validators.required]],
            emailValue: [null, [
                Validators.required,
                Validators.email,
                Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
            ]],
            countryValue: [null, [Validators.required]],
            addressValue: [null, [Validators.required]],
            amountValue: [null, [Validators.required]],
        });
    }

    public onSubmitForm() {
        this.formValidation.markAllAsTouched();
    }

    public validateRequired(controlName: string): boolean {
        return this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public validateEmail(controlName: string): boolean {
        return this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('email');
    }

    public onActionButtonClicked(event: Event, position) {
        this.growlService.growl({ severity: 'info', summary: 'ACTION BUTTON CLICKED', detail: position + ' action button clicked !' });
    }
}
