---
description: Basic euiSelect implementation with label, without label, empty value option, default selected option, and optgroup usage.
id: Default
---

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
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_GROUP],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {

}
```

