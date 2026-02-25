---
description: Enables a hover state that extends beyond the button bounds in dense UIs.
id: has-overflow-hover
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information" hasOverflowHover/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'has-overflow-hover',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HasOverflowHoverComponent {

}
```

