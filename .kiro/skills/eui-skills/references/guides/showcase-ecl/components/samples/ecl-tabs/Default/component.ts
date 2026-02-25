import { Component } from '@angular/core';
import { EclTabSelectEvent, EUI_ECL_TABS } from '@eui/ecl/components/ecl-tabs';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABS],
})
export class DefaultComponent {

    onTabSelect(evt: EclTabSelectEvent) {
        console.log('tab selected', evt)
    }
}
