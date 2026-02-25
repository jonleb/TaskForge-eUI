import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';

@Component({
    // tslint:disable-next-line
    selector: 'ordered-list',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_LIST],
})
export class OrderedListComponent {}
