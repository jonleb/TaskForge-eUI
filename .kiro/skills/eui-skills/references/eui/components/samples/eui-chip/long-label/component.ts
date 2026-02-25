import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'long-label',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_LABEL],
})
export class LongLabelComponent {

    // eslint-disable-next-line max-len
    longLabel = 'Lorem ipsum dolor sit amet, harum omnes possim et duo. Ludus patrioque hendrerit ut pro. Quidam consulatu assueverit his ex, qui ne maluisset gloriatur definitionem, quaestio mediocritatem mel an.';

}
