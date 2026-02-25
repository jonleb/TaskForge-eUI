import { Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'svg-name',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
})
export class SvgNameComponent {

}
