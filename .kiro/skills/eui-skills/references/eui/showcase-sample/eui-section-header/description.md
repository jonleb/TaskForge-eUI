---
description: Adds a descriptive line under the title for additional context.
id: description
---

```html
<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-description>Section description</eui-section-header-description>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'description',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionComponent {
}
```

