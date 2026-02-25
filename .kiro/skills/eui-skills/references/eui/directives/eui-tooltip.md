# eui-tooltip

## Overview

<p class="eui-u-text-paragraph">A <strong>tooltip</strong> is a text box that displays addition information when a user hovers over, clicks or gives focus to a UI element such as an icon, a highlighted word or a button.
    The information should be contextual, useful and non-essential.</p>
<p class="eui-u-text-paragraph">The <strong>euiTooltip</strong> is based on <a class="eui-u-text-link-external" href="https://material.angular.io/components/tooltip" target="_blank">Angular Material tooltip</a> and provides a text label that is displayed when the user hovers over or longpresses an element.</p>

## Samples

### [Default](samples/eui-tooltip/Default)

```html
<button euiButton euiPrimary euiTooltip="Info about the action">Action</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="eUI" aria-label="eUI Tooltip questionmark icon">
    <eui-icon-svg icon="question:regular" size="s" fillColor="secondary"></eui-icon-svg>
</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="is" aria-label="eUI Tooltip send icon">
    <eui-icon-svg icon="eui-send" size="s" fillColor="secondary"></eui-icon-svg>
</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="Awesome !" aria-label="eUI Tooltip thumb up icon">
    <eui-icon-svg icon="eui-thumbs-up" size="s" fillColor="secondary"></eui-icon-svg>
</button>

<a href="#" euiTooltip="Awesome !" class="eui-u-text-link">Link</a>
```

```typescript
import { Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-tooltip/color)
- [Options: Content alignment](samples/eui-tooltip/content-align)
- [Options: Tooltip position](samples/eui-tooltip/position)
- [Main Features: Multi-lines tooltip](samples/eui-tooltip/multi-lines)
- [Main Features: Show / hide & delay](samples/eui-tooltip/delay)
- [Main Features: Tooltip disabled](samples/eui-tooltip/disabled)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">euiTooltip</code> directive adds an <code class="eui-u-text-code">aria-describedby</code> description that provides a reference to a visually hidden element containing the tooltip's message.</p>

<p class="eui-u-text-paragraph">This provides screenreaders the information needed to read out the tooltip's contents when the end-user focuses on tooltip's trigger.
The element referenced by aria-describedby is not the tooltip itself, but instead an invisible copy of the tooltip content that is always present in the DOM.</p>

<div class="doc-sample-section-title">Recommendations</div>
<li>Avoid interactions that exclusively show a tooltip with pointer events like click and mouseenter.</li>
<li>Always ensure that keyboard users can perform the same set of actions available to mouse and touch users.</li>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
