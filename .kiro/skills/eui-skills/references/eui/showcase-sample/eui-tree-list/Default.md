---
description: Basic tree list showing a nested hierarchy of labeled items.
id: Default
---

```html
<eui-tree-list>
    <eui-tree-list-item label="Item 1 - with children">
        <eui-tree-list>
            <eui-tree-list-item label="Item 1.1 - with children">
                <eui-tree-list>
                    <eui-tree-list-item label="Item 1.1.1" />
                    <eui-tree-list-item label="Item 1.1.2" />
                    <eui-tree-list-item label="Item 1.1.3 - with children" />
                </eui-tree-list>
            </eui-tree-list-item>
            <eui-tree-list-item label="Item 1.2" />
        </eui-tree-list>
    </eui-tree-list-item>
    <eui-tree-list-item label="Item 2" />
    <eui-tree-list-item label="Item 3" />
</eui-tree-list>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

