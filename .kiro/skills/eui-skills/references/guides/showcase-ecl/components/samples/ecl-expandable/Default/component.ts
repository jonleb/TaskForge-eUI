import { Component } from '@angular/core';
import { EclExpandableToggleEvent, EUI_ECL_EXPANDABLE } from '@eui/ecl/components/ecl-expandable';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ECL_EXPANDABLE, 
        TranslateModule,
    ],
})
export class DefaultComponent {

    onToggle(e: EclExpandableToggleEvent) {
        console.log('toggle event', e)
    }
}
