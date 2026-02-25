---
description: Minimal paginator showing only previous/next controls, suited for async data or unknown totals.
id: basic-mode
---

```html
<eui-paginator [length]="dataSource.length" isBasicMode />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PAGINATOR } from "@eui/components/eui-paginator";

@Component({
    selector: 'basic-mode',
    templateUrl: 'component.html',
    imports: [...EUI_PAGINATOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicModeComponent implements OnInit {

    public dataSource: any[] = [
        { id: 0 },
    ];

    ngOnInit() {
        for (let i = 1; i < 1100; i++) {
            this.dataSource.push({ id: i });
        }
    }

}
```

