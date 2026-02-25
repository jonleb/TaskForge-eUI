import { Component, inject } from '@angular/core';

import { EuiGrowlService } from '@eui/core';
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'is-loading',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_BUTTON, ...EUI_LABEL, ...EUI_DROPDOWN],
    styleUrls: ['../../module.component.scss'],
})
export class IsLoadingComponent {

    public listItems = [
        { id: '1', label: 'Custom action 1', icon: 'eui-chevron-right' },
        { id: '2', label: 'Custom action 2', icon: 'eui-chevron-right' },
        { id: '3', label: 'Custom action 3', icon: 'eui-chevron-right', disabled: true },
    ];

    private growlService: EuiGrowlService = inject(EuiGrowlService);

    public onListItemClicked(event: any) {
        this.growlService.growl(
            {
                severity: 'success',
                summary: 'onListItemClicked() event',
                detail: `<code class="eui-u-text-code">` + JSON.stringify(event) + `</code>`,
            },
            false,
            true,
            5000,
            'bottom-right',
        );
    }

}
