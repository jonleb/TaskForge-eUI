import { Component, Input, OnInit } from '@angular/core';

import { consumeEvent } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'card-list-chips',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_CHIP_LIST,
    ]
})
export class CardListChipsComponent implements OnInit {

    @Input() data: any;
    public aChips = [];

    public maxVisibleChipsCount = 2;
    public isMaxVisibleChipsOpened = false;

    constructor( ) {
    }

    ngOnInit(): void {
        this.aChips = this.data.split(',');
    }

    public toggleTags(): void {
        this.isMaxVisibleChipsOpened = !this.isMaxVisibleChipsOpened;
    }
}
