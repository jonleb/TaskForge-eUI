import { Component } from '@angular/core';

import { EUI_ACCORDION } from '@eui/components/eui-accordion';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'accordion-compositions',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
        ...EUI_ALERT,
        ...EUI_CARD,
        ...EUI_BUTTON,
    ],
})
export class AccordionCompositionsComponent {

    public accordionItems = [
        { 'title': 'Item 1', 'content': `Lorem ipsum sample content 1...` },
        { 'title': 'Item 2', 'content': `Lorem ipsum sample content 2...` },
        { 'title': 'Item 3', 'content': `Lorem ipsum sample content 3...` },
    ];
}
