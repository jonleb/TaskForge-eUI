# eui-status-badge

## Overview

<p class="eui-u-text-paragraph">Badges are small status descriptors for UI elements, typically containing a number or keywords used to label, categorize or organize items that describe them.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | euiDottedBadge | boolean | false |
| Input | colorPalette | string | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeS, euiSizeM, euiSizeVariant |

## Samples

### [Default](samples/eui-status-badge/Default)

```html
<eui-status-badge>Status</eui-status-badge>
```

```typescript
import { Component } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ]
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-status-badge/color-types)
- [Variants: Sizes](samples/eui-status-badge/sizes)
- [Variants: With icon](samples/eui-status-badge/with-icon)
- [Extra palettes](samples/eui-status-badge/extra-palettes)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-badge</code> exposes an <code class="eui-u-text-code">&#64;Input('aria-label')</code> in order to provide a meaningful label for the screen reader, which defaults to 'eUI Badge'. <br>
Special attention has been given to comply with the a11y requirement to have sufficient color contrast between the text in the foreground and the background color behind it.
More info on this can be found <code class="eui-u-text-code"><a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/color-contrast?application=axeAPI" target="_blank"  class="eui-u-text-link-external">here</a></code></p>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
