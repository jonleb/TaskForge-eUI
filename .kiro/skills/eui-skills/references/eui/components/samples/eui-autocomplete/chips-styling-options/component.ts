import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'chips-styling-options',
    templateUrl: './component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_AUTOCOMPLETE,
    ],
})
export class ChipsOptionsComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        {
            id: 1, label: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus
        bibendum imperdiet non a quam. Sed porttitor pellentesque rhoncus.`,
        },
        {
            id: 2, label: `Duis sed ex enim. Maecenas odio nisi, commodo at nisi vel, imperdiet efficitur nunc.
        Curabitur condimentum nisl eget leo mollis tristique at eu quam. Praesent vitae commodo urna. Vivamus id orci ex.`,
        },
        {
            id: 3, label: `Nullam sed enim sit amet turpis placerat congue eget eget tortor. Sed aliquet tristique
        facilisis. Aenean nec quam nec lectus lobortis imperdiet a sed lorem.`,
        },
        {
            id: 4, label: `Mauris vel lectus lectus. Fusce aliquam, est vitae congue dapibus, augue nibh accumsan
        est, quis congue erat justo in neque.`,
        },
        {
            id: 5, label: `Ut malesuada est in leo aliquet dictum. Nullam sodales ex quam, non volutpat velit
        placerat id. Etiam rhoncus arcu non aliquam volutpat. Mauris aliquam scelerisque aliquam.`,
        },
    ];

    public autocompleteDataSelected: EuiAutoCompleteItem[] = [
        {
            id: 1, label: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula a metus
        bibendum imperdiet non a quam. Sed porttitor pellentesque rhoncus.`,
        },
        {
            id: 2, label: `Duis sed ex enim. Maecenas odio nisi, commodo at nisi vel, imperdiet efficitur nunc.
        Curabitur condimentum nisl eget leo mollis tristique at eu quam. Praesent vitae commodo urna. Vivamus id orci ex.`,
        },
    ];

    public autocompleteData2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
        { id: 3, label: 'Blackberry' },
        { id: 4, label: 'Coconut' },
        { id: 5, label: 'Kiwi' },
    ];

    public autocompleteDataSelected2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
    ];

    public autocompleteData3: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
        { id: 3, label: 'Blackberry' },
        { id: 4, label: 'Coconut' },
        { id: 5, label: 'Kiwi' },
    ];

    public autocompleteDataSelected3: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
        { id: 3, label: 'Blackberry' },
        { id: 4, label: 'Coconut' },
        { id: 5, label: 'Kiwi' },
    ];

}
