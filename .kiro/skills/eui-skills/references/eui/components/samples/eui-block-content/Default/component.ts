import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BLOCK_CONTENT } from '@eui/components/eui-block-content';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BLOCK_CONTENT,
        ...EUI_INPUT_TEXT,
        ...EUI_BUTTON,
    ]
})
export class DefaultComponent {
    isBlocked = false;
    isNestedBlocked = false;

    onDataSubmit() {
        this.isBlocked = !this.isBlocked;
        setTimeout(() => {
            this.isBlocked = !this.isBlocked;
        }, 1000);
    }

    onBlockContent() {
        this.isBlocked = !this.isBlocked;
    }

    onBlockNestedContent() {
        this.isNestedBlocked = !this.isNestedBlocked;
    }
}
