import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'Colors',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON]
})
export class ColorsComponent {
}
