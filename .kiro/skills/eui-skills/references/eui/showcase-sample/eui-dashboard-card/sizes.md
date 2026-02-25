---
description: Compares size variants (M, L, XL, 2XL) with icon, image, and text avatars.
id: sizes
---

```html
<!-- TODO: fix the bug when changeDetection OnPUsh, migrate to signal -->
<div class="eui-u-flex eui-u-flex-column eui-u-flex-gap-m">
    @for (category of categories; track category) {
        <div class="eui-u-flex eui-u-flex-gap-m">
            @for (size of sizes; track $index) {
                <eui-dashboard-card
                    [euiSizeM]="size.euiSizeM"
                    [euiSizeL]="size.euiSizeL"
                    [euiSizeXL]="size.euiSizeXL"
                    [euiSize2XL]="size.euiSize2XL"
                    [iconSvgName]="category.iconSvgName"
                    [iconLabel]="category.iconLabel"
                    [imageUrl]="category.imageUrl"
                    [label]="size.label" />
            }
        </div>
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";


@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesComponent {
    sizes = [
        { euiSizeM: true, label: 'euiSizeM' },
        { euiSizeL: true, label: 'euiSizeL' },
        { euiSizeXL: true, label: 'default - euiSizeXL' },
        { euiSize2XL: true, label: 'default - euiSize2XL' },
    ];
    categories = [
        { iconSvgName: 'eui-home' },
        { imageUrl: 'assets/images/avatars/rabbit.png' },
        { iconLabel: 'eUI' }
    ];
}
```

