---
description: Global text filter with live result count and footer totals.
id: global-filter
---

```html
<div class="eui-u-mb-xs eui-u-flex eui-u-flex-justify-content-between">
    <div>European Union <eui-badge euiPrimary>{{ filteredData.length }}</eui-badge> countries found</div>
    <div class="eui-u-width-20">
        <eui-table-filter #filter placeholder="Search filter..." (filterChange)="onFilterChange($event)" />
    </div>
</div>
<div class="eui-table__scrollable-wrapper">
    <table #euiTable euiTable isTableResponsive [data]="data" [paginator]="paginator" [filter]="filter">
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
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon--rounded eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>&nbsp;{{ row.country }}</td>
                <td data-col-label="Year">{{ row.year }}</td>
                <td data-col-label="ISO">{{ row.iso }}</td>
                <td data-col-label="Population">{{ row.population | number }}</td>
                <td data-col-label="Capital city">{{ row.capital }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td colspan="3" class="text-right"><strong>TOTAL</strong></td>
                <td><strong>{{ totalPopulation | number:'1.0-3'}}</strong></td>
                <td>&nbsp;</td>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="noData">
            <tr>
                <td class="eui-u-text-center" colspan="5">There are currently no data to display</td>
            </tr>
        </ng-template>
    </table>
</div>

<eui-paginator #paginator />
```

```typescript
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, EuiTableComponent } from '@eui/components/eui-table';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_BADGE } from '@eui/components/eui-badge';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'global-filter',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_PAGINATOR, EuiTemplateDirective, DecimalPipe, ...EUI_BADGE],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalFilterComponent implements OnInit {

    public data: Country[] = [
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
    public filteredData: Country[] = [];
    public totalPopulation = 0;

    readonly euiTable = viewChild<EuiTableComponent<Country>>('euiTable');

    ngOnInit(): void {
        this.data.forEach(p => this.totalPopulation += p.population);
        this.filteredData = this.data;
    }

    public onFilterChange(event: string) {
        this.filteredData = this.euiTable().getFilteredData();
        this.getTotalPopulation();
    }

    private getTotalPopulation() {
        this.totalPopulation = 0;
        this.filteredData.forEach(p => this.totalPopulation += p.population);
    }
}
```

