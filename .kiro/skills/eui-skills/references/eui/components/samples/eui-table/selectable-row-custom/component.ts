import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

import { SelectableCountry } from '../../models/eui-countries-response.model';

@Component({
    selector: 'selectable-row-custom',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_ALERT, EuiTemplateDirective, ...EUI_PAGINATOR, ...EUI_BUTTON, DecimalPipe, ...EUI_INPUT_CHECKBOX],
})
export class SelectableRowCustomComponent {
    public data: SelectableCountry[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna', selectable: true, selected: false },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels', selectable: true, selected: false },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia', selectable: false, selected: false },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb', selectable: true, selected: false },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia', selectable: true, selected: false },
        { id: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague', selectable: true, selected: false },
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen', selectable: true, selected: false },
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn', selectable: false, selected: false },
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki', selectable: true, selected: false },
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris', selectable: true, selected: false },
        { id: 11, country: 'Germany', year: 1958, iso: 'DE', population: 80716000, capital: 'Berlin', selectable: true, selected: false },
        { id: 12, country: 'Greece', year: 1981, iso: 'GR', population: 10816286, capital: 'Athens', selectable: true, selected: false },
        { id: 13, country: 'Hungary', year: 2004, iso: 'HU', population: 9877365, capital: 'Budapest', selectable: true, selected: false },
        { id: 14, country: 'Ireland', year: 1973, iso: 'IE', population: 4609600, capital: 'Dublin', selectable: true, selected: false },
        { id: 15, country: 'Italy', year: 1958, iso: 'IT', population: 60782668, capital: 'Rome', selectable: true, selected: false },
        { id: 16, country: 'Latvia', year: 2004, iso: 'LV', population: 1990300, capital: 'Riga', selectable: true, selected: false },
        { id: 17, country: 'Lithuania', year: 2004, iso: 'LT', population: 2944459, capital: 'Vilnius', selectable: true, selected: false },
        { id: 18, country: 'Luxembourg', year: 1958, iso: 'LU', population: 549680, capital: 'Luxembourg', selectable: true, selected: false },
        { id: 19, country: 'Malta', year: 2004, iso: 'MT', population: 446547, capital: 'Valletta', selectable: true, selected: false },
        { id: 20, country: 'Netherlands', year: 1958, iso: 'NL', population: 16856620, capital: 'Amsterdam', selectable: true, selected: false },
        { id: 21, country: 'Poland', year: 2004, iso: 'PL', population: 38483957, capital: 'Warsaw', selectable: true, selected: false },
        { id: 22, country: 'Portugal', year: 1986, iso: 'PT', population: 10427301, capital: 'Lisbon', selectable: true, selected: false },
        { id: 23, country: 'Romania', year: 2007, iso: 'RO', population: 19942642, capital: 'Bucharest', selectable: true, selected: false },
        { id: 24, country: 'Slovakia', year: 2004, iso: 'SK', population: 5415949, capital: 'Bratislava', selectable: true, selected: false },
        { id: 25, country: 'Slovenia', year: 2004, iso: 'SI', population: 2061085, capital: 'Ljubljana', selectable: true, selected: false },
        { id: 26, country: 'Spain', year: 1986, iso: 'ES', population: 46704314, capital: 'Madrid', selectable: true, selected: false },
        { id: 27, country: 'Sweden', year: 1995, iso: 'SE', population: 10004962, capital: 'Stockholm', selectable: true, selected: false },
        { id: 28, country: 'United Kingdom', year: 1973, iso: 'GB', population: 64100000, capital: 'London', selectable: true, selected: false },
    ];

    get areAllChecked(): boolean {
        return this.data.filter((d) => d.selectable).length === this.data.filter((d) => d.selected).length;
    }

    get areSomeChecked(): boolean {
        return this.data.filter(d => d.selected).length > 0 && this.data.filter(d => d.selected).length < this.data.filter((d) => d.selectable).length;
    }

    public toggleCheckAllState(checkAll: boolean): void {
        this.data = this.data.map((data) => ({ ...data, selected: data.selectable ? checkAll : false }));
    }

    public toggleCheckedState(event: any, row: SelectableCountry) {
        this.data = this.data.map(data => data.id === row.id ? ({ ...data, selected: event.target.checked }) : data);
    }

    public getSelected(): void {
        console.log(this.data.filter(d => d.selected));
    }
}
