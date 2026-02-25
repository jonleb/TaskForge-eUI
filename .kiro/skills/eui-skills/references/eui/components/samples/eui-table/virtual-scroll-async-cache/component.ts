import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { delay } from 'rxjs';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'virtual-scroll-async-cache',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, ...EUI_ALERT, DecimalPipe],
    providers: [EuiTableService],
})
export class VirtualScrollAsyncCacheComponent implements OnInit {
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

    onScrollChange(e: { start: number, end: number }): void {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', e.start, e.end)
        this.euiTableService.lazyDuplicateEntries(1000, { start: e.start, end: this.virtualScrollNbRows }).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }
}
