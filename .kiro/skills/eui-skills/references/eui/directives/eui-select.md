# eui-select

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">euiSelect</code> directive combined with the native <strong>select</strong> element allows to take care of the rendering for selecting a value from a set of options.
Using native elements has several performance, accessibility, and usability advantages.
It is designed to work alone or inside of the <code class="eui-u-text-code">euiInputGroup</code> directive element which gives more flexibility when used in a responsive layout design.</p>

<p class="eui-u-text-paragraph">Each nested <strong>option</strong> element has a value property that can be used to set the value that will be selected if the user chooses this option.
The content of the <strong>option</strong> is what will be shown to the user.
Options can also by grouped with the <strong>optgroup</strong> element which allows to display a label value.
Please note that <u>multiple attributes are not supported</u>.
</p>

<br>

<eui-alert>
    <eui-alert-title>Remark about styling</eui-alert-title>
    <p class="eui-u-text-paragraph">If you don't use the <code class="eui-u-text-code">euiSelect</code> directive, it is recommended to use the <strong>eui-select</strong> style class applied to the select tag.</p>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | placeholder | string | - |
| Input | readonly | boolean | - |
| Input | get | unknown | - |

## Samples

### [Default](samples/eui-select/Default)

```html
<div class="doc-sample-section-title">With label</div>
<div euiInputGroup>
    <label euiLabel for="framework">Select framework</label>
    <select euiSelect name="framework" id="framework">
        <option value="angular">Angular</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
    </select>
</div>

<div class="doc-sample-section-title">Without label</div>
<select euiSelect name="framework_nolabel" aria-label="framework nolabel">
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>

<div class="doc-sample-section-title">With empty value</div>
<select euiSelect name="framework_nolabel" id="framework_nolabel" aria-label="framework empty label">
    <option value=""></option>
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
</select>

<div class="doc-sample-section-title">Default Selected</div>
<select euiSelect name="framework_selected" aria-label="framework selected">
    <option value="angular">Angular</option>
    <option value="react" selected>React</option>
    <option value="vue">Vue</option>
</select>


<div class="doc-sample-section-title">With group</div>
<div euiInputGroup>
    <label euiLabel for="dino-selection">Select a dinosaur</label>
    <select euiSelect id="dino-selection">
        <optgroup label="Theropods">
            <option>Tyrannosaurus</option>
            <option>Velociraptor</option>
            <option>Deinonychus</option>
        </optgroup>
        <optgroup label="Sauropods">
            <option>Diplodocus</option>
            <option>Saltasaurus</option>
            <option>Apatosaurus</option>
        </optgroup>
    </select>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_GROUP],
})
export class DefaultComponent {

}
```

### Other examples

- [Options: Disabled](samples/eui-select/disabled)
- [Options: Invalid](samples/eui-select/invalid)
- [Options: Multiple](samples/eui-select/multiple)
- [Options: Placeholder](samples/eui-select/placeholder)
- [Options: Readonly](samples/eui-select/readonly)
- [Options: Size](samples/eui-select/size)
- [Reactive Forms: Reactive Forms](samples/eui-select/reactive-forms)
- [Reactive Forms: Template-Driven Forms](samples/eui-select/template-driven-form)
- [Misc: Custom width](samples/eui-select/custom-width)
- [Misc: Long options values](samples/eui-select/long-options-values)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-select</code> following the semantic approach takes advantage of all the attributes attached to the native <code class="eui-u-text-code">select</code> html element and behaves as a <code class="eui-u-text-code">role="combobox"</code>.
    <br>
    The <code class="eui-u-text-code">select</code> field should be given a meaningful label via <code class="eui-u-text-code">label for=""</code> or <code class="eui-u-text-code">aria-label</code> or <code class="eui-u-text-code">aria-labelledby</code>.
</p>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
