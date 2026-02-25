# eui-max-length

## Overview

N/C <br>

## Samples

### [Default](samples/eui-max-length/Default)

```html
<div class="doc-sample-section-title">Max Length on text with callback</div>
<label euiLabel for="maxlength-default">Label</label>
<input (maxLengthReached)="textMaxLengthReached($event)" [euiMaxlength]="20" euiInputText id="maxlength-default" value="sample text" />
<pre class="eui-u-text-pre">Has max length reached? {{ textMax }}</pre>

<div class="doc-sample-section-title">Text area with show/hide</div>
<label for="story">Tell us your story:</label>
<textarea [euiMaxlength]="22" [isShowMaxlength]="show" cols="33" euiTextArea id="story" name="story" rows="5">
It was a dark and stormy night...
</textarea><br/>
<button (click)="show=!show" euiButton>{{ show ? 'Hide' : 'Show' }}</button>
```

```typescript
import { Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: "Default",
    templateUrl: "component.html",
    imports: [
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA,
        ...EUI_BUTTON,
        EuiMaxLengthDirective,
    ],
})
export class DefaultComponent {
    public isChecked: false | true = true;
    public show = false;
    public textMax = false;

    public toggleCheck(event: Event) {
        this.isChecked = !this.isChecked;
    }

    textMaxLengthReached(reached: boolean) {
        this.textMax = reached;
    }
}
```

### Other examples

- [Main features: Custom calculator](samples/eui-max-length/custom-calculator)
- [Reactive Forms: Reactive Forms](samples/eui-max-length/reactive-forms)
