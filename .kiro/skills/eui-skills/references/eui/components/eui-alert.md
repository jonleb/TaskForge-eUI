# eui-alert

## Overview

<p class="eui-u-text-paragraph">
    Alert displays a short, important message to attract the user's attention without
    interrupting its task.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant |

## Samples

### [Default](samples/eui-alert/_default)

```html
<eui-alert>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
</eui-alert>

<div class="doc-sample-section-title">With eui-alert-title</div>
<eui-alert>
    <eui-alert-title>Alert title</eui-alert-title>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
</eui-alert>


<div class="doc-sample-section-title">Closeable</div>
<eui-alert isCloseable>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
</eui-alert>
```

```typescript
import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'overview-default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
})
export class OverviewDefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-alert/color-types)
- [Options: isCloseable](samples/eui-alert/isCloseable)
- [Options: isFocusable](samples/eui-alert/isFocusable)
- [Main features: eui-alert title](samples/eui-alert/alert-title)
- [Event handlers: Events](samples/eui-alert/eventHandlers)
- [Composition: Combined options](samples/eui-alert/combined-options)
- [Misc: Dynamic update of color variant and properties](samples/eui-alert/misc-options)

## Accessibility

<p class="eui-u-text-paragraph">
    <code class="eui-u-text-code">eui-alert</code>'s wrapper <code class="eui-u-text-code">div</code> behaves as a <code
    class="eui-u-text-code">role="alert"</code>.
    It's inner <code class="eui-u-text-code">ng-content</code> should be given a meaningful label via <code
    class="eui-u-text-code">aria-label</code>
    or <code class="eui-u-text-code">aria-labelledby</code>.
</p>

<p class="eui-u-text-paragraph">
    When <code class="eui-u-text-code">isCloseable="true"</code> an X icon that behaves as a <code
    class="eui-u-text-code">role="button"</code> is attached and
    announced as <code class="eui-u-text-code">aria-label="Close Icon Button"</code> to the screen reader users.
</p>
