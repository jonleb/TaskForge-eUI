---
description: Navigation list built with a nav container and link items for routing.
id: navigation-list
---

```html
<p class="eui-u-text-paragraph">Uses the <code class="eui-u-text-code">nav</code> html tag with <code class="eui-u-text-code">a[routerLink/href]</code> links for the list items.
<br>
Usage: recommended when having links mapped to the Angular router.</p>

<nav euiList>
    <a routerLink="." euiListItem class="eui-u-text-link">Menu item 1</a>
    <a routerLink="." euiListItem class="eui-u-text-link">Menu item 2</a>
    <a routerLink="." euiListItem class="eui-u-text-link">Menu item 3</a>
</nav>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    selector: 'navigation-list',
    templateUrl: 'component.html',
    imports: [...EUI_LIST],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }

}
```

