---
description: Shows available size variants across circle, square, line, and rectangle shapes.
id: sizes
---

```html
<div class="doc-sample-section-title">Circle</div>

<eui-skeleton circle euiSizeXS />
&nbsp;
<eui-skeleton circle euiSizeS />
&nbsp;
<eui-skeleton circle />
&nbsp;
<eui-skeleton circle euiSizeL />
&nbsp;
<eui-skeleton circle euiSizeXL />


<div class="doc-sample-section-title">Square</div>

<eui-skeleton square euiSizeXS />
&nbsp;
<eui-skeleton square euiSizeS />
&nbsp;
<eui-skeleton square />
&nbsp;
<eui-skeleton square euiSizeL />
&nbsp;
<eui-skeleton square euiSizeXL />


<div class="doc-sample-section-title">Line</div>

<div class="eui-u-display-flex eui-u-flex-column eui-u-width-100">
    <eui-skeleton line class="eui-u-mt-xs" />
    <eui-skeleton line euiSizeXL class="eui-u-mt-xs" />
    <eui-skeleton line euiSizeL class="eui-u-mt-xs" />
    <eui-skeleton line euiSizeM class="eui-u-mt-xs" />
    <eui-skeleton line euiSizeS class="eui-u-mt-xs" />
    <eui-skeleton line euiSizeXS class="eui-u-mt-xs" />
</div>


<div class="doc-sample-section-title">Rectangle</div>

<div class="eui-u-display-flex eui-u-flex-column eui-u-width-100">
    <eui-skeleton rectangle class="eui-u-mt-xs" />
    <eui-skeleton rectangle euiSizeXL class="eui-u-mt-xs" />
    <eui-skeleton rectangle euiSizeL class="eui-u-mt-xs" />
    <eui-skeleton rectangle euiSizeM class="eui-u-mt-xs" />
    <eui-skeleton rectangle euiSizeS class="eui-u-mt-xs" />
    <eui-skeleton rectangle euiSizeXS class="eui-u-mt-xs" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {


}
```

