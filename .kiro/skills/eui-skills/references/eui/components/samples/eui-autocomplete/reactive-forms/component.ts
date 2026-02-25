import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule as NgReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, Subject, take, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EuiGrowlService } from '@eui/core';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

import { EuiAutocompleteService } from './services/eui-autocomplete.service';

@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms',
    templateUrl: './component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_AUTOCOMPLETE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    providers: [EuiAutocompleteService],
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
        { id: 100, label: 'Ananas1' },
        { id: 200, label: 'Apple1' },
        { id: 300, label: 'Banana' },
        { id: 400, label: 'Blackberry1' },
        { id: 500, label: 'Coconut1' },
        { id: 600, label: 'Kiwi1' },
        { id: 700, label: 'Lemon1' },
        { id: 900, label: 'Lime1' },
        { id: 1000, label: 'Orange1' },
        { id: 1001, label: 'Strawberry1' },
        { id: 1002, label: 'Raspberry1' },
        { id: 1000, label: 'Ananas2' },
        { id: 2000, label: 'Apple2' },
        { id: 3000, label: 'Banana' },
        { id: 4000, label: 'Blackberry2' },
        { id: 5000, label: 'Coconut2' },
        { id: 6000, label: 'Kiwi2' },
        { id: 7000, label: 'Lemon2' },
        { id: 9000, label: 'Lime2' },
        { id: 10000, label: 'Orange2' },
        { id: 10001, label: 'Strawberry2' },
        { id: 10002, label: 'Raspberry2' },
        { id: 100000, label: 'Ananas3' },
        { id: 200000, label: 'Apple3' },
        { id: 300000, label: 'Banana' },
        { id: 400000, label: 'Blackberry3' },
        { id: 500000, label: 'Coconut3' },
        { id: 600000, label: 'Kiwi3' },
        { id: 700000, label: 'Lemon3' },
        { id: 900000, label: 'Lime3' },
        { id: 1000000, label: 'Orange3' },
        { id: 1000001, label: 'Strawberry3' },
        { id: 1000002, label: 'Raspberry3' },
    ];

    public form: FormGroup;
    public formAsync: FormGroup;
    public itemsDataLoading = false;
    public itemsServiceData: EuiAutoCompleteItem[] = [];
    public isReadOnly = false;
    public isReadOnlyAsync = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private euiAutocompleteService: EuiAutocompleteService, private growlService: EuiGrowlService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            autoComplete: new FormControl<EuiAutoCompleteItem>(
                { value: this.autocompleteDataFormAutocomplete[0], disabled: false },
                [Validators.required],
            ),
        });

        this.form.get('autoComplete').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
        });

        this.formAsync = new FormGroup({
            autoComplete: new FormControl<EuiAutoCompleteItem>(
                { value: null, disabled: false },
                [Validators.required],
            ),
        });

        this.formAsync.get('autoComplete').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.itemsDataLoading = true;
                this.euiAutocompleteService.getSearchResult(value.label).pipe(
                    take(1),
                    debounceTime(500),
                    delay(500),
                ).subscribe((searchResults: any) => {
                    this.itemsServiceData = searchResults.data.map((s: any) => ({ id: s.id, label: s.name }));

                    this.itemsDataLoading = false;
                    this.cd.detectChanges();
                });
            } else {
                this.itemsServiceData = [];
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderForm(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required') &&
            !this.isReadOnly;
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onDisableField(): void {
        const formControl = this.form.get('autoComplete');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyField(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    public onPatchValue(): void {
        this.form.get('autoComplete').patchValue(this.autocompleteDataFormAutocomplete[1]);
    }

    public onSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
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

    public renderFormAsync(controlName: string): boolean {
        return this.formAsync?.get(controlName).invalid &&
            this.formAsync?.get(controlName).touched &&
            this?.formAsync.get(controlName).hasError('required') &&
            !this.isReadOnlyAsync;
    }

    public onResetFormAsync(): void {
        this.formAsync.reset();
    }

    public onDisableFieldFormAsync(): void {
        const formControl = this.formAsync.get('autoComplete');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldFormAsync(): void {
        this.isReadOnlyAsync = !this.isReadOnlyAsync;
    }

    public onPatchValueFormAsync(): void {
        this.euiAutocompleteService.getOneValue().pipe(take(1)).subscribe((oneValue: any) => {
            const value = { id: oneValue.id, label: oneValue.name };
            if (this.itemsServiceData.length === 0) {
                this.itemsServiceData = [value];
            }
            this.formAsync.get('autoComplete').patchValue(value);
        });
    }

    public onSubmitFormAsync(): void {
        this.formAsync.markAllAsTouched();
        if (this.formAsync.status !== 'VALID') {
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
}
