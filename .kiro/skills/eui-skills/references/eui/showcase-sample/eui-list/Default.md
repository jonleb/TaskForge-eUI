---
description: Basic euiList with euiListItem elements and labels, ready for keyboard navigation.
id: Default
---

```html
<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiLabel>Label 1</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiLabel>Label 2</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiLabel>Label 3</span>
    </li>
</ul>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }
}
```

