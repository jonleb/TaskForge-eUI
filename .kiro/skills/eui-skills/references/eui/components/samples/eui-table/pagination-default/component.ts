import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-default',
    templateUrl: 'component.html',
    imports: [...EUI_ALERT, ...EUI_TABLE, EuiTemplateDirective, ...EUI_PAGINATOR, DecimalPipe, ...EUI_SLIDE_TOGGLE],
    providers: [EuiTableService],
})
export class PaginationDefaultComponent implements OnInit {
    public data: Country[] = [];
    public hasPagination = true;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.duplicateEntries(10).subscribe((data) => {
            this.data = data.data;
        });
    }

    public onPageChange(e: EuiPaginationEvent): void {
        console.log(e)
    }

    public onChange(e: boolean): void {
        this.hasPagination = e;
    }

}
