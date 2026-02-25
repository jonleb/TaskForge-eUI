import { Component } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'extraContentSimple',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE_LIST,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
})
export class ExtraContentSimpleComponent {
    public dateSample: Date = new Date();
}
