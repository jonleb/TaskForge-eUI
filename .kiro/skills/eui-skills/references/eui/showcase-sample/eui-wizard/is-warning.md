---
description: Displays a warning state on a step using isWarning.
id: is-warning
---

```html
<eui-wizard>
    <eui-wizard-step label="WARNING" isWarning>
        <p class="eui-u-text-paragraph">Step content...</p>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-warning',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsWarningComponent {
}
```

