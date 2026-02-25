import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EclTagRemoveEvent, EUI_ECL_TAG } from '@eui/ecl/components/ecl-tag';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_TAG],
})
export class DefaultComponent {
    onRemove(evt: EclTagRemoveEvent) {
        console.log('remove', evt);
    }
}
