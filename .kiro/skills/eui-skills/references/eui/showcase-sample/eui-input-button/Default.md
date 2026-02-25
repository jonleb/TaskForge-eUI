---
description: Default layout with an input and a trailing action button, commonly used for search interactions.
id: Default
---

```html
<eui-input-button>
    <input euiInputText [euiClearable]="true" (input)="onSearch($event)" placeholder="Search..." aria-label="Search"/>
    <button euiButton>
        <eui-icon-svg icon="eui-search" aria-label="Search Icon"/>
    </button>
</eui-input-button>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_BUTTON } from '@eui/components/eui-input-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```

