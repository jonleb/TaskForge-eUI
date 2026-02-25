import { Component } from '@angular/core';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_SITE_FOOTER } from '@eui/ecl/components/ecl-site-footer';

@Component({
    // tslint:disable-next-line
    selector: 'ec-core',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SITE_FOOTER, ...EUI_ECL_LINK],
})
export class CoreECComponent {}
