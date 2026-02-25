import { Component } from '@angular/core';
import { EclSearchFormEvent, EUI_ECL_SEARCH_FORM } from '@eui/ecl/components/ecl-search-form';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SEARCH_FORM],
})
export class DefaultComponent {

    buttonExtraClassses = 'button-extra-class';
    inputExtraClassses = 'input-extra-class';

    onSearch(evt: EclSearchFormEvent) {
        console.log('search performed', evt);
    }
}
