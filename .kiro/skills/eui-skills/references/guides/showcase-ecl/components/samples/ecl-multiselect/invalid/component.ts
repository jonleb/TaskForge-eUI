import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_MULTISELECT } from '@eui/ecl/components/ecl-multiselect';

@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_MULTISELECT],
})
export class InvalidComponent {

    countries =  [
        { name: 'Bulgaria', id: 'bg', active: true },
        { name: 'Luxembourg', id: 'lu', active: true },
        { name: 'France', id: 'fr', active: true },
        { name: 'Malta', id: 'mt', active: true },
        { name: 'Spain', id: 'es', active: true },
    ];

    isSelected(country: any) {
        return country.id === 'bg';
    }
}
