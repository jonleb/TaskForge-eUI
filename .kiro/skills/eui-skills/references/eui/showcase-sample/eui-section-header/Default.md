---
description: Basic section header with a title only.
id: Default
---

```html
<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

