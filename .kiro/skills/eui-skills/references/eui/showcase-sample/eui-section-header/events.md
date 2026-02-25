---
description: Illustrates the expand event emitted when toggling an expandable section.
id: events
---

```html
<eui-section-header [id]="'eui-section-header-id'" isExpandable (expand)="onExpand($event)">
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
    selector: 'events',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {

    public onExpand(e: string): void {
        console.log(e);
    }

}
```

