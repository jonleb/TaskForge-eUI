---
description: Shows advanced responsive layouts using eUI flexbox utility classes to display multiple checkboxes horizontally with vertical centering, including integration with icons and different label sizes.
id: responsive-layout
---

```html
<eui-alert>
    <eui-alert-title>Advanced responsive layouts</eui-alert-title>
    When using advanced responsive layouts, it is recommended to use the <a class="eui-u-text-link-external" href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/css-utilities#Flex" target="_blank">eUI Flexbox utility classes</a> in order to gather multiple elements together and have them automatically aligned.
    <br>
    The following examples shows how to display horizontally multiple checkboxes and elements vertically centered.
</eui-alert>


<div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
    <div class="eui-u-inline-flex eui-u-mr-m">
        <input id="misc-label-size-s" name="sizes" euiInputCheckBox />
        <label euiLabel for="misc-label-size-s" euiSizeS class="eui-u-mr-xs">Small (S)</label>
        <eui-icon-svg icon="eui-state-info" size="s" fillColor="secondary" />
    </div>
    <div class="eui-u-inline-flex eui-u-mr-m">
        <input id="misc-label-size-m" name="sizes" euiInputCheckBox checked="true"/>
        <label euiLabel for="misc-label-size-m" euiSizeM>Default (M)</label>
        <eui-icon-svg icon="eui-state-info" size="s" fillColor="secondary" />
    </div>

    <div class="eui-u-inline-flex eui-u-mr-m">
        <input id="misc-label-size-2xl" name="sizes" euiInputCheckBox />
        <label euiLabel for="misc-label-size-2xl" class="eui-u-f-2xl">Largest (2XL)</label>
        <eui-icon-svg icon="eui-state-info" size="m" fillColor="secondary" />
    </div>
</div>

<div class="doc-sample-section-title">Required with inline responsive checkboxes</div>

<div euiInputGroup>
    <div euiLabel euiRequired>Select preferred language(s)</div>

    <div class="eui-u-flex eui-u-flex-wrap">
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-en" name="usage-checkbox-en" />
            <label euiLabel for="misc-usage-checkbox-en">English</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-de" name="usage-checkbox-de" />
            <label euiLabel for="misc-usage-checkbox-de">deutsch</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-fr" name="usage-checkbox-fr" checked="checked" />
            <label euiLabel for="misc-usage-checkbox-fr">french</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-el" name="usage-checkbox-el" />
            <label euiLabel for="misc-usage-checkbox-el">greek</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-hu" name="usage-checkbox-hu" />
            <label euiLabel for="misc-usage-checkbox-hu">hungarian</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-it" name="usage-checkbox-it" />
            <label euiLabel for="misc-usage-checkbox-it">italian</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-po" name="usage-checkbox-po" />
            <label euiLabel for="misc-usage-checkbox-po">polish</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-ro" name="usage-checkbox-ro" />
            <label euiLabel for="misc-usage-checkbox-ro">romanian</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-sl" name="usage-checkbox-sl" />
            <label euiLabel for="misc-usage-checkbox-sl">slovenian</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-es" name="usage-checkbox-es" />
            <label euiLabel for="misc-usage-checkbox-es">spanish</label>
        </div>
        <div class="eui-u-inline-flex eui-u-mb-s">
            <input euiInputCheckBox id="misc-usage-checkbox-sw" name="usage-checkbox-sw" />
            <label euiLabel for="misc-usage-checkbox-sw">swedish</label>
        </div>
    </div>
</div>
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
    selector: 'responsive-layout',
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
export class ResponsiveLayoutComponent {
}
```

