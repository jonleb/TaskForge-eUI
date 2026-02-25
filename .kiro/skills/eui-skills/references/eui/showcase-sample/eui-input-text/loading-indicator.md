---
description: euiInputText with euiLoading directive that displays a loading spinner and can be toggled programmatically with input disabling.
id: loading-indicator
---

```html
<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">euiLoading</code> input option displays a loading icon to the right of the form control when the loading state is triggered.
The loading state visual improves the user exeprience which can be enhanced by disabling the input form control during the loading state.</p>
<br>
<div euiInputGroup>
    <input euiInputText [euiLoading]="isLoading" value="" placeholder="Enter some text" [disabled]="isLoading" aria-label="Input text sample with loading visual status" />
</div>
<br>
<button euiButton euiPrimary euiOutline (click)="changeState()">{{isLoading ? 'Disable':'Enable'}} loading state</button>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'loading-indicator',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {

    public isLoading: false | true = true;

    public changeState() {
        this.isLoading = !this.isLoading;
    }

}
```

