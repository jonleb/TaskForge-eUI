import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Virtual-scroll',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class VirtualScrollComponent {
    public treeData: TreeDataModel = [
    /*    {
            node: {
                treeContentBlock: {
                    label: 'DIGIT A',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT B',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT B.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT B.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT C',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT C.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT C.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT C.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT C.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT C.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT C.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT C.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT D',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT D.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT D.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D.5',
                        },
                    },
                },
            ],
        },*/
        ...Array.from({ length: 10000 }).map((_, i) => ({node: {
            treeContentBlock: {
                label: 'DIGIT A'+i,
            },
        }})),

    ];


}
