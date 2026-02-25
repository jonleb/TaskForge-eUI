/* eslint-disable max-len */
import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_CARD } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Within-panels',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX, ...EUI_CARD],
})
export class WithinPanelsComponent {
    public treeDataLongText: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                                },
                                            },
                                        },
                                    ],
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                        },
                    },
                },
            ],
        },
    ];

    public treeNodesLongTextWithBadges: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'this is a very long label for a tree node',
                    rightContent: {
                        badges: [
                            {
                                label: '10',
                                typeClass: 'secondary',
                            },
                        ],
                    },
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            rightContent: {
                                badges: [
                                    {
                                        label: '10',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '10',
                                            },
                                        ],
                                    },
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '10',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                            rightContent: {
                                                badges: [
                                                    {
                                                        label: '5',
                                                        typeClass: 'primary',
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
                                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '5',
                                                typeClass: 'primary',
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
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            rightContent: {
                                badges: [
                                    {
                                        label: '5',
                                        typeClass: 'primary',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            rightContent: {
                                badges: [
                                    {
                                        label: '5',
                                        typeClass: 'secondary',
                                    },
                                    {
                                        label: '10',
                                        typeClass: 'danger',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    ];

    public treeNodesLongTextWithTypes: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                    typeLabel: 'DEFAULT',
                    typeClass: 'secondary',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                    typeLabel: 'PRIMARY',
                    typeClass: 'primary',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            typeLabel: 'INFO',
                            typeClass: 'info',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            typeLabel: 'WARNING',
                            typeClass: 'warning',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'this is a very long label for a tree node - this is a very long label for a tree node',
                            typeLabel: 'SUCCESS',
                            typeClass: 'success',
                        },
                    },
                },
            ],
        },
    ];

    public treeNodesWithBadges: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: '10',
                                typeClass: 'secondary',
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
                                        label: '10',
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
                                        label: '5',
                                        typeClass: 'primary',
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.1',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '10',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.2',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '5',
                                                typeClass: 'primary',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.3',
                                    rightContent: {
                                        badges: [
                                            {
                                                label: '5',
                                                typeClass: 'secondary',
                                            },
                                            {
                                                label: '10',
                                                typeClass: 'danger',
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
                            label: 'Node 1.3',
                            rightContent: {
                                badges: [
                                    {
                                        label: '5',
                                        typeClass: 'secondary',
                                    },
                                    {
                                        label: '10',
                                        typeClass: 'danger',
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    ];

    public treeNodesLongTextWithChips: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        chips: [
                            {
                                label: '10',
                                typeClass: 'secondary',
                                isOutline: true,
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
                                chips: [
                                    {
                                        label: '10',
                                        isOutline: true,
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
                                chips: [
                                    {
                                        label: '5',
                                        typeClass: 'primary',
                                        isOutline: true,
                                    },
                                ],
                            },
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.1',
                                    rightContent: {
                                        chips: [
                                            {
                                                label: '10',
                                                isOutline: true,
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.2',
                                    rightContent: {
                                        chips: [
                                            {
                                                label: '5',
                                                typeClass: 'primary',
                                                isOutline: true,
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.2.3',
                                    rightContent: {
                                        chips: [
                                            {
                                                label: '5',
                                                typeClass: 'secondary',
                                                isOutline: true,
                                            },
                                            {
                                                label: '10',
                                                typeClass: 'danger',
                                                isOutline: true,
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
                            label: 'Node 1.3',
                            rightContent: {
                                chips: [
                                    {
                                        label: '5',
                                        typeClass: 'secondary',
                                        isOutline: true,
                                    },
                                    {
                                        label: '10',
                                        typeClass: 'danger',
                                        isOutline: true,
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    ];

}
