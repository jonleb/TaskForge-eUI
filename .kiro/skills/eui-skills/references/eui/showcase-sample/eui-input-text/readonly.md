---
description: euiInputText with readonly attribute to prevent user input while maintaining visual accessibility.
id: readonly
---

```html
<input euiInputText value="Input text sample" readonly aria-label="Input text sample readonly"/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_TEXT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {
}
```

