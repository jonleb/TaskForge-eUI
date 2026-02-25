import { Component } from '@angular/core';

import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_TEXT],
})
export class PlaceholderComponent {
}
