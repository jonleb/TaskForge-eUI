import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line
    selector: 'with-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_BADGE,
    ]
})
export class WithBadgeComponent {

    public isBasicButton = false;
    public isOutlinedButton = false;

    public onDefaultButton() {
        this.isBasicButton = false;
        this.isOutlinedButton = false;
    }

    public onBasicButton() {
        this.isBasicButton = true;
        this.isOutlinedButton = false;
    }

    public onOutlineButton() {
        this.isBasicButton = false;
        this.isOutlinedButton = true;
    }
}
