import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'media-cards-composition',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_ICON_TOGGLE,
        EuiTooltipDirective,
    ],
})
export class MediaCardsCompositionComponent {
    onActionButtonClick(url: string): void {
        window.open(url);
    }
}
