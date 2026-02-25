---
description: Expander configured for forward (horizontal) direction, typically used for sidebars; click toggles the expanded state.
id: is-direction-forward
---

```html
<eui-icon-button-expander [isExpanded]="isExpanded" isDirectionForward (buttonClick)="onToggle()"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    selector: 'is-direction-forward',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsDirectionForwardComponent {
    isExpanded = false;

    onToggle(): void {
        this.isExpanded = !this.isExpanded;
    }

}
```

