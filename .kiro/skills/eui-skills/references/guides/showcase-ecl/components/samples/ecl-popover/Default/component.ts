import { Component } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_POPOVER } from '@eui/ecl/components/ecl-popover';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BUTTON, ...EUI_ECL_ICON, ...EUI_ECL_POPOVER],
})
export class DefaultComponent {}
