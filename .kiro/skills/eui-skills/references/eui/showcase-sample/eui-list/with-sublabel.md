---
description: List items with a main label and one or more sublabels.
id: with-sublabel
---

```html
<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label 1</span>
        <span euiLabel euiSizeS>Sub-label 2</span>
    </li>
</ul>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    selector: 'with-sublabel',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSublabelComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }
}
```

