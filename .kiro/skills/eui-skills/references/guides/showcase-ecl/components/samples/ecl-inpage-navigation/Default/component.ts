import { Component } from '@angular/core';
import { EclInpageNavigationSectionEnterEvent, EUI_ECL_INPAGE_NAVIGATION } from '@eui/ecl/components/ecl-inpage-navigation';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_INPAGE_NAVIGATION],
})
export class DefaultComponent {

    onSectionEnter(evt: EclInpageNavigationSectionEnterEvent) {
        console.log(evt);
    }
}
