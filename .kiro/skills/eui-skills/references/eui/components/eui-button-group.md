# eui-button-group

## Overview

N/C <br>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isCheckboxButtons | boolean | false |
| Input | isRadioButtons | boolean | false |
| Output | buttonClick | EventEmitter<EuiButtonComponent> | new EventEmitter<EuiButtonComponent>() |

## Samples

### [Default](samples/eui-button-group/Default)

```html
<eui-button-group>
    <button euiButton id="1">button 1</button>
    <button euiButton id="2">button 2</button>
    <button euiButton id="3">button 3</button>
</eui-button-group>

<div class="doc-sample-section-title">Pre-selected isChecked</div>

<eui-button-group>
    <button euiButton [isChecked]="true" id="4">button 1</button>
    <button euiButton id="5">button 2</button>
    <button euiButton id="6">button 3</button>
</eui-button-group>

<div class="doc-sample-section-title">With buttons states</div>

<eui-button-group>
    <button euiButton euiSuccess id="9">euiSuccess</button>
    <button euiButton euiInfo id="10">euiInfo</button>
    <button euiButton euiWarning id="11">euiWarning</button>
    <button euiButton euiDanger id="12">euiDanger</button>
</eui-button-group>

<div class="doc-sample-section-title">data-driven with pre-selection</div>
<eui-button-group>
    @for (buttonItem of buttonItems; track $index) {
        <button euiButton id={{buttonItem.id}} [isChecked]="buttonItem.active">{{ buttonItem.label }}</button>
    }
</eui-button-group>
```

```typescript
import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BUTTON_GROUP } from '@eui/components/eui-button-group';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON_GROUP, ...EUI_BUTTON]
})
export class DefaultComponent {
    public buttonItems = [
        { label: 'Button item 1', id: '25' },
        { label: 'Button item 2', id: '26' },
        { label: 'Button item 3', id:'27' },
        { label: 'Button item 4', id: '28', active: true },
    ];
}
```

### Other examples

- [Options: Checkbox buttons](samples/eui-button-group/checkbox-buttons)
- [Options: Radio buttons](samples/eui-button-group/radio-buttons)
- [Event handlers: Events](samples/eui-button-group/event-clicked)
- [Misc: Disabled](samples/eui-button-group/disabled)
