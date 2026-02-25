---
description: Icon placed at the start of the input, illustrating the default eui-icon-input layout with a clearable search field.
id: Default
---

```html
<eui-icon-input>
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
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON_INPUT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```

