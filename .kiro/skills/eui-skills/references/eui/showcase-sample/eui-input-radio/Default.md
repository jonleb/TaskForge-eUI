---
description: Demonstrates basic radio button usage with euiInputRadio directive and label pairing, including checked/unchecked states, standalone radios without labels, and accessibility recommendations for proper label association.
id: Default
---

```html
<p class="eui-u-text-paragraph">Recommended radio usage is a composition gathering the <code class="eui-u-text-code">&lt;input euiInputRadio ...&gt;</code> tag followed by the <code class="eui-u-text-code">&lt;label euiLabel ...&gt;</code> after the input.
They can also be wrapped into the <code class="eui-u-text-code">euiInputGroup</code> container giving more options and layout flexibility.
See the <a class="eui-u-text-link" routerLink="/style-guide/directives/eui-input-group">eui-input-group</a> component for more information.</p>

<br>

<div class="eui-u-mb-s">
    <input type="radio" euiInputRadio id="male" name="gender" value="male">
    <label euiLabel for="male">Male</label>
</div>

<div class="eui-u-mb-s">
    <input type="radio" euiInputRadio id="female" name="gender" value="female" checked>
    <label euiLabel for="female">Female</label>
</div>


<div class="doc-sample-section-title">Without label</div>

<eui-card euiWarning>
    <eui-card-header >
        <eui-card-header-title>
            <div class="eui-u-f-h5"><strong>Important UX and accessibility recommendations</strong></div>
        </eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <p class="eui-u-text-paragraph">Radios without label tags are inaccessible to screen readers.
            This causes the screen reader to read the labels and radios separately to users which could struggle to figure out which label goes with which radio.
        </p>
        <p class="eui-u-text-paragraph">Without label tags, users can’t click the label to tick the radio. Instead, they have to click the radio itself.
            This causes users to struggle because the radio is a small target to hit especially for motor-impaired users.
        </p>
        <p class="eui-u-text-paragraph">When adding the label tags in, each radio gets read to the user with the correct label.
           Label tags act as an anchor for all form elements.
           It not only works for radios, but recommended usage is that <strong>you should use it for every form element that has a label</strong>.
        </p>
        <p class="eui-u-text-paragraph"><em>Please also note that stand-alone radios are rendered by the browser user-agent and small differences can be seen on final rendering.</em></p>
    </eui-card-content>
</eui-card>

<br><br>

<div class="eui-u-flex">
    <div class="eui-u-text-center">
        <input euiInputRadio
            name="checkbox_nolabel"
            aria-label="checkbox_nolabel_checked"
            checked
            value="1">
        <br><em>Checked</em>
    </div>
    <div class="eui-u-text-center eui-u-ml-m">
        <input euiInputRadio
            name="checkbox_nolabel"
            aria-label="checkbox_nolabel_unchecked"
            value="0">
        <br><em>Unchecked</em>
    </div>
</div>

<br>

<div class="doc-sample-section-title">Horizontal vs vertical alignements</div>
<eui-alert>
    <eui-alert-title>Remark about horizontal vs vertical alignements</eui-alert-title>
    By <strong>default</strong>, the layout display of an input <strong>radio + label</strong> is <strong>horizontal</strong> (inline).
    In order to have multiple elements displayed vertically, a flexbox div wrapper should be used around each input + label elements by using any flex container utility class:<br>
    <ul>
        <li><code class="eui-u-text-code">eui-u-flex / eui-u-display-flex</code> wrappers: are usually used for vertical layout,</li>
        <li><code class="eui-u-text-code">eui-inline-flex</code> wrapper: is usually used for horizontal layout, gathering the input + label together.</li>
    </ul>
    Spacings (paddings & margins) can also be controlled through the <a class="eui-u-text-link-external" href="https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-design-system/css-utilities#Padding" target="_blank">eUI utility classes</a>.
    <br>
    Recommended spacing size is <strong>S</strong>(mall). Add the <code class="eui-u-text-code">eui-u-mb-s</code> to your layout elements to have them aligned, especially when in horizontal display or whern having multiple items.
    See the code sources of the following samples for more information.
</eui-alert>

<br>

<div class="row">
    <div class="col-md-6">
        <h2 class="eui-u-text-h5 section-title eui-u-f eui-u-mt-none">Horizontal layout (default)</h2>

        <input euiInputRadio id="default-horizontal-radio-1" name="dyn-radio-vertical" [value]="'one'">
        <label for="default-horizontal-radio-1">One</label>

        <input euiInputRadio id="default-horizontal-radio-2" name="dyn-radio-vertical" [value]="'two'" checked>
        <label for="default-horizontal-radio-2">Two</label>

        <input euiInputRadio id="default-horizontal-radio-3" name="dyn-radio-vertical" [value]="'three'">
        <label for="default-horizontal-radio-3">Three</label>
    </div>

    <div class="col-md-6">
        <h2 class="eui-u-text-h5 section-title eui-u-f eui-u-mt-none">Vertical layout</h2>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputRadio id="default-radio-vertical-layout-1" name="dyn-radio-horizontal" [value]="'one'">
            <label for="default-radio-vertical-layout-1">One</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputRadio id="default-radio-vertical-layout-2" name="dyn-radio-horizontal" [value]="'two'" checked>
            <label for="default-radio-vertical-layout-2">Two</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputRadio id="default-radio-vertical-layout-3" name="dyn-radio-horizontal" [value]="'three'">
            <label for="default-radio-vertical-layout-3">Three</label>
        </div>
    </div>
</div>


<div class="doc-sample-section-title">With label and euiInputGroup</div>

<div class="row">
    <div class="col-md-6">
        <h2 class="eui-u-text-h5 section-title eui-u-f eui-u-mt-none">Horizontal responsive layout</h2>

        <div euiInputGroup class="row">
            <div class="col-md-3 eui-u-mb-s">
                <label euiLabel>Choose one option</label>
            </div>
            <div class="col-md-9">
                <div class="eui-u-flex eui-u-flex-wrap">
                    <div class="eui-u-inline-flex eui-u-mb-s">
                        <input euiInputRadio id="radioField2-1" name="radioField2" value="1" checked="checked" />
                        <label euiLabel for="radioField2-1">One</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-mb-s">
                        <input euiInputRadio id="radioField2-2" name="radioField2" value="2" />
                        <label euiLabel for="radioField2-2">Two</label>
                    </div>
                    <div class="eui-u-inline-flex eui-u-mb-s">
                        <input euiInputRadio id="radioField2-3" name="radioField2" value="3" />
                        <label euiLabel for="radioField2-3">Three</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="doc-sample-section-title">Vertical layout</div>

        <div euiInputGroup class="row">
            <div class="eui-u-flex eui-u-flex-justify-content-start eui-u-mb-s">
                <label euiLabel>Choose one option</label>
            </div>

            <div class="eui-u-display-flex eui-u-flex-wrap eui-u-flex-column">
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="radioField3-1" name="radioField3" value="1" checked="checked" />
                    <label euiLabel for="radioField3-1">One</label>
                </div>
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="radioField3-2" name="radioField3" value="2" />
                    <label euiLabel for="radioField3-2">Two</label>
                </div>
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="radioField3-3" name="radioField3" value="3" />
                    <label euiLabel for="radioField3-3">Three</label>
                </div>
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
    selector: 'Default',
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
export class DefaultComponent {
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

