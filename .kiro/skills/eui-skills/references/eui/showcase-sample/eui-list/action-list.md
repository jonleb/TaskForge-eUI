---
description: Clickable list items that trigger actions on selection.
id: action-list
---

```html
<ul euiList>
    <li euiListItem (click)="onClick($event)">Action 1</li>
    <li euiListItem (click)="onClick($event)">Action 2</li>
    <li euiListItem (click)="onClick($event)">Action 3</li>
</ul>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    selector: 'action-list',
    templateUrl: 'component.html',
    imports: [...EUI_LIST],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionListComponent {
    onClick(event: Event) {
        console.log('event', event);
    }
}
```

