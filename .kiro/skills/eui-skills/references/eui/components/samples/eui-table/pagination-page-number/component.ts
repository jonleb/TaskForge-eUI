import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-page-number',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, ...EUI_ALERT, ...EUI_PAGINATOR, DecimalPipe],
    providers: [EuiTableService],
})
export class PaginationPageNumberComponent implements OnInit {
    public data: Country[] = [];

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.duplicateEntries(10).subscribe((data) => {
            this.data = data.data;
        });
    }

    public onPageChange(e: EuiPaginationEvent): void {
        console.log(e)
    }

}
