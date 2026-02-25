---
description: Basic banner with a background image, title, and description slots.
id: Default
---

```html
<eui-banner imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg">
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
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BANNER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
}
```

