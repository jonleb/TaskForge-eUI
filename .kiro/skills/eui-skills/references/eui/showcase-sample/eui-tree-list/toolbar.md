---
description: Enables the built-in toolbar with expand/collapse and a custom filter label.
id: toolbar
---

```html
<eui-tree-list [isShowToolbar]="true" filterLabel="My custom filter">
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
    selector: 'toolbar',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
}
```

