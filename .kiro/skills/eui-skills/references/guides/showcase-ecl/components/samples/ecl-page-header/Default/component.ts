import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';
import { EUI_ECL_PAGE_HEADER } from '@eui/ecl/components/ecl-page-header';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BREADCRUMB, ...EUI_ECL_PAGE_HEADER, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
