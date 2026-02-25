---
description: Marks a step as the current active step using isActive.
id: is-active
---

```html
<eui-wizard>
    <eui-wizard-step label="ACTIVE" isActive>
        <p class="eui-u-text-paragraph">Step content...</p>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-active',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsActiveComponent {
}
```

