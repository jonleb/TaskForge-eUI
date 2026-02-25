# eui-badge

## Overview

<p class="eui-u-text-paragraph">Badges are small status descriptors for UI elements, typically containing a number or keywords used to label, categorize or organize items that describe them.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | maxCharCount | number | - |
| Input | charReplacement | string | - |
| Input | euiIconBadge | boolean | false |
| Input | euiDottedBadge | boolean | false |
| Input | colorPalette | string | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeS, euiSizeM, euiSizeVariant, euiOutline |

## Samples

### [Default](samples/eui-badge/Default)

```html
<div class="eui-u-flex eui-u-flex-justify-content-evenly eui-u-flex-wrap">
    <span euiBadge></span>
    <span euiBadge>9</span>
    <eui-badge>99</eui-badge>
    <eui-badge>999</eui-badge>
    <eui-badge>9999</eui-badge>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_BADGE]
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-badge/color-types)
- [Variants: Outline](samples/eui-badge/outline)
- [Variants: Sizes](samples/eui-badge/sizes)
- [Composition: Badge icons](samples/eui-badge/badge-icons)
- [Composition: With buttons](samples/eui-badge/with-buttons)
- [Composition: With icon](samples/eui-badge/with-icon)
- [Extra palettes](samples/eui-badge/extra-palettes)

## Accessibility

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-badge</code> exposes an <code class="eui-u-text-code">&#64;Input('aria-label')</code> in order to provide a meaningful label for the screen reader, which defaults to 'eUI Badge'. <br>
Special attention has been given to comply with the a11y requirement to have sufficient color contrast between the text in the foreground and the background color behind it.
More info on this can be found <code class="eui-u-text-code"><a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/color-contrast?application=axeAPI" target="_blank"  class="eui-u-text-link-external">here</a></code></p>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
