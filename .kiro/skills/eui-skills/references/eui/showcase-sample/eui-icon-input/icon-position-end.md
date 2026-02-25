---
description: Icon positioned at the end of the input using euiIconPositionEnd for a right-aligned search indicator.
id: icon-position-end
---

```html
<eui-icon-input euiIconPositionEnd>
    <eui-icon-svg icon="eui-search" fillColor="secondary" aria-label="Search Icon"/>
    <input
        euiInputText
        [euiClearable]="true"
        (input)="onSearch($event)"
        placeholder="Search..."
        aria-label="Search"/>
</eui-icon-input>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_INPUT } from '@eui/components/eui-icon-input';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // eslint-disable-next-line
    selector: 'icon-position-end',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON_INPUT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPositionEndComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```

