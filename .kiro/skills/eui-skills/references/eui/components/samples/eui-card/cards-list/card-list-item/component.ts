import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { consumeEvent } from '@eui/core';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

import { CardListChipsComponent } from '../card-list-chips/component';


@Component({
    // eslint-disable-next-line
    selector: 'card-list-item',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_CARD,
        EuiTooltipDirective,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_CHIP_LIST,
        ...EUI_DROPDOWN,
        RouterModule,
        DatePipe,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_BUTTON,
        ...EUI_ICON_TOGGLE,
        CardListChipsComponent,
        JsonPipe,
    ],
})
export class CardListItemComponent {

    @Input() data: any;
    @Input() isCollapsible = true;
    @Input() isCollapsed = true;
    @Input() isSelected = false;
    @Input() hasBottomExpander = true;

    public isFavourite = false;

    constructor( ) {
    }

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        if (event) {
            consumeEvent(event);
        }
    }

    public onFavouriteToggle(isChecked: boolean) {
        this.isFavourite = isChecked;
    }
}
