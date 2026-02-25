import { Component } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line
    selector: 'with-tooltip',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE, EuiTooltipDirective],
})
export class WithTooltipComponent {
    public isFavourite = false;
    public isLiked = false;

    public onFavouriteToggle(event: boolean) {
        this.isFavourite = !this.isFavourite;
    }

    public onLikeToggle(event: boolean) {
        this.isLiked = !this.isLiked;
    }
}
