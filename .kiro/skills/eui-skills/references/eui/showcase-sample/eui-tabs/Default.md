---
description: Basic eui-tabs with header label, sublabel, and body content bound from an array.
id: Default
---

```html
<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab>
            <eui-tab-header>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

    public tabs = [
        { tabLabel: 'Tab 1', tabSubLabel: 'Tab Sublabel 1', tabContent: 'Content 1' },
        { tabLabel: 'Tab 2', tabSubLabel: 'Tab Sublabel 2', tabContent: 'Content 2' },
        { tabLabel: 'Tab 3', tabSubLabel: 'Tab Sublabel 3', tabContent: 'Content 3' },
    ];

}
```

