import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    // eslint-disable-next-line
    selector: 'with-tooltip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_BUTTON,
    ],
})
export class WithTooltipComponent {
}

