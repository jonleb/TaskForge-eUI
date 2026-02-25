---
description: List inside a responsive layout with truncated text and optional actions.
id: within-resp-flexbox
---

```html
<div class="row">
    <div class="col-md-6">
        <ul euiList>
            <li euiListItem>
                <div euiIcon iconClass="eui-icon-filter eui-u-c-info"></div>
                <div euiLabel class="eui-u-text-truncate eui-u-text-link">
                    <a (click)="onItemClicked()" class="eui-u-text-link">My custom filter containing too many filters that it can't be displayed on a single line here</a>
                </div>
                <div euiLabel euiSizeS class="eui-u-text-truncate"><em>Last update: 08-09-2021 17:45:00</em></div>
            </li>
            <li euiListItem>
                <div euiIcon iconClass="eui-icon-filter eui-u-c-info"></div>
                <div euiLabel class="eui-u-text-truncate eui-u-text-link">
                    <a (click)="onItemClicked()" class="eui-u-text-link">My supervised tasks filter</a>
                </div>
                <div euiLabel euiSizeS class="eui-u-text-truncate"><em>Last update: 08-09-2021 18:00:00</em></div>
                <div class="eui-u-ml-auto">
                    <button euiButton euiOutline euiDanger euiSizeS class="eui-u-ml-s" (click)="onDeleteClick($event)" euiArrowKeyNavigable>
                        <span euiLabel>Delete</span>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiArrowKeyNavigableDirective } from "@eui/components/directives";

@Component({
    selector: 'within-resp-flexbox',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LIST,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        EuiArrowKeyNavigableDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithinRespFlexboxComponent {

    public onItemClicked(): void {
        console.log('Item clicked');
    }

    public onDeleteClick(e: Event): void {
        console.log('Button clicked');
    }
}
```

