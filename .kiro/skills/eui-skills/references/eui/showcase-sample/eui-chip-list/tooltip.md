---
description: Adds hover tooltips on chips to expose label context without changing chip layout.
id: tooltip
---

```html
<eui-chip-list>
    <eui-chip euiVariant="primary" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="secondary" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="info" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="success" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="warning" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="danger" euiTooltip="Chip label">Chip label</eui-chip>
    <eui-chip euiVariant="accent" euiTooltip="Chip label">Chip label</eui-chip>
</eui-chip-list>
```

```typescript
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...EUI_CHIP_LIST, ...EUI_CHIP, EuiTooltipDirective],
})
export class TooltipComponent {


}
```

