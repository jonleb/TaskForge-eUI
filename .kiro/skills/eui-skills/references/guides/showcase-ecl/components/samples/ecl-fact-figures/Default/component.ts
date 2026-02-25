import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FACT_FIGURES } from '@eui/ecl/components/ecl-fact-figures';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_ICON, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_FACT_FIGURES,
        ...EUI_ECL_LINK, ...EUI_ECL_SELECT],
})
export class DefaultComponent {
    fontSize: 'm' | 'l' = 'l';
}
