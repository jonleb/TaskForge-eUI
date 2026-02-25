import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_LIST_ILUSTRATION } from '@eui/ecl/components/ecl-list-illustration';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_LIST_ILUSTRATION, ...EUI_ECL_SELECT],
})
export class DefaultComponent {
    fontSize: 'm' | 'l' = 'l';
}
