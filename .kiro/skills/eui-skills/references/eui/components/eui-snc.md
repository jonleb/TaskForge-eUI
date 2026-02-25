# eui-snc

## Overview

A component wrapper to switch between hidden and visible states when SNC mode is active.

## Samples

### [Default](samples/eui-snc/Default)

```html
<div class="doc-sample-section-title">Edit mode</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">IBAN</label>
    <eui-snc>
        <input euiInputText id="default_snc" value="FR90 0000 0000 0000 0000 0000 000" />
    </eui-snc>
</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">Sensitive Documentation</label>
    <eui-snc>
        <div>
            <textarea euiTextArea id="default_snc" rows="4">This is a sensitive document. Please handle with care.</textarea>
        </div>
    </eui-snc>
</div>

<div class="doc-sample-section-title">Readonly mode</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">IBAN</label>
    <eui-snc>
        <input euiInputText readonly id="default_snc" value="FR90 0000 0000 0000 0000 0000 000" />
    </eui-snc>
</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">Sensitive Documentation</label>
    <eui-snc>
        <div>
            <textarea euiTextArea readonly id="default_snc">This is a sensitive document. Please handle with care.</textarea>
        </div>
    </eui-snc>
</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">Sensitive Label</label>
    <eui-snc>
        <span euiLabel>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
    </eui-snc>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiLabelComponent } from '@eui/components/eui-label';
import { EuiSncComponent } from '@eui/components/eui-snc';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiInputGroupComponent } from '@eui/components/eui-input-group';

@Component({
	// eslint-disable-next-line
	selector: 'Default',
	templateUrl: 'component.html',
	imports: [
		EuiInputTextComponent,
		EuiLabelComponent,
		EuiSncComponent,
		EuiTextareaComponent,
		EuiInputGroupComponent,
	],
})
export class DefaultComponent {
}
```

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
