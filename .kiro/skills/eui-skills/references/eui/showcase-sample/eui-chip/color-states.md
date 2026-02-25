---
description: This sample compares semantic color variants available through chip state directives.
id: color-states
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiPrimary</div>
        <eui-chip euiPrimary>Chip label</eui-chip>
    </div>
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiSecondary</div>
        <eui-chip euiSecondary>Chip label</eui-chip>
    </div>
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiInfo</div>
        <eui-chip euiInfo>Chip label</eui-chip>
    </div>
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiSuccess</div>
        <eui-chip euiSuccess>Chip label</eui-chip>
    </div>
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiWarning</div>
        <eui-chip euiWarning>Chip label</eui-chip>
    </div>
    <div class="eui-u-mr-m eui-u-mb-m">
        <div class="doc-sample-section-title">euiDanger</div>
        <eui-chip euiDanger>Chip label</eui-chip>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";


@Component({
    // eslint-disable-next-line
    selector: 'color-states',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorStatesComponent {
}
```

