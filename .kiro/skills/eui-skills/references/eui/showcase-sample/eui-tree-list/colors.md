---
description: Applies semantic color variants on tree list items using base state directives.
id: colors
---

```html
<eui-tree-list>
    <eui-tree-list-item euiPrimary label="Primary item" />
    <eui-tree-list-item euiSecondary label="Secondary item" />
    <eui-tree-list-item euiInfo label="Info item" />
    <eui-tree-list-item euiSuccess label="Success item" />
    <eui-tree-list-item euiWarning label="Warning item" />
    <eui-tree-list-item euiDanger label="Danger item" />
</eui-tree-list>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

