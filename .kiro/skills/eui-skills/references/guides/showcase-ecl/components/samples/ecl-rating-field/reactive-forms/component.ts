import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EclRatingChangeEvent, EUI_ECL_RATING_FIELD } from '@eui/ecl/components/ecl-rating-field';

@Component({
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK,
        ...EUI_ECL_RATING_FIELD],
})
export class ReactiveFormsComponent {
    fg: FormGroup;

    constructor(private fb: FormBuilder) {
        this.fg = this.fb.group({
            choices: [{ value: null, disabled: false }, Validators.required],
        });

        this.fg.valueChanges.subscribe(changes => {
            console.log(changes);
        });
    }

    onRatingChange(evt: EclRatingChangeEvent) {
        console.log('rated', evt.value);
    }

    validateRequired() {
        return this.fg?.get('choices')?.hasError('required');
    }
}
