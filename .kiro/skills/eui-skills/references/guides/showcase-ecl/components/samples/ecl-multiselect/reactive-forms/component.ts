import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_MULTISELECT } from '@eui/ecl/components/ecl-multiselect';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_ICON, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL,
        ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_MULTISELECT],
})
export class ReactiveFormsComponent implements OnInit {

    countries = [
        { name: 'Bulgaria', id: 'bg', active: true },
        { name: 'Luxembourg', id: 'lu', active: true },
        { name: 'France', id: 'fr', active: true },
        { name: 'Malta', id: 'mt', active: true },
        { name: 'Spain', id: 'es', active: true },
    ];
    fg: FormGroup;
    selectedValues: string[] = [];
    selectedValues1: string[] = [];
    selectedValues2: string[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.fg = this.fb.group({
            disabled: [
                { value: ['lu', 'bg'], disabled: true },
            ],
            required: [
                { value: [], disabled: false }, [Validators.required],
            ],
            default: [
                { value: ['lu', 'bg'], disabled: false },
            ],
        });
    }

    onSubmit() {
        this.selectedValues1 = this.fg.get('required').value;
    }

    onSubmit2() {
        this.selectedValues = this.fg.get('default').value;
    }

    onClick(event) {
        this.selectedValues2 = event;
    }

    validateRequired() {
        return this.fg?.get('required')?.hasError('required') && this.fg?.get('required')?.touched;
    }

    onClickReset() {
        this.fg?.get('required').reset();
    }
}

