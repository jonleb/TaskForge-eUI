---
description: Demonstrates disabled attribute on select element and individual option elements.
id: disabled
---

```html
<select euiSelect name="framework" aria-label="framework Disabled" disabled>
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>

<div class="doc-sample-section-title">Option Disabled</div>
<select euiSelect name="framework" aria-label="option Disabled">
    <option value="angular" disabled>Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';


@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
}
```

