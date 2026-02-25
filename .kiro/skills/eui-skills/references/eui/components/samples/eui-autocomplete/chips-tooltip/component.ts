import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'chips-tooltip',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
})
export class ChipsTooltipComponent {

    public autocompleteData1: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry', tooltip: { tooltipMessage: 'Tooltip content 1' } },
        { id: 7, label: 'Lemon', tooltip: { tooltipMessage: 'Tooltip content 2' } },
        { id: 2, label: 'Apple', tooltip: { tooltipMessage: 'Tooltip content 3' } },
        { id: 10, label: 'Orange', tooltip: { tooltipMessage: 'Tooltip content 4' } },
    ];

    public autocompleteDataSelected1: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry', tooltip: { tooltipMessage: 'Tooltip content 1' } },
        { id: 7, label: 'Lemon', tooltip: { tooltipMessage: 'Tooltip content 2' } },
        { id: 2, label: 'Apple', tooltip: { tooltipMessage: 'Tooltip content 3' } },
        { id: 10, label: 'Orange', tooltip: { tooltipMessage: 'Tooltip content 4' } },
    ];

    public autocompleteData2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Above', tooltip: { tooltipMessage: 'Above', position: 'above' } },
        { id: 2, label: 'Below', tooltip: { tooltipMessage: 'Below', position: 'below' } },
        { id: 3, label: 'Left', tooltip: { tooltipMessage: 'Left', position: 'left' } },
        { id: 4, label: 'Right', tooltip: { tooltipMessage: 'Right', position: 'right' } },
        { id: 5, label: 'Before', tooltip: { tooltipMessage: 'Before', position: 'before' } },
        { id: 6, label: 'After', tooltip: { tooltipMessage: 'After', position: 'after' } },
    ];

    public autocompleteDataSelected2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Above', tooltip: { tooltipMessage: 'Above', position: 'above' } },
        { id: 2, label: 'Below', tooltip: { tooltipMessage: 'Below', position: 'below' } },
        { id: 3, label: 'Left', tooltip: { tooltipMessage: 'Left', position: 'left' } },
        { id: 4, label: 'Right', tooltip: { tooltipMessage: 'Right', position: 'right' } },
        { id: 5, label: 'Before', tooltip: { tooltipMessage: 'Before', position: 'before' } },
        { id: 6, label: 'After', tooltip: { tooltipMessage: 'After', position: 'after' } },
    ];

    public autocompleteData3: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Center', tooltip: { tooltipMessage: 'Center', contentAlignment: 'center' } },
        { id: 2, label: 'Left', tooltip: { tooltipMessage: 'Left', contentAlignment: 'left' } },
        { id: 3, label: 'Right', tooltip: { tooltipMessage: 'Right', contentAlignment: 'right' } },
        { id: 4, label: 'Justify', tooltip: { tooltipMessage: 'Justify', contentAlignment: 'justify' } },
    ];

    public autocompleteDataSelected3: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Center', tooltip: { tooltipMessage: 'Center', contentAlignment: 'center' } },
        { id: 2, label: 'Left', tooltip: { tooltipMessage: 'Left', contentAlignment: 'left' } },
        { id: 3, label: 'Right', tooltip: { tooltipMessage: 'Right', contentAlignment: 'right' } },
        { id: 4, label: 'Justify', tooltip: { tooltipMessage: 'Justify', contentAlignment: 'justify' } },
    ];

}
