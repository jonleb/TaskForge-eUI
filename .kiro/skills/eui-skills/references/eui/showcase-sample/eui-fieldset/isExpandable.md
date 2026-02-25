---
description: Enables interactive expand/collapse behavior so the content is toggled from the header expander button.
id: isExpandable
---

```html
<eui-fieldset label="Fieldset label" isExpandable>
    <p class="eui-u-text-paragraph">This is the fieldset content</p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'isExpandable',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsExpandableComponent {

}
```

