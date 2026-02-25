---
description: Expander shown in the expanded state by setting isExpanded to true.
id: is-expanded
---

```html
<eui-icon-button-expander [isExpanded]="true"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    selector: 'is-expanded',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsExpandedComponent {
 
}
```

