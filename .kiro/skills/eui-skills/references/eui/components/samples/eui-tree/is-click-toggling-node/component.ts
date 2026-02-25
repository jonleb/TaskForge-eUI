import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel, TreeItemModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Is-click-toggling-node',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class IsClickTogglingNodeComponent {
    treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'Node 0',
                    tooltipLabel: 'Node 0 custom tooltip',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 1',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.1',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.1.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 1.1.2',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.1.2.1',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.1.2.2',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'Node 1.1.2.3',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.1.2.3.1',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'Node 1.1.2.3.2',
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
                            label: 'Node 1.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 1.3',
                        },
                    },
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
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'Node 2.3.1',
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

    nodeClickedLabel: string;
    nodeToggledLabel: string;

    onNodeClick(evt: TreeItemModel): void {
        this.nodeClickedLabel = evt.node.treeContentBlock.label;
    }

    onNodeToggle(evt: TreeItemModel): void {
        this.nodeToggledLabel = evt.node.treeContentBlock.label;
    }
}
