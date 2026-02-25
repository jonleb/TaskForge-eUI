import { Component, ViewChild, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent, EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-init-page',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_ALERT, EuiTemplateDirective, ...EUI_PAGINATOR, DecimalPipe],
    providers: [EuiTableService],
})
export class PaginationInitPageComponent implements OnInit {
    public data: Country[] = [];

    @ViewChild('paginator') paginator: EuiPaginatorComponent;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.duplicateEntries(10).subscribe((data) => {
            this.data = data.data;
        });
    }

    ngAfterViewInit(): void {
        this.paginator.getPage(2);
    }

    public onPageChange(e: EuiPaginationEvent): void {
        console.log(e)
    }

}
