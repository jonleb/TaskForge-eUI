import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    // eslint-disable-next-line
    selector: 'expandable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BUTTON,
    ],
})
export class ExpandableComponent {
}
