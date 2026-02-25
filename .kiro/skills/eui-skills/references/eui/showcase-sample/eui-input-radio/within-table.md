---
description: Demonstrates radio button usage within table cells, showing different states (default, readonly, disabled, invalid) in a tabular layout with optional labels.
id: within-table
---

```html
With label <eui-slide-toggle [isChecked]="hasLabel" (slideToggleChange)="onChange($event)" />

<br><br>

<table class="eui-table-default eui-table-default--shadowed">
    <thead>
        <tr>
            <th>State</th>
            <th>Checked</th>
            <th>Unchecked</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Default</td>
            <td>
                <input euiInputRadio id="default-radio_1" aria-label="radio_1" name="radio_default" checked="checked" />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_1">Label</label>
                }
            </td>
            <td>
                <input euiInputRadio id="default-radio_2" aria-label="radio_2" name="radio_default"/>
                @if (hasLabel) {
                    <label euiLabel for="default-radio_2">Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Readonly</td>
            <td>
                <input euiInputRadio id="default-radio_3" aria-label="radio_3" name="radio_readonly" readonly checked="checked" />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_3">Label</label>
                }
            </td>
            <td>
                <input euiInputRadio id="default-radio_4" aria-label="radio_4" name="radio_readonly" readonly/>
                @if (hasLabel) {
                    <label euiLabel for="default-radio_4">Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Disabled</td>
            <td>
                <input euiInputRadio id="default-radio_5" aria-label="radio_5" name="radio_disabled" disabled checked="checked" />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_5">Label</label>
                }
            </td>
            <td>
                <input euiInputRadio id="default-radio_6" aria-label="radio_6" name="radio_disabled" disabled />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_6">Label</label>
                }
            </td>
        </tr>
        <tr>
            <td>Invalid default</td>
            <td>
                <input euiInputRadio id="default-radio_7" aria-label="radio_7" name="radio_invalid" checked isInvalid />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_7">Label</label>
                }
            </td>
            <td>
                <input euiInputRadio id="default-radio_8" aria-label="radio_8" name="radio_invalid" isInvalid />
                @if (hasLabel) {
                    <label euiLabel for="default-radio_8">Label</label>
                }
            </td>
        </tr>
    </tbody>
</table>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ALERT } from '@eui/components/eui-alert';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'within-table',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_RADIO,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithinTableComponent {
    public hasLabel = false;
    // public radioOptions = [
    //     { value: '1', label: 'One', checked: false },
    //     { value: '2', label: 'Two', checked: true },
    //     { value: '3', label: 'Three', checked: false },
    // ];

    public onChange(e: boolean) {
        this.hasLabel = e;
    }
}
```

