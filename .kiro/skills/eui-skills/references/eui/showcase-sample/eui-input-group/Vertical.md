---
description: Demonstrates default vertical layout with euiInputGroup, including required fields, label info icons with tooltips, and eui-feedback-message for validation errors.
id: Vertical
---

```html
<p class="eui-u-text-paragraph">The <strong>vertical layout</strong> is the default and recommended layout using the <code class="eui-u-text-code">euiInputGroup</code> wrapper directive.
    It is also the default layout applied when in mobile mode.</p>

<form [formGroup]="form">

    <div class="doc-sample-section-title">With required input field</div>
    <div euiInputGroup>
        <label for="vertical-input" euiLabel euiRequired>Sample label</label>
        <input euiInputText formControlName="inputVertical" id="vertical-input" />
        @if (form.get('inputVertical').hasError('required')) {
            <eui-feedback-message euiDanger>
                This field is <strong>required</strong>
            </eui-feedback-message>
        }
    </div>

    <div class="doc-sample-section-title">With required input field and <strong>recommended</strong> label info icon + Tooltip text</div>
    <div euiInputGroup>
        <label for="required-input" euiLabel euiRequired>
            Sample label
            <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the label info tooltip text" />
        </label>
        <input euiInputText formControlName="inputVertical" id="required-input" />
        @if (form.get('inputVertical').hasError('required')) {
            <eui-feedback-message euiDanger>
                This field is <strong>required</strong>
            </eui-feedback-message>
        }
    </div>

    <div class="doc-sample-section-title">With required input field and <strong>custom</strong> label info icon + Tooltip text</div>
    <div euiInputGroup>
        <label for="custom" euiLabel euiRequired>
            Sample label
            <eui-icon-svg icon="eui-question-circle" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the label info tooltip text" euiTooltipInfo />
        </label>
        <input euiInputText formControlName="inputVertical" id="custom" />
        @if (form.get('inputVertical').hasError('required')) {
            <eui-feedback-message euiDanger>
                This field is <strong>required</strong>
            </eui-feedback-message>
        }
    </div>

</form>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EuiTooltipDirective } from '@eui/components/directives';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Vertical',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        EuiTooltipDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalComponent {
    form: FormGroup = new FormGroup({
        inputVertical: new FormControl({ value: 'Lorem ipsum', disabled: false }, [Validators.required]),
    });
}
```

