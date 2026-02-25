---
description: Shows textarea in disabled state using the disabled attribute, preventing user interaction.
id: disabled
---

```html
<textarea euiTextArea id="story-disabled" name="story" rows="5" cols="33" disabled aria-label="Story disabled">It was a dark and stormy night...</textarea>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_TEXTAREA } from '@eui/components/eui-textarea';


@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_TEXTAREA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
}
```

