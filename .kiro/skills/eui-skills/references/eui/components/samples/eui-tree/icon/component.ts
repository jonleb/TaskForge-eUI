import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Icon',
    templateUrl: 'component.html',
    imports: [RouterModule, ...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class IconComponent {
    treeDataSvg: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    iconSvgName: 'eui-notifications',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'primary',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'secondary',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.1',
                                    iconSvgName: 'eui-notifications',
                                    iconTypeClass: 'info',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'success',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'warning',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'danger-100',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.6',
                            iconSvgName: 'eui-notifications',
                            iconTypeClass: 'accent',
                        },
                    },
                },
            ],
        },
    ];
}
