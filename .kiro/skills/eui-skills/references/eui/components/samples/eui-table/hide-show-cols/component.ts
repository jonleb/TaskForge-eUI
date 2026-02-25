import { Component, OnInit } from '@angular/core';
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
    // eslint-disable-next-line
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
