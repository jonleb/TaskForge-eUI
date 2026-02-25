---
description: Demonstrates paginators placed before and after a data view, sharing the same page state.
id: position
---

```html
<eui-paginator #paginatorMultipleTop
    [length]="dataSource.length"
    [page]="multiplePage"
    [pageSizeOptions]="multiplePageSizeOptions"
    [pageSize]="multiplePageSize"
    (pageChange)="onMultiplePageChange($event)"
    [hasPageNumberNavigation]="true"
    [nbPageNumberNavigation]="5" />

<!-- The optional scrollable wrapper around the table allows dynamic scroll when the table is too big -->
<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="paginatedItems">
        <ng-template euiTemplate="header">
            <tr>
                <th>Id</th>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
                <th>Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td data-col-label="Id"><span euiBadge>{{ row.id }}</span></td>
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
                <td data-col-label="Year">{{ row.year }}</td>
                <td data-col-label="ISO">{{ row.iso }}</td>
                <td data-col-label="Population">{{ row.population | number }}</td>
                <td data-col-label="Capital city">{{ row.capital }}</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator #paginatorMultipleBottom
    [length]="dataSource.length"
    [page]="multiplePage"
    [pageSizeOptions]="multiplePageSizeOptions"
    [pageSize]="multiplePageSize"
    (pageChange)="onMultiplePageChange($event)"
    [hasPageNumberNavigation]="true"
    [nbPageNumberNavigation]="5" />
```

```typescript
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent, EuiPaginatorComponent } from "@eui/components/eui-paginator";
import { EUI_TABLE } from "@eui/components/eui-table";

@Component({
    selector: 'position',
    templateUrl: 'component.html',
    imports: [...EUI_PAGINATOR, ...EUI_TABLE, DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionComponent implements OnInit, AfterViewInit {

    public pagination: EuiPaginationEvent;

    readonly paginatorMultipleTop = viewChild<EuiPaginatorComponent>('paginatorMultipleTop');
    readonly paginatorMultipleBottom = viewChild<EuiPaginatorComponent>('paginatorMultipleBottom');

    public dataSource: any[] = [
        { id: 1, country: 'Austria', year: 2020, iso: 'AT', population: 9006398, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 2020, iso: 'BE', population: 11589623, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2020, iso: 'BG', population: 6948445, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2020, iso: 'HR', population: 4105267, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2019, iso: 'CY', population: 875899, capital: 'Nicosia' },
        { id: 6, country: 'Czechia', year: 2020, iso: 'CZ', population: 10708981, capital: 'Prague' },
        { id: 7, country: 'Denmark', year: 2020, iso: 'DK', population: 5792202, capital: 'Copenhagen' },
        { id: 8, country: 'Estonia', year: 2020, iso: 'EE', population: 1326535, capital: 'Tallinn' },
        { id: 9, country: 'Finland', year: 2020, iso: 'FI', population: 5540720, capital: 'Helsinki' },
        { id: 10, country: 'France', year: 2020, iso: 'FR', population: 65273511, capital: 'Paris' },
        { id: 11, country: 'Germany', year: 2020, iso: 'DE', population: 83783942, capital: 'Berlin' },
        { id: 12, country: 'Greece', year: 2020, iso: 'GR', population: 10423054, capital: 'Athens' },
        { id: 13, country: 'Hungary', year: 2020, iso: 'HU', population: 9660351, capital: 'Budapest' },
        { id: 14, country: 'Ireland', year: 2020, iso: 'IE', population: 4937786, capital: 'Dublin' },
        { id: 15, country: 'Italy', year: 2020, iso: 'IT', population: 60461826, capital: 'Rome' },
        { id: 16, country: 'Latvia', year: 2020, iso: 'LV', population: 1886198, capital: 'Riga' },
        { id: 17, country: 'Lithuania', year: 2020, iso: 'LT', population: 2722289, capital: 'Vilnius' },
        { id: 18, country: 'Luxembourg', year: 2020, iso: 'LU', population: 625978, capital: 'Luxembourg' },
        { id: 19, country: 'Malta', year: 2020, iso: 'MT', population: 441543, capital: 'Valletta' },
        { id: 20, country: 'Netherlands', year: 2020, iso: 'NL', population: 17134872, capital: 'Amsterdam' },
        { id: 21, country: 'Poland', year: 2020, iso: 'PL', population: 37846611, capital: 'Warsaw' },
        { id: 22, country: 'Portugal', year: 2020, iso: 'PT', population: 10196709, capital: 'Lisbon' },
        { id: 23, country: 'Romania', year: 2020, iso: 'RO', population: 19237691, capital: 'Bucharest' },
        { id: 24, country: 'Slovakia', year: 2020, iso: 'SK', population: 5459642, capital: 'Bratislava' },
        { id: 25, country: 'Slovenia', year: 2020, iso: 'SI', population: 2078938, capital: 'Ljubljana' },
        { id: 26, country: 'Spain', year: 2020, iso: 'ES', population: 46754778, capital: 'Madrid' },
        { id: 27, country: 'Sweden', year: 2020, iso: 'SE', population: 10099265, capital: 'Stockholm' },
        { id: 28, country: 'United Kingdom', year: 2020, iso: 'GB', population: 67886011, capital: 'London' },
    ];

    public paginatedItems: any[] = [];
    public multiplePageSizeOptions = [5, 10, 25, 50];
    public multiplePage = 2;
    public multiplePageSize = 5;

    ngOnInit(): void {
        this.paginatedItems = this.dataSource.slice(0, this.multiplePageSize);   // Items first load
    }

    ngAfterViewInit() {
        this.paginatorMultipleTop().getPage(this.multiplePage);
        this.paginatorMultipleBottom().getPage(this.multiplePage);
    }

    public onMultiplePageChange(e: EuiPaginationEvent): void {
        // This setTimeout avoids having ExpressionChangedAfterItHasBeenCheckedError when multiple paginators are used
        // and also avoid interfering each other when emitting events.
        // Do NOT use for single paginator instance.
        setTimeout(() => {
            this.multiplePage = e.page;
            this.multiplePageSize = e.pageSize;

            this.pagination = e;
            this.paginatedItems = this.dataSource.slice(
                (e.page * e.pageSize),                  // Start
                (e.page * e.pageSize ) + e.pageSize,    // End
            );
        });
    }
}
```

