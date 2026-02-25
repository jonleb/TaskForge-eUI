# eui-slide-toggle

## Overview

The <code class="eui-u-text-code">eui-slide-toggle</code> component behaves similarly to a checkbox, an on/off control that can be toggled via clicking or accessible via keyboard.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | id | unknown | `eui-slide-toggle-${uniqueId()}` |
| Input | ariaLabel | string | 'eUI slide toggle' |
| Input | iconSvgNameOn | string | - |
| Input | iconSvgNameOff | string | - |
| Input | iconSvgFillColorOn | string | 'secondary' |
| Input | iconSvgFillColorOff | string | 'secondary' |
| Input | isChecked | boolean | false |
| Input | disabled | boolean | - |
| Output | slideToggleChange | unknown | new EventEmitter<boolean>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiInfo, euiWarning, euiSuccess, euiDanger, euiVariant, euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiSizeVariant |

## Samples

### [Default](samples/eui-slide-toggle/Default)

```html
<eui-slide-toggle></eui-slide-toggle>
```

```typescript
import { Component } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-slide-toggle/colors)
- [Variants: Sizes](samples/eui-slide-toggle/sizes)
- [Options: With icons defined](samples/eui-slide-toggle/with-icon)
- [Main features: Checked by default](samples/eui-slide-toggle/checked-by-default)
- [Main features: Disabled](samples/eui-slide-toggle/disabled)
- [Reactive Forms: Reactive Forms](samples/eui-slide-toggle/reactive-forms)
- [Event handlers: Events](samples/eui-slide-toggle/event-handlers)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-slide-toggle</code> uses internally an <code class="eui-u-text-code">input type="checkbox"</code> to provide an accessible experience. It behaves similar to checkboxes with the difference that it can only be used for binary input while checkboxes and toggle buttons support a third middle state.</p>
<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-slide-toggle</code> has a role of <code class="eui-u-text-code">switch</code> and an accessible label provided via an <code class="eui-u-text-code">aria-label</code> attached to the element with role swith that defaults to "eUI slide toggle". When on, the switch element has it's <code class="eui-u-text-code">checked</code> state set to true. When off, the switch element has a checked state set to false accordingly. </p>
<p>Moreover, if not specified by the developer, we make sure that the default <code class="eui-u-text-code">id</code> provided to the component is unique, as IDs of active elements must be unique.
More info can be found <a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/duplicate-id-active?application=axeAPI" target="_blank">here</a>.</p>


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
            <td>Moves focus to the next interactive element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Moves focus to the previous interactive element</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Spacebar</kbd></td>
            <td>Toggles the slide-toggle ON or OFF state</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter(optional)</kbd></td>
            <td>Toggles the slide-toggle ON or OFF state</td>
        </tr>
    </tbody>
</table>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
