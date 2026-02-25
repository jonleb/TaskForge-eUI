import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_FEATURED } from '@eui/ecl/components/ecl-featured';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_MEDIA_CONTAINER } from '@eui/ecl/components/ecl-media-container';

@Component({
    // tslint:disable-next-line
    selector: 'highlighted',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_FEATURED, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_MEDIA_CONTAINER],
})
export class HighlightedComponent {}
