import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_NOTIFICATION, ...EUI_ECL_LINK, ...EUI_ECL_ICON],
})
export class DefaultComponent {}
