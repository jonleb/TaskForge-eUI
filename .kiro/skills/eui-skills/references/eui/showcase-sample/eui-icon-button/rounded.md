---
description: Shows the rounded shape option combined with the standard color variants.
id: rounded
---

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiPrimary euiRounded/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiSecondary euiRounded/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiInfo euiRounded/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiSuccess euiRounded/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiWarning euiRounded/>
<eui-icon-button icon="eui-state-info" ariaLabel="information" euiDanger euiRounded/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'rounded',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundedComponent {

}
```

