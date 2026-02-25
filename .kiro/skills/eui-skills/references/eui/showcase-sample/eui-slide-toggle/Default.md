---
description: Basic slide toggle representing a boolean state.
id: Default
---

```html
<eui-slide-toggle />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

