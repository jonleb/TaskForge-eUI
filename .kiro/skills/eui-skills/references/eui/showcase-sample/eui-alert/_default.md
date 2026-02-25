---
description: Shows the default alert.
id: _default
---

```html
<eui-alert>{{ mockText() }}</eui-alert>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'overview-default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDefaultComponent {
    faker = inject(FakerService).instance;
    mockText = computed(() => this.faker().lorem.sentence());
}
```

