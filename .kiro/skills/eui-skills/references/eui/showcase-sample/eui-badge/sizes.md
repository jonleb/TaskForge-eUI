---
description: Compares euiSizeS and default euiSizeM, including empty (dot) badges.
id: sizes
---

```html
<div class="eui-u-flex eui-u-flex-justify-content-evenly eui-u-flex-align-items-start eui-u-flex-wrap">
    <div class="col eui-u-flex eui-u-flex-column eui-u-mb-m eui-u-mr-m">
        <span>dotted</span>
        <eui-badge />
    </div>

    <div class="col eui-u-flex eui-u-flex-column eui-u-mb-m eui-u-mr-m">
        <span>euiSizeS</span>
        <eui-badge euiSizeS>Badge label</eui-badge>
    </div>

    <div class="col eui-u-flex eui-u-flex-column eui-u-mb-m eui-u-mr-m">
        <span>euiSizeM (Default)</span>
        <eui-badge euiSizeM>Badge label</eui-badge>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesComponent {
}
```

