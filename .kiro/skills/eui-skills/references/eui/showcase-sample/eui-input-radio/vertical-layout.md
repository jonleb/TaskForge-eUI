---
description: Demonstrates vertical radio button layout using eui-u-flex wrapper with eui-u-flex-gap-s for spacing, showing how to stack radio options vertically.
id: vertical-layout
---

```html
<eui-alert>
    <eui-alert-title>Remark about vertical alignement</eui-alert-title>
    The vertical layout display of an input <strong>radio + label</strong> is using flex containers to gather both elements.
    This is also the default display layout when in mobile mode.
    Same principles as horizontal layout are applied for spacings using flex utility classes: see 
    <a class="eui-u-text-link-external" href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/css-utilities#Flex" target="_blank">eUI Flex utility classes</a>.
    <br>
    Recommended spacing size is <strong>S</strong>(mall). 
    Recommended usage is to use the <code class="eui-u-text-code">eui-u-flex-gap-s</code> utility class at parent flexbox wrapper in order to preserve vertical spacings.
    See the code sources of the following samples for more information.
</eui-alert>

<br>

<div class="row">
    <div class="col-md-6">
        <div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-s">
            <div class="eui-u-flex">
                <input euiInputRadio id="default-radio-vertical-1" name="dyn-radio-vertical" [value]="'one'">
                <label for="default-radio-vertical-1">One</label>
            </div>
            <div class="eui-u-flex">
                <input euiInputRadio id="default-radio-vertical-2" name="dyn-radio-vertical" [value]="'two'" checked>
                <label for="default-radio-vertical-2">Two</label>
            </div>
            <div class="eui-u-flex">
                <input euiInputRadio id="default-radio-vertical-3" name="dyn-radio-vertical" [value]="'three'">
                <label for="default-radio-vertical-3">Three</label>
            </div>
            <div class="eui-u-flex">
                <input euiInputRadio id="default-radio-vertical-4" name="dyn-radio-vertical" [value]="'four'">
                <label for="default-radio-vertical-4">Four</label>
            </div>
            <div class="eui-u-flex">
                <input euiInputRadio id="default-radio-vertical-5" name="dyn-radio-vertical" [value]="'five'">
                <label for="default-radio-vertical-5">Five</label>
            </div>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ALERT } from '@eui/components/eui-alert';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'vertical-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_RADIO,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalLayoutComponent {
    public hasLabel = false;
    public radioOptions = [
        { value: '1', label: 'One', checked: false },
        { value: '2', label: 'Two', checked: true },
        { value: '3', label: 'Three', checked: false },
    ];

    public onChange(e: boolean) {
        this.hasLabel = e;
    }
}
```

