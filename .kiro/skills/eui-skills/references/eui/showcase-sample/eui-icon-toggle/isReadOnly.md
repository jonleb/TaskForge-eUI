---
description: Read-only toggle that displays state but does not allow interaction.
id: isReadOnly
---

```html
<eui-icon-toggle keyboardAccessKey="r" isReadOnly iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    selector: 'isReadOnly',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_TOGGLE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsReadOnlyComponent {
}
```

