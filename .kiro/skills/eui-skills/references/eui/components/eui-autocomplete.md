# eui-autocomplete

## Overview

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-autocomplete</code> is a text input showing some suggestions when the user types letters. It can be enhanced with chips to allow user to select multiple values.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | autocompleteDataSelected | EuiAutoCompleteItem[] | [] |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger |

## Samples

### [Default](samples/eui-autocomplete/Default)

```html
<eui-autocomplete [autocompleteData]="autocompleteData"></eui-autocomplete>
```

```typescript
import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
})
export class DefaultComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];


}
```

### Other examples

- [Options: Append & Prepend](samples/eui-autocomplete/append-prepend)
- [Options: Classlist](samples/eui-autocomplete/classList)
- [Options: Icons](samples/eui-autocomplete/iconclass)
- [Options: Panel size](samples/eui-autocomplete/panel-size)
- [Options: Templating](samples/eui-autocomplete/templating)
- [Options: Typeclass](samples/eui-autocomplete/typeclass)
- [Options: Visible Options](samples/eui-autocomplete/visible-options)
- [Main Features: Disable option](samples/eui-autocomplete/disable-option)
- [Main Features: Grouping](samples/eui-autocomplete/grouping)
- [Main Features: Matching](samples/eui-autocomplete/matching)
- [Main Features: Sorting](samples/eui-autocomplete/sorting)
- [Reactive Forms: Reactive forms](samples/eui-autocomplete/reactive-forms)
- [Reactive Forms: Validators](samples/eui-autocomplete/validators)
- [Event Handlers: Events](samples/eui-autocomplete/event-handlers)
- [Composition: Chips](samples/eui-autocomplete/Chips)
- [Composition: Chips Drag and Drop](samples/eui-autocomplete/chips-drag-and-drop)
- [Composition: Chips not removable](samples/eui-autocomplete/Chips-not-removable)
- [Composition: Chips position](samples/eui-autocomplete/chips-position)
- [Composition: Chips position with addons](samples/eui-autocomplete/chips-position-addons)
- [Composition: Chips Reactive Forms](samples/eui-autocomplete/chips-reactive-forms)
- [Composition: Chips styling options](samples/eui-autocomplete/chips-styling-options)
- [Composition: Chips tooltip](samples/eui-autocomplete/chips-tooltip)
- [Composition: Duplicate value](samples/eui-autocomplete/chips-duplicate-value-allowed)
- [Composition: Force Selection](samples/eui-autocomplete/is-force-selection)
- [Composition: Free Chips](samples/eui-autocomplete/chips-free-chips)

## Accessibility

If specified by the user, the <code>eui-autocomplete</code>'s input is being announced through the <code>placeholder</code>. If not specified, a default label is being passed through <code>[attr.aria-label]="placeholder ? placeholder : 'Autocomplete Input Field'"</code><br>
The autocomplete trigger is given a <code>role="combobox"</code>. The trigger sets <code>aria-owns</code> to the autocomplete's id, and sets <code>aria-activedescendant</code> to the active option's id.
<p class="eui-u-text-paragraph">Once triggered a div pops up and behaves as <code>role="listbox"</code> with corresponding <code>role="option"</code> items that are focusable (tabindex="0").</p>

<div class="doc-sample-section-title">>Keyboard interaction</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd>Tab</kbd></td>
            <td>Moves focus to the next autocomplete input and opens the popup once focused</td>
        </tr>
        <tr>
            <td><kbd>Shift</kbd> + <kbd>Tab</kbd></td>
            <td>Moves focus to the previous autocomplete input and opens the popup once focused</td>
        </tr>
        <tr>
            <td><kbd>Up_Arrow</kbd></td>
            <td>Focuses the previous option within the popup</td>
        </tr>
        <tr>
            <td><kbd>Down_Arrow</kbd></td>
            <td>Focuses the next option within the popup</td>
        </tr>
        <tr>
            <td><kbd>Enter</kbd></td>
            <td>If the popup is opened, selects the focused option</td>
        </tr>
        <tr>
            <td><kbd>Esc</kbd></td>
            <td>If the popup is opened, closes the popup</td>
        </tr>
    </tbody>
</table>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
