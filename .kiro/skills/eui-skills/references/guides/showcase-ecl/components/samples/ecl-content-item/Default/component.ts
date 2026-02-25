import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_CONTENT_ITEM } from '@eui/ecl/components/ecl-content-item';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_CONTENT_ITEM, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_LABEL, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
