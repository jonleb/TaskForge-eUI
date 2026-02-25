---
description: Disables the component while keeping the selected range visible.
id: disabled
---

```html
<eui-date-range-selector [isDisabled]="true" [startDateDefaultValue]="startDate" [endDateDefaultValue]="endDate" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_DATE_RANGE_SELECTOR } from "@eui/components/eui-date-range-selector";
import { DEFAULT_FORMATS } from '@eui/components/eui-datepicker';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'disabled',
    templateUrl: './component.html',
    imports: [...EUI_DATE_RANGE_SELECTOR],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
    public startDate = new Date('06/08/2023');
    public endDate = new Date('06/15/2023');
}
```

