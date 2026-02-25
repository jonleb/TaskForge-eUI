import { Component } from '@angular/core';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';

@Component({
    // tslint:disable-next-line
    selector: 'unordered-list',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_LIST],
})
export class UnorderedListComponent {}
