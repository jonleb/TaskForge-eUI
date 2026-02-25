import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'text',
    templateUrl: 'component.html',
    imports: [...EUI_AVATAR],
})
export class TextComponent {
}
