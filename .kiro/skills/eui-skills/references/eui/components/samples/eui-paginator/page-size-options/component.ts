import { Component } from '@angular/core';

import { EUI_PAGINATOR } from "@eui/components/eui-paginator";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'page-size-options',
    templateUrl: 'component.html',
    imports: [...EUI_PAGINATOR],
})
export class PageSizeOptionsComponent {

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

    public pageSize = 5;
    public pageSizeOptions: number[] = [5, 10, 50];



}
