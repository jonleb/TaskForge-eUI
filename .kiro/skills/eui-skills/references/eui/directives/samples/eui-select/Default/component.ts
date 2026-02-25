import { Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_GROUP],
})
export class DefaultComponent {

}
