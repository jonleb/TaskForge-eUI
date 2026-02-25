import { Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';
import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EuiArrowKeyNavigableDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'within-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LIST,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_AVATAR,
        EuiArrowKeyNavigableDirective
    ],
})
export class WithinCardComponent {

    public growlService: EuiGrowlService = inject(EuiGrowlService);

    public onItemClicked(): void {
        this.growlService.growlInfo('List item clicked...');
    }

    public onDeleteClick(e: Event): void {
        this.growlService.growlWarning('Button clicked...');
        e.stopPropagation();
        e.preventDefault();
    }
}
