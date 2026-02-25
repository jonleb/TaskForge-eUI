---
description: Uses the icon button as a dropdown trigger to open a small action menu.
id: with-dropdown
---

```html
<eui-dropdown>
    <eui-icon-button icon="eui-ellipsis-vertical" ariaLabel="dropdown-trigger" euiRounded euiPrimary/>
    <eui-dropdown-content>
        <button euiDropdownItem aria-label="Item 1">Option item 1</button>
        <button euiDropdownItem aria-label="Item 2">Option item 2</button>
        <button euiDropdownItem aria-Label="Item 3">Option item 3</button>
    </eui-dropdown-content>
</eui-dropdown>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    selector: 'with-dropdown',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_DROPDOWN,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithDropdownComponent {

}
```

