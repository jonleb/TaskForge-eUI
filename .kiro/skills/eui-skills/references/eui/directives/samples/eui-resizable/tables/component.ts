/* eslint-disable max-len */
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, Sort } from '@eui/components/eui-table';
import { EuiResizableDirective } from '@eui/components/directives';
import { EUI_PAGINATOR, EuiPaginationEvent } from '@eui/components/eui-paginator';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'tables',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGINATOR,
        ...EUI_TABLE,
        EuiResizableDirective,
        DecimalPipe,
    ],
})
export class TablesComponent {

    public pagination: EuiPaginationEvent;
    public sort: Sort[];
    public countries: any[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8859449, capital: 'Vienna', languages: 'German, Slovene, Croatian and Hungarian', metadata: { flagColors: ['Red', 'White'] }},
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11589623, capital: 'Brussels', languages: 'Dutch, French, German', metadata: { flagColors: ['Black', 'Yellow', 'Red'] }},
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 6948445, capital: 'Sofia', languages: 'Bulgarian', metadata: { flagColors: ['White', 'Green', 'Red'] }},
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4105267, capital: 'Zagreb', languages: 'Croatian (hrvatski)', metadata: { flagColors: ['Red', 'White', 'Blue'] }},
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 875899, capital: 'Nicosia', languages: 'Greek, Turkish, English', metadata: { flagColors: ['Orange', 'Green'] }},
        { id: 6, country: 'Czechia', year: 2003, iso: 'CZ', population: 10708981, capital: 'Prague', languages: 'Czech (cestina)', metadata: { flagColors: ['White', 'Blue', 'Red'] }},
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5792202, capital: 'Copenhagen', languages: 'Danish (dansk)', metadata: { flagColors: ['Red', 'White'] }},
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1326535, capital: 'Tallinn', languages: 'Estonian (eesti keel)', metadata: { flagColors: ['Blue', 'Black', 'White'] }},
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5540720, capital: 'Helsinki', languages: 'Finnish (suomi) and Swedish', metadata: { flagColors: ['Blue', 'White'] }},
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 65273511, capital: 'Paris', languages: 'French (français)', metadata: { flagColors: ['Blue', 'White', 'Red'] }},
        { id: 11, country: 'Germany', year: 1958, iso: 'DE', population: 83783942, capital: 'Berlin', languages: 'German (Deutsch)', metadata: { flagColors: ['Black', 'Red', 'Yellow'] }},
        { id: 12, country: 'Greece', year: 1981, iso: 'GR', population: 10423054, capital: 'Athens', languages: 'Greek', metadata: { flagColors: ['Blue', 'White'] }},
        { id: 13, country: 'Hungary', year: 2004, iso: 'HU', population: 9660351, capital: 'Budapest', languages: 'Hungarian (magyar)', metadata: { flagColors: ['Red', 'White', 'Green'] }},
        { id: 14, country: 'Ireland', year: 1973, iso: 'IE', population: 4937786, capital: 'Dublin', languages: 'Irish (Gaeilge) and English', metadata: { flagColors: ['Green', 'White', 'Orange'] }},
        { id: 15, country: 'Italy', year: 1958, iso: 'IT', population: 60461826, capital: 'Rome', languages: 'Italian (italiano)', metadata: { flagColors: ['Green', 'White', 'Red'] }},
        { id: 16, country: 'Latvia', year: 2004, iso: 'LV', population: 1886198, capital: 'Riga', languages: 'Latvian (latviesu valoda)', metadata: { flagColors: ['Red', 'White'] }},
        { id: 17, country: 'Lithuania', year: 2004, iso: 'LT', population: 2722289, capital: 'Vilnius', languages: 'Lithuanian (lietuviu kalba)', metadata: { flagColors: ['Yellow', 'Green', 'Red'] }},
        { id: 18, country: 'Luxembourg', year: 1958, iso: 'LU', population: 625978, capital: 'Luxembourg', languages: 'Luxembourgish (LÎtzebuergesch, the everyday spoken language), French (administrative language), German (administrative language)', metadata: { flagColors: ['Red', 'White', 'Blue'] }},
        { id: 19, country: 'Malta', year: 2004, iso: 'MT', population: 441543, capital: 'Valletta', languages: 'Maltese (Malti)', metadata: { flagColors: ['Red', 'White'] }},
        { id: 20, country: 'Netherlands', year: 1958, iso: 'NL', population: 17134872, capital: 'Amsterdam', languages: 'Dutch (Nederlands, official language), Frisian (official language)', metadata: { flagColors: ['Red', 'White', 'Blue'] }},
        { id: 21, country: 'Poland', year: 2004, iso: 'PL', population: 37846611, capital: 'Warsaw', languages: 'Polish (polski)', metadata: { flagColors: ['Red', 'White'] }},
        { id: 22, country: 'Portugal', year: 1986, iso: 'PT', population: 10196709, capital: 'Lisbon', languages: 'Portuguese (português)', metadata: { flagColors: ['Green', 'Red', 'Yellow'] }},
        { id: 23, country: 'Romania', year: 2007, iso: 'RO', population: 19237691, capital: 'Bucharest', languages: 'Romanian (romana)', metadata: { flagColors: ['Blue', 'Yellow', 'Red'] }},
        { id: 24, country: 'Slovakia', year: 2004, iso: 'SK', population: 5459642, capital: 'Bratislava', languages: 'Slovak (slovensky jazyk)', metadata: { flagColors: ['White', 'Blue', 'Red'] }},
        { id: 25, country: 'Slovenia', year: 2004, iso: 'SI', population: 2078938, capital: 'Ljubljana', languages: 'Slovenian (slovenski jezik)', metadata: { flagColors: ['White', 'Blue', 'Red'] }},
        { id: 26, country: 'Spain', year: 1986, iso: 'ES', population: 46754778, capital: 'Madrid', languages: 'Spanish (español - the Castilian version), Catalan, Galician, Basque', metadata: { flagColors: ['Red', 'Yellow'] }},
        { id: 27, country: 'Sweden', year: 1995, iso: 'SE', population: 10099265, capital: 'Stockholm', languages: 'Swedish (svenska)', metadata: { flagColors: ['Blue', 'Yellow'] }},
    ];

    public onPageChange(e: EuiPaginationEvent) {
        this.pagination = e;
    }

    public onSortChange(e: Sort[]) {
        this.sort = e;
    }
}
