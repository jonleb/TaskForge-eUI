import { Component } from "@angular/core";

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'sorting',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP_LIST, ...EUI_CHIP, ...EUI_LABEL],
})
export class SortingComponent {
    public chips = [
        { id: 2, label: 'Chip label B', variant: 'secondary' },
        { id: 5, label: 'Chip label E', variant: 'warning' },
        { id: 3, label: 'Chip label C', variant: 'info' },
        { id: 6, label: 'Chip label F', variant: 'danger' },
        { id: 1, label: 'Chip label A', variant: 'primary' },
        { id: 7, label: 'Chip label G', variant: 'accent' },
        { id: 4, label: 'Chip label D', variant: 'success' },
    ];
    public chipsAsc = this.chipsSort([...this.chips], 'ASC');
    public chipsDesc = this.chipsSort([...this.chips], 'DESC');

    private chipsSort(chips: { id: number; label: string; variant: string }[], sortOrder: 'ASC' | 'DESC'): { id: number; label: string; variant: string }[] {
        return chips.sort((a, b) => {
            const aLabel = a.label.toLowerCase();
            const bLabel = b.label.toLowerCase();

            if (aLabel < bLabel) {
                return sortOrder === "ASC" ? -1 : 1;
            }
            if (aLabel > bLabel) {
                return sortOrder === "ASC" ? 1 : -1;
            }
            return 0;
        });
    }

}
