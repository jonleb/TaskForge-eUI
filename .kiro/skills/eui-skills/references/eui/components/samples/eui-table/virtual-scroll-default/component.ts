import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'virtual-scroll-default',
    templateUrl: 'component.html',
    imports: [...EUI_ALERT, ...EUI_TABLE, EuiTemplateDirective, DecimalPipe],
    providers: [EuiTableService],
})
export class VirtualScrollDefaultComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public virtualScrollNbRows = 50;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

}
