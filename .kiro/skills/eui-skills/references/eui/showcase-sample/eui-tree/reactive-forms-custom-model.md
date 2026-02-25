---
description: Map tree selection to a custom form model with value setter/mapper.
id: reactive-forms-custom-model
---

```html
<eui-tree #componentInstance
    [nodes]="treeData"
    isMultiselect
    euiTreeFormControl
    [formControl]="customModelControl"
    [euiTreeControlValueSetter]="customControlValueSetter"
    [euiTreeControlModelMapper]="customControlModelMapper"
    (selectionChange)="onSelectionChange($event)" />

<br />

<button euiButton (click)="getSelection()">Get selection</button>&nbsp;
<button euiButton (click)="getFormValue()">Get form value</button>&nbsp;
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
    TreeDataModel,
    EuiTreeSelectionChanges,
    EuiTreeFormControlDirective,
    TreeItemModel,
    EuiTreeHelper,
    EUI_TREE,
    EuiTreeComponent,
} from '@eui/components/eui-tree';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'reactive-forms-custom-model',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TREE,
        FormsModule,
        ReactiveFormsModule,
        EuiTreeFormControlDirective,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsCustomModelComponent {
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

    public customModelControl = new FormControl(['1','3','5']);
    public customControlValueSetter: (selection: TreeDataModel) => any = (selection: TreeDataModel) => {
        return selection?.map((item) => {
            return item.node.treeContentBlock.id;
        });
    };
    public customControlModelMapper: (model: any, tree: TreeDataModel) => Array<TreeItemModel> = (model: Array<string>, tree: TreeDataModel) => {
        return new EuiTreeHelper(tree).getItems(model, 'node.treeContentBlock.id');
    };

    public readonly componentInstance = viewChild<EuiTreeComponent>('componentInstance');

    public onSelectionChange(e: EuiTreeSelectionChanges): void {
        console.log(e)
        console.log('Added', e.added.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Removed', e.removed.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Selection', e.selection.map((item) => item.node.treeContentBlock.label).join(','));
    }

    public getSelection(): void {
        console.log('this.componentInstance?.getSelection()', this.componentInstance()?.getSelection());
    }

    public getFormValue(): void {
        console.log("this.controlInitialData.value", this.customModelControl.value);
    }
}
```

