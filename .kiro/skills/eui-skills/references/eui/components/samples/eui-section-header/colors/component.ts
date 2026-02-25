import { Component } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
})
export class ColorsComponent {
}
