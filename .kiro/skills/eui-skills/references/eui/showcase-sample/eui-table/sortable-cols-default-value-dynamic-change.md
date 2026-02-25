---
description: Sets a default sort and updates it programmatically.
id: sortable-cols-default-value-dynamic-change
---

```html
<button euiButton (click)="setSort()">Change sort dynamically</button>&nbsp;<button euiButton (click)="resetSort()">Reset sort dynamically</button><br/><br/>

<div class="eui-table__scrollable-wrapper">
    <table #euiTable euiTable isTableResponsive [data]="data" [paginator]="paginator" (sortChange)="onSortChange($event)">
        <ng-template euiTemplate="header">
            <tr>
                <th isSortable isMultiSortable sortOn="id">Id</th>
                <th isSortable isMultiSortable sortOn="country.country" defaultOrder sortOrder="asc">Country</th>
                <th isSortable isMultiSortable sortOn="country.year">Year</th>
                <th isSortable sortOn="country.iso">ISO</th>
                <th isSortable sortOn="country.population">Population</th>
                <th isSortable sortOn="country.capital">Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td data-col-label="Id"><span euiBadge>{{ row.id }}</span></td>
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon-{{ row.country.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country.country }}</td>
                <td data-col-label="Year">{{ row.country.year }}</td>
                <td data-col-label="ISO">{{ row.country.iso }}</td>
                <td data-col-label="Population">{{ row.country.population | number }}</td>
                <td data-col-label="Capital city">{{ row.country.capital }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="6">Footer</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator #paginator />
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, EuiTableComponent, Sort } from '@eui/components/eui-table';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'sortable-cols-default-value-dynamic-change',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_BUTTON, ...EUI_PAGINATOR, EuiTemplateDirective, DecimalPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableColsDefaultValueDynamicChangeComponent {

    public data: { id: number, country: Country }[] = [
        { id: 1, country: { id: 1, country: "Austria", year: 1995, iso: "AT", population: 8504850, capital: "Vienna"} },
        { id: 2, country: { id: 2, country: "Belgium", year: 1958, iso: "BE", population: 11198638, capital: "Brussels"} },
        { id: 3, country: { id: 3, country: "Bulgaria", year: 2007, iso: "BG", population: 7364570, capital: "Sofia"} },
        { id: 4, country: { id: 4, country: "Croatia", year: 2013, iso: "HR", population: 4284889, capital: "Zagreb"} },
        { id: 5, country: { id: 5, country: "Cyprus", year: 2004, iso: "CY", population: 1117000, capital: "Nicosia"} },
        { id: 6, country: { id: 6, country: "Czechia", year: 2004, iso: "CZ", population: 10513209, capital: "Prague"} },
        { id: 7, country: { id: 7, country: "Denmark", year: 1973, iso: "DK", population: 5655750, capital: "Copenhagen"} },
        { id: 8, country: { id: 8, country: "Estonia", year: 2004, iso: "EE", population: 1315819, capital: "Tallinn"} },
        { id: 9, country: { id: 9, country: "Finland", year: 1995, iso: "FI", population: 5470820, capital: "Helsinki"} },
        { id: 10, country: { id: 10, country: "France", year: 1958, iso: "FR", population: 67210000, capital: "Paris"} },
        { id: 11, country: { id: 11, country: "Germany", year: 1958, iso: "DE", population: 80716000, capital: "Berlin"} },
        { id: 12, country: { id: 12, country: "Greece", year: 1981, iso: "GR", population: 10816286, capital: "Athens"} },
        { id: 13, country: { id: 13, country: "Hungary", year: 2004, iso: "HU", population: 9877365, capital: "Budapest"} },
        { id: 14, country: { id: 14, country: "Ireland", year: 1973, iso: "IE", population: 4609600, capital: "Dublin"} },
        { id: 15, country: { id: 15, country: "Italy", year: 1958, iso: "IT", population: 60782668, capital: "Rome"} },
        { id: 16, country: { id: 16, country: "Latvia", year: 2004, iso: "LV", population: 1990300, capital: "Riga"} },
        { id: 17, country: { id: 17, country: "Lithuania", year: 2004, iso: "LT", population: 2944459, capital: "Vilnius"} },
        { id: 18, country: { id: 18, country: "Luxembourg", year: 1958, iso: "LU", population: 549680, capital: "Luxembourg"} },
        { id: 19, country: { id: 19, country: "Malta", year: 2004, iso: "MT", population: 446547, capital: "Valletta"} },
        { id: 20, country: { id: 20, country: "Netherlands", year: 1958, iso: "NL", population: 16856620, capital: "Amsterdam"} },
        { id: 21, country: { id: 21, country: "Poland", year: 2004, iso: "PL", population: 38483957, capital: "Warsaw"} },
        { id: 22, country: { id: 22, country: "Portugal", year: 1986, iso: "PT", population: 10427301, capital: "Lisbon"} },
        { id: 23, country: { id: 23, country: "Romania", year: 2007, iso: "RO", population: 19942642, capital: "Bucharest"} },
        { id: 24, country: { id: 24, country: "Slovakia", year: 2004, iso: "SK", population: 5415949, capital: "Bratislava"} },
        { id: 25, country: { id: 25, country: "Slovenia", year: 2004, iso: "SI", population: 2061085, capital: "Ljubljana"} },
        { id: 26, country: { id: 26, country: "Spain", year: 1986, iso: "ES", population: 46704314, capital: "Madrid"} },
        { id: 27, country: { id: 27, country: "Sweden", year: 1995, iso: "SE", population: 10004962, capital: "Stockholm"} },
        { id: 28, country: { id: 28, country: "United Kingdom", year: 1973, iso: "GB", population: 64100000, capital: "London"} },
    ];

    readonly euiTable = viewChild<EuiTableComponent>('euiTable');

    public onSortChange(e: Sort[]) {
        console.log(e);
    }

    public resetSort(): void {
        this.euiTable().setSort([]);
    }

    public setSort(): void {
        this.euiTable().setSort([{ sort: 'country.year', order: 'desc' }]);
    }

}
```

