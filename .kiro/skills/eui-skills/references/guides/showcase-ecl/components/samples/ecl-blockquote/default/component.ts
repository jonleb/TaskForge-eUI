import { Component } from '@angular/core';
import { EUI_ECL_BLOCKQUOTE } from '@eui/ecl/components/ecl-blockquote';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BLOCKQUOTE],
})
export class DefaultComponent { }
