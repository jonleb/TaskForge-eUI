---
description: Shows closeAlert handling and controlled visibility via the isVisible model.
id: eventHandlers
---

```html
<eui-alert (closeAlert)="onCloseAlertOne()" isCloseable>
    Sample text
</eui-alert>



<eui-alert (closeAlert)="onCloseAlertTwo($event)" [isVisible]="isAlertVisible()" isCloseable>
    Sample text
</eui-alert>
<br>

@if (!isAlertVisible()) {
    <button (click)="onVisible()" euiButton>show it again</button>
}
```

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {
    isAlertVisible = signal(true);

    onCloseAlertOne(): void {
        alert('alert closed');
    }

    onCloseAlertTwo(isVisible: boolean): void {
        this.isAlertVisible.set(isVisible);
    }

    onVisible(): void {
        this.isAlertVisible.set(true);
    }
}
```

