---
description: Shows empty and numeric badges using element and attribute selectors.
id: Default
---

```html
<div class="eui-u-flex eui-u-flex-justify-content-evenly eui-u-flex-wrap">
    <span euiBadge></span>
    <span euiBadge>9</span>
    <eui-badge>99</eui-badge>
    <eui-badge>999</eui-badge>
    <eui-badge>9999</eui-badge>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';


@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_BADGE],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
}
```

