# eui-disable-content

## Overview

N/C <br>

## API

API content

## Samples

### [Default](samples/eui-disable-content/Default)

```html
<eui-disable-content [isDisabled]="isDisabled()">
    <eui-card>
        <eui-card-content>
            <input euiInputText aria-label="Block content input field" (keyup.enter)="onEnterKey()">
            Hit <code class="eui-u-text-code">Enter</code> while typing to block content for 1 second or use button below
        </eui-card-content>
    </eui-card>
</eui-disable-content>
<br/>

<button euiButton (click)="onBlockContent()">
    {{ isDisabled() ? 'Enable' : 'Disable' }} Content
</button>
```

```typescript
import { Component, signal } from '@angular/core';

import { EUI_DISABLE_CONTENT } from "@eui/components/eui-disable-content";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    templateUrl: 'component.html',
    selector: 'Default',
    imports: [
        ...EUI_DISABLE_CONTENT,
        ...EUI_CARD,
        ...EUI_INPUT_TEXT,
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {
    isDisabled = signal<boolean>(false);

	onEnterKey() {
		this.isDisabled.update((value) => !value);
        setTimeout(() => {
			this.isDisabled.update((value) => !value);
        }, 1000);
    }

    onBlockContent() {
		this.isDisabled.update((value) => !value);
    }
}
```

### Other examples

- [Options: disabledText](samples/eui-disable-content/disabledText)
