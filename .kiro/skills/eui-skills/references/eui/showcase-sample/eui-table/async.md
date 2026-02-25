---
description: Async data mode where paging, filtering, and sorting are handled externally.
id: async
---

```html
<div class="eui-u-mb-xs eui-u-flex eui-u-flex-justify-content-between">
    <div>European Union <eui-badge euiPrimary>{{ data.length }}</eui-badge> countries found</div>
    <div class="eui-u-width-20">
        <eui-table-filter placeholder="Search filter..." (filterChange)="onFilterChange($event)" />
    </div>
</div>

<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive isAsync [data]="data" [isLoading]="isLoading" (sortChange)="onSortChange($event)">
        <ng-template euiTemplate="header">
            <tr>
                <th isSortable isMultiSortable sortOn="id">Id</th>
                <th isSortable isMultiSortable sortOn="country">Country</th>
                <th isSortable isMultiSortable sortOn="year">Year</th>
                <th isSortable isMultiSortable sortOn="iso">ISO</th>
                <th isSortable isMultiSortable sortOn="population">Population</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td>{{ row.id }}</td>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td>{{ row.iso }}</td>
                <td>{{ row.population | number }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="5">Footer</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator hasPageNumberNavigation
    [length]="dataLength"
    [pageSizeOptions]="pageSizeOptions"
    [page]="page"
    [pageSize]="pageSize"
    (pageChange)="onPageChange($event)" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { delay } from 'rxjs';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_BADGE } from '@eui/components/eui-badge';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'async',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TABLE,
        ...EUI_PAGINATOR,
        ...EUI_BADGE,
        EuiTemplateDirective,
        DecimalPipe,
    ],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    private euiTableService = inject(EuiTableService);
    private cd = inject(ChangeDetectorRef);

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
            this.cd.detectChanges();
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
            this.cd.detectChanges();
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
            this.cd.detectChanges();
        });
    }
}
```

