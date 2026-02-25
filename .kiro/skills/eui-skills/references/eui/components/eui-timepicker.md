# eui-timepicker

## Overview

<code class="eui-u-text-code">eui-timepicker</code> comprises of input html elements that are using the new <code class="eui-u-text-code">euiInputNumber</code> directive and arrow keys that are used to increase/decrease hours/minutes/seconds accordingly. <br>
The previous version (<code class="eui-u-text-code">ux-timepicker</code>) was mostly created in order to support the isDatetimepicker feature of the <code class="eui-u-text-code">ux-datepicker</code> component.
The new version is still injected in the new <code class="eui-u-text-code">eui-datepicker</code> component to support dates with time but it can also be used as a standalone component.
We therefore implemented in this version the ControlValueAccessor in order for the component to be used with reactive-forms, we added the option to have seconds in a third column and also the ReadOnly state. <br> Since eUI13 there is also available the one-input-field feature that merges the 3 input fields into one so that the user can type the hours/mins/secs faster especially when used within forms, without having to tab from one input field to another.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-timepicker' |
| Input | inputId | unknown | `eui-timepicker-${uniqueId()}` |
| Input | timeMask | string | 'Hh:m0' |
| Input | placeholder | unknown | this.timeMask |
| Input | stepHours | number | 1 |
| Input | stepMinutes | number | 1 |
| Input | stepSeconds | number | 1 |
| Input | iconSize | string | 'l' |
| Input | isreadOnly | boolean | false |
| Input | isDisabled | boolean | false |
| Input | isOneInputField | boolean | false |
| Input | hasSeconds | boolean | false |

## Samples

### [Default](samples/eui-timepicker/Default)

```html
<eui-timepicker></eui-timepicker>
```

```typescript
import { Component } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    templateUrl: './component.html',
    selector: 'Default',
    imports: [...EUI_TIMEPICKER]
})
export class DefaultComponent {
}
```

### Other examples

- [Options: Disabled](samples/eui-timepicker/isDisabled)
- [Options: Readonly](samples/eui-timepicker/readonly)
- [Main features: Steps](samples/eui-timepicker/steps)
- [Main features: With seconds](samples/eui-timepicker/with-seconds)
- [Reactive forms: Reactive Forms](samples/eui-timepicker/reactive-forms)

## Accessibility

<code class="eui-u-text-code">eui-timepicker</code>'s <code class="eui-u-text-code">input</code> field is being announced through <code class="eui-u-text-code">aria-label</code> attributes providing corresponding meaningful labels ('Hours', 'Minutes', 'Seconds'). <br>
The clickable arrow keys used to increase/decrease time have been also given meaningful labels through <code class="eui-u-text-code">aria-label</code> attributes ('Increase hours/minutes/seconds', 'Decrease hours/minutes/seconds').

<div class="doc-sample-section-title">Keyboard interaction</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Moves focus to the next time input field</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Moves focus to the previous time input field</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Up_Arrow</kbd></td>
            <td>Once input is focused, increases the corresponding time field(hours/minutes/seconds) by one</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Down_Arrow</kbd></td>
            <td>Once input is focused, decreases the corresponding time field(hours/minutes/seconds) by one</td>
        </tr>
    </tbody>
</table>
