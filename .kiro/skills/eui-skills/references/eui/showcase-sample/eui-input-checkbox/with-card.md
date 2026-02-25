---
description: Demonstrates checkbox integration within eui-card components, including collapsible cards with checkboxes in headers and content areas, combined with flag icons and labels.
id: with-card
---

```html
<eui-alert>
    <eui-alert-title>Advanced responsive layouts</eui-alert-title>
    When using advanced responsive layouts, it is recommended to use the <a class="eui-u-text-link-external" href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/css-utilities#Flex" target="_blank">eUI Flexbox utility classes</a> in order to gather multiple elements together and have them automatically aligned.
    <br>
    The following examples shows how to display horizontally multiple checkboxes and elements vertically centered.
</eui-alert>

<br/>

<eui-card euiCollapsible>
    <eui-card-header [isHeaderMultilines]="true">
    <eui-card-header-title>
        <div class="eui-u-flex">
            <input euiInputCheckBox id="misc-usage-checkbox-en1" name="usage-checkbox-en" checked />
            <label euiLabel for="misc-usage-checkbox-en1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta metus vel orci maximus molestie. Nunc ut augue viverra, scelerisque ex vel, luctus dolor.
            </label>
        </div>
    </eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <div euiInputGroup>
            <label euiLabel>Choose preferred language(s)</label>

            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="misc-checkid-lang-fr" name="checkbox-lang" />
                <span class="eui-flag-icon eui-flag-icon-fr eui-flag-icon-2x eui-u-mr-s"></span>
                <label euiLabel for="misc-checkid-lang-fr">French</label>
            </div>

            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="misc-checkid-lang-it" name="checkbox-lang" />
                <span class="eui-flag-icon eui-flag-icon-it eui-flag-icon-2x eui-u-mr-s"></span>
                <label euiLabel for="misc-checkid-lang-it">Italian</label>
            </div>

            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="misc-checkid-lang-es" name="checkbox-lang" checked />
                <span class="eui-flag-icon eui-flag-icon-es eui-flag-icon-2x eui-u-mr-s"></span>
                <label euiLabel for="misc-checkid-lang-es">Spanish</label>
            </div>
        </div>

        <div euiInputGroup class="eui-u-mb-none">
            <label euiLabel>Other preselected variant(s)</label>

            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="misc-checkid-variant-1" name="checkbox-variant" checked readonly/>
                <label euiLabel for="misc-checkid-variant-1">
                    Aliquam iaculis volutpat magna, non consequat sem vulputate quis. Nunc porta nisl in mauris tristique, quis aliquam mauris convallis.
                </label>
            </div>

            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="misc-checkid-variant-2" name="checkbox-variant" readonly />
                <label euiLabel for="misc-checkid-variant-2">
                    Integer felis augue, aliquet sit amet dolor eu, imperdiet gravida purus. Quisque egestas fringilla scelerisque.
                </label>
            </div>

            <div class="eui-u-inline-flex">
                <input euiInputCheckBox id="misc-checkid-variant-3" name="checkbox-variant" checked readonly />
                <label euiLabel for="misc-checkid-variant-3">
                    Mauris tincidunt ipsum id ante ultricies, sit amet congue quam mollis. Curabitur tincidunt nec orci at laoreet.
                </label>
            </div>
        </div>
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_CARD } from '@eui/components/eui-card';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_GROUP,
        ...EUI_ALERT,
        ...EUI_CARD,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithCardComponent {
}
```

