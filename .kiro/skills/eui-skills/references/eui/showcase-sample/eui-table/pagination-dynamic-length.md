---
description: Updates paginator length when the dataset size changes.
id: pagination-dynamic-length
---

```html
<button euiButton euiOutline euiPrimary (click)="addData()">Add data</button><br/>
<br/>
<div class="eui-table__scrollable-wrapper">
    <table #euiTable euiTable isTableResponsive isAsync [data]="dynamicData.data" [isLoading]="dynamicData === null">
        <ng-template euiTemplate="header">
            <tr>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
                <th>Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row let-index="index" euiTemplate="body">
            <tr>
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
                <td data-col-label="Year">{{ row.year }}</td>
                <td data-col-label="ISO">{{ row.iso }}</td>
                <td data-col-label="Population">{{ row.population | number }}</td>
                <td data-col-label="Capital city">{{ row.capital }}</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator #paginator
    hasDynamicLength
    [pageSizeOptions]="[5, 10, 25, 50]"
    [pageSize]="pagination.pageSize"
    [length]="dynamicData.totalElements"
    (pageChange)="onPageChange($event)" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_PAGINATOR, EuiPaginationEvent, EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'pagination-dynamic-length',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, ...EUI_BUTTON, ...EUI_PAGINATOR, DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDynamicLengthComponent implements OnInit {
    public dynamicData = null;
    public pagination: EuiPaginationEvent = { page: 0, pageSize: 5, nbPage: 0 };
    public dataSource: Country[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
        { id: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague' },
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen' },
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn' },
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki' },
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris' },
        { id: 11, country: 'Germany', year: 1958, iso: 'DE', population: 80716000, capital: 'Berlin' },
        { id: 12, country: 'Greece', year: 1981, iso: 'GR', population: 10816286, capital: 'Athens' },
        { id: 13, country: 'Hungary', year: 2004, iso: 'HU', population: 9877365, capital: 'Budapest' },
        { id: 14, country: 'Ireland', year: 1973, iso: 'IE', population: 4609600, capital: 'Dublin' },
        { id: 15, country: 'Italy', year: 1958, iso: 'IT', population: 60782668, capital: 'Rome' },
        { id: 16, country: 'Latvia', year: 2004, iso: 'LV', population: 1990300, capital: 'Riga' },
        { id: 17, country: 'Lithuania', year: 2004, iso: 'LT', population: 2944459, capital: 'Vilnius' },
        { id: 18, country: 'Luxembourg', year: 1958, iso: 'LU', population: 549680, capital: 'Luxembourg' },
        { id: 19, country: 'Malta', year: 2004, iso: 'MT', population: 446547, capital: 'Valletta' },
        { id: 20, country: 'Netherlands', year: 1958, iso: 'NL', population: 16856620, capital: 'Amsterdam' },
        { id: 21, country: 'Poland', year: 2004, iso: 'PL', population: 38483957, capital: 'Warsaw' },
        { id: 22, country: 'Portugal', year: 1986, iso: 'PT', population: 10427301, capital: 'Lisbon' },
        { id: 23, country: 'Romania', year: 2007, iso: 'RO', population: 19942642, capital: 'Bucharest' },
        { id: 24, country: 'Slovakia', year: 2004, iso: 'SK', population: 5415949, capital: 'Bratislava' },
        { id: 25, country: 'Slovenia', year: 2004, iso: 'SI', population: 2061085, capital: 'Ljubljana' },
        { id: 26, country: 'Spain', year: 1986, iso: 'ES', population: 46704314, capital: 'Madrid' },
        { id: 27, country: 'Sweden', year: 1995, iso: 'SE', population: 10004962, capital: 'Stockholm' },
        { id: 28, country: 'United Kingdom', year: 1973, iso: 'GB', population: 64100000, capital: 'London' },
    ];

    readonly paginator = viewChild<EuiPaginatorComponent>('paginator');

    ngOnInit(): void {
        this.dynamicData = this.getData(0, 5);
    }

    public onPageChange(e: EuiPaginationEvent): void {
        this.pagination = e;
        this.dynamicData = this.getData(this.pagination.page, this.pagination.pageSize);
        const paginator = this.paginator();
        if (paginator) {
            paginator.setLength(this.dynamicData.totalElements);
        }
    }

    public addData(): void {
        let id = this.dataSource.length;
        this.dataSource.push({
            id: id ++,
            country: 'Fake Country#' + id ++,
            year: 1900,
            iso: 'BE',
            population: 650,
            capital: 'Capital',
        });

        this.dynamicData = this.getData(this.pagination.page, this.pagination.pageSize);

        const paginator = this.paginator();
        if (paginator) {
            paginator.setLength(this.dynamicData.totalElements);
        }
    }

    public getData(page: number, pageSize: number): { totalElements: number, data: Country[] } {
        const startIndex = page * pageSize;
        return {
            totalElements: this.dataSource.length,
            data: this.dataSource.slice(startIndex, startIndex + pageSize),
        };
    }
}
```

