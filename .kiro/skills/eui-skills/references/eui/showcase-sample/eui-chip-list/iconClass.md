---
description: Displays chips with leading flag icons, including default and rounded icon styles.
id: iconClass
---

```html
<eui-chip-list>
    <eui-chip euiVariant="primary"><span class="eui-flag-icon eui-flag-icon-be"></span>Belgium</eui-chip>
    <eui-chip euiVariant="secondary"><span class="eui-flag-icon eui-flag-icon-fr"></span>France</eui-chip>
    <eui-chip euiVariant="info"><span class="eui-flag-icon eui-flag-icon-it"></span>Italy</eui-chip>
    <eui-chip euiVariant="success"><span class="eui-flag-icon eui-flag-icon-es"></span>Spain</eui-chip>
    <eui-chip euiVariant="warning"><span class="eui-flag-icon eui-flag-icon-de"></span>Germany</eui-chip>
    <eui-chip euiVariant="dangert"><span class="eui-flag-icon eui-flag-icon-lu"></span>Luxembourg</eui-chip>
    <eui-chip euiVariant="accent"><span class="eui-flag-icon eui-flag-icon-gr"></span>Greece</eui-chip>
</eui-chip-list>

<br/>

<eui-chip-list>
    <eui-chip euiVariant="primary"><span class="eui-flag-icon eui-flag-icon-be eui-flag-icon--rounded"></span>Belgium</eui-chip>
    <eui-chip euiVariant="secondary"><span class="eui-flag-icon eui-flag-icon-fr eui-flag-icon--rounded"></span>France</eui-chip>
    <eui-chip euiVariant="info"><span class="eui-flag-icon eui-flag-icon-it eui-flag-icon--rounded"></span>Italy</eui-chip>
    <eui-chip euiVariant="success"><span class="eui-flag-icon eui-flag-icon-es eui-flag-icon--rounded"></span>Spain</eui-chip>
    <eui-chip euiVariant="warning"><span class="eui-flag-icon eui-flag-icon-de eui-flag-icon--rounded"></span>Germany</eui-chip>
    <eui-chip euiVariant="dangert"><span class="eui-flag-icon eui-flag-icon-lu eui-flag-icon--rounded"></span>Luxembourg</eui-chip>
    <eui-chip euiVariant="accent"><span class="eui-flag-icon eui-flag-icon-gr eui-flag-icon--rounded"></span>Greece</eui-chip>
</eui-chip-list>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_LIST } from "@eui/components/eui-chip-list";


@Component({
    // eslint-disable-next-line
    selector: 'iconClass',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconClassComponent {

}
```

