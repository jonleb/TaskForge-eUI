---
description: Composes a badge inside the title to highlight a count or status.
id: with-badge
---

```html
<eui-section-header>
    <eui-section-header-title>
        Section title
        <eui-badge>9</eui-badge>
    </eui-section-header-title>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'with-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithBadgeComponent {
}
```

