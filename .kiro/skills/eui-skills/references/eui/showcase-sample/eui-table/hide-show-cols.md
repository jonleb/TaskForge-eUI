---
description: Toggle column visibility with a dropdown and reactive form.
id: hide-show-cols
---

```html
<div class="eui-u-flex eui-u-flex-justify-content-end eui-u-mb-m">
    <eui-dropdown isDropDownRightAligned hasTabNavigation [hasClosedOnClickInside]="false">
        <button euiButton euiPrimary>Filter columns</button>
        <eui-dropdown-content>
            <div [formGroup]="form" class="eui-u-pt-xs eui-u-pl-xs eui-u-pr-xs">
                @for (col of cols; track $index) {
                    <div class="eui-u-pb-xs">
                        <input id="checkbox_{{ col.id }}" euiInputCheckBox name="checkbox" [formControlName]="col.id" />
                        <label for="checkbox_{{ col.id }}" euiLabel>{{ col.label }}</label>
                    </div>
                }
            </div>
        </eui-dropdown-content>
    </eui-dropdown>
</div>

<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data">
        <ng-template euiTemplate="header">
            <tr>
                @if (form.get('country').value) {
                    <th>Country</th>
                }
                @if (form.get('year').value) {
                    <th>Year</th>
                }
                @if (form.get('iso').value) {
                    <th>ISO</th>
                }
                @if (form.get('population').value) {
                    <th>Population</th>
                }
                @if (form.get('capital').value) {
                    <th>Capital city</th>
                }
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                @if (form.get('country').value) {
                    <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon--rounded eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>&nbsp;{{ row.country }}</td>
                }
                @if (form.get('year').value) {
                    <td data-col-label="Year"><eui-chip euiSecondary euiSizeS>{{ row.year }}</eui-chip></td>
                }
                @if (form.get('iso').value) {
                    <td data-col-label="ISO">{{ row.iso }}</td>
                }
                @if (form.get('population').value) {
                    <td data-col-label="Population">{{ row.population | number }}</td>
                }
                @if (form.get('capital').value) {
                    <td data-col-label="Capital city">{{ row.capital }}</td>
                }
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="5">Footer 1</td>
            </tr>
        </ng-template>
    </table>
</div>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_TABLE } from "@eui/components/eui-table";
import { EuiTemplateDirective } from "@eui/components/directives";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'hide-show-cols',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_TABLE,
        ...EUI_CHIP,
        ...EUI_INPUT_CHECKBOX,
        EuiTemplateDirective,
        DecimalPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HideShowColsComponent implements OnInit {

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
    ];
    public form: FormGroup;
    public cols = [
        { label: 'Country', id: 'country' },
        { label: 'Year', id: 'year' },
        { label: 'Iso', id: 'iso' },
        { label: 'Population', id: 'population' },
        { label: 'Capital', id: 'capital' },
    ];
    public visibleCols = ['country', 'year', 'iso', 'population', 'capital'];

    ngOnInit(): void {
        const colsFilter: { [id: string]: FormControl<boolean> } = {};
        this.cols.forEach((col) => {
            colsFilter[col.id] = new FormControl<boolean>(this.visibleCols.indexOf(col.id) !== -1 ? true : false);
        });

        this.form = new FormGroup(colsFilter);
    }
}
```

