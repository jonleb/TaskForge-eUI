---
description: Size variants using euiSizeM and euiSizeS to adjust label typography.
id: sizes
---

```html
<div class="doc-sample-section-title">euiSizeM</div>
<p class="eui-u-text-paragraph">Usage: default label size</p>
<br>
<div euiLabel euiSizeM>Sample label</div>


<div class="doc-sample-section-title">euiSizeS</div>
<p class="eui-u-text-paragraph">Usage: default sub-label size</p>
<br>
<div euiLabel euiSizeS>Sample label</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {
}
```

