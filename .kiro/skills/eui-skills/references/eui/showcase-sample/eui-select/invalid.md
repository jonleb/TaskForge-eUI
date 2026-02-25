---
description: Shows euiSelect with isInvalid attribute for error state styling.
id: invalid
---

```html
<select euiSelect name="framework" id="isInvalid" isInvalid>
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';


@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

