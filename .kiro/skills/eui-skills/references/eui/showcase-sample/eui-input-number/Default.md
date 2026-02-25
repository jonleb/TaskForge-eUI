---
description: Basic euiInputNumber directive with default formatting and locale-aware number display.
id: Default
---

```html
<input euiInputNumber value="9999.02" aria-label='Default Input example'/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
}
```

