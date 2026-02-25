import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_CHIP } from '@eui/components/eui-chip';

@Component({
    // eslint-disable-next-line
    selector: 'custom-content',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_BUTTON,
        ...EUI_AVATAR,
        ...EUI_ICON,
        ...EUI_CHIP,
    ],
})
export class CustomContentComponent {
    colorPalettes= [
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
    ];

    colorPalettesEcl=[
        'ecl-blue-navy',
        'ecl-purple-violet',
        'ecl-purple',
        'ecl-blue-electric',
        'ecl-green-dark',
        'ecl-green-pine',
        'ecl-blue-ocean',
        'ecl-green',
        'ecl-green-lemon',
        'ecl-yellow-gold',
        'ecl-orange',
        'ecl-orange-abricot',
        'ecl-red-crayola',
        'ecl-red-tomato'
    ];    
}
