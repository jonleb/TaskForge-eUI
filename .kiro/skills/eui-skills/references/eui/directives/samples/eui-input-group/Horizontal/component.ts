import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { markFormGroupTouched, EuiAppShellService } from '@eui/core';
import { Subject, startWith, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_CARD } from '@eui/components/eui-card';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

import { HorizontalFormComponent } from './sample/component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Horizontal',
    templateUrl: 'component.html',
    styles: [`
    .even {
        background-color: var(--eui-c-neutral-bg-light);
        padding-top: var(--eui-s-s);
    }
    .odd {
        background-color: var(--eui-c-neutral-bg-light);
        padding-top: var(--eui-s-s);
    }
    `],
    imports: [
        ReactiveFormsModule,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ALERT,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_NUMBER,
        ...EUI_SELECT,
        ...EUI_INPUT_RADIO,
        ...EUI_FIELDSET,
        ...EUI_CARD,
        EuiMaxLengthDirective,
        ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA,
        ...EUI_INPUT_CHECKBOX,
        EuiTooltipDirective,
        HorizontalFormComponent,
        NgClass
    ],
})
export class HorizontalComponent implements OnInit, OnDestroy {

    isEditActive = false;
    value = 'Lorem ipsum';
    form: FormGroup = new FormGroup({
        inputHorizontal: new FormControl(this.value, [Validators.required]),
    });

    public formValidation: FormGroup;

    public countryOptions: any[] = [
        { value: 'be', label: 'Belgium' },
        { value: 'it', label: 'Italy' },
        { value: 'es', label: 'Spain' },
    ];
    public selectedDestinationCountries = '';

    // Used for details as demo datasource
    public manufacturersData: any[] = [
        { id: 1, name: 'Company 1', address: 'Address 1', countryCode: 'be', country: 'Belgium', zip: '1000', city: 'Brussels' },
        { id: 2, name: 'Company 2', address: 'Address 2', countryCode: 'it', country: 'Italy', zip: '00100', city: 'Roma' },
        { id: 3, name: 'Company 3', address: 'Address 3', countryCode: 'es', country: 'Spain', zip: '28001', city: 'Madrid' },
    ];

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private fb: FormBuilder = inject(FormBuilder);
    public asService: EuiAppShellService = inject(EuiAppShellService);

    ngOnInit(): void {
        // Get screen dimmer state and assign to isEditActive
        this.asService.state$.subscribe((state) => {
            this.isEditActive = state.isDimmerActive;
        });
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    // Form validators inits/reset
    public buildForm(): void {
        this.formValidation = this.fb.group({
            originCountry: [{ value: 'be', disabled: false }, [Validators.required]],
            destinationCountries: [{ value: ['be', 'it', 'es'], disabled: false }, [Validators.required]],
        });

        // Changing values from multi-select
        this.formValidation.get('destinationCountries').valueChanges
            .pipe(
                takeUntil(this.destroy$),
                startWith(this.formValidation.get('destinationCountries').value))
            .subscribe(value => {
                this.selectedDestinationCountries = this._getSelectedCountryLabels(value);
            });
    }

    public isFormValid(): boolean {
        markFormGroupTouched(this.formValidation.controls);
        if (this.formValidation.valid) {
            // Add customs checks here...
            return true;
        }
        return false;
    }

    public onToggleEdit(event: Event): void {
        this.isEditActive = !this.isEditActive;
        this.asService.dimmerActiveToggle();
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    private _getSelectedCountryLabels(value: string[] ): string {
        return this.countryOptions.filter((countryOption) => value.indexOf(countryOption.value) !== -1).map(c => c.label).join(', ');
    }
}
