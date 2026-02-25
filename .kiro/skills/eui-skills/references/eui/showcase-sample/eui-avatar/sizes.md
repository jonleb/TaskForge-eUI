---
description: Demonstrates size variants from S to 2XL for icon, image, text, and content layouts.
id: sizes
---

```html
@for (size of sizes; track size.label) {
    <eui-avatar [euiSizeS]="size.attr === 'euiSizeS'"
                [euiSizeL]="size.attr === 'euiSizeL'"
                [euiSizeXL]="size.attr === 'euiSizeXL'"
                [euiSize2XL]="size.attr === 'euiSize2XL'">
        <eui-avatar-icon>
            <eui-icon-svg icon="eui-user" />
        </eui-avatar-icon>
    </eui-avatar>
}

<br/><br/>

@for (size of sizes; track size.label) {
    <eui-avatar [euiSizeS]="size.attr === 'euiSizeS'"
                [euiSizeL]="size.attr === 'euiSizeL'"
                [euiSizeXL]="size.attr === 'euiSizeXL'"
                [euiSize2XL]="size.attr === 'euiSize2XL'">
        <eui-avatar-image imageUrl="assets/images/sass.png" />
    </eui-avatar>
}

<br/><br/>

@for (size of sizes; track size.label) {
    <eui-avatar [euiSizeS]="size.attr === 'euiSizeS'"
                [euiSizeL]="size.attr === 'euiSizeL'"
                [euiSizeXL]="size.attr === 'euiSizeXL'"
                [euiSize2XL]="size.attr === 'euiSize2XL'">
        <eui-avatar-text>eUI</eui-avatar-text>
    </eui-avatar>
}

<br/><br/>

<div class="eui-u-display-flex eui-u-flex-gap-xl">
    @for (size of contentSizes; track size.label) {
        <span class="eui-u-display-flex eui-u-flex-column eui-u-flex-gap-s">
            <span>{{ size.label }}</span>
            <eui-avatar [euiSizeS]="size.attr === 'euiSizeS'"
                        [euiSizeL]="size.attr === 'euiSizeL'">
                <eui-avatar-image />
                <eui-avatar-content>
                    <eui-avatar-content-label>John Doe</eui-avatar-content-label>
                    <eui-avatar-content-sublabel>john.doe&#64;ec.europa.eu</eui-avatar-content-sublabel>
                </eui-avatar-content>
            </eui-avatar>
        </span>
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesComponent {
    sizes = [
        { attr: 'euiSizeS', label: 'euiSizeS' },
        { attr: null, label: 'euiSizeM (default)' },
        { attr: 'euiSizeL', label: 'euiSizeL' },
        { attr: 'euiSizeXL', label: 'euiSizeXL' },
        { attr: 'euiSize2XL', label: 'euiSize2XL' },
    ];
    contentSizes = [
        { attr: 'euiSizeS', label: 'euiSizeS' },
        { attr: null, label: 'euiSizeM (default)' },
        { attr: 'euiSizeL', label: 'euiSizeL' },
    ];
}
```

