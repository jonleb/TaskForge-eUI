---
description: Demonstrates toggling between euiClearable and euiLoading states on the same input, showing proper state management for combined functionality.
id: clearable-loading
---

```html
<p class="eui-u-text-paragraph">When using both <code class="eui-u-text-code">euiClearable</code> and <code class="eui-u-text-code">euiLoading</code> options, be sure to <strong>toggle</strong> the isLoading state from the euiClearable in order to switch from clearable to loading states.
See the code source for an example.</p>
<br>
<div euiInputGroup>
    <input euiInputText [euiClearable]="!isLoadingToggle" [euiLoading]="isLoadingToggle" [value]="inputValue" placeholder="Type some text to enable the clear icon" aria-label="Input text sample with clearable and loading visual status" />
</div>
<br>
<button euiButton euiPrimary euiOutline (click)="toggleState()">Toggle loading state</button>
```

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT, EuiIconDirective } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'clearable-loading',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClearableLoadingComponent {
    type = 'text';
    metadata = signal({
        icon: 'eye:filled',
        clickable: true
    })
    public inputValue = 'Input text sample';
    public isLoadingToggle: false | true = true;
    readonly: boolean;

    public toggleState() {
        this.isLoadingToggle = !this.isLoadingToggle;
    }

    change() {
        const icon = this.metadata().icon === 'eye:filled' ? 'eye-off:filled' : 'eye:filled';
        this.metadata.update( v => ({ ...v, icon }) );
    }
}
```

