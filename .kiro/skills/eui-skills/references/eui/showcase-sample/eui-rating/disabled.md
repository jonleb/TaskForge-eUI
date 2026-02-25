---
description: Shows a preset rating in a disabled state to prevent user interaction.
id: disabled
---

```html
<eui-rating [rating]="4" euiDisabled/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {

}
```

