---
description: Demonstrates state variants using the base state directives (secondary, info, success, warning, danger).
id: colors
---

```html
<eui-progress-bar [progress]="75" label="euiPrimary (default)" /><br/>
<eui-progress-bar [progress]="75" label="euiSecondary" euiSecondary /><br/>
<eui-progress-bar [progress]="75" label="euiInfo" euiInfo /><br/>
<eui-progress-bar [progress]="75" label="euiSuccess" euiSuccess /><br/>
<eui-progress-bar [progress]="75" label="euiWarning" euiWarning /><br/>
<eui-progress-bar [progress]="75" label="euiDanger" euiDanger /><br/>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {

}
```

