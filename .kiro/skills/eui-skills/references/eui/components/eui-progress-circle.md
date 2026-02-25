# eui-progress-circle

## Overview

<p class="eui-u-text-paragraph">
    Progress circles represent a determinate value showed as a two-part pie chart in a visual manner.
</p>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | ariaLabel | string | 'progress circle' |
| Input | tabindex | string | '0' |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSizeS, euiSizeM, euiSizeL, euiSizeVariant |

## Samples

### [Default](samples/eui-progress-circle/Default)

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="25.5" />
    <eui-progress-circle [value]="51.2" />
    <eui-progress-circle [value]="75.87" />
    <eui-progress-circle [value]="99.9" />
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
})
export class DefaultComponent {

}
```

### Other examples

- [Variants: Colors](samples/eui-progress-circle/colors)
- [Variants: Sizes](samples/eui-progress-circle/sizes)
- [Options: colorSteps](samples/eui-progress-circle/colorSteps)
- [Options: emptyLabel](samples/eui-progress-circle/empty-label)
- [Options: hasBottomLabel](samples/eui-progress-circle/bottomLabel)
- [Options: With icons](samples/eui-progress-circle/icons)
- [Options: isDefaultColorSteps](samples/eui-progress-circle/isDefaultColorSteps)
- [Options: valueLabel](samples/eui-progress-circle/valueLabel)
- [Misc: Data refreshing](samples/eui-progress-circle/data-refresh)
