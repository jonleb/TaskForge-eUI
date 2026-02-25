import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX],
})
export class DefaultComponent {
    public treeData: TreeDataModel = [
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
                    url: '.',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 2',
                    url: '.',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'Node 3',
                    urlExternal: 'https://google.fr',
                    urlExternalTarget: '_blank',
                },
            },
        },
    ];

    public treeDataMultiLevels: TreeDataModel = [
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
                    url: '.',
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
                    url: '.',
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
                            url: '.',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            label: 'Node 2.3',
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


}
