---
description: List items combining an icon, label, and sublabel(s).
id: with-sublabel-icon
---

```html
<ul euiList>
    <li euiListItem (click)="onListItemClicked('1')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('2')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem (click)="onListItemClicked('3')">
        <span euiIconSvg icon="circle-dashed:regular"></span>
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
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    selector: 'with-sublabel-icon',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSublabelIconComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }
}
```

