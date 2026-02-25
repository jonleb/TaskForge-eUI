---
description: Places badges inside buttons as counters for each button state.
id: with-buttons
---

```html
<div class="eui-u-flex eui-u-flex-align-items-start eui-u-flex-wrap">
    @for (variant of variants; track variant) {
        <div class="eui-u-mr-m eui-u-mb-m">
            <button euiButton euiVariant="{{ variant }}">
                {{ variant | titlecase }}
                <span euiBadge>9</span>
            </button>
        </div>
    }
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'with-buttons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
        ...EUI_BUTTON,
        TitleCasePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithButtonsComponent {
    variants = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}
```

