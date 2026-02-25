---
description: Sets custom placeholders for the start and end date inputs.
id: placeholder
---

```html
<div class="doc-sample-section-title">With different placeholder</div>
<eui-date-range-selector firstInputPlaceholder="m/d/yyyy" secondInputPlaceholder="m/d/yyyy" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_DATE_RANGE_SELECTOR } from "@eui/components/eui-date-range-selector";
import { DEFAULT_FORMATS } from '@eui/components/eui-datepicker';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'placeholder',
    templateUrl: './component.html',
    imports: [...EUI_DATE_RANGE_SELECTOR],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
}
```

