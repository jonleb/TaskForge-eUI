import { Component } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";

@Component({
    // eslint-disable-next-line
    selector: 'isGroup',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE],
})
export class IsGroupComponent {
}
