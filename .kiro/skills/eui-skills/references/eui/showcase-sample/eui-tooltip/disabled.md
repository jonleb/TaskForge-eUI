---
description: Disables the tooltip with isDisabled while keeping the trigger element active.
id: disabled
---

```html
<button euiButton euiPrimary euiTooltip="Info about the action" isDisabled>Action</button>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {

}
```

