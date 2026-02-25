---
description: Removes the background fill for image avatars to better support transparency.
id: has-no-background
---

```html
<eui-avatar hasNoBackground>
    <eui-avatar-image imageUrl="assets/images/angular.png" />
</eui-avatar>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'has-no-background',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HasNoBackgroundComponent {
}
```

