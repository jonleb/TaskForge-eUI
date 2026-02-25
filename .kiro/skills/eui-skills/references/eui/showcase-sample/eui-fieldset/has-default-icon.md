---
description: Demonstrates the built-in state icon in the header, mapped to the active variant color.
id: has-default-icon
---

```html
<eui-fieldset label="Following list contains infos (10)" euiInfo isExpandable [isExpanded]="false" hasDefaultIcon>
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains success (10)" euiSuccess isExpandable [isExpanded]="false" hasDefaultIcon>
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains warnings (10)" euiWarning isExpandable [isExpanded]="false" hasDefaultIcon>
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains errors (10)" euiDanger isExpandable [isExpanded]="false" hasDefaultIcon>
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'has-default-icon',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HasDefaultIconComponent {

}
```

