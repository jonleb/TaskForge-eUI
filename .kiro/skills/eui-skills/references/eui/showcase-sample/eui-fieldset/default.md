---
description: Basic fieldset usage with a static label and projected content rendered inside the body.
id: default
---

```html
<eui-fieldset label="Fieldset label">
    <p class="eui-u-text-paragraph">
        fieldset content
    </p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

