import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EclGalleryShareEvent, EUI_ECL_GALLERY } from '@eui/ecl/components/ecl-gallery';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'no-hover',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_GALLERY, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class NoHoverComponent {

    onShare(evt: EclGalleryShareEvent) {
        console.log('sharing..', evt);
    }
}
