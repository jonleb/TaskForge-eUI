---
description: Initializes the paginator on a specific page.
id: pagination-init-page
---

```html
<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data" [paginator]="paginator">
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
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
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

<eui-paginator #paginator
    hasPageNumberNavigation
    [nbPageNumberNavigation]="5"
    [page]="0"
    [pageSizeOptions]="[5, 10, 25, 50]"
    [pageSize]="5"
    (pageChange)="onPageChange($event)" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent, EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';
import { EuiTableService } from '../../services/eui-table.service';

@Component({
    selector: 'pagination-init-page',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, ...EUI_PAGINATOR, DecimalPipe],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationInitPageComponent implements OnInit {
    public data: Country[] = [];

    readonly paginator = viewChild<EuiPaginatorComponent>('paginator');

    private euiTableService = inject(EuiTableService);

    ngOnInit(): void {
        this.euiTableService.duplicateEntries(10).subscribe((data) => {
            this.data = data.data;
        });
    }

    ngAfterViewInit(): void {
        this.paginator().getPage(2);
    }

    public onPageChange(e: EuiPaginationEvent): void {
        console.log(e)
    }

}
```

