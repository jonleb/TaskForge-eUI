import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, Subject, take, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EuiGrowlService } from '@eui/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

import { EuiAutocompleteService } from '../reactive-forms/services/eui-autocomplete.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-reactive-forms',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    providers: [EuiAutocompleteService],
})
export class ChipsReactiveFormsComponent implements OnInit, OnDestroy {

    public autocompleteDataFormAutocompleteChips: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
        { id: 100, label: 'Ananas1' },
        { id: 200, label: 'Apple1' },
        { id: 300, label: 'Banana1' },
        { id: 400, label: 'Blackberry1' },
        { id: 500, label: 'Coconut1' },
        { id: 600, label: 'Kiwi1' },
        { id: 700, label: 'Lemon1' },
        { id: 800, label: 'Lime1' },
        { id: 900, label: 'Lime1' },
        { id: 1000, label: 'Orange1' },
        { id: 1001, label: 'Strawberry1' },
        { id: 1002, label: 'Raspberry1' },
        { id: 1000, label: 'Ananas2' },
        { id: 2000, label: 'Apple2' },
        { id: 3000, label: 'Banana2' },
        { id: 4000, label: 'Blackberry2' },
        { id: 5000, label: 'Coconut2' },
        { id: 6000, label: 'Kiwi2' },
        { id: 7000, label: 'Lemon2' },
        { id: 8000, label: 'Lime2' },
        { id: 9000, label: 'Lime2' },
        { id: 10000, label: 'Orange2' },
        { id: 10001, label: 'Strawberry2' },
        { id: 10002, label: 'Raspberry2' },
        { id: 100000, label: 'Ananas3' },
        { id: 200000, label: 'Apple3' },
        { id: 300000, label: 'Banana3' },
        { id: 400000, label: 'Blackberry3' },
        { id: 500000, label: 'Coconut3' },
        { id: 600000, label: 'Kiwi3' },
        { id: 700000, label: 'Lemon3' },
        { id: 800000, label: 'Lime3' },
        { id: 900000, label: 'Lime3' },
        { id: 1000000, label: 'Orange3' },
        { id: 1000001, label: 'Strawberry3' },
        { id: 1000002, label: 'Raspberry3' },
    ];
    public itemsServiceDataChips: EuiAutoCompleteItem[] = [];

    public formChips: FormGroup;
    public formAsyncChips: FormGroup;
    public itemsDataLoadingChips = false;
    public isReadOnly = false;
    public isReadOnlyFormAsync = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private cd: ChangeDetectorRef,
                private euiAutocompleteService: EuiAutocompleteService,
                private growlService: EuiGrowlService) {
    }

    ngOnInit(): void {
        this.formChips = new FormGroup({
            autoCompleteChips: new FormControl(
                {
                    value: [this.autocompleteDataFormAutocompleteChips[0], this.autocompleteDataFormAutocompleteChips[4]],
                    disabled: false,
                },
                [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
            ),
        });

        this.formChips.get('autoCompleteChips').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
        });

        this.formAsyncChips = new FormGroup({
            autoCompleteChips: new FormControl(
                { value: null, disabled: false },
                [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
            ),
        });

        this.formAsyncChips.get('autoCompleteChips').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderFormChips(controlName: string): boolean {
        return this.formChips?.get(controlName).invalid &&
            this.formChips?.get(controlName).touched &&
            (
                this?.formChips.get(controlName).hasError('required') ||
                this?.formChips.get(controlName).hasError('minlength') ||
                this?.formChips.get(controlName).hasError('maxlength')
            ) &&
            !this.isReadOnly;
    }

    public onResetFormChips(): void {
        this.formChips.reset();
    }

    public onDisableFieldChips(): void {
        const formControl = this.formChips.get('autoCompleteChips');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldChips(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    public onPatchValueChips(): void {
        this.formChips.get('autoCompleteChips').patchValue([
            this.autocompleteDataFormAutocompleteChips[1],
            this.autocompleteDataFormAutocompleteChips[2],
        ]);
    }

    public onSubmitChips(): void {
        console.log(this.formChips);
        this.formChips.markAllAsTouched();
        if (this.formChips.status !== 'VALID') {
            this.growlService.growl({
                severity: 'danger',
                summary: 'SUBMIT FAILED!',
                detail: 'Please fill in all required fields !',
            });
        } else {
            this.growlService.growl({
                severity: 'success',
                summary: 'SUBMIT SUCCESS',
                detail: 'The Form has been successfully submitted.',
            });
        }
    }

    public renderFormAsyncChips(controlName: string): boolean {
        return this.formAsyncChips?.get(controlName).invalid &&
            this.formAsyncChips?.get(controlName).touched &&
            (
                this?.formAsyncChips.get(controlName).hasError('required') ||
                this?.formAsyncChips.get(controlName).hasError('minlength') ||
                this?.formAsyncChips.get(controlName).hasError('maxlength')
            ) &&
            !this.isReadOnlyFormAsync;
    }

    public onResetFormAsyncChips(): void {
        this.formAsyncChips.reset();
    }

    public onDisableFieldFormAsyncChips(): void {
        const formControl = this.formAsyncChips.get('autoCompleteChips');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldFormAsync(): void {
        this.isReadOnlyFormAsync = !this.isReadOnlyFormAsync;
    }

    public onPatchValueFormAsync(): void {
        this.euiAutocompleteService.getValues().pipe(take(1)).subscribe((values: any) => {
            const v = values.map((value: any) => ({ id: value.id, label: value.name }));

            if (this.itemsServiceDataChips.length === 0) {
                this.itemsServiceDataChips = v;
            }
            this.formAsyncChips.get('autoCompleteChips').patchValue(v);
        });
    }

    public onSubmitFormAsyncChips(): void {
        this.formAsyncChips.markAllAsTouched();
        if (this.formAsyncChips.status !== 'VALID') {
            this.growlService.growl({
                severity: 'danger',
                summary: 'SUBMIT FAILED!',
                detail: 'Please fill in all required fields !',
            });
        } else {
            this.growlService.growl({
                severity: 'success',
                summary: 'SUBMIT SUCCESS',
                detail: 'The Form has been successfully submitted.',
            });
        }
    }

    public onInputChanged(value: string): void {
        if (typeof (value) === 'string') {
            this.itemsDataLoadingChips = true;
            this.cd.detectChanges();
            this.euiAutocompleteService.getSearchResult(value).pipe(
                take(1),
                debounceTime(500),
                delay(500),
            ).subscribe((searchResults: any) => {
                this.itemsServiceDataChips = searchResults.data.map((s: any) => ({ id: s.id, label: s.name }));

                this.itemsDataLoadingChips = false;
                this.cd.detectChanges();
            });
        }
    }
}
