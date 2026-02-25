---
description: Dynamically enables or disables column sorting.
id: sortable-cols-disable-sorting
---

```html
No sorting feature <eui-slide-toggle (slideToggleChange)="onChange($event)" [isChecked]="!sortDisabled" /> With sorting feature

<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data" [paginator]="paginator" (sortChange)="onSortChange($event)">
        <ng-template euiTemplate="header">
            <tr>
                <th isSortable isMultiSortable sortOn="id" [sortDisabled]="sortDisabled">Id</th>
                <th isSortable isMultiSortable sortOn="country" [sortDisabled]="sortDisabled">Country</th>
                <th isSortable isMultiSortable sortOn="year" [sortDisabled]="sortDisabled">Year</th>
                <th isSortable sortOn="iso" [sortDisabled]="sortDisabled">ISO</th>
                <th isSortable sortOn="population" [sortDisabled]="sortDisabled">Population</th>
                <th isSortable sortOn="capital" [sortDisabled]="sortDisabled">Capital city</th>
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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'sortable-cols-disable-sorting',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_PAGINATOR, EuiTemplateDirective, DecimalPipe, ...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableColsDisableSortingComponent {

    public data: Country[] = [
        { id: 1, country: "Austria", year: 1995, iso: "AT", population: 8504850, capital: "Vienna"},
        { id: 2, country: "Belgium", year: 1958, iso: "BE", population: 11198638, capital: "Brussels"},
        { id: 3, country: "Bulgaria", year: 2007, iso: "BG", population: 7364570, capital: "Sofia"},
        { id: 4, country: "Croatia", year: 2013, iso: "HR", population: 4284889, capital: "Zagreb"},
        { id: 5, country: "Cyprus", year: 2004, iso: "CY", population: 1117000, capital: "Nicosia"},
        { id: 6, country: "Czechia", year: 2004, iso: "CZ", population: 10513209, capital: "Prague"},
        { id: 7, country: "Denmark", year: 1973, iso: "DK", population: 5655750, capital: "Copenhagen"},
        { id: 8, country: "Estonia", year: 2004, iso: "EE", population: 1315819, capital: "Tallinn"},
        { id: 9, country: "Finland", year: 1995, iso: "FI", population: 5470820, capital: "Helsinki"},
        { id: 10, country: "France", year: 1958, iso: "FR", population: 67210000, capital: "Paris"},
        { id: 11, country: "Germany", year: 1958, iso: "DE", population: 80716000, capital: "Berlin"},
        { id: 12, country: "Greece", year: 1981, iso: "GR", population: 10816286, capital: "Athens"},
        { id: 13, country: "Hungary", year: 2004, iso: "HU", population: 9877365, capital: "Budapest"},
        { id: 14, country: "Ireland", year: 1973, iso: "IE", population: 4609600, capital: "Dublin"},
        { id: 15, country: "Italy", year: 1958, iso: "IT", population: 60782668, capital: "Rome"},
        { id: 16, country: "Latvia", year: 2004, iso: "LV", population: 1990300, capital: "Riga"},
        { id: 17, country: "Lithuania", year: 2004, iso: "LT", population: 2944459, capital: "Vilnius"},
        { id: 18, country: "Luxembourg", year: 1958, iso: "LU", population: 549680, capital: "Luxembourg"},
        { id: 19, country: "Malta", year: 2004, iso: "MT", population: 446547, capital: "Valletta"},
        { id: 20, country: "Netherlands", year: 1958, iso: "NL", population: 16856620, capital: "Amsterdam"},
        { id: 21, country: "Poland", year: 2004, iso: "PL", population: 38483957, capital: "Warsaw"},
        { id: 22, country: "Portugal", year: 1986, iso: "PT", population: 10427301, capital: "Lisbon"},
        { id: 23, country: "Romania", year: 2007, iso: "RO", population: 19942642, capital: "Bucharest"},
        { id: 24, country: "Slovakia", year: 2004, iso: "SK", population: 5415949, capital: "Bratislava"},
        { id: 25, country: "Slovenia", year: 2004, iso: "SI", population: 2061085, capital: "Ljubljana"},
        { id: 26, country: "Spain", year: 1986, iso: "ES", population: 46704314, capital: "Madrid"},
        { id: 27, country: "Sweden", year: 1995, iso: "SE", population: 10004962, capital: "Stockholm"},
        { id: 28, country: "United Kingdom", year: 1973, iso: "GB", population: 64100000, capital: "London"},
    ];

    public sortDisabled = false;

    public onSortChange(e: Sort[]) {
        console.log(e);
    }

    public onChange(e: boolean) {
        this.sortDisabled = !e;
    }

}
```

