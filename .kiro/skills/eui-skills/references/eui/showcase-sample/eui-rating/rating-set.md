---
description: Shows how to prefill the component with an initial rating.
id: rating-set
---

```html
<eui-rating [rating]="1"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    selector: 'rating-set',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingSetComponent {

}
```

