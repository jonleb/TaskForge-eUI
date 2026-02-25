import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_PAGINATOR } from '@eui/components/eui-paginator';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'card-table-composition',
    templateUrl: 'component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_BADGE,
        ...EUI_ICON,
        ...EUI_TABLE,
        EuiTooltipDirective,
        ...EUI_LIST,
        ...EUI_DROPDOWN,
        ...EUI_PAGINATOR,
        EuiTemplateDirective,
        DecimalPipe,
        ...EUI_ALERT,
    ],
})
export class CardTableCompositionComponent implements OnInit {

    @Input() isEditable = false;    // Set from app state / user rights

    public dataSource: any[] = [
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
    ];
    public filteredData: any[] = [];
    public totalPopulation = 0;
    public pageSize = 5;
    public pageSizeOptions: number[] = [5, 10, 50];

    ngOnInit(): void {
        this.filteredData = this.dataSource;
        this._refreshTotalPopulation();
    }

    public onFilterChange(): void {
        this._refreshTotalPopulation();
    }

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        this._stopPropagation(event);
    }

    public onToggleEdit(event: Event): void {
        this.isEditable = !this.isEditable;
        this._stopPropagation(event);
    }

    public searchFilterClicked(event: Event): void {
        this._stopPropagation(event);
    }

    public onEdit(event: Event, data: any): void {
        console.log('Edit data:', data);
        this._stopPropagation(event);
    }

    public onDelete(event: Event, data: any): void {
        console.log('Delete data:', data);
        this._stopPropagation(event);
    }

    private _stopPropagation(event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    private _refreshTotalPopulation(): void {
        this.totalPopulation = 0;
        this.filteredData.forEach(p => this.totalPopulation += p.population);
    }
}
