import { Component } from '@angular/core';

import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'logo',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT],
})
export class LogoComponent {
}
