import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EclRatingChangeEvent, EUI_ECL_RATING_FIELD } from '@eui/ecl/components/ecl-rating-field';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RATING_FIELD],
})
export class DefaultComponent {
    onRatingChange(evt: EclRatingChangeEvent) {
        console.log('rated', evt.value);
    }
}
