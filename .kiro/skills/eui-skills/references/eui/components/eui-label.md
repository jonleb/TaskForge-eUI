# eui-label

## Overview

<code class="eui-u-text-code">eui-label</code> is used to label data on buttons, lists and forms. It accepts type classes variants' directives to style it as well as some states usages for particular cases.
eUI uses the <strong>Arial &reg;</strong> system font typeface as the <strong>default eui-font</strong>, 'Helvetica Neue', Helvetica and sans-serif as fallback substitutions fonts.
We chose Arial&reg; which is inline with <a class="eui-u-text-link-external" href="https://ec.europa.eu/component-library/ec/guidelines/typography/" target="_blank">Europa Component Library (ECL)</a> styleguide and because it is very performant and well suited for multilingual usage.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | euiRequired | boolean | false |
| Input | euiReadonly | boolean | false |
| Input | euiSublabel | boolean | false |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeS, euiSizeM, euiSizeL, euiSizeVariant, euiDisabled |

## Samples

### [Default](samples/eui-label/Default)

```html
<div class="doc-sample-section-title">Using the <code class="eui-u-text-code">eui-label</code> component</div>
<eui-label>Sample label</eui-label>


<div class="doc-sample-section-title">Using the euiLabel directive in a <code class="eui-u-text-code">div</code> tag</div>
<div euiLabel>Sample label</div>


<div class="doc-sample-section-title">Using the euiLabel directive in a <code class="eui-u-text-code">label</code> tag</div>
<label euiLabel>Sample label</label>


<div class="doc-sample-section-title">Using the euiLabel directive in a <code class="eui-u-text-code">span</code> tag</div>
<span euiLabel>Sample label</span>


<div class="doc-sample-section-title">Using the euiLabel directive in a <code class="eui-u-text-code">a</code> tag</div>
<a euiLabel class="eui-u-text-link">Sample label</a>
```

```typescript
import { Component } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-label/colors)
- [Variants: Sizes](samples/eui-label/sizes)
- [Options: States](samples/eui-label/states)
- [Main features: With sublabel](samples/eui-label/sublabel)
