import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EuiResizableDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'cards',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        EuiResizableDirective,
    ],
})
export class CardsComponent {
}
