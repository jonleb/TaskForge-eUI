import { Component } from '@angular/core';
import { EUI_ECL_MEDIA_CONTAINER } from '@eui/ecl/components/ecl-media-container';

@Component({
    // tslint:disable-next-line
    selector: 'video-example',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_MEDIA_CONTAINER],
})
export class VideoExampleComponent {}
