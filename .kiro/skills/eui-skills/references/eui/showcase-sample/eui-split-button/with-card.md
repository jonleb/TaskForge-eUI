---
description: Places a split button inside a card header as a contextual action.
id: with-card
---

```html
<eui-card>
    <eui-card-header>
        <eui-card-header-title>Card title</eui-card-header-title>
        <eui-card-header-right-content>

            <eui-split-button>
                <button euiButton euiPrimary euiSizeS euiOutline (click)="onButtonClicked($event)">Primary</button>
                <eui-dropdown>
                    <button euiButton euiPrimary euiSizeS euiOutline euiIconButton aria-label="Toggle Dropdown">
                        <eui-icon-svg icon="eui-chevron-down" size="xs" />
                    </button>
                    <eui-dropdown-content>
                        @for (item of listItems; track $index) {
                            <button euiDropdownItem (click)="onListItemClicked(item)">
                                <span euiLabel>{{item.label}}</span>
                            </button>
                        }
                    </eui-dropdown-content>
                </eui-dropdown>
            </eui-split-button>

        </eui-card-header-right-content>
    </eui-card-header>

    <eui-card-content>
        <p class="eui-u-text-paragraph">Card content...</p>
    </eui-card-content>
</eui-card>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_SPLIT_BUTTON } from '@eui/components/eui-split-button';

@Component({
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_SPLIT_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithCardComponent {

    listItems = [
        { id: '1', label: 'Secondary action 1' },
        { id: '2', label: 'Secondary action 2' },
        { id: '3', label: 'Secondary action 3' },
    ];

    public onButtonClicked(event: Event) {
        console.log('Button clicked')
    }

    public onListItemClicked(event: any) {
        console.log('List item clicked')
    }
}
```

