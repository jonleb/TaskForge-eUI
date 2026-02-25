---
description: Demonstrates placeholder text in an empty textarea using the placeholder attribute.
id: placeholder
---

```html
<textarea euiTextArea id="story-placeholder" name="story" rows="5" col="33" placeholder="Compose an epic..."></textarea>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_TEXTAREA } from '@eui/components/eui-textarea';


@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [...EUI_TEXTAREA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
}
```

