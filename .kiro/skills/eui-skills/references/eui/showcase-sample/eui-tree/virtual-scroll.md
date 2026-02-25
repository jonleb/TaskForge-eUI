---
description: Render a very large first-level list to trigger virtual scrolling.
id: virtual-scroll
---

```html
<div class="row">
    <div class="col-md-6">
        <eui-tree [style.max-height]="'400px'" [nodes]="treeData" isMultiselect />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TREE, TreeDataModel } from '@eui/components/eui-tree';

@Component({
    selector: 'virtual-scroll',
    templateUrl: 'component.html',
    imports: [...EUI_TREE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollComponent {
    public treeData: TreeDataModel = [
        ...Array.from({ length: 10000 }).map((_, i) => ({node: {
            treeContentBlock: {
                label: 'DIGIT A'+i,
            },
        }})),

    ];


}
```

