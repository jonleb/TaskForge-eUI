---
description: Basic single-select toggle group; clicking one item unchecks the others.
id: Default
---

```html
<eui-toggle-group>
    <eui-toggle-group-item id="1">item 1</eui-toggle-group-item>
    <eui-toggle-group-item id="2">item 2</eui-toggle-group-item>
    <eui-toggle-group-item id="3">item 3</eui-toggle-group-item>
</eui-toggle-group>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TOGGLE_GROUP } from '@eui/components/eui-toggle-group';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TOGGLE_GROUP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
 
}
```

