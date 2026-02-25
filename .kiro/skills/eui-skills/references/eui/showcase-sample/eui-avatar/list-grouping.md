---
description: Groups multiple avatars into a compact list with an overflow indicator.
id: list-grouping
---

```html
<eui-avatar-list>
    @for (image of images; track image) {
        <eui-avatar euiSizeS>
            <eui-avatar-image [imageUrl]="image" />
        </eui-avatar>
    }
    <eui-avatar euiSizeS>
        <eui-avatar-text>+10</eui-avatar-text>
    </eui-avatar>
</eui-avatar-list>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'list-grouping',
    templateUrl: 'component.html',
    imports: [...EUI_AVATAR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListGroupingComponent {
    images = [
        'panda',
        'cat',
        'bear',
        'chicken',
        'rabbit',
        'panda',
        'cat',
        'bear',
        'chicken',
        'rabbit',
    ].map(item => `assets/images/avatars/small/${item}.png`);
}
```

