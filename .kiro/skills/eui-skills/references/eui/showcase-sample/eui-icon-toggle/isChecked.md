---
description: Starts the icon toggle in the checked state using the isChecked input.
id: isChecked
---

```html
<eui-icon-toggle keyboardAccessKey="c" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" [isChecked]="true" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    selector: 'isChecked',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_TOGGLE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsCheckedComponent {
}
```

