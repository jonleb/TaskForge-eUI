import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'icon-sizes',
    templateUrl: 'component.html',
    imports: [...EUI_ICON],
    styleUrls: ['../../module.component.scss'],
})
export class IconSizesComponent {

    public sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];

}
