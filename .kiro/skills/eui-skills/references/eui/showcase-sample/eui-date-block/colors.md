---
description: Shows the default and secondary color variants by rendering two date blocks with different dates.
id: colors
---

```html
<eui-date-block [blockDate]="currentDate" />&nbsp;
<eui-date-block [blockDate]="pastDate" euiSecondary />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_DATE_BLOCK } from '@eui/components/eui-date-block';


@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DATE_BLOCK,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent {
    currentDate = new Date();
    pastDate = new Date(2025, 1, 1);
}
```

