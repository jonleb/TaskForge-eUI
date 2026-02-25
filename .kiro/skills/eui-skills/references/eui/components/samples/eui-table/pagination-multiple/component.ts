import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-multiple',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_PAGINATOR, EuiTemplateDirective, ...EUI_ALERT, DecimalPipe],
    providers: [EuiTableService],
})
export class PaginationMultipleComponent implements OnInit {
    public data: Country[] = [];

    public multiplePageSizeOptions = [5, 10, 25, 50];
    public multiplePage = 0;
    public multiplePageSize = 10;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.duplicateEntries(10).subscribe((data) => {
            this.data = data.data;
        });
    }

    public onMultiplePageChange(e: EuiPaginationEvent): void {
        console.log(e);
        this.multiplePage = e.page;
        this.multiplePageSize = e.pageSize;
    }

}
