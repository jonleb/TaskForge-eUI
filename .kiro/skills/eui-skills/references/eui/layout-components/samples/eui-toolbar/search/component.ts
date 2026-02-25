import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'search',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_USER_PROFILE, ...EUI_ALERT],
})
export class SearchComponent {

    public results: EuiAutoCompleteItem[] = [
        { id: 1, label: 'China', metadata: { continent: 'Asia' } },
        { id: 2, label: 'Japan', metadata: { continent: 'Asia' } },
        { id: 3, label: 'Thaïland', metadata: { continent: 'Asia' } },
        { id: 4, label: 'Belgium', metadata: { continent: 'Europa' } },
        { id: 5, label: 'France', metadata: { continent: 'Europa' } },
        { id: 6, label: 'Germany', metadata: { continent: 'Europa' } },
        { id: 7, label: 'South Africa', metadata: { continent: 'Africa' } },
        { id: 8, label: 'Kenya', metadata: { continent: 'Africa' } },
        { id: 9, label: 'Madagascar', metadata: { continent: 'Africa' } },
        { id: 10, label: 'Mexico', metadata: { continent: 'America' } },
        { id: 11, label: 'USA', metadata: { continent: 'America' } },
        { id: 12, label: 'Canada', metadata: { continent: 'America' } },
    ];

    onSearch(searchTerm: string) {
        console.log(searchTerm);
    }

    onSelectionChange(items: EuiAutoCompleteItem[]) {
        console.log(items);
    }
}
