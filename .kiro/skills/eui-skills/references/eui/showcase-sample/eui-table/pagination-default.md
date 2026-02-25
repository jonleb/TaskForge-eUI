---
description: Toggles pagination on/off while binding a paginator.
id: pagination-default
---

```html
No pagination <eui-slide-toggle (slideToggleChange)="onChange($event)" isChecked /> With Pagination

<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data" [paginator]="hasPagination ? paginator : null">
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
                <td nowrap data-col-label="Country"><span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
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
        <ng-template let-row euiTemplate="noData">
            <tr>
                <td class="eui-u-text-center" colspan="5">There are currently no data to display</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator #paginator [pageSizeOptions]="[5, 10, 25, 50]" [pageSize]="10" (pageChange)="onPageChange($event)" [isHidden]="!hasPagination" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-default',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, ...EUI_PAGINATOR, DecimalPipe, ...EUI_SLIDE_TOGGLE],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDefaultComponent implements OnInit {
    public data: Country[] = [];
    public hasPagination = true;

    private euiTableService = inject(EuiTableService);

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
```

