---
description: This sample demonstrates chips with leading icons while keeping the same chip semantics and states.
id: icons
---

```html
<div class="doc-sample-section-title">Default</div>

<eui-chip euiPrimary>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<eui-chip euiSecondary>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<eui-chip euiInfo>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<eui-chip euiSuccess>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<eui-chip euiWarning>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<eui-chip euiDanger>
    <eui-icon-svg icon="eui-checkmark"/>
    Chip label
</eui-chip>
<br><br>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";


@Component({
    // eslint-disable-next-line
    selector: 'icons',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsComponent {
}
```

