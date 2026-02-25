import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { markFormGroupTouched, EuiAppShellService } from '@eui/core';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "sample-form-detail",
    templateUrl: "component.html",
    imports: [
        ReactiveFormsModule,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BADGE,
        ...EUI_SELECT,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
    ]
})
export class HorizontalFormComponent implements OnInit, OnDestroy {
    @Input() formData: any;
    @Input() isEditActive = false;

    public formValidation: FormGroup;

    public countryOptions: any[] = [
        { value: 'be', label: 'Belgium' },
        { value: 'it', label: 'Italy' },
        { value: 'es', label: 'Spain' },
    ];

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor( private fb: FormBuilder,
                 public asService: EuiAppShellService ) { }

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
    public buildForm() {
        this.formValidation = this.fb.group({
            manufacturers: this.fb.group({
                companyName: [{ value: this.formData.name, disabled: false }, [Validators.required]],
                companyAddress: [{ value: this.formData.address, disabled: false }, [Validators.required]],
                companyZipCode: [{ value: this.formData.zip, disabled: false }],
                companyCity: [{ value: this.formData.city, disabled: false }, [Validators.required]],
                companyCountry: [{ value: this.formData.countryCode, disabled: false }, [Validators.required]],
            }),
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

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }
}
