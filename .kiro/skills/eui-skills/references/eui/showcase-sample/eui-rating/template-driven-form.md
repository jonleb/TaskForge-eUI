---
description: Binds the rating with ngModel and displays the current value.
id: template-driven-form
---

```html
<eui-rating [(ngModel)]="rating"/>
<br/><br/>
rating: {{ rating }}
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_RATING,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {
    protected rating = 2;
}
```

