import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';

@Component({
    // eslint-disable-next-line
    selector: 'selectable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
    ],
})
export class SelectableComponent {
    isCardSelected = false;

    onCardSelect(isSelected: boolean): void {
        this.isCardSelected = isSelected;
    }
}
