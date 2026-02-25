import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'icons',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK],
})
export class IconsLinkComponent {}
