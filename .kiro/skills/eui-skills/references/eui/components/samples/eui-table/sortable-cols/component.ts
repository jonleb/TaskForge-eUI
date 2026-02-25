import { Component, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, EuiTableComponent, Sort } from '@eui/components/eui-table';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'sortable-cols',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_ALERT, ...EUI_BUTTON, ...EUI_PAGINATOR, EuiTemplateDirective, DecimalPipe, ...EUI_SLIDE_TOGGLE],
})
export class SortableColsComponent {

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
        { id: 29, country: "USA", year: null, iso: "US", population: null, capital: null},
        { id: 30, country: "China", year: null, iso: "CN", population: null, capital: null},
        { id: 31, country: "Austria", year: 1997, iso: "AT", population: 8504850, capital: "Vienna"},
        { id: 32, country: "Austria", year: 2000, iso: "AT", population: 8504850, capital: "Vienna"},
        { id: 33, country: "Belgium", year: 1960, iso: "BE", population: 11198638, capital: "Brussels"},
        { id: 34, country: "Belgium", year: 1962, iso: "BE", population: 11198638, capital: "Brussels"},
        { id: 35, country: "Bulgaria", year: 2009, iso: "BG", population: 7364570, capital: "Sofia"},
        { id: 36, country: "Bulgaria", year: 2012, iso: "BG", population: 7364570, capital: "Sofia"},
        { id: 37, country: "Croatia", year: 2015, iso: "HR", population: 4284889, capital: "Zagreb"},
        { id: 38, country: "Croatia", year: 2018, iso: "HR", population: 4284889, capital: "Zagreb"},
        { id: 39, country: "Cyprus", year: 2006, iso: "CY", population: 1117000, capital: "Nicosia"},
        { id: 40, country: "Cyprus", year: 2009, iso: "CY", population: 1117000, capital: "Nicosia"},
        { id: 41, country: "Czechia", year: 2006, iso: "CZ", population: 10513209, capital: "Prague"},
        { id: 42, country: "Czechia", year: 2009, iso: "CZ", population: 10513209, capital: "Prague"},
        { id: 43, country: "Denmark", year: 1975, iso: "DK", population: 5655750, capital: "Copenhagen"},
        { id: 44, country: "Denmark", year: 1977, iso: "DK", population: 5655750, capital: "Copenhagen"},
        { id: 45, country: "Estonia", year: 2006, iso: "EE", population: 1315819, capital: "Tallinn"},
        { id: 46, country: "Estonia", year: 2009, iso: "EE", population: 1315819, capital: "Tallinn"},
        { id: 47, country: "Finland", year: 1997, iso: "FI", population: 5470820, capital: "Helsinki"},
        { id: 48, country: "Finland", year: 2000, iso: "FI", population: 5470820, capital: "Helsinki"},
        { id: 49, country: "France", year: 1960, iso: "FR", population: 67210000, capital: "Paris"},
        { id: 50, country: "France", year: 1962, iso: "FR", population: 67210000, capital: "Paris"},
        { id: 51, country: "Germany", year: 1960, iso: "DE", population: 80716000, capital: "Berlin"},
        { id: 52, country: "Germany", year: 1962, iso: "DE", population: 80716000, capital: "Berlin"},
        { id: 53, country: "Greece", year: 1983, iso: "GR", population: 10816286, capital: "Athens"},
        { id: 54, country: "Greece", year: 1986, iso: "GR", population: 10816286, capital: "Athens"},
        { id: 55, country: "Hungary", year: 2006, iso: "HU", population: 9877365, capital: "Budapest"},
        { id: 56, country: "Hungary", year: 2009, iso: "HU", population: 9877365, capital: "Budapest"},
        { id: 57, country: "Ireland", year: 1975, iso: "IE", population: 4609600, capital: "Dublin"},
        { id: 58, country: "Ireland", year: 1977, iso: "IE", population: 4609600, capital: "Dublin"},
        { id: 59, country: "Italy", year: 1960, iso: "IT", population: 60782668, capital: "Rome"},
        { id: 60, country: "Italy", year: 1962, iso: "IT", population: 60782668, capital: "Rome"},
        { id: 61, country: "Latvia", year: 2006, iso: "LV", population: 1990300, capital: "Riga"},
        { id: 62, country: "Latvia", year: 2009, iso: "LV", population: 1990300, capital: "Riga"},
        { id: 63, country: "Lithuania", year: 2006, iso: "LT", population: 2944459, capital: "Vilnius"},
        { id: 64, country: "Lithuania", year: 2009, iso: "LT", population: 2944459, capital: "Vilnius"},
        { id: 65, country: "Luxembourg", year: 1960, iso: "LU", population: 549680, capital: "Luxembourg"},
        { id: 66, country: "Luxembourg", year: 1962, iso: "LU", population: 549680, capital: "Luxembourg"},
        { id: 67, country: "Malta", year: 2006, iso: "MT", population: 446547, capital: "Valletta"},
        { id: 68, country: "Malta", year: 2009, iso: "MT", population: 446547, capital: "Valletta"},
        { id: 69, country: "Netherlands", year: 1960, iso: "NL", population: 16856620, capital: "Amsterdam"},
        { id: 70, country: "Netherlands", year: 1962, iso: "NL", population: 16856620, capital: "Amsterdam"},
        { id: 71, country: "Poland", year: 2006, iso: "PL", population: 38483957, capital: "Warsaw"},
        { id: 72, country: "Poland", year: 2009, iso: "PL", population: 38483957, capital: "Warsaw"},
        { id: 73, country: "Portugal", year: 1988, iso: "PT", population: 10427301, capital: "Lisbon"},
        { id: 74, country: "Portugal", year: 1991, iso: "PT", population: 10427301, capital: "Lisbon"},
        { id: 75, country: "Romania", year: 2009, iso: "RO", population: 19942642, capital: "Bucharest"},
        { id: 76, country: "Romania", year: 2012, iso: "RO", population: 19942642, capital: "Bucharest"},
        { id: 77, country: "Slovakia", year: 2006, iso: "SK", population: 5415949, capital: "Bratislava"},
        { id: 78, country: "Slovakia", year: 2009, iso: "SK", population: 5415949, capital: "Bratislava"},
        { id: 79, country: "Slovenia", year: 2006, iso: "SI", population: 2061085, capital: "Ljubljana"},
        { id: 80, country: "Slovenia", year: 2009, iso: "SI", population: 2061085, capital: "Ljubljana"},
        { id: 81, country: "Spain", year: 1988, iso: "ES", population: 46704314, capital: "Madrid"},
        { id: 82, country: "Spain", year: 1991, iso: "ES", population: 46704314, capital: "Madrid"},
        { id: 83, country: "Sweden", year: 1997, iso: "SE", population: 10004962, capital: "Stockholm"},
        { id: 84, country: "Sweden", year: 2000, iso: "SE", population: 10004962, capital: "Stockholm"},
        { id: 85, country: "United Kingdom", year: 1975, iso: "GB", population: 64100000, capital: "London"},
        { id: 86, country: "United Kingdom", year: 1977, iso: "GB", population: 64100000, capital: "London"},
        { id: 87, country: "USA", year: null, iso: "US", population: null, capital: null},
        { id: 88, country: "USA", year: null, iso: "US", population: null, capital: null},
        { id: 89, country: "China", year: null, iso: "CN", population: undefined, capital: null},
        { id: 90, country: "China", year: undefined, iso: "CN", population: undefined, capital: null}
    ];

    public data2: { id: number, country: Country }[] = [
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

    public sortDisabled = false;

    @ViewChild('euiTable5') euiTable5: EuiTableComponent;
    @ViewChild('euiTable6') euiTable6: EuiTableComponent;

    ngAfterViewInit(): void {
        this.euiTable6.setSort([{ sort: 'year', order: 'desc' }, { sort: 'country', order: 'asc' }]);
    }

    public onSortChange(e: Sort[]) {
        console.log(e);
    }

    public onChange(e: boolean) {
        this.sortDisabled = !e;
    }

    public resetSort(): void {
        this.euiTable5.setSort([]);
    }

    public setSort(): void {
        this.euiTable5.setSort([{ sort: 'country.year', order: 'desc' }]);
    }

    public resetMultiSort(): void {
        this.euiTable6.setSort([]);
    }

    public setMultiSort(): void {
        this.euiTable6.setSort([{ sort: 'country', order: 'desc' }, { sort: 'year', order: 'asc' }]);
    }

}
