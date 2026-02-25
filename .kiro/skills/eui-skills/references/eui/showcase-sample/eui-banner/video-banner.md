---
description: Uses a video background via eui-banner-video inside a small banner.
id: video-banner
---

```html
<eui-banner euiSizeS>
    <eui-banner-video>
        <video poster="https://vod.prd.commavservices.eu/12/224712/THUMB_I224712EN1W_V_1.jpg" autoplay loop [muted]="'muted'">
            <source src="https://vod.prd.commavservices.eu/12/224712/LR_I224712EN1W.mp4" type="video/mp4">
        </video>
    </eui-banner-video>
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
    selector: 'video-banner',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BANNER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoBannerComponent {
}
```

