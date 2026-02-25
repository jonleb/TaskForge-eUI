---
description: Demonstrates a custom 10-star scale with a preset rating value.
id: number-stars
---

```html
<eui-rating [numberOfStars]="10" [rating]="6"/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    selector: 'number-stars',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberStarsComponent {

}
```

