import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EUI_ECL_BANNER } from '@eui/ecl/components/ecl-banner';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, FormsModule, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_SELECT, ...EUI_ECL_BANNER,
        ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class DefaultComponent {

    boxBackground = 'light';
    fontColor = 'dark';
    fontSize = 'm';
    horizontalAlignment = 'left';
    verticalAlignment = 'top';
}
