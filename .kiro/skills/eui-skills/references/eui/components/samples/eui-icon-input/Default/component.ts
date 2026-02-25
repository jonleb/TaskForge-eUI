import { Component } from '@angular/core';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_INPUT } from '@eui/components/eui-icon-input';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON_INPUT,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
