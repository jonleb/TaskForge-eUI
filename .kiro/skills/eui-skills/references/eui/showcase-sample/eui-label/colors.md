---
description: Base state variants (primary, secondary, success, info, warning, danger) applied to labels.
id: colors
---

```html
<span euiLabel euiPrimary><strong>euiPrimary</strong> sample label</span>
<br><br>
<span euiLabel euiSecondary><strong>euiSecondary</strong> sample label</span>
<br><br>
<span euiLabel euiSuccess><strong>euiSuccess</strong> sample label</span>
<br><br>
<span euiLabel euiInfo><strong>euiInfo</strong> sample label</span>
<br><br>
<span euiLabel euiWarning><strong>euiWarning</strong> sample label</span>
<br><br>
<span euiLabel euiDanger><strong>euiDanger</strong> sample label</span>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

