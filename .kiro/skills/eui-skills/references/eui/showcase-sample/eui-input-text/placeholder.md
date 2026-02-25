---
description: Basic euiInputText with placeholder attribute for empty state guidance.
id: placeholder
---

```html
<input euiInputText aria-label="placeholder dynamic" value="" placeholder="Add your summary here..." />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_TEXT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
}
```

