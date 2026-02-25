---
description: Basic usage of eui-date-block showing a locale-formatted date block from the provided blockDate.
id: Default
---

```html
<eui-date-block [blockDate]="currentDate" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_DATE_BLOCK } from '@eui/components/eui-date-block';


@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DATE_BLOCK,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
    currentDate = new Date();
    pastDate = new Date(2025, 1, 1);
}
```

