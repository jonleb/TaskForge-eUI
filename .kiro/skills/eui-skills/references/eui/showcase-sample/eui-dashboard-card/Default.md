---
description: Basic dashboard card with only a label, using default size and variant.
id: Default
---

```html
<eui-dashboard-card label="LABEL" />
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {

}
```

