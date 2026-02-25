import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_CHIP,
        JsonPipe,
    ],
})
export class EventHandlersComponent {

    removed: any;

    public onRemove(chip: any): void {
        console.log(chip);
        this.removed = chip;
    }

}
