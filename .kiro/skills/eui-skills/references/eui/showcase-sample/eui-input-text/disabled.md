---
description: Demonstrates disabled state for euiInputText with standalone inputs, placeholders, labels, and input group addons.
id: disabled
---

```html
<input euiInputText value="Input text sample" aria-label="sample disabled" disabled />

<div class="doc-sample-section-title">With Placeholder</div>
<input euiInputText placeholder="Placeholder text" aria-label="Sample with placeholder" disabled/>


<div class="doc-sample-section-title">With Label</div>
<div euiInputGroup>
    <label euiLabel for="with_label_disabled">Label</label>
    <input euiInputText id="with_label_disabled" value="Input text sample" disabled />
</div>


<div class="doc-sample-section-title">With input addon</div>
<div euiInputGroup>
    <label euiLabel for="with_input-addon_disabled">Label</label>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-home" size="s" fillColor="secondary" />
        </div>
        <input euiInputText id="with_input-addon_disabled" value="Input text sample" disabled />
    </div>
</div>


<div class="doc-sample-section-title">With action button addon</div>
<div euiInputGroup>
    <label euiLabel for="with_action-button_disabled">Label</label>
    <div euiInputGroupAddOn>
        <input euiInputText id="with_action-button_disabled" value="Input text sample" disabled />
        <button euiButton euiSecondary euiIconButton euiDisabled aria-label="Search">
            <eui-icon-svg icon="eui-search" size="s" fillColor="secondary" />
        </button>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
}
```

