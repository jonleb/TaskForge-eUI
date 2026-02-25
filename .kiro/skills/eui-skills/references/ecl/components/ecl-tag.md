# ecl-tag

## Overview

Tags are components that indicate a taxonomy type. They can be found in different variants, offering a different interaction type, based on the use-case.
<br>
<more-info componentPartUrl="tag/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Link tag</h6>
<div>
    <a eclTag routerLink="/">Link Tag</a>
</div>

<h6 class="section-title">Removable tag</h6>
<div>
    <button eclTag variant="removable" (remove)="onRemove($event)">Removable Tag</button>
</div>

<h6 class="section-title">Tag set</h6>
<ul eclTagSet>
    <li eclTagSetItem><a eclTag routerLink="/">Link Tag</a></li>
    <li eclTagSetItem><button eclTag isWrapped="false" variant="removable" (remove)="onRemove($event)">Removable
            Tag</button></li>
    <li eclTagSetItem><button eclTag variant="removable" (remove)="onRemove($event)">Removable Tag</button></li>
    <li eclTagSetItem><button eclTag variant="removable" (remove)="onRemove($event)">Removable Tag</button></li>
    <li eclTagSetItem><a eclTag routerLink="/">
            Link Tag
            <ecl-icon icon="external" size="2xs" eclTagIconExternal>
            </ecl-icon></a></li>
    <li eclTagSetItem><button eclTag variant="removable" (remove)="onRemove($event)">Removable Tag</button></li>
    <li eclTagSetItem><a eclTag routerLink="/">Link Tag</a></li>
</ul>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EclTagRemoveEvent, EUI_ECL_TAG } from '@eui/ecl/components/ecl-tag';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_TAG],
})
export class DefaultComponent {
    onRemove(evt: EclTagRemoveEvent) {
        console.log('remove', evt);
    }
}
```
