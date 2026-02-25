import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';
import { EUI_ECL_SOCIAL_MEDIA_FOLLOW } from '@eui/ecl/components/ecl-social-media-follow';

@Component({
    // tslint:disable-next-line
    selector: 'vertical',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_SELECT, ...EUI_ECL_SOCIAL_MEDIA_FOLLOW,
        ...EUI_ECL_LINK, FormsModule],
})
export class VerticalComponent {
    horizontalAlignment = 'left';
}
