---
description: Active list item state using the isActive input for focus/selection styling.
id: isActive
---

```html
<ul euiList>
    <li euiListItem>
        <span euiLabel>List item 1</span>
    </li>
    <li euiListItem>
        <span euiLabel>List item 2</span>
    </li>
    <li euiListItem isActive>
        <span euiLabel>List item 3 (active)</span>
    </li>
</ul>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'is-active',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsActiveListItemComponent {

}
```

