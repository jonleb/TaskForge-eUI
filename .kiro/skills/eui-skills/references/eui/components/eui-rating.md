# eui-rating

## Overview

The <strong>eui-rating</strong> component allows users to increase, decrease, and select predefined values by clicking its stars along or using the arrow keys. <br> 
It is a versatile component that can be used for rating systems, feedback forms, or any scenario where a user needs to provide a rating or score. The component is designed to be accessible and user-friendly, providing visual feedback through the use of icons and aria attributes.
It can be easily integrated into Angular applications, making it a great choice for developers looking to implement a rating system. <br>
The component is highly customizable, allowing developers to set the number of stars, initial ratings, and whether the component is disabled or not. It also supports both reactive and template-driven forms, making it flexible for various use cases.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | id | unknown | `eui-rating-${uniqueId()}` |
| Input | euiDisabled | boolean | false |
| Input | numberOfStars | number | 5 |
| Input | rating | number | 0 |
| Output | ratingChange | unknown | new EventEmitter<number>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | - |

## Samples

### [Default](samples/eui-rating/Default)

```html
<eui-rating/>
```

```typescript
import { Component } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
})
export class DefaultComponent {

}
```

### Other examples

- [Options: Disabled](samples/eui-rating/disabled)
- [Options: Number of stars](samples/eui-rating/number-stars)
- [Options: Rating set](samples/eui-rating/rating-set)
- [Reactive Forms: Reactive Forms](samples/eui-rating/reactive-forms)
- [Reactive Forms: Template-Driven Forms](samples/eui-rating/template-driven-form)

## Accessibility

The <strong>eui-rating</strong> component is WCAG2.1 AA and EN 301 549(The European standard that defines accessibility requirements for Information and Communication Technology products and services) compliant. <br>
The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/">WAI-ARIA best practices</a> for implementing the keyboard navigation and for the component's role, states and aria attributes needed. It is tested both automated(via the Axe DevTools Enterprise suite) and manually via the popular screen readers NVDA and JAWS. <br>
The component's host element is considered as a container for a group of radio buttons via the <code class="eui-u-text-code">role='radiogroup'</code> attribute. It is not focusable because focus is managed using a roving tabindex strategy. The name of the group is set via the <code class="eui-u-text-code">aria-label</code> attribute and exposed to the users though the <code class="eui-u-text-code">ariaLabel</code> Input property with a default value of 'eUI Rating'. <br>
The individual rating stars are implemented as buttons with the <code class="eui-u-text-code">role='radio'</code> attribute. Each of the radio buttons are announced to the screen reader users via a corresponding <code class="eui-u-text-code">aria-label</code> attribute as "Rating star X - Selected" or "Rating star X - Not selected" depending on the state of the button. The <code class="eui-u-text-code">aria-checked</code> attribute is used to indicate whether the radio button is checked or not. <br>
<br>
<b>Keyboard interaction</b>
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
            <td> - Moves focus to the checked radio button in the radiogroup. <br>
                 - If a radio button is not checked, focus moves to the first radio button in the group.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Left-Arrow</kbd></td>
            <td> Moves focus to and checks the previous radio button in the group. The state of the previously checked radio button is changed to unchecked.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Right-Arrow</kbd></td>
            <td> Moves focus to and checks the next radio button in the group. The state of the previously checked radio button is changed to unchecked.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter/Space</kbd></td>
            <td>- If the radio button with focus is not checked, changes the state to checked. <br> 
                - If the radio button with focus is checked, changes the state to unchecked.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Home</kbd></td>
            <td>Moves focus to the first radio button and removes all stars.</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">End</kbd></td>
            <td>Moves focus to the last radio button and selects all stars.</td>
        </tr>
    </tbody>
</table>
<br>
All the above mentioned roles, states, properties and keyboard navigation patterns are aligned with the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/">WAI-ARIA patterns for Rating Radio Groups</a>.
