---
description: Uses an avatar button as a dropdown trigger to expose actions.
id: button-actionable-avatar-dropdown
---

```html
<eui-dropdown>
    <button euiButton euiRounded euiIconButton euiBasicButton euiAvatarButton [attr.aria-label]="'More options'">
        <eui-avatar>
            <eui-avatar-image />
        </eui-avatar>
    </button>
    <eui-dropdown-content>
        <button euiDropdownItem aria-label="Item 1">Option item 1</button>
        <button euiDropdownItem aria-label="Item 2">Option item 2</button>
        <button euiDropdownItem aria-label="Item 3">Option item 3</button>
    </eui-dropdown-content>
</eui-dropdown>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';


@Component({
    // eslint-disable-next-line
    selector: 'button-actionable-avatar-dropdown',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionableAvatarDropdownComponent {
}
```

