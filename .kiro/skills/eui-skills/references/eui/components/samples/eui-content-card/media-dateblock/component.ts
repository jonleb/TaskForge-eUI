import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_DATE_BLOCK } from '@eui/components/eui-date-block';

@Component({
    // eslint-disable-next-line
    selector: 'media-dateblock',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_DATE_BLOCK,
    ],
})
export class MediaDateblockComponent {
    currentDate = new Date();
}
