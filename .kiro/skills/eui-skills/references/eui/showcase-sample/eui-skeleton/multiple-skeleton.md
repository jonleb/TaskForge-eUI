---
description: Combines several shapes to build a composite loading placeholder.
id: multiple-skeleton
---

```html
<div class="eui-u-flex">
    <eui-skeleton circle euiSizeL />

    <div class="eui-u-ml-m eui-u-flex-col">
        <eui-skeleton line />
        <eui-skeleton line euiSizeL class="eui-u-mt-xs" />
        <eui-skeleton line euiSizeM class="eui-u-mt-xs" />
    </div>

    <div class="eui-u-ml-m">
        <eui-skeleton rectangle euiSizeXS />
        <eui-skeleton rectangle euiSizeXS class="eui-u-ml-m" />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'multiple-skeleton',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleSkeletonComponent {

}
```

