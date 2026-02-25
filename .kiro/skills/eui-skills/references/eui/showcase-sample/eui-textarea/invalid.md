---
description: Displays textarea with invalid state using isInvalid property to indicate validation errors.
id: invalid
---

```html
<textarea euiTextArea id="story-invalid-dyn" name="story" rows="5" cols="33" isInvalid aria-label="Story invalid">
It was a dark and stormy night...
</textarea>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_TEXTAREA } from '@eui/components/eui-textarea';


@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_TEXTAREA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

