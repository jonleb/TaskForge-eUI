---
description: Demonstrates an expandable header with default expanded and collapsed states.
id: expandable
---

```html
<div class="doc-sample-section-title">isExpanded (default)</div>

<eui-section-header isExpandable>
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-action>
        <button euiButton euiPrimary euiSizeS>
            Primary action
        </button>
    </eui-section-header-action>

    Content
</eui-section-header>


<div class="doc-sample-section-title">isExpanded = false</div>

<eui-section-header isExpandable [isExpanded]="false">
    <eui-section-header-icon icon="circle-dashed:regular"/>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-action>
        <button euiButton euiPrimary euiSizeS>
            Primary action
        </button>
    </eui-section-header-action>

    Content
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'expandable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableComponent {
}
```

