import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PAGE } from '@eui/components/eui-page-v2';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'sizes',
    templateUrl: './component.html',
    imports: [...EUI_PAGE, ...EUI_BUTTON, ...EUI_ALERT, ...EUI_SHOWCASE],
})
export class ColumnSizesComponent {
    public dynamicSize: string;

    constructor() {
        this.dynamicSize = 'xl';
    }

    public changeSize(size: string) {
        this.dynamicSize = size;
    }
}
