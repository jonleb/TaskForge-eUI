import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'no-data',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, DecimalPipe]
})
export class NoDataComponent {
    public data: Country[] = [];
}
