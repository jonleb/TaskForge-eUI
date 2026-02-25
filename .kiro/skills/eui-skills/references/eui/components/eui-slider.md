# eui-slider

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiDanger, euiVariant |

## Samples

### [Default](samples/eui-slider/default)

```html
<eui-slider />
```

```typescript
import { Component } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
})
export class DefaultComponent {
    
}
```

### Other examples

- [Variants: Colors](samples/eui-slider/colors)
- [Main features: Format value](samples/eui-slider/format-value)
- [Main features: Min & Max](samples/eui-slider/min-max)
- [Main features: Range](samples/eui-slider/range)
- [Main features: Steps](samples/eui-slider/steps)
- [Main features: Ticks](samples/eui-slider/ticks)
- [Main features: Tooltip](samples/eui-slider/tooltip)
- [Main features: Value indicator](samples/eui-slider/value-indicator)
- [Forms: Reactive Forms](samples/eui-slider/reactive-forms)
- [Forms: Reactive Forms Validators](samples/eui-slider/validators)
- [Forms: Signal Forms (Bêta)](samples/eui-slider/signal-forms)
- [Forms: Template-Driven Forms](samples/eui-slider/template-driven-form)

## Accessibility

The <strong>eui-slider</strong> component is WCAG2.1 AA and EN 301 549(The European standard that defines accessibility requirements for Information and Communication Technology products and services) compliant. <br><br>
The component also follows the <a href="https://www.w3.org/WAI/ARIA/apg/">WAI-ARIA best practices</a> for implementing the keyboard navigation and for the component's role, states and aria attributes needed. It is tested both automated(via the Axe DevTools Enterprise suite) and manually via the popular screen readers NVDA and JAWS. <br><br>
The component consists of an input element with a corresponding <code class="eui-u-text-code">role="slider"</code> and a draggable handler. The input element is focusable and can be named using the corresponding <code class="eui-u-text-code">ariaLabel</code> Input property or in case there is a label next to the input element, the unique id of the input field exposed via the <code class="eui-u-text-code">sliderId</code> Input property can be used in the label's <code class="eui-u-text-code">for</code> attribute to associate the label with the input element. The component's value is exposed to the screen reader users via the <code class="eui-u-text-code">aria-valuenow</code> attribute. The minimum and maximum values of the slider are set using the <code class="eui-u-text-code">aria-valuemin</code> and <code class="eui-u-text-code">aria-valuemax</code> attributes. If the aria-valuenow is not user-friendly or if additinal info needs to be announced to the user, the <code class="eui-u-text-code">aria-valuetext</code> attribute can be used to provide a more descriptive value. The value of this attribute is associated with the <code class="eui-u-text-code">formattedStartValue</code>  attribute. <br><br>
The component supports both single and range values. In case of a range, the second input element is used to set the end value of the range. The end value is also exposed to the screen reader users via the <code class="eui-u-text-code">aria-valuenow</code>, <code class="eui-u-text-code">aria-valuemin</code>, <code class="eui-u-text-code">aria-valuemax</code> and <code class="eui-u-text-code">aria-valuetext</code> attributes accordingly. In this case the end range input is announced via the <code class="eui-u-text-code">endAriaLabel</code> Input property or through the unique id of the input field if it is associated with a label. <br><br>
The minimum value of the end range input is set to the value of the start range input, while the maximum value is set to the maximum value of the slider. Also the max value of the start range input is set to the value of the end range input. This way the component ensures that the start value is always less than or equal to the end value. Also the <code class="eui-u-text-code">aria-valuetext</code> value of the end range input is associated with the <code class="eui-u-text-code">formattedEndValue</code> accordingly. <br><br>

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
            <td>Moves focus to the slider. The next Tab press will move focus to the next focusable element or to the end range input element in case there is a range slider.
            </td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Left-Arrow/ArrowDown</kbd></td>
            <td> Decreases the value of the slider by one step</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Right-Arrow/ArrowUp</kbd></td>
            <td> Increases the value of the slider by one step</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Home</kbd></td>
            <td>Sets the slider to the first allowed value in its range</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">End</kbd></td>
            <td>Sets the slider to the last allowed value in its range</td>
        </tr>
    </tbody>
</table>
<br>
All the above mentioned roles, states, properties and keyboard navigation patterns are aligned with the <a href="https://www.w3.org/WAI/ARIA/apg/patterns/slider/">WAI-ARIA patterns for Sliders</a>.
