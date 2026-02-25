---
description: Places action content on the right, from simple buttons to richer controls.
id: actions
---

```html
<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-action>
        <button euiButton euiPrimary euiSizeS>
            Primary action
        </button>
    </eui-section-header-action>
</eui-section-header>

<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-action>
        <button euiButton euiOutline euiPrimary euiSizeS>
            Secondary action
        </button>        
        <button euiButton euiPrimary euiSizeS>
            Primary action
        </button>
    </eui-section-header-action>
</eui-section-header>

<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
    <eui-section-header-action>
        <div euiInputGroup euiSizeS>
            <div euiInputGroupAddOn>
                <input euiInputText type="search" placeholder="Search..." aria-label="Search website"/>

                <div euiInputGroupAddOnItem>
                    <eui-icon-svg icon="eui-search" size="s" />
                </div>
            </div>
        </div>        
        <button euiButton euiOutline euiPrimary euiSizeS>
            Secondary action
        </button>        
        <button euiButton euiPrimary euiSizeS>
            Primary action
        </button>
    </eui-section-header-action>
</eui-section-header>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    selector: 'actions',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
}
```

