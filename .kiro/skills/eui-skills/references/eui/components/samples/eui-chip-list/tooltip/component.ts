import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_CHIP_LIST, ...EUI_CHIP, ...EUI_LABEL, EuiTooltipDirective],
})
export class TooltipComponent {

    public chips = [
        { id: 1, label: 'Chip label', variant: 'primary' },
        { id: 2, label: 'Chip label', variant: 'secondary' },
        { id: 3, label: 'Chip label', variant: 'info' },
        { id: 4, label: 'Chip label', variant: 'success' },
        { id: 5, label: 'Chip label', variant: 'warning' },
        { id: 6, label: 'Chip label', variant: 'danger' },
        { id: 7, label: 'Chip label', variant: 'accent' },
    ];

}
