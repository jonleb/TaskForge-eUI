---
description: Displays the available size values from 2xs through 4xl.
id: sizes
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="2xs"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="xs"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="s"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="m"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="l"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="xl"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="2xl"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="3xl"/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" size="4xl"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {

}
```

