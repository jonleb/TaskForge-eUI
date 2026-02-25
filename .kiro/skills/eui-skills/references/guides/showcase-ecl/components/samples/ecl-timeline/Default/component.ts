import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_TAG } from '@eui/ecl/components/ecl-tag';
import { EUI_ECL_TIMELINE } from '@eui/ecl/components/ecl-timeline';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_TAG, ...EUI_ECL_TIMELINE],
})
export class DefaultComponent {}
