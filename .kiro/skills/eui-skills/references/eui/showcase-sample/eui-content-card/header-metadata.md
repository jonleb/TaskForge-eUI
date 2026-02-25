---
description: Adds subtitle, metadata, and submetadata lines below the title for richer context.
id: header-metadata
---

```html
<eui-content-card>
    <eui-content-card-header>
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
        <eui-content-card-header-subtitle>
            This is a secondary title
        </eui-content-card-header-subtitle> 
        <eui-content-card-header-metadata>
            Meta info | Date
        </eui-content-card-header-metadata>
        <eui-content-card-header-submetadata>
            <span class="eui-u-flex eui-u-flex-gap-2xs">
                <eui-icon-svg icon="star:fill" fillColor="primary" size="s" />
                <strong>4.9</strong>
                (202 reviews)
            </span>
        </eui-content-card-header-submetadata>               
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
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'header-metadata',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMetadataComponent {

}
```

