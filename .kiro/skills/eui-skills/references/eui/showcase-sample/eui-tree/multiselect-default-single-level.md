---
description: Enable multiselect on a single-level (flat) tree.
id: multiselect-default-single-level
---

```html
<eui-tree [nodes]="treeData" isMultiselect />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TreeDataModel, EuiTreeSelectionChanges, EUI_TREE } from '@eui/components/eui-tree';

@Component({
    selector: 'multiselect-default-single-level',
    templateUrl: 'component.html',
    imports: [...EUI_TREE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectDefaultSingleLevelComponent {
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
        },
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT C',
                },
            },
        },
        {
            node: {
                treeContentBlock: {
                    label: 'DIGIT D',
                },
            },
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

