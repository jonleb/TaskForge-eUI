import { Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'isExpandableIsExpanded',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET, ...EUI_BUTTON, ...EUI_SLIDE_TOGGLE, EuiTemplateDirective, ...EUI_ALERT],
})
export class IsExpandableIsExpandedComponent {
    public isExpanded = false;
    public isExpandedLazy = false;

    public onExpanded(e: any) {
        this.isExpanded = !this.isExpanded;
    }

    public onExpandedLazy(e: any) {
        this.isExpandedLazy = !this.isExpandedLazy;
    }
}
