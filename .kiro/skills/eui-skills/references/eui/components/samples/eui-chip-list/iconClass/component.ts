import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'iconClass',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
})
export class IconClassComponent {
    public chips = [
        { id: 1, label: 'Belgium', variant: 'primary', icon: 'eui-flag-icon eui-flag-icon-be' },
        { id: 2, label: 'France', variant: 'secondary', icon: 'eui-flag-icon eui-flag-icon-fr' },
        { id: 3, label: 'Italy', variant: 'info', icon: 'eui-flag-icon eui-flag-icon-it' },
        { id: 4, label: 'Spain', variant: 'success', icon: 'eui-flag-icon eui-flag-icon-es' },
        { id: 5, label: 'Germany', variant: 'warning', icon: 'eui-flag-icon eui-flag-icon-de' },
        { id: 6, label: 'Luxemburg', variant: 'danger', icon: 'eui-flag-icon eui-flag-icon-lu' },
        { id: 7, label: 'Greece', variant: 'accent', icon: 'eui-flag-icon eui-flag-icon-gr' },
    ];
}
