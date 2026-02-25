---
description: Recursive multiselect without auto-selecting parent nodes.
id: multiselect-recursive-no-parent
---

```html
<eui-tree [nodes]="treeData" isMultiselect isRecursiveSelection [isRecursiveParentSelection]="false" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TreeDataModel, EuiTreeSelectionChanges, EUI_TREE } from '@eui/components/eui-tree';

@Component({
    selector: 'multiselect-recursive-no-parent',
    templateUrl: 'component.html',
    imports: [...EUI_TREE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectRecursiveNoParentComponent {
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

    public onSelectionChange(e: EuiTreeSelectionChanges): void {
        console.log(e)
        console.log('Added', e.added.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Removed', e.removed.map((item) => item.node.treeContentBlock.label).join(','));
        console.log('Selection', e.selection.map((item) => item.node.treeContentBlock.label).join(','));
    }
}
```

