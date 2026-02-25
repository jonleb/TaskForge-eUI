import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    // eslint-disable-next-line
    selector: 'expandable-row',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, DecimalPipe, ...EUI_ICON, ...EUI_ICON_BUTTON],
})
export class ExpandableRowComponent {

    public data: Country[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
    ];
    public expandedPanelId = null;

}
