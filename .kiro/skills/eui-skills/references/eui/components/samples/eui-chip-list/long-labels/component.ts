import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'longLabels',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
})
export class LongLabelsComponent {
    public chips = [
        { id: 1, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'primary' },
        { id: 2, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'secondary' },
        { id: 3, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'info' },
        { id: 4, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'success' },
        { id: 5, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'warning' },
        { id: 6, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'danger' },
        { id: 7, label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus bibendum imperdiet non a quam.', variant: 'accent' },
    ];
}
