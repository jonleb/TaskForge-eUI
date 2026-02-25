import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_RADIO } from '@eui/ecl/components/ecl-radio';

@Component({
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RADIO],
})
export class ReactiveFormsComponent {
    fg: FormGroup;

    constructor(private fb: FormBuilder) {
        this.fg = fb.group({
            choice: []
        });

        this.fg.valueChanges.subscribe(changes => {
            console.log(changes);
        });
    }
}
