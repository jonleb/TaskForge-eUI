---
description: Hierarchical list with nested euiList structures for submenus.
id: nested-list
---

```html
<div class="row">
    <div class="col-md-6">
        <ul euiList>
            <li euiListItem>
                <eui-icon-svg icon="folder:regular"/>
                <a href="#" euiLabel class="eui-u-text-link">Menu item 1</a>

                <ul euiList>
                    <li euiListItem>
                        <eui-icon-svg icon="folder:regular"/>
                        <a href="#" euiLabel class="eui-u-text-link">Menu item 1.1</a>

                        <ul euiList>
                            <li euiListItem>
                                <eui-icon-svg icon="folder:regular"/>
                                <a href="#" euiLabel class="eui-u-text-link">Menu item 1.1.1</a>
                            </li>
                            <li euiListItem>
                                <eui-icon-svg icon="folder:regular"/>
                                <a href="#" euiLabel class="eui-u-text-link">Menu item 1.1.2</a>
                            </li>
                        </ul>
                    </li>
                    <li euiListItem>
                        <eui-icon-svg icon="folder:regular"/>
                        <a href="#" euiLabel class="eui-u-text-link">Menu item 1.2</a>
                    </li>
                </ul>
            </li>
            <li euiListItem>
                <eui-icon-svg icon="folder:regular"/>
                <a href="#" euiLabel class="eui-u-text-link">Menu item 2</a>
            </li>
        </ul>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    selector: "nested-list",
    templateUrl: "component.html",
    imports: [...EUI_LIST, ...EUI_LABEL, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedListComponent {

}
```

