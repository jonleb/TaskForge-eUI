# eui-chip-group

## Overview

The eUI chip group is not specifically an eUI component but a <strong>composition</strong>, build using two <code class="eui-u-text-code">&lt;eui-chip&gt;</code> components.
<br>
It is a <u>replacement of the deprecated legacy <strong>ux-badge-group</strong></u> component.

<p class="eui-u-text-paragraph">
    It uses a predefined wrapper container using the <strong>eui-chip-group</strong> style class.
    <br>
    Styling is adopted from the eui-chip and all its variants, based on the eUI Design System.
</p>

## Samples

### [Default](samples/eui-chip-group/Default)

```html
<eui-chip-group>
    <eui-chip euiPrimary>
        label
    </eui-chip>
    <eui-chip euiPrimary euiOutline>
        subLabel
    </eui-chip>
</eui-chip-group>
```

```typescript
import { Component } from '@angular/core';

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_GROUP } from '@eui/components/eui-chip-group';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_CHIP_GROUP,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-chip-group/colors)
- [Misc: With eui-icon & eui-tooltip](samples/eui-chip-group/with-icon-tooltip)
