import { Component } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
})
export class DefaultComponent {
}
