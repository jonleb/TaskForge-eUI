import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TIMELINE } from '@eui/components/eui-timeline';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'responsive-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_TIMELINE,
        ...EUI_LABEL,
        ...EUI_ICON,
    ],
    styles: [`
    .my-timeline-item-custom {
        background: var(--eui-c-white);
        border: 1px solid var(--eui-c-neutral-lightest);
        border-radius: var(--eui-s-s);
        padding: var(--eui-s-s);
    }
    `],
})
export class ResponsiveLayoutComponent {

    public showMore = false;

    public toggleShowMore(event: Event) {
        this.showMore = !this.showMore;
    }
}
