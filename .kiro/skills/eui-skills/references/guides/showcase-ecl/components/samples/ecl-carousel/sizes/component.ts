import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_BANNER } from '@eui/ecl/components/ecl-banner';
import { EclSlideEvent, EUI_ECL_CAROUSEL } from '@eui/ecl/components/ecl-carousel';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BANNER, ...EUI_ECL_CAROUSEL, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class SizesComponent {

    onSlide(evt: EclSlideEvent) {
        console.log('slide', evt);
    }
}
