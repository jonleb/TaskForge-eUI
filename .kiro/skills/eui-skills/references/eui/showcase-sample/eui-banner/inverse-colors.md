---
description: Applies euiInverse for better text contrast and includes a CTA area.
id: inverse-colors
---

```html
<eui-banner euiInverse imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg">
    <eui-banner-title>Title</eui-banner-title>
    <eui-banner-description>Description</eui-banner-description>
    <eui-banner-cta>
        <button euiButton euiCTAButton>
            Call to action
        </button>
    </eui-banner-cta>    
</eui-banner>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BANNER } from '@eui/components/eui-banner';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // eslint-disable-next-line
    selector: 'inverse-colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BANNER,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InverseColorsComponent {
}
```

