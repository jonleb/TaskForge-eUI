---
description: Demonstrates basic euiInputGroup usage as a wrapper for form controls with labels, including examples with input number, checkboxes, radio buttons, select, and textarea elements in vertical layout.
id: Default
---

```html
<div euiInputGroup>
    <label for="enter-amount" euiLabel>Enter amount (€)</label>
    <input euiInputNumber id="enter-amount" />
</div>


<div class="row">
    <div class="col-md-6">
        <div class="doc-sample-section-title">Checkbox</div>
        <div euiInputGroup>
            <label euiLabel>Choose preferred language(s)</label>

            <div class="eui-u-flex eui-u-flex-wrap">
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputCheckBox id="checkbox-lang-en" name="checkbox-lang-en" />
                    <label euiLabel for="checkbox-lang-en">english</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputCheckBox id="checkbox-lang-de" name="checkbox-lang-de" />
                    <label euiLabel for="checkbox-lang-de">deutsch</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputCheckBox id="checkbox-lang-fr" name="checkbox-lang-fr" checked />
                    <label euiLabel for="checkbox-lang-fr">french</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputCheckBox id="checkbox-lang-it" name="checkbox-lang-it" />
                    <label euiLabel for="checkbox-lang-it">italian</label>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="doc-sample-section-title">Radio</div>
        <div euiInputGroup>
            <label euiLabel>Select gender</label>

            <div class="eui-u-flex eui-u-flex-wrap">
                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="male" name="gender" value="male">
                    <label euiLabel for="male">Male</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="female" name="gender" value="female">
                    <label euiLabel for="female">Female</label>
                </div>

                <div class="eui-u-inline-flex eui-u-mb-s">
                    <input euiInputRadio id="other" name="gender" value="other">
                    <label euiLabel for="other">Other</label>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="doc-sample-section-title">With feedback message</div>
<div euiInputGroup>
    <label for="enter-euros" euiLabel>Enter amount (€)</label>
    <input euiInputNumber id="enter-euros" />
    <eui-feedback-message euiInfo>This is an <strong>info</strong> feedback message sample</eui-feedback-message>
</div>


<div class="doc-sample-section-title">With helper text</div>
<div euiInputGroup>
    <label for="search-text" euiLabel>Search</label>
    <eui-helper-text>Type at least 3 characters</eui-helper-text>
    <div euiInputGroupAddOn>
        <input euiInputText id="search-text" />
        <button euiButton euiIconButton euiPrimary euiOutline aria-label="Search">
            <eui-icon-svg icon="eui-search" />
        </button>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_HELPER_TEXT } from '@eui/components/eui-helper-text';


@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_NUMBER,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_HELPER_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
}
```

