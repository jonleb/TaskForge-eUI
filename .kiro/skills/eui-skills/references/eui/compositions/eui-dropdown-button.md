# eui-dropdown-button

## Overview

<p class="eui-u-text-paragraph">
    eUI <strong>dropdown button</strong> is not specifically an eUI component but a <strong>composition</strong> build using <code class="eui-u-text-code">&lt;eui-button&gt;</code> as the trigger action button and <code class="eui-u-text-code">&lt;eui-dropdown&gt;</code> for accessing the menu containing the action's list items.µ
</p>

<p class="eui-u-text-paragraph">Related components used in this composition :</p>
<a euiButton euiSizeS euiPrimary euiOutline class="eui-u-mr-m" routerLink="/style-guide/components/eui-button">
    eui-button
</a>
<a euiButton euiSizeS euiPrimary euiOutline class="eui-u-mr-m" routerLink="/style-guide/components/eui-dropdown">
    eui-dropdown
</a>

## Samples

### [Default](samples/eui-dropdown-button/Default)

```html
<div class="eui-dropdown-button">
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
</div>
```

```typescript
import { Component, inject } from "@angular/core";

import { EuiGrowlService } from '@eui/core';
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
    providers: [EuiGrowlService],
})
export class DefaultComponent {

    public listItems = [
        { id: '1', label: 'Secondary action 1', icon: 'eui-chevron-right' },
        { id: '2', label: 'Secondary action 2', icon: 'eui-chevron-right' },
        { id: '3', label: 'Secondary action 3', icon: 'eui-chevron-right' },
        { id: '4', label: 'Secondary action 4', icon: 'eui-chevron-right', disabled: true },
    ];
    private growlService: EuiGrowlService = inject(EuiGrowlService);

    public onListItemClicked(event: any) {
        this.growlService.growl(
            {
                severity: 'success',
                summary: 'onListItemClicked() event',
                detail: `<code class="eui-u-text-code">` + JSON.stringify(event) + `</code>`,
            },
            false,
            true,
            5000,
            'bottom-right',
        );
    }
}
```

### Other examples

- [Misc: With eui-card](samples/eui-dropdown-button/with-card)
