---
description: This sample demonstrates the urgent state, which adds a dedicated urgency indicator to the card header.
id: urgent
---

```html
<eui-card euiUrgent>
    <eui-card-header>
        <eui-card-header-title>
            Card Title
        </eui-card-header-title>
        <eui-card-header-subtitle>
            Card subtitle
        </eui-card-header-subtitle>
    </eui-card-header>
    <eui-card-content>
        Card content...
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';


@Component({
    // eslint-disable-next-line
    selector: 'urgent',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrgentComponent {

}
```

