---
description: Controls one table with paginators above and below.
id: pagination-multiple
---

```html
<eui-paginator #paginatorMultiple
    [length]="data.length"
    [pageSizeOptions]="multiplePageSizeOptions"
    [page]="multiplePage"
    [pageSize]="multiplePageSize"
    (pageChange)="onMultiplePageChange($event)" />

<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data" [paginator]="paginatorMultiple">
        <ng-template euiTemplate="header">
            <tr>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
                <th>Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td data-col-label="Country" nowrap><span class="flag-icon flag-icon-{{ row.iso.toLowerCase() }} mr-2"></span>{{ row.country }}</td>
                <td data-col-label="Year">{{ row.year }}</td>
                <td data-col-label="ISO">{{ row.iso }}</td>
                <td data-col-label="Population">{{ row.population | number }}</td>
                <td data-col-label="Capital city">{{ row.capital }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="5">Footer</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator [length]="data.length"
    [pageSizeOptions]="multiplePageSizeOptions"
    [page]="multiplePage"
    [pageSize]="multiplePageSize"
    (pageChange)="onMultiplePageChange($event)" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-multiple',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_PAGINATOR, EuiTemplateDirective, DecimalPipe],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationMultipleComponent implements OnInit {
    public data: Country[] = [];

    public multiplePageSizeOptions = [5, 10, 25, 50];
    public multiplePage = 0;
    public multiplePageSize = 10;

    private euiTableService = inject(EuiTableService);

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
```

