import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'is-shape-square',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
})
export class IsShapeSquareComponent {
}
