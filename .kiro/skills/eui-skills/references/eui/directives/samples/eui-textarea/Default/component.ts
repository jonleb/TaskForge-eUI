import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_TEXTAREA, ...EUI_INPUT_GROUP, EuiMaxLengthDirective],
})
export class DefaultComponent {
    rows: number = 0;

    onRowsChange(rows: number) {
        this.rows = rows;
    }
}
