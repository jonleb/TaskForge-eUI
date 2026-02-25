import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'icon-before-after',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
    ]
})
export class IconBeforeAfterComponent {

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
