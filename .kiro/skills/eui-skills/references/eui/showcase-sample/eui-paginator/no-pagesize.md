---
description: Hide the page-size selector while keeping basic navigation controls.
id: no-pagesize
---

```html
<eui-paginator [length]="dataSource.length" isBasicMode hasPageSize="false" />
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PAGINATOR } from "@eui/components/eui-paginator";

@Component({
    selector: 'no-pagesize',
    templateUrl: 'component.html',
    imports: [...EUI_PAGINATOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPagesizeComponent implements OnInit {

    public dataSource: any[] = [
        { id: 0},
    ];

    ngOnInit() {
        for (let i = 1; i < 1100; i++) {
            this.dataSource.push({ id: i });
        }
    }

}
```

