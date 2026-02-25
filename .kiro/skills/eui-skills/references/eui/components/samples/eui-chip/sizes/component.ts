import { Component } from '@angular/core';

import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_LABEL, ...EUI_ICON],
})
export class SizesComponent {
}
