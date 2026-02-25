import { Component, signal } from '@angular/core';

import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_DISABLE_CONTENT } from "@eui/components/eui-disable-content";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    templateUrl: 'component.html',
    selector: 'disabledText',
    imports: [
        ...EUI_CARD,
        ...EUI_DISABLE_CONTENT,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
})
export class DisabledTextComponent {
    isDisabled = signal<boolean>(false);

	onEnterKey() {
		this.isDisabled.update((value) => !value);
        setTimeout(() => {
			this.isDisabled.update((value) => !value);
        }, 1000);
    }

    onBlockContent() {
		this.isDisabled.update((value) => !value);
    }
}
