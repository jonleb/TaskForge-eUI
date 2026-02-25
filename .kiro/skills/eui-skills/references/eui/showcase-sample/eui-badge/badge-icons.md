---
description: Uses badges to display single-character symbols and glyphs across sizes and colors.
id: badge-icons
---

```html
@for (icon of xlIcons; track icon) {
    <eui-badge euiSizeXL>{{ icon }}</eui-badge>
}

@for (icon of xlDangerIcons; track icon) {
    <eui-badge euiVariant="danger" euiSizeXL>{{ icon }}</eui-badge>
}

<br>

@for (variant of variants; track variant) {
    <eui-badge euiSizeL euiVariant="{{ variant }}">+</eui-badge>
}

<br>

@for (variant of variants; track variant) {
    <eui-badge euiVariant="{{ variant }}">&bull;</eui-badge>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';


@Component({
    // eslint-disable-next-line
    selector: 'badge-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeIconsComponent {
    xlIcons = ['©', '®'];
    xlDangerIcons = ['€', '$', '£', '¥'];
    variants = ['primary', 'secondary', 'info', 'warning', 'danger'];
}
```

