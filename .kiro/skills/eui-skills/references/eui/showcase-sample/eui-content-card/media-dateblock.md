---
description: Uses a date block in the media slot for time-based or event cards.
id: media-dateblock
---

```html
<eui-content-card>
    <eui-content-card-media>
        <eui-date-block [blockDate]="currentDate"/>
    </eui-content-card-media>    
    <eui-content-card-header>
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
    </eui-content-card-header>

    <eui-content-card-body>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
    </eui-content-card-body>
</eui-content-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_DATE_BLOCK } from '@eui/components/eui-date-block';


@Component({
    // eslint-disable-next-line
    selector: 'media-dateblock',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_DATE_BLOCK,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaDateblockComponent {
    currentDate = new Date();
}
```

