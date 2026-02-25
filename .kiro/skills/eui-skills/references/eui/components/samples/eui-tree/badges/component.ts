import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Badges',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class BadgesComponent {
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                    rightContent: {
                        badges: [
                            {
                                label: 'PRIMARY',
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
                            label: 'Node 1.1',
                            rightContent: {
                                badges: [
                                    {
                                        label: 'SECONDARY',
                                        typeClass: 'secondary',
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
                                        label: 'INFO',
                                        typeClass: 'info',
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
                                                label: 'SUCCESS',
                                                typeClass: 'success',
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
                                        label: 'WARNING',
                                        typeClass: 'warning',
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.4',
                            rightContent: {
                                badges: [
                                    {
                                        label: 'DANGER',
                                        typeClass: 'danger',
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
                                        label: 'ACCENT',
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
                            label: 'Node 1.6',
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


}
