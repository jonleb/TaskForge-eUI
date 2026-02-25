---
description: Shows the available color variants using the base state inputs.
id: colors
---

```html
<div class="doc-sample-section-title">euiPrimary (default)</div>
<eui-section-header euiPrimary>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>

<div class="doc-sample-section-title">euiSecondary</div>
<eui-section-header euiSecondary>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>

<div class="doc-sample-section-title">euiInfo</div>
<eui-section-header euiInfo>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>

<div class="doc-sample-section-title">euiSuccess</div>
<eui-section-header euiSuccess>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>

<div class="doc-sample-section-title">euiWarning</div>
<eui-section-header euiWarning>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>

<div class="doc-sample-section-title">euiDanger</div>
<eui-section-header euiDanger>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

