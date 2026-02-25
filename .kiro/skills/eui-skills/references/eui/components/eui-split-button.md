# eui-split-button

## Overview

<p class="eui-u-text-paragraph">
     eUI <strong>split button</strong> is not specifically an eUI component but a <strong>composition</strong> build using <code class="eui-u-text-code">&lt;eui-button&gt;</code> as the primary action button and <code class="eui-u-text-code">&lt;eui-dropdown&gt;</code> with an icon button trigger for accessing the menu containing the secondary action items.
</p>

<p class="eui-u-text-paragraph">Related components used in this composition :</p>

<a euiButton euiSizeS euiPrimary euiOutline class="eui-u-mr-m" routerLink="/style-guide/components/eui-button">
    eui-button
</a>
<a euiButton euiSizeS euiPrimary euiOutline class="eui-u-mr-m" routerLink="/style-guide/components/eui-dropdown">
    eui-dropdown
</a>

## Samples

### [Default](samples/eui-split-button/Default)

```html
<eui-split-button>
    <button euiButton (click)="onButtonClicked($event)">Default</button>
    <eui-dropdown>
        <button euiButton euiIconButton aria-label="Toggle Dropdown">
            <eui-icon-svg icon="eui-chevron-down" size="xs" />
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
import { Component } from '@angular/core';

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SPLIT_BUTTON } from '@eui/components/eui-split-button';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_SPLIT_BUTTON,
    ],
})
export class DefaultComponent {

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

### Other examples

- [Variants: Colors](samples/eui-split-button/colors)
- [Variants: Outline](samples/eui-split-button/outline)
- [Misc: With eui-card](samples/eui-split-button/with-card)
