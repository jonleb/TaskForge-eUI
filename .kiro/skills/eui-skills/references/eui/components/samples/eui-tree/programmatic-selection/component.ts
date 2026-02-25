import { Component, ViewChild } from "@angular/core";

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { TreeDataModel, EuiTreeSelectionChanges, EuiTreeHelper, EuiTreeComponent, EUI_TREE } from "@eui/components/eui-tree";
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Programmatic-selection',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_FIELDSET,
        ...EUI_INPUT_TEXT,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class ProgrammaticSelectionComponent {
    public treeData: TreeDataModel = [
        {
            node: {
                treeContentBlock: {
                    id: '1',
                    label: 'DIGIT A',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    id: '2',
                    label: 'DIGIT B',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '3',
                            label: 'DIGIT B.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '4',
                            label: 'DIGIT B.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '5',
                            label: 'DIGIT B.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '6',
                                    label: 'DIGIT B.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '7',
                                    label: 'DIGIT B.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '8',
                            label: 'DIGIT B.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '9',
                            label: 'DIGIT B.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    id: '10',
                    label: 'DIGIT C',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '11',
                            label: 'DIGIT C.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '12',
                            label: 'DIGIT C.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '13',
                            label: 'DIGIT C.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '14',
                                    label: 'DIGIT C.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '15',
                                    label: 'DIGIT C.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '16',
                            label: 'DIGIT C.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '17',
                            label: 'DIGIT C.5',
                        },
                    },
                },
            ],
        },
        {
            node: {
                treeContentBlock: {
                    id: '18',
                    label: 'DIGIT D',
                },
            },
            children: [
                {
                    node: {
                        treeContentBlock: {
                            id: '19',
                            label: 'DIGIT D.1',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '20',
                            label: 'DIGIT D.2',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '21',
                            label: 'DIGIT D.3',
                        },
                    },
                    children: [
                        {
                            node: {
                                treeContentBlock: {
                                    id: '22',
                                    label: 'DIGIT D.3.1',
                                },
                            },
                        },
                        {
                            node: {
                                treeContentBlock: {
                                    id: '23',
                                    label: 'DIGIT D.3.2',
                                },
                            },
                        },
                    ],
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '24',
                            label: 'DIGIT D.4',
                        },
                    },
                },
                {
                    node: {
                        treeContentBlock: {
                            id: '25',
                            label: 'DIGIT D.5',
                        },
                    },
                },
            ],
        },
    ];
    @ViewChild('compInstance') public compInstance: EuiTreeComponent;
    public selectionChange: EuiTreeSelectionChanges;
    public addedLabels: string;
    public removedLabels: string;
    public selectionLabels: string;
    public targetedId: string;

    public onSelectionChange(evt: EuiTreeSelectionChanges): void {
        this.selectionChange = evt;
        this.addedLabels = this.selectionChange.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels = this.selectionChange.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels = this.selectionChange.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    public selectNode(): void {
        const path = new EuiTreeHelper(this.treeData).getPath(this.targetedId, 'node.treeContentBlock.id');
        this.compInstance.nodeSelected({ target: { checked: true } }, path);
    }

    public setTargetedId(evt: any): void {
        this.targetedId = evt?.target?.value;
    }
}
