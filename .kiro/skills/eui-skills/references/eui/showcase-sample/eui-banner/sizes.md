---
description: Shows small (euiSizeS) and large (euiSizeL) height variants; medium is default.
id: sizes
---

```html
<eui-banner euiSizeS imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg">
    <eui-banner-title>Title</eui-banner-title>
    <eui-banner-description>Description</eui-banner-description>
</eui-banner>


<eui-banner euiSizeL imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg">
    <eui-banner-title>Title</eui-banner-title>
    <eui-banner-description>Description</eui-banner-description>
</eui-banner>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BANNER } from '@eui/components/eui-banner';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BANNER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesComponent {
}
```

