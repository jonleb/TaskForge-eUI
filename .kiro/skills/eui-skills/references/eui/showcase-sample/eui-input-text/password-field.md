---
description: Password input with euiIcon directive for show/hide toggle functionality using clickable eye icons and dynamic input type switching.
id: password-field
---

```html
<div euiInputGroup>
    <label euiLabel for="label_input_icon">Clickable Icon (Password hide/view scenario)</label>
    <div class="eui-u-flex" style="position: relative;">
        <input euiInputText
               [type]="type"
               id="label_input_icon"
               value="Input text sample"
               [euiIcon]="metadata()"
               (iconClick)="iconClick()"
               [readonly]="readonly"/>
    </div>
</div>

<div class="eui-u-flex eui-u-flex-wrap">
    <div class="eui-u-flex eui-u-mr-s">
        <span class="eui-u-mr-s">Hidden</span>
        <eui-slide-toggle (slideToggleChange)="change()"/><br/>
    </div>
    <div class="eui-u-flex eui-u-mr-s">
        <span class="eui-u-mr-s">Clickable</span>
        <eui-slide-toggle (slideToggleChange)="changeClickable()" [isChecked]="metadata()?.clickable" /><br/>
    </div>
    <div class="eui-u-flex eui-u-mr-s">
        <span class="eui-u-mr-s">Read only</span>
        <eui-slide-toggle (slideToggleChange)="readonly = !readonly" [isChecked]="readonly" /><br/>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT, EuiIconDirective } from '@eui/components/eui-input-text';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';


@Component({
    // tslint:disable-next-line
    selector: 'password-field',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        EuiIconDirective,
        ...EUI_SLIDE_TOGGLE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFieldComponent {
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

    iconClick() {
        this.change();
        this.type = this.type === 'text' ? 'password' : 'text';
    }

    changeClickable() {
        const clickable = !this.metadata().clickable;
        this.metadata.update( v => ({ ...v, clickable }) );
    }
}
```

