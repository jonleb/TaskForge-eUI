import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'media-avatar',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON,
        ...EUI_AVATAR,
    ],
})
export class AvatarComponent {

}
