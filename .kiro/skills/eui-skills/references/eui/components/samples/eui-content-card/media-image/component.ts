import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';

@Component({
    // eslint-disable-next-line
    selector: 'media-image',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
    ],
})
export class MediaImageComponent {

}
