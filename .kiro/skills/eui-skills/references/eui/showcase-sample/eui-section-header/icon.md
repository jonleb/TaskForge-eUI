---
description: Adds a leading icon to the header for visual context.
id: icon
---

```html
<eui-section-header>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
}
```

