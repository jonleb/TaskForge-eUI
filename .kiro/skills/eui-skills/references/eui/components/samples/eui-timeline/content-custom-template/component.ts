import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_TIMELINE } from "@eui/components/eui-timeline";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'contentCustomTemplate',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_TIMELINE,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LABEL,
    ],
})
export class ContentCustomTemplateComponent {
    public showMore = false;

    public toggleShowMore(event: Event) {
        this.showMore = !this.showMore;
    }
}
