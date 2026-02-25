import { Component, ViewChild } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { TreeDataModel, EuiTreeSelectionChanges, EuiTreeHelper, TreeItemModel, EuiTreeComponent, EUI_TREE } from '@eui/components/eui-tree';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'parent-obj',
    templateUrl: 'component.html',
    imports: [...EUI_TREE, ...EUI_INPUT_CHECKBOX, ...EUI_FIELDSET],
})
export class ParentObjComponent {
    treeData: TreeDataModel = [
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
                            children: [
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'DIGIT C.3.2.1',
                                        },
                                    },
                                },
                                {
                                    node: {
                                        treeContentBlock: {
                                            label: 'DIGIT C.3.2.2',
                                        },
                                    },
                                    children: [
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'DIGIT C.3.2.2.1',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'DIGIT C.3.2.2.2',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'DIGIT C.3.2.2.3',
                                                },
                                            },
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'DIGIT C.3.2.2.4',
                                                },
                                            },
                                            children: [
                                                {
                                                    node: {
                                                        treeContentBlock: {
                                                            label: 'DIGIT C.3.2.2.4.1',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        treeContentBlock: {
                                                            label: 'DIGIT C.3.2.2.4.2',
                                                        },
                                                    },
                                                },
                                                {
                                                    node: {
                                                        treeContentBlock: {
                                                            label: 'DIGIT C.3.2.2.4.3',
                                                        },
                                                    },
                                                },
                                            ]
                                        },
                                        {
                                            node: {
                                                treeContentBlock: {
                                                    label: 'DIGIT C.3.2.2.5',
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
    public parentLabels: string;
    public removedLabels: string;
    public selectionLabels: string;

    @ViewChild('compInstance') public compInstance: EuiTreeComponent;

    public onSelectionChange(evt: any): void {
        const itemPath = new EuiTreeHelper(this.compInstance.getProcessedNodes()).getPaths(evt.selection);
        this.parentLabels = this.getElementByPath(this.treeData, itemPath[0]).map((item: TreeItemModel) => item.node.treeContentBlock.label).join(',');

        this.selectionChange = evt;
        this.addedLabels = this.selectionChange.added.map((item) => item.node.treeContentBlock.label).join(',');
        this.removedLabels = this.selectionChange.removed.map((item) => item.node.treeContentBlock.label).join(',');
        this.selectionLabels = this.selectionChange.selection.map((item) => item.node.treeContentBlock.label).join(',');
    }

    private getElementByPath(treeData: TreeDataModel, path: string): TreeItemModel[] {
        if (!path) {
            return [];
        }

        const indexPath = path.split('.').map(index => parseInt(index, 10));
    
        let currentLevel = treeData;
        const result = [];
    
        for (const idx of indexPath) {
            if (!currentLevel || !currentLevel[idx]) {
                return null;
            }
            const currentNode = currentLevel[idx];
            result.push(currentNode);
            currentLevel = currentNode.children || [];
        }
    
        return result;
    }

}
