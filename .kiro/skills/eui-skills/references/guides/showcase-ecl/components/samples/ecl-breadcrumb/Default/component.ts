import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_BREADCRUMB } from '@eui/ecl/components/ecl-breadcrumb';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_BREADCRUMB],
})
export class DefaultComponent {}
