---
description: Demonstrates the non-interactive state using the euiDisabled input.
id: disabled
---

```html
<div class="doc-sample-section-title">euiDisabled</div>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiDisabled/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {

}
```

