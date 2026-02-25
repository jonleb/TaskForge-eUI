---
description: Emits the buttonClick event; the sample logs the click event to the console.
id: event-handlers
---

```html
<eui-alert>Open the browser console to observe events.</eui-alert><br />

<table class="eui-table-default eui-table-default--compact">
    <thead>
        <tr>
            <th>Event handler</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>buttonClick</td>
            <td>Triggered when the button is click.</td>
        </tr>
    </tbody>
</table>

<br>

<eui-icon-button icon="eui-state-info" (buttonClick)="onClick($event)" ariaLabel="information"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {

    onClick(event: Event): void {
        console.log('button clicked', event);
    }

}
```

