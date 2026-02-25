import { Component } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { EUI_TABLE, Sort } from "@eui/components/eui-table";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SELECT } from "@eui/components/eui-select";
import { EuiTemplateDirective } from "@eui/components/directives";
import { EUI_BADGE } from "@eui/components/eui-badge";

@Component({
    // eslint-disable-next-line
    selector: 'in-table',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TABLE,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_SELECT,
        EuiTemplateDirective,
        ...EUI_BADGE,
        DecimalPipe,
    ],
})
export class InTableComponent {

    public sort: Sort[];

    public dataSource: any[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
    ];

    public onClick(row: any): void {
        console.log('Selected action for:', row);
    }

    public onSortChange(e: Sort[]) {
        // console.log(e);
        this.sort = e;
    }
}
