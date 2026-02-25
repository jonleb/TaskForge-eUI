import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EclSearchFormEvent, EUI_ECL_SEARCH_FORM } from '@eui/ecl/components/ecl-search-form';

@Component({
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_SEARCH_FORM],
})
export class ReactiveFormsComponent {
    fg: FormGroup;

    constructor(private fb: FormBuilder) {
        this.fg = fb.group({
            searchText: ['hello']
        });
    }

    onSearch(evt: EclSearchFormEvent) {
        console.log('search performed', evt);
    }
}
