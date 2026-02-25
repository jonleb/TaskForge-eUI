---
description: Disables a step so it cannot be selected using isDisabled.
id: is-disabled
---

```html
<eui-wizard>
    <eui-wizard-step label="DISABLED" isDisabled>
        <p class="eui-u-text-paragraph">Step content...</p>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-disabled',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsDisabledComponent {
}
```

