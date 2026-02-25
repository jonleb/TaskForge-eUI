---
description: Uses eui-avatar-text to display initials or short text.
id: text
---

```html
<eui-avatar>
    <eui-avatar-text>eUI</eui-avatar-text>
</eui-avatar>
<eui-avatar>
    <eui-avatar-text>JD</eui-avatar-text>
</eui-avatar>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';


@Component({
    // eslint-disable-next-line
    selector: 'text',
    templateUrl: 'component.html',
    imports: [...EUI_AVATAR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
}
```

