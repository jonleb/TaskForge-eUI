import { Component } from '@angular/core';
import { EUI_ECL_BANNER } from '@eui/ecl/components/ecl-banner';

@Component({
    // tslint:disable-next-line
    selector: 'video-banner',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BANNER],
})
export class VideoComponent {}
