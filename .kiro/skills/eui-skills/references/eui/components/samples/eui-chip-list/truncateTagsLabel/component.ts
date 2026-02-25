import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EuiTruncatePipe } from '@eui/components/pipes';

@Component({
    // eslint-disable-next-line
    templateUrl: 'component.html',
    selector: 'truncateTagsLabel',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_LABEL,
        ...EUI_INPUT_NUMBER,
        EuiTruncatePipe,
    ],
})
export class TruncateTagsLabelComponent {

    public maxCharacters = 4;
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
