---
description: Shows the collapsible header toggle and how the card body can be collapsed.
id: collapsible
---

```html
<eui-content-card isCollapsible (cardCollapse)="onCardCollapse($event)">
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


<div class="doc-sample-section-title">isCollapsible / isCollapsed</div>

<eui-content-card isCollapsible isCollapsed (cardCollapse)="onCardCollapse($event)">
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


@Component({
    // eslint-disable-next-line
    selector: 'collapsible',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleComponent {

    onCardCollapse(isCollapsed: boolean): void {
        console.log('isCollapsed', isCollapsed);
    }

}
```

