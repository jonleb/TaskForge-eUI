import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_BUTTON } from '@eui/components/eui-input-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_BUTTON,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
