import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EUI_TREE_LIST, EuiTreeListFilterParams } from "@eui/components/eui-tree-list";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_ICON_COLOR } from "@eui/components/eui-icon-color";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        RouterModule,
        ...EUI_CARD,
        ...EUI_TREE_LIST,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_ICON_COLOR,
        ...EUI_DROPDOWN,
        ...EUI_CHIP,
        ...EUI_BUTTON,
        EuiTooltipDirective,
    ],
})
export class WithCardComponent {

    public fullContentSearch(params: EuiTreeListFilterParams) {
        console.log('fullContentSearch() params:', params);
        if (params && params.item['elementRef'].nativeElement.textContent.toUpperCase().indexOf(params.keyword?.toUpperCase()) !== -1) {
            return true;
        }
        return false;
    }

    public onActionItemClick(event: any) {
        console.log(event?.target?.innerText + ' selected.');
    }

    public onFilter(e: any) {
        // console.log('onFilter() e:', e);
    }
    public onExpandAll(e: any) {
        // console.log('onExpandAll() e:', e);
    }
    public onCollapseAll(e: any) {
        // console.log('onCollapseAll() e:', e);
    }
    public onItemSelected(e: any) {
        // console.log('onItemSelected() e:', e);
    }
}
