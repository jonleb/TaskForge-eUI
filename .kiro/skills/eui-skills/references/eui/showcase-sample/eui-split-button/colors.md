---
description: Shows semantic color variants for the primary button and dropdown trigger.
id: colors
---

```html
<eui-split-button>
    <button euiButton (click)="onButtonClicked($event)">Default (euiSeconday)</button>
    <eui-dropdown>
        <button euiButton euiIconButton aria-label="Open dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>

<br/><br/>

<eui-split-button>
    <button euiButton euiPrimary (click)="onButtonClicked($event)">euiPrimary</button>
    <eui-dropdown>
        <button euiButton euiPrimary euiIconButton aria-label="Toggle primary Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>

<br/><br/>

<eui-split-button>
    <button euiButton euiInfo (click)="onButtonClicked($event)">euiInfo</button>
    <eui-dropdown>
        <button euiButton euiInfo euiIconButton aria-label="Toggle info Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>

<br/><br/>

<eui-split-button>
    <button euiButton euiSuccess (click)="onButtonClicked($event)">euiSuccess</button>
    <eui-dropdown>
        <button euiButton euiSuccess euiIconButton aria-label="Toggle success Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>

<br/><br/>

<eui-split-button>
    <button euiButton euiWarning (click)="onButtonClicked($event)">euiWarning</button>
    <eui-dropdown>
        <button euiButton euiWarning euiIconButton aria-label="Toggle warning Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
                </button>
            }
        </eui-dropdown-content>
    </eui-dropdown>
</eui-split-button>

<br/><br/>

<eui-split-button>
    <button euiButton euiDanger (click)="onButtonClicked($event)">euiDanger</button>
    <eui-dropdown>
        <button euiButton euiDanger euiIconButton aria-label="Toggle danger Dropdown">
            <eui-icon-svg icon="eui-chevron-down" />
        </button>
        <eui-dropdown-content>
            @for (item of listItems; track $index) {
                <button euiDropdownItem [disabled]="item?.disabled" (click)="onListItemClicked(item)">
                    <span euiLabel>{{ item.label }}</span>
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
    selector: 'colors',
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
export class ColorsComponent {

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

