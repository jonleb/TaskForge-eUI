---
description: Applies the outline style to both parts of the split button.
id: outline
---

```html
<eui-split-button>
    <button euiButton euiOutline (click)="onButtonClicked($event)">Default</button>
    <eui-dropdown>
        <button euiButton euiOutline euiIconButton aria-label="Toggle Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{item.label}}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SPLIT_BUTTON } from '@eui/components/eui-split-button';

@Component({
    selector: 'outline',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_SPLIT_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineComponent {

    listItems = [
        { id: '1', label: 'Secondary action 1' },
        { id: '2', label: 'Secondary action 2' },
        { id: '3', label: 'Secondary action 3' },
        { id: '4', label: 'Secondary action 4', disabled: true },
    ];

    public onButtonClicked(event: Event) {
        console.log('Button clicked')
    }

    public onListItemClicked(event: any) {
        console.log('List item clicked')
    }

}
```

