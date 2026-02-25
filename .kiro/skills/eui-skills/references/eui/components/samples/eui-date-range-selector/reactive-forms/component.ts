import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import moment from 'moment';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import {
    EUI_DATE_RANGE_SELECTOR,
    EuiDateRangeSelectorDates,
    euiStartEndDateValidator,
} from "@eui/components/eui-date-range-selector";
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_BADGE } from "@eui/components/eui-badge";
import { DEFAULT_FORMATS } from '@eui/components/eui-datepicker';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactiveForms',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BADGE,
        JsonPipe,
    ],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public euiDateRangeValidatorsform: FormGroup;
    public campaignOne: FormGroup;
    public campaignTwo: FormGroup;

    public threeDaysLater = new Date().setDate(new Date().getDate() + 3);
    public fiveDaysLater = new Date().setDate(new Date().getDate() + 5);
    public isReadonly = false;

    public comparisonOneStartDate;
    public comparisonOneEndDate;
    public comparisonTwoStartDate;
    public comparisonTwoEndDate;
    public comparisonOneStartDateSubscription: Subscription;
    public comparisonOneEndDateSubscription: Subscription;
    public comparisonTwoStartDateSubscription: Subscription;
    public comparisonTwoEndDateSubscription: Subscription;

    constructor(private adapter: DateAdapter<any>,  public growlService: EuiGrowlService) {}

    ngOnInit() {

        this.form = new FormGroup({
            daterangeselector: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });

        this.euiDateRangeValidatorsform = new FormGroup({
            euiDaterangeValidators: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [euiStartEndDateValidator(this.adapter)]),
        });

        this.campaignOne = new FormGroup({
            campaignOneRange: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/14/2023') },
                disabled: false },
                [Validators.required]),
        });

        this.campaignTwo = new FormGroup({
            campaignTwoRange: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/12/2023'),
                    endRange: new Date('06/18/2023') },
                disabled: false },
                [Validators.required]),
        });

        this.comparisonOneStartDate = moment(this.campaignTwo.value.campaignTwoRange.startRange);
        this.comparisonOneEndDate = moment(this.campaignTwo.value.campaignTwoRange.endRange);
        this.comparisonTwoStartDate = moment( this.campaignOne.value.campaignOneRange.startRange);
        this.comparisonTwoEndDate = moment(this.campaignOne.value.campaignOneRange.endRange);

        this.comparisonOneStartDateSubscription = this.campaignTwo.get('campaignTwoRange').valueChanges.subscribe((changedValue) => {
            this.comparisonOneStartDate = moment(changedValue.startRange);
        });
        this.comparisonOneEndDateSubscription = this.campaignTwo.get('campaignTwoRange').valueChanges.subscribe((changedValue) => {
            this.comparisonOneEndDate = moment(changedValue.endRange);
        });
        this.comparisonTwoStartDateSubscription = this.campaignOne.get('campaignOneRange').valueChanges.subscribe((changedValue) => {
            this.comparisonTwoStartDate = moment(changedValue.startRange);
        });

        this.comparisonTwoEndDateSubscription = this.campaignOne.get('campaignOneRange').valueChanges.subscribe((changedValue) => {
            this.comparisonTwoEndDate = moment(changedValue.endRange);
        });
    }

    ngOnDestroy() {
        this.comparisonOneStartDateSubscription.unsubscribe();
        this.comparisonOneEndDateSubscription.unsubscribe();
        this.comparisonTwoStartDateSubscription.unsubscribe();
        this.comparisonTwoEndDateSubscription.unsubscribe();
    }

    public onChangeValue() {
        const value: EuiDateRangeSelectorDates = {
            startRange: new Date(this.threeDaysLater),
            endRange: new Date(this.fiveDaysLater) };
        this.form.get('daterangeselector').setValue(value);
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }

    clear() {
        this.form.reset();
    }

    toggleDisabled() {
        const formControl = this.form.get('daterangeselector');
        if(formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }
}
