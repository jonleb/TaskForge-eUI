import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_BADGE } from '@eui/components/eui-badge';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'async',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TABLE,
        ...EUI_ALERT,
        ...EUI_PAGINATOR,
        ...EUI_BADGE,
        EuiTemplateDirective,
        DecimalPipe,
    ],
    providers: [EuiTableService],
})
export class AsyncComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public pageSizeOptions = [5, 10, 25, 50];
    public page = 0;
    public pageSize = 10;
    public isLoading = true;
    public pagination: EuiPaginationEvent = { page: 0, pageSize: this.pageSize, nbPage: null };

    private searchFilter = null;
    private sorts: Sort[] = null;

    constructor(private euiTableService: EuiTableService) {}

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(10, { start: 0, end: this.pageSize }).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;

            this.isLoading = false;
        });
    }

    public onPageChange(e: EuiPaginationEvent): void {
        console.log(e)
        this.pagination = e;

        const start = e.page * e.pageSize;
        const end = e.pageSize;

        this.isLoading = true,
        this.euiTableService.lazyDuplicateEntries(10, { start, end }, this.searchFilter, this.sorts).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;

            this.isLoading = false;
        });
    }

    public onSortChange(e: Sort[]) {
        console.log(e);
        this.sorts = e;

        const start = this.pagination.page * this.pagination.pageSize;
        const end = this.pagination.pageSize;

        this.isLoading = true,
        this.euiTableService.lazyDuplicateEntries(10, { start, end }, this.searchFilter, this.sorts).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;

            this.isLoading = false;
        });
    }

    public onFilterChange(event: string) {
        this.searchFilter = event;

        const start = this.pagination.page * this.pagination.pageSize;
        const end = this.pagination.pageSize;

        this.isLoading = true,
        this.euiTableService.lazyDuplicateEntries(10, { start, end }, this.searchFilter, this.sorts).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;

            this.isLoading = false;
        });
    }
}
