---
description: Demonstrates header start/end blocks and the optional body-top area for contextual badges.
id: blocks
---

```html
<div class="doc-sample-section-title">Header start block and end block</div>

<eui-content-card>
    <eui-content-card-header>
        <eui-content-card-header-start>
            <eui-chip euiSizeS>In progress</eui-chip>
        </eui-content-card-header-start>
        <eui-content-card-header-end>
            <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
        </eui-content-card-header-end>        
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
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';


@Component({
    // eslint-disable-next-line
    selector: 'blocks',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON_BUTTON,
        ...EUI_CHIP,
        ...EUI_STATUS_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlocksComponent {

}
```

