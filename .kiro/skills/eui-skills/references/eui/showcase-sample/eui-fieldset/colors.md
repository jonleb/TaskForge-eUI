---
description: Shows state variants that change fieldset visual emphasis while keeping the same expandable behavior.
id: colors
---

```html
<eui-fieldset label="Following list contains primary (10)" euiPrimary isExpandable [isExpanded]="false">
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains info (10)" euiInfo isExpandable [isExpanded]="false">
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains success (10)" euiSuccess isExpandable [isExpanded]="false">
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains warnings (10)" euiWarning isExpandable [isExpanded]="false">
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
<br>
<eui-fieldset label="Following list contains errors (10)" euiDanger isExpandable [isExpanded]="false">
    <p class="eui-u-text-paragraph">Fieldset content...</p>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {

}
```

