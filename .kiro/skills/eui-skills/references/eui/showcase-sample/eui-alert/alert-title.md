---
description: Adds an alert title and shows how long titles wrap across lines.
id: alert-title
---

```html
<eui-alert>
    <eui-alert-title>{{ title() }}</eui-alert-title>
    sample text
</eui-alert>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'alert-title',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTitleComponent {
    faker = inject(FakerService).instance;
    title = computed(() => this.faker().lorem.sentence( { min: 15, max: 20 } ));
}
```

