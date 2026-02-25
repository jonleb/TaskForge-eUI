---
description: Displays a validation error state on a step using isInvalid.
id: is-invalid
---

```html
<eui-wizard>
    <eui-wizard-step label="INVALID" isInvalid>
        <p class="eui-u-text-paragraph">Step content...</p>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-invalid',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsInvalidComponent {
}
```

