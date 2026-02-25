---
description: Shows how to create multi-line tooltips by inserting line breaks in the content.
id: multi-lines
---

```html
<button euiButton euiPrimary euiTooltip="Multi-lines tooltip &#13; This is a second line &#13; This is a third line">Action</button>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    selector: 'multi-lines',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiLinesComponent {
}
```

