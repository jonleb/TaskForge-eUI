import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';

@Component({
    // eslint-disable-next-line
    selector: 'ecl-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_LANGUAGE_SELECTOR
    ],
    styleUrl: './component.scss'
})
export class EclOptionsComponent {
    onSearchClicked(inputValue: string): void {
        console.log(inputValue);
    }
}
