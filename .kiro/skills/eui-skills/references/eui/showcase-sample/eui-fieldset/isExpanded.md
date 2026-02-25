---
description: Controls whether content starts open or closed when the fieldset is expandable.
id: isExpanded
---

```html
<eui-fieldset label="Fieldset label" isExpandable>
    <p class="eui-u-text-paragraph">This is the <strong>fieldset</strong> content.</p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'IsExpanded',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsExpandedComponent {

}
```

