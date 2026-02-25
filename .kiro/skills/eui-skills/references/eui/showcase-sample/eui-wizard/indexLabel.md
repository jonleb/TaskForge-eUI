---
description: Overrides the step indicator label with custom text via indexLabel.
id: indexLabel
---

```html
<eui-wizard>
    <eui-wizard-step indexLabel="A" label="STEP 1">
        step 1 content
    </eui-wizard-step>
    <eui-wizard-step indexLabel="B" label="STEP 2">
        step 2 content
    </eui-wizard-step>
    <eui-wizard-step indexLabel="C" label="STEP 3">
        step 3 content
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'indexLabel',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexLabelComponent {
}
```

