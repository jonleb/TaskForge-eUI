import { Component } from '@angular/core';

import { consumeEvent } from '@eui/core';
import { EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { FormsModule } from '@angular/forms';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

@Component({
    // eslint-disable-next-line
    selector: 'task-centre-like-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_INPUT_RADIO,
        FormsModule,
        ...EUI_CHIP,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_LIST,
        ...EUI_BUTTON,
        ...EUI_DROPDOWN,
        ...EUI_CHIP_LIST,
        ...EUI_ICON_TOGGLE,
        EuiTooltipDirective,
        ...EUI_INPUT_CHECKBOX,
    ],
})
export class TaskCentreLikeCardComponent {

    isSelectedSample1 = false;
    isSelectedSample2 = false;
    isSelectedSample3 = true;
    isFavourite = true;
    cardSize = 9;
    cardSizes = [
        { label: '50%', value: 6 },
        { label: '75%', value: 9, default: true },
        { label: '100%', value: 12 },
    ];

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];

    public chips = [
        { label: 'Tag 1' },
        { label: 'Tag 2' },
        { label: 'Tag 3' },
    ];

    public maxVisibleChipsCount = 1;
    public isMaxVisibleChipsOpened = false;

    public toggleTags(): void {
        this.isMaxVisibleChipsOpened = !this.isMaxVisibleChipsOpened;
    }

    public onCardTitleLinkClicked(event: Event): void {
        alert('Title clicked !');
        consumeEvent(event);
    }

    public onAddButtonClicked(event: Event): void {
        // Custom action call here...
        consumeEvent(event);
    }

    public onMoreButtonClicked(event: Event): void {
        // Custom action call here...
        consumeEvent(event);
    }

    public onSearchClicked(event: any): void {
        // DO search
    }

    public setLayout(event: any): void {
        this.cardSize = event;
    }

    public onFavouriteToggle(e: any): void {
        this.isFavourite = !this.isFavourite;
        consumeEvent(e);
    }

    public onCardSelectClick(event: Event): void {
        consumeEvent(event);
    }
}
