---
description: Removes internal padding so the icon fills the button area for compact layouts.
id: has-no-padding
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information" hasNoPadding/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'has-no-padding',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HasNoPaddingComponent {

}
```

