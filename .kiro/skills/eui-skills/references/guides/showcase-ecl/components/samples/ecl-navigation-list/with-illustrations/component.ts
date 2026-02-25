import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_NAVIGATION_LIST } from '@eui/ecl/components/ecl-navigation-list';

@Component({
    // tslint:disable-next-line
    selector: 'with-illustrations',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_NAVIGATION_LIST, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_LINK],
})
export class WithIllustrationsComponent {}
