---
description: Basic dropdown button that opens a menu of action items with icons and a disabled option.
id: Default
---

```html
<eui-dropdown>
    <button euiButton>
        <label euiLabel>Default</label>
        <eui-icon-svg icon="eui-chevron-down" size="xs" />
    </button>
    <eui-dropdown-content>
        @for (item of listItems; track $index) {
            <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                <eui-icon-svg icon="{{item.icon}}" size="s" class="eui-u-mr-s" />
                <span euiLabel>{{item.label}}</span>
            </button>
        }
    </eui-dropdown-content>
</eui-dropdown>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    public listItems = [
        { id: '1', label: 'Secondary action 1', icon: 'eui-chevron-right' },
        { id: '2', label: 'Secondary action 2', icon: 'eui-chevron-right' },
        { id: '3', label: 'Secondary action 3', icon: 'eui-chevron-right' },
        { id: '4', label: 'Secondary action 4', icon: 'eui-chevron-right', disabled: true },
    ];

    public onListItemClicked(event: any) {
        console.log(event)
    }
}
```

