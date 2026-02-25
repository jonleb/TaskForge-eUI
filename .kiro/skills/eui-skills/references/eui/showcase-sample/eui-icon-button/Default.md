---
description: Basic icon-only button with the default size, styling, and an accessible ariaLabel.
id: Default
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_LAYOUT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

