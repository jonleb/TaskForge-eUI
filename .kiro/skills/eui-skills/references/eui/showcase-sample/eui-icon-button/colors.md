---
description: Applies base state variants (primary, secondary, info, success, warning, danger) to the icon button.
id: colors
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiPrimary/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiSecondary/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiInfo/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiSuccess/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiWarning/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiDanger/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {

}
```

