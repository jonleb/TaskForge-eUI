import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTemplateDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'templating',
    templateUrl: './component.html',
    imports: [
        EuiTemplateDirective,
        ...EUI_AUTOCOMPLETE,
        ...EUI_ALERT,
        ...EUI_ICON,
        
    ],
})
export class TemplatingComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
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


}
