---
description: Applies semantic color variants to badges.
id: color-types
---

```html
<div class="eui-u-flex eui-u-flex-justify-content-evenly eui-u-flex-wrap">
    @for (variant of variants; track variant) {
        <span class="col eui-u-flex eui-u-flex-column">
            <span>eui{{ variant | titlecase }}</span>
            <eui-badge euiVariant="{{ variant }}">9</eui-badge>
        </span>
    }
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line
    selector: 'color-types',
    templateUrl: 'component.html',
    imports: [...EUI_BADGE, TitleCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorTypesComponent {
    variants = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}
```

