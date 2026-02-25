import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { TreeDataModel, EuiTreeSelectionChanges, EUI_TREE } from '@eui/components/eui-tree';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Metadata-features',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX, ...EUI_FIELDSET, ...EUI_ALERT, JsonPipe],
})
export class MetadataFeaturesComponent {
    treeData1: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT A',
                },

            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'DIGIT B',
                        },
                    },
                },
            ],
        },
        {
            node: {
                selectable: true,
                treeContentBlock: {
                    label: 'DIGIT C',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT D',
                        },
                    },
                },
            ],
        },
    ];
    treeData2: TreeDataModel = [
        {
            node: {
                selectable: true,
                selectConfig: {
                    recursive: true,
                },
                treeContentBlock: {
                    label: 'DIGIT A',
                },

            },
            children: [
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'DIGIT B',
                        },
                    },
                },
                {
                    node: {
                        selectable: true,
                        treeContentBlock: {
                            label: 'DIGIT C',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT D',
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ];
    treeData3: TreeDataModel = [
        {
            node: {
                isSelected: true,
                treeContentBlock: {
                    label: 'DIGIT A',
                },

            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B',
                        },
                    },
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
                                    label: 'DIGIT D',
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ];
    treeData4: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT A',
                },

            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B',
                        },
                    },
                },
                {
                    node: {
                        isExpanded: true,
                        treeContentBlock: {
                            label: 'DIGIT C',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT D',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT E',
                                },
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'DIGIT F',
                                        },
                                    },
                                },

                            ],
                        },
                    ],
                },
            ],
        },
    ];
    treeData5: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT A',
                },

            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            label: 'DIGIT B',
                        },
                    },
                },
                {
                    node: {
                        isExpanded: false,
                        treeContentBlock: {
                            label: 'DIGIT C',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT D',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    label: 'DIGIT E',
                                },
                                isExpanded: true,
                            },
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'DIGIT F',
                                        },
                                    },
                                },

                            ],
                        },
                    ],
                },
            ],
        },
    ];
    treeData6: TreeDataModel = [
        {
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
                        selectable: false,
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
        },
    ];

    public selectionChange: EuiTreeSelectionChanges;
    public addedLabels: string;
    public removedLabels: string;
    public selectionLabels: string;
    public selectionChange2: EuiTreeSelectionChanges;
    public addedLabels2: string;
    public removedLabels2: string;
    public selectionLabels2: string;
    public selectionChange3: EuiTreeSelectionChanges;
    public addedLabels3: string;
    public removedLabels3: string;
    public selectionLabels3: string;
    public selectionChange4: EuiTreeSelectionChanges;
    public addedLabels4: string;
    public removedLabels4: string;
    public selectionLabels4: string;

    public onSelectionChange(evt: EuiTreeSelectionChanges) {
        this.selectionChange = evt;
        this.addedLabels = this.selectionChange.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels = this.selectionChange.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels = this.selectionChange.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    public onSelectionChange2(evt: EuiTreeSelectionChanges) {
        this.selectionChange2 = evt;
        this.addedLabels2 = this.selectionChange2.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels2 = this.selectionChange2.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels2 = this.selectionChange2.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    public onSelectionChange3(evt: EuiTreeSelectionChanges) {
        this.selectionChange3 = evt;
        this.addedLabels3 = this.selectionChange3.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels3 = this.selectionChange3.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels3 = this.selectionChange3.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    public onSelectionChange4(evt: EuiTreeSelectionChanges) {
        this.selectionChange4 = evt;
        this.addedLabels4 = this.selectionChange4.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels4 = this.selectionChange4.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels4 = this.selectionChange4.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }
}
