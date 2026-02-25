---
description: Adds a tooltip whose text changes based on the current toggle state.
id: with-tooltip
---

```html
<eui-icon-toggle keyboardAccessKey="t" iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star"
                [euiTooltip]="isFavourite ? 'Remove favourite' : 'Mark as favourite'"
                (toggle)="onFavouriteToggle($event)" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    selector: 'with-tooltip',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE, EuiTooltipDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTooltipComponent {
    public isFavourite = false;
    public isLiked = false;

    public onFavouriteToggle(event: boolean) {
        this.isFavourite = !this.isFavourite;
    }

    public onLikeToggle(event: boolean) {
        this.isLiked = !this.isLiked;
    }
}
```

