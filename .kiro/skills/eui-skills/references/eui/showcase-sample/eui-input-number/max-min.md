---
description: min and max attributes enforce numeric range validation and input constraints.
id: max-min
---

```html
<div class="doc-sample-section-title">With Min -100</div>
<label euiLabel for="isMin">Min</label>
<input euiInputNumber value="-99" id="isMin" min=-100 />

<div class="doc-sample-section-title">With Max 100</div>
<label euiLabel for="isMax">Max</label>
<input euiInputNumber value="99" id="isMax" max=100 />

<div class="doc-sample-section-title">With min -100 and max 100</div>
<label euiLabel for="isMaxMin">Min & Max</label>
<input euiInputNumber value="99" id="isMaxMin" max=100 min=-100 />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'max-min',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxMinComponent {
}
```

