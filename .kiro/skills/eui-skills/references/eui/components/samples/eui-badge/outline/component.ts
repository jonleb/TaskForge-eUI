import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line
    selector: 'outline',
    templateUrl: 'component.html',
    imports: [...EUI_BADGE]
})
export class OutlineComponent {
}
