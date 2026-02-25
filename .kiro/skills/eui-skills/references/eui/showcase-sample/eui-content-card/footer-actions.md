---
description: Uses the footer slot to group tertiary, secondary, and primary actions.
id: footer-actions
---

```html
<eui-content-card>
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

    <eui-content-card-footer>
        <div class="eui-u-flex">
            <button euiButton euiBasicButton euiPrimary euiSizeS>Tertiary</button>
            <div class="eui-u-display-flex eui-u-ml-auto eui-u-flex-gap-xs">
                <button euiButton euiOutline euiPrimary euiSizeS>Secondary</button>
                <button euiButton euiPrimary euiSizeS>Primary</button>
            </div>
        </div>
    </eui-content-card-footer>    
</eui-content-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';


@Component({
    // eslint-disable-next-line
    selector: 'footer-actions',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterActionsComponent {

}
```

