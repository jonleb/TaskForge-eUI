import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EclRangeEvent, EUI_ECL_RANGE } from '@eui/ecl/components/ecl-range';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [FormsModule, ReactiveFormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK,
        ...EUI_ECL_RANGE],
})
export class ReactiveFormsComponent implements OnInit {
    fg: FormGroup;
    model = '2';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.fg = this.fb.group({
            default: [{ value: '6', disabled: false }],
        });
    }

    onChangeValue() {
        this.model = '' + Math.floor(Math.random() * 10);
    }

    onChangeReactiveFormValue() {
        const value = Math.floor(Math.random() * 10);
        this.fg.get('default').patchValue(value);
    }

    onRangeChange(evt: EclRangeEvent) {
        console.log('ecl range event', evt);
    }
}
