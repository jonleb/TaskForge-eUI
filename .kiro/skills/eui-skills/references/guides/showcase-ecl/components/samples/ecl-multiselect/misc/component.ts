import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_MULTISELECT } from '@eui/ecl/components/ecl-multiselect';

@Component({
    selector: 'misc',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_BUTTON , ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_MULTISELECT],
})
export class MiscComponent implements OnInit {

    countries = [
        { name: 'Bulgaria', id: 'bg', active: true },
        { name: 'Luxembourg', id: 'lu', active: true },
        { name: 'France', id: 'fr', active: true },
        { name: 'Malta', id: 'mt', active: true },
        { name: 'Spain', id: 'es', active: true },
    ];
    fg: FormGroup;
    selectedValues: string[] = [];
    selectedValues2: string[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.fg = this.fb.group({
            submit: [
                { value: ['fr', 'bg'], disabled: false },
            ],
            default: [
                { value: [], disabled: false },
            ],
        });
    }

    onSubmit() {
        this.selectedValues = this.fg.get('submit').value;
    }

    onSelect(event) {
        this.selectedValues2 = event;
    }

    getClass(country) {
        return country.id === 'lu' ? 'ecl-u-bg-yellow' : null;
    }

    isOptionDisabled(country): boolean {
        return country.id === 'lu';
    }
}
