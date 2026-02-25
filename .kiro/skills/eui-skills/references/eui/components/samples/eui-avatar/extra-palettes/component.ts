import { Component } from "@angular/core";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'extra-palettes',
    templateUrl: 'component.html',
    imports: [...EUI_AVATAR, ...EUI_ICON],
})
export class ExtraPalettesComponent {
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
    