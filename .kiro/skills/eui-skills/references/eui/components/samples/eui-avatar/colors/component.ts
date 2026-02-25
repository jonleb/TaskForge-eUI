import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
})
export class ColorsComponent {
}
