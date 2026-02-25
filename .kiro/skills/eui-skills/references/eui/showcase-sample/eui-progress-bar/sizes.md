---
description: Shows height variants using size directives from 2XS (default) to XL.
id: sizes
---

```html
<eui-progress-bar [progress]="50" label="euiSize2XS (default)" /><br/>
<eui-progress-bar [progress]="50" label="euiSizeXS" euiSizeXS /><br/>
<eui-progress-bar [progress]="50" label="euiSizeS" euiSizeS /><br/>
<eui-progress-bar [progress]="50" label="euiSizeM" euiSizeM /><br/>
<eui-progress-bar [progress]="50" label="euiSizeL" euiSizeL /><br/>
<eui-progress-bar [progress]="50" label="euiSizeXL" euiSizeXL /><br/>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent{
}
```

