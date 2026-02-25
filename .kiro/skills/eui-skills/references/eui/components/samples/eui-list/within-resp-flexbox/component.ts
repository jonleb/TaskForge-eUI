import { Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';
import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiArrowKeyNavigableDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'within-resp-flexbox',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LIST,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        EuiArrowKeyNavigableDirective,
    ],
})
export class WithinRespFlexboxComponent {

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
