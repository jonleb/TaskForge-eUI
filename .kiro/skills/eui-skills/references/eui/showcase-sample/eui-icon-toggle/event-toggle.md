---
description: Handles the toggle event and mirrors the checked value in the UI.
id: event-toggle
---

```html
<eui-icon-toggle keyboardAccessKey="v" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" (toggle)="onToggle($event)" />

<br><br>

<pre class="eui-u-text-pre">
toggle checked : {{isChecked}}
</pre>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    selector: 'eventToggle',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_TOGGLE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventToggleComponent {
    public isChecked = false;

    public onToggle(isChecked: boolean) {
        this.isChecked = isChecked;
    }
}
```

