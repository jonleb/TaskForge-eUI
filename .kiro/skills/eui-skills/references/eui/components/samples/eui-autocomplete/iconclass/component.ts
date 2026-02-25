import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'iconclass',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
})
export class IconClassComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        {
            id: 1,
            label: 'Belgium',
            iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-be eui-flag-icon-2x',
        },
        { id: 2, label: 'France', iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-fr eui-flag-icon-2x' },
        {
            id: 3,
            label: 'Germany',
            iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-de eui-flag-icon-2x',
        },
        { id: 3, label: 'Greece', iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-gr eui-flag-icon-2x' },
        { id: 4, label: 'Italy', iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-it eui-flag-icon-2x' },
        {
            id: 5,
            label: 'Luxembourg',
            iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-lu eui-flag-icon-2x',
        },
        { id: 6, label: 'Poland', iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-pl eui-flag-icon-2x' },
        { id: 7, label: 'Spain', iconClass: 'eui-flag-icon eui-flag-icon--rounded eui-flag-icon-es eui-flag-icon-2x' },
    ];

    public autocompleteDataIcons: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Facebook', iconSvgName: 'ecl-facebook:ecl' },
        { id: 2, label: 'Instagram', iconSvgName: 'ecl-instagram:ecl' },
        { id: 3, label: 'LinkedIn', iconSvgName: 'ecl-linkedin:ecl' },
        { id: 4, label: 'Pinterest', iconSvgName: 'ecl-pinterest:ecl' },
        { id: 5, label: 'Skype', iconSvgName: 'ecl-skype:ecl' },
        { id: 6, label: 'Twitter', iconSvgName: 'ecl-twitter:ecl' },
        { id: 7, label: 'Youtube', iconSvgName: 'ecl-youtube:ecl' },
    ];

}
