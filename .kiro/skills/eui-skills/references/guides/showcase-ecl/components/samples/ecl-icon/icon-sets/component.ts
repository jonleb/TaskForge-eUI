import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'IconSets',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ICON],
})
export class IconSetsComponent {}
