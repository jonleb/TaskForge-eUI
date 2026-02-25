import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_SPOTLIGHT } from '@eui/ecl/components/ecl-spotlight';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_SPOTLIGHT],
})
export class DefaultComponent {}
