---
description: List embedded in an eui-card with per-item metadata and actions.
id: within-card
---

```html
<eui-card euiNoContentPadding>
    <eui-card-content>
        <ul euiList>
            <li euiListItem>
                <div euiIcon iconClass="eui-icon-filter eui-u-c-info"></div>
                <div euiLabel class="eui-u-text-truncate">My custom filter containing too many flters that it can't be displayed on a single line here</div>
                <div euiLabel euiSizeS class="eui-u-text-truncate"><em>Last update: 08-09-2021 17:45:00</em></div>
                <div class="eui-u-ml-auto">
                    <button euiButton euiOutline euiDanger euiSizeS (click)="onDeleteClick($event)" euiArrowKeyNavigable>
                        <span euiLabel>Delete</span>
                    </button>
                </div>
            </li>
            <li euiListItem>
                <div euiIcon iconClass="eui-icon-filter eui-u-c-info"></div>
                <div euiLabel class="eui-u-text-truncate">My supervised tasks filter</div>
                <div euiLabel euiSizeS class="eui-u-text-truncate"><em>Last update: 08-09-2021 18:00:00</em></div>
                <div class="eui-u-ml-auto">
                    <button euiButton euiOutline euiDanger euiSizeS (click)="onDeleteClick($event)" euiArrowKeyNavigable>
                        <span euiLabel>Delete</span>
                    </button>
                </div>
            </li>
        </ul>
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiArrowKeyNavigableDirective } from "@eui/components/directives";

@Component({
    selector: 'within-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LIST,
        ...EUI_LABEL,
        ...EUI_CARD,
        ...EUI_BUTTON,
        EuiArrowKeyNavigableDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithinCardComponent {

    public onDeleteClick(e: Event): void {
        console.log('Button clicked');
    }
}
```

