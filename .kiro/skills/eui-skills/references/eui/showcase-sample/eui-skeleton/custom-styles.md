---
description: Composes multiple skeletons with layout utilities and custom heights to mimic real content.
id: custom-styles
---

```html
<div class="eui-u-m-2xl">
    <div class="eui-u-flex">
        <eui-skeleton circle euiSizeL />
        <div class="eui-u-flex-col eui-u-ml-m">
            <eui-skeleton line euiRounded euiSizeM />
            <eui-skeleton rectangle euiRounded euiSizeXS class="eui-u-mt-xs" style="height: 40px;" />
            <eui-skeleton line euiRounded euiSizeS class="eui-u-mt-xs" style="height: 25px;" />
        </div>
    </div>
    <eui-skeleton rectangle class="eui-u-mt-m" style="height: 150px;" />
    <div class="eui-u-flex eui-u-mt-m">
        <eui-skeleton rectangle euiSizeXS />
        <eui-skeleton rectangle euiSizeXS class="eui-u-ml-auto" />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'custom-styles',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStylesComponent {


}
```

