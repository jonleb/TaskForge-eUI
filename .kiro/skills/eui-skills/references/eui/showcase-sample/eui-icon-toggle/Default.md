---
description: Basic icon toggle using distinct on/off icons to represent a switchable state.
id: Default
---

```html
<div class="doc-sample-section-title">With svg icon : filled/outline for on/off toggle icon name</div>
    <eui-icon-toggle iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_TOGGLE } from "@eui/components/eui-icon-toggle";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

