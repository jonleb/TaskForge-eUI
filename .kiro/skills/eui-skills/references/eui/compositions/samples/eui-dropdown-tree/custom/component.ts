import { Component } from '@angular/core';

import { EUI_TREE, EuiTreeSelectionChanges, TreeDataModel } from '@eui/components/eui-tree';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SELECT } from '@eui/components/eui-select';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_TREE,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_SELECT,
    ],
})
export class CustomComponent {
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
    selectionLabels = 'No node selected';

    public onSelectionChangeDropdown(evt:EuiTreeSelectionChanges) {
        this.selectionLabels = evt.selection.map(item => item.node.treeContentBlock.label).join(',');
    }
}
