# eui-input-checkbox

## Overview

<p class="eui-u-text-paragraph">Checkboxes allow users to select one or more options from a set of items. Checkboxes options can be turned on or off.</p>

<br>

<eui-alert>
    <eui-alert-title>Remark about styling</eui-alert-title>
    If you don't use the <code class="eui-u-text-code">euiInputCheckbox</code> directive, it is recommended to use the <strong>eui-input-checkbox</strong> style class applied to the input tag.
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Output | indeterminateChange | EventEmitter<boolean> | new EventEmitter<boolean>() |

## Samples

### [Default](samples/eui-input-checkbox/Default)

```html
<p class="eui-u-text-paragraph">Recommended checkbox usage is a composition gathering the <code class="eui-u-text-code">&lt;input euiInputCheckBox ...&gt;</code> tag followed by the <code class="eui-u-text-code">&lt;label euiLabel ...&gt;</code> after the input.
They can also be wrapped into the <code class="eui-u-text-code">euiInputGroup</code> container giving more options and layout flexibility.
See the <a class="eui-u-text-link" routerLink="/style-guide/directives/eui-input-group">eui-input-group</a> component for more information.</p>

<br>

<input id="default-checkbox0"
       aria-label="default checkbox unchecked"
       name="default-checkbox"
       euiInputCheckBox />
<label for="default-checkbox0">Label</label>

<input id="default-checkbox1"
        aria-label="default checkbox checked"
        name="default-checkbox"
        euiInputCheckBox
        checked />
<label for="default-checkbox1">Checked</label>


<div class="doc-sample-section-title">Without label</div>
<eui-card euiWarning>
    <eui-card-header >
        <eui-card-header-title>
            <div class="eui-u-f-l"><strong>Important UX and accessibility recommendations</strong></div>
        </eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <p class="eui-u-text-paragraph">Checkboxes without label tags are inaccessible to screen readers.
            This causes the screen reader to read the labels and checkboxes separately to users which could struggle to figure out which label goes with which checkbox.
        </p>
        <p class="eui-u-text-paragraph">Without label tags, users can’t click the label to tick the checkbox. Instead, they have to click the checkbox itself.
            This causes users to struggle because the checkbox is a small target to hit especially for motor-impaired users.
        </p>
        <p class="eui-u-text-paragraph">When adding the label tags in, each checkbox gets read to the user with the correct label.
           Label tags act as an anchor for all form elements.
           It not only works for checkboxes, but recommended usage is that <strong>you should use it for every form element that has a label</strong>.
        </p>
        <p class="eui-u-mb-none"><em>Please also note that stand-alone checkboxes are rendered by the browser user-agent and small differences can be seen on final rendering.</em></p>
    </eui-card-content>
</eui-card>

<br>

<div class="eui-u-flex">
    <div class="eui-u-text-center">
        <input euiInputCheckBox
            name="checkbox_nolabel"
            aria-label="checkbox with no label checked"
            checked="true"
            value="1">
        <br><em>Checked</em>
    </div>
    <div class="eui-u-text-center eui-u-ml-m">
        <input euiInputCheckBox
            name="checkbox_nolabel"
            aria-label="checkbox with no label unchecked"
            value="0">
        <br><em>Unchecked</em>
    </div>
</div>


<div class="doc-sample-section-title">Within a simple table</div>

With label <eui-slide-toggle [isChecked]="hasLabel" (slideToggleChange)="onChange($event)"></eui-slide-toggle><br/>
<br>
<table class="eui-table-default eui-table-default--shadowed">
    <thead>
        <tr>
            <th>State</th>
            <th>Checked</th>
            <th>Unchecked</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Default</td>
            <td>
                <input euiInputCheckBox id="default-checkbox_1" aria-label="checkbox_1" name="checkbox_default" checked="true" />
                @if (hasLabel) {
                    <label for="default-checkbox_1">Label</label>
                }
            </td>
            <td>
                <input euiInputCheckBox id="default-checkbox_2" aria-label="checkbox_2" name="checkbox_default" />
                @if (hasLabel) {
                    <label for="default-checkbox_2" euiLabel>Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Readonly</td>
            <td>
                <input euiInputCheckBox id="default-checkbox_3" aria-label="checkbox_3" name="checkbox_readonly" readonly checked="true" />
                @if (hasLabel) {
                    <label for="default-checkbox_3" euiLabel>Label</label>
                }
            </td>
            <td>
                <input euiInputCheckBox id="default-checkbox_4" aria-label="checkbox_4" name="checkbox_readonly" readonly/>
                @if (hasLabel) {
                    <label for="default-checkbox_4" euiLabel>Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Disabled</td>
            <td>
                <input euiInputCheckBox id="default-checkbox_5" aria-label="checkbox_5" name="checkbox_disabled" disabled checked="true" />
                @if (hasLabel) {
                    <label for="default-checkbox_5"euiLabel>Label</label>
                }
            </td>
            <td>
                <input euiInputCheckBox id="default-checkbox_6" aria-label="checkbox_6" name="checkbox_disabled" disabled />
                @if (hasLabel) {
                    <label for="default-checkbox_6" euiLabel>Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Invalid default</td>
            <td>
                <input euiInputCheckBox id="default-checkbox_7" aria-label="checkbox_7" name="checkbox_invalid" checked="true" isInvalid />
                @if (hasLabel) {
                    <label for="default-checkbox_7" euiLabel>Label</label>
                }
            </td>
            <td>
                <input euiInputCheckBox id="default-checkbox_8" aria-label="checkbox_8" name="checkbox_invalid" isInvalid />
                @if (hasLabel) {
                    <label for="default-checkbox_8" euiLabel>Label</label>
                }
            </td>
        </tr>
    </tbody>
</table>


<div class="doc-sample-section-title">Dynamically created with label</div>

@for (checkbox of checkboxes; let i = $index; track $index) {
    <div class="eui-u-display-flex eui-u-mb-s">
        <input euiInputCheckBox id="default-checkbox-{{i}}" name="dyn-checkbox" [value]="checkbox.value" [checked]="checkbox.checked">
        <label for="default-checkbox-{{i}}">{{checkbox.label}}</label>
    </div>
}


<div class="doc-sample-section-title">Horizontal vs vertical layouts alignements</div>
<eui-alert>
    <eui-alert-title>Important remark about horizontal vs vertical layouts</eui-alert-title>
    By <strong>default</strong>, the layout display of an input <strong>checkbox + label</strong> is <strong>horizontal</strong> (inline).
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
        <div class="eui-u-text-div section-title eui-u-mt-m">Horizontal layout (default)</div>

        <div class="eui-u-inline-flex">
            <input euiInputCheckBox id="default-checkbox-vertical-1" name="dyn-checkbox" [value]="'one'">
            <label for="default-checkbox-vertical-1">One</label>
        </div>
        <div class="eui-u-inline-flex">
            <input euiInputCheckBox id="default-checkbox-vertical-2" name="dyn-checkbox" [value]="'two'" checked>
            <label for="default-checkbox-vertical-2">Two</label>
        </div>
        <div class="eui-u-inline-flex">
            <input euiInputCheckBox id="default-checkbox-vertical-3" name="dyn-checkbox" [value]="'three'">
            <label for="default-checkbox-vertical-3">Three</label>
        </div>
    </div>

    <div class="col-md-6">
        <div class="eui-u-text-div section-title eui-u-mt-m">Vertical layout</div>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputCheckBox id="default-checkbox-horizontal-1" name="dyn-checkbox" [value]="'one'">
            <label for="default-checkbox-horizontal-1">One</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputCheckBox id="default-checkbox-horizontal-2" name="dyn-checkbox" [value]="'two'" checked>
            <label for="default-checkbox-horizontal-2">Two</label>
        </div>

        <div class="eui-u-flex eui-u-mb-s">
            <input euiInputCheckBox id="default-checkbox-horizontal-3" name="dyn-checkbox" [value]="'three'">
            <label for="default-checkbox-horizontal-3">Three</label>
        </div>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_CHECKBOX,
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_ALERT,
    ],
})
export class DefaultComponent {

    public hasLabel = false;
    public checkboxes = [
        { value: 'one', label: 'One', checked: false },
        { value: 'two', label: 'Two', checked: true },
        { value: 'three', label: 'Three', checked: false },
    ];

    public onChange(e: boolean) {
        this.hasLabel = e;
    }
}
```

### Other examples

- [Options: Disabled](samples/eui-input-checkbox/disabled)
- [Options: Indeterminate](samples/eui-input-checkbox/indeterminate)
- [Options: Invalid](samples/eui-input-checkbox/invalid)
- [Options: ReadOnly](samples/eui-input-checkbox/readonly)
- [Main features: Label](samples/eui-input-checkbox/attr-label)
- [Reactive Forms: Reactive Forms](samples/eui-input-checkbox/reactive-forms)
- [Reactive Forms: Template-Driven Forms](samples/eui-input-checkbox/template-driven-form)
- [Misc: Responsive Layout](samples/eui-input-checkbox/responsive-layout)
- [Misc: With eui-card](samples/eui-input-checkbox/with-card)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-input-checkbox</code> following the semantic approach takes advantage of all the attributes attached to the native <code class="eui-u-text-code">input</code> html element and behaves as a <code class="eui-u-text-code">role="checkbox"</code>.
The <code class="eui-u-text-code">input</code> field should be given a meaningful label via <code class="eui-u-text-code">label for=""</code>, or <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.</p>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
