import { Component } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";

@Component({
    selector: 'toolbar',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
})
export class ToolbarComponent {
}
