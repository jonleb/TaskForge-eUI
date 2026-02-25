---
description: Basic expander bound to an isExpanded state; clicking the button toggles the icon, using a secondary fill color.
id: Default
---

```html
<eui-icon-button-expander [isExpanded]="isExpanded" fillColor="secondary" (buttonClick)="onToggle()"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
    isExpanded = false;
    
    onToggle(): void {
        this.isExpanded = !this.isExpanded;
    }

}
```

