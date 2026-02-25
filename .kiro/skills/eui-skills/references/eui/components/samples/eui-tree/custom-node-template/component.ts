import { Component } from '@angular/core';

import { EUI_TREE, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Custom-node-template',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_FIELDSET,
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_BADGE,
    ],
})
export class CustomNodeTemplateComponent {
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 0',
                    tooltipLabel: 'Node 0 tooltip',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            tooltipLabel: 'Some tooltip text',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    urlExternal: 'https://google.fr',
                                    urlExternalTarget: '_blank',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    tooltipLabel: 'Some tooltip text',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.1',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.2',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.3',
                                            tooltipLabel: 'Some tooltip text',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.1',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.2',
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 2',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.2',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.3',
                            tooltipLabel: 'Some tooltip text',
                            urlExternal: 'https://google.fr',
                            urlExternalTarget: '_blank',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 2.3.1',
                                    urlExternal: 'https://google.fr',
                                    urlExternalTarget: '_blank',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 2.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 3',
                    tooltipLabel: 'Some tooltip text',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 3.3',
                        },
                    },
                },
            ],
        },
    ];
    treeData2: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 0',
                    rightContent: {
                        badges: [
                            {
                                label: '2',
                                typeClass: 'warning',
                            },
                            {
                                label: '5',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: '8',
                                typeClass: 'warning',
                            },
                            {
                                label: '13',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.1',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.2',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.3',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.1',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.2',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: '8',
                                typeClass: 'warning',
                            },
                            {
                                label: '13',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
            children: [
                {
                    node: {
                        isSelected:true,
                        isExpanded:true,
                        treeContentBlock: {
                            label: 'Node 1.1',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.1',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.2',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.3',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.1',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.2',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: '8',
                                typeClass: 'warning',
                            },
                            {
                                label: '13',
                                typeClass: 'accent',
                            },
                        ],
                    },
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.2',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.1',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.3.2',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '8',
                                                typeClass: 'warning',
                                            },
                                            {
                                                label: '13',
                                                typeClass: 'accent',
                                            },
                                        ],
                                    },
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.1',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.2',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.3.2.3',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '8',
                                                        typeClass: 'warning',
                                                    },
                                                    {
                                                        label: '13',
                                                        typeClass: 'accent',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.1',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.3.2.3.2',
                                                    rightContent: {
                                                        badges: [
                                                            {
                                                                label: '8',
                                                                typeClass: 'warning',
                                                            },
                                                            {
                                                                label: '13',
                                                                typeClass: 'accent',
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.5',
                            rightContent: {
                                badges: [
                                    {
                                        label: '8',
                                        typeClass: 'warning',
                                    },
                                    {
                                        label: '13',
                                        typeClass: 'accent',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    ];
    selectionChange: EuiTreeSelectionChanges;
    addedLabels: string;
    removedLabels: string;
    selectionLabels: string;
    selectionChange2: EuiTreeSelectionChanges;
    addedLabels2: string;
    removedLabels2: string;
    selectionLabels2: string;

    onSelectionChange(evt: EuiTreeSelectionChanges): void {
        this.selectionChange = evt;
        this.addedLabels = this.selectionChange.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels = this.selectionChange.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels = this.selectionChange.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    onSelectionChange2(evt: EuiTreeSelectionChanges): void {
        this.selectionChange2 = evt;
        this.addedLabels2 = this.selectionChange2.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels2 = this.selectionChange2.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels2 = this.selectionChange2.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }
}
