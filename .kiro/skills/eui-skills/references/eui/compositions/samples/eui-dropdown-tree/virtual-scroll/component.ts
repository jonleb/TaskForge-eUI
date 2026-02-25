import { Component, ViewChild } from "@angular/core";
import { JsonPipe } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { EUI_TREE, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiDropdownTreeDirective } from '@eui/components/eui-tree';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'virtual-scroll',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_DROPDOWN,
        ...EUI_TREE,
        EuiDropdownTreeDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_FIELDSET,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
        ...EUI_ALERT,
        JsonPipe,
    ],
})
export class VirtualScrollComponent {
    public treeData: TreeDataModel = [
        ...Array.from({ length: 10000 }).map((_, i) => ({node: {
            treeContentBlock: {
                label: `Node ${i} ${this.randomString(16)}`,
                tooltipLabel: `Node ${i} ${this.randomString(16)}`,
            },
        }})),

    ];

    selectionChange: EuiTreeSelectionChanges;
    @ViewChild('compInstance') public compInstance: any;
    public filterInput = '';

    public onSelectionChange(evt: EuiTreeSelectionChanges) {
        console.log(evt)
        this.selectionChange = evt;
    }

    public onValueChange(val: string) {
        this.compInstance?.filterTerm(val);
    }

    private randomString(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }
}
