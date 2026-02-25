import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

@Component({
    selector: 'prop-id',
    templateUrl: 'component.html',
    imports: [...EUI_ALERT, ...EUI_TABLE, EuiTemplateDirective, DecimalPipe],
})
export class PropIdComponent {

    public data: { dataID: number, country: string, year: number, iso: string, population: number, capital: string }[] = [
        { dataID: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { dataID: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { dataID: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { dataID: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { dataID: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
        { dataID: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague' },
        { dataID: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen' },
        { dataID: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn' },
        { dataID: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki' },
        { dataID: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris' },
        // { dataID: 11, country: 'Germany', year: 1958, iso: 'DE', population: 80716000, capital: 'Berlin' },
        // { dataID: 12, country: 'Greece', year: 1981, iso: 'GR', population: 10816286, capital: 'Athens' },
        // { dataID: 13, country: 'Hungary', year: 2004, iso: 'HU', population: 9877365, capital: 'Budapest' },
        // { dataID: 14, country: 'Ireland', year: 1973, iso: 'IE', population: 4609600, capital: 'Dublin' },
        // { dataID: 15, country: 'Italy', year: 1958, iso: 'IT', population: 60782668, capital: 'Rome' },
        // { dataID: 16, country: 'Latvia', year: 2004, iso: 'LV', population: 1990300, capital: 'Riga' },
        // { dataID: 17, country: 'Lithuania', year: 2004, iso: 'LT', population: 2944459, capital: 'Vilnius' },
        // { dataID: 18, country: 'Luxembourg', year: 1958, iso: 'LU', population: 549680, capital: 'Luxembourg' },
        // { dataID: 19, country: 'Malta', year: 2004, iso: 'MT', population: 446547, capital: 'Valletta' },
        // { dataID: 20, country: 'Netherlands', year: 1958, iso: 'NL', population: 16856620, capital: 'Amsterdam' },
        // { dataID: 21, country: 'Poland', year: 2004, iso: 'PL', population: 38483957, capital: 'Warsaw' },
        // { dataID: 22, country: 'Portugal', year: 1986, iso: 'PT', population: 10427301, capital: 'Lisbon' },
        // { dataID: 23, country: 'Romania', year: 2007, iso: 'RO', population: 19942642, capital: 'Bucharest' },
        // { dataID: 24, country: 'Slovakia', year: 2004, iso: 'SK', population: 5415949, capital: 'Bratislava' },
        // { dataID: 25, country: 'Slovenia', year: 2004, iso: 'SI', population: 2061085, capital: 'Ljubljana' },
        // { dataID: 26, country: 'Spain', year: 1986, iso: 'ES', population: 46704314, capital: 'Madrid' },
        // { dataID: 27, country: 'Sweden', year: 1995, iso: 'SE', population: 10004962, capital: 'Stockholm' },
        // { dataID: 28, country: 'United Kingdom', year: 1973, iso: 'GB', population: 64100000, capital: 'London' },
    ];

    public onRowsSelect(selected: { dataID: number, country: string, year: number, iso: string, population: number, capital: string }[]): void {
        console.log(selected);
    }

}
