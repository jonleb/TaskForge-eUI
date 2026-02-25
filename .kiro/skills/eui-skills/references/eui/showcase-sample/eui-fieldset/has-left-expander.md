---
description: Moves the expand/collapse control to the left side of the header instead of the default right side.
id: has-left-expander
---

```html
<eui-fieldset label="Fieldset label" isExpandable hasLeftExpander>
    <p class="eui-u-text-paragraph">This is the fieldset content</p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'has-left-expander',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HasLeftExpanderComponent {

}
```

