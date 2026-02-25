# eui-date-block

## Overview

TODO

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | dateFormat | string | 'dd/M/yyyy' |
| Input | blockDate | Date | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary |

## Samples

### [Default](samples/eui-date-block/Default)

```html
<div class="doc-sample-section-title">Default - euiPrimary - Upcoming and on-going</div>

<eui-date-block [blockDate]="currentDate"></eui-date-block>


<div class="doc-sample-section-title">euiSecondary - Past and canceled</div>

<eui-date-block [blockDate]="pastDate" euiSecondary></eui-date-block>
```

```typescript
import { Component } from '@angular/core';

import { EUI_DATE_BLOCK } from '@eui/components/eui-date-block';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DATE_BLOCK,
    ]
})
export class DefaultComponent {
    currentDate = new Date();
    pastDate = new Date(2025, 1, 1);
}
```

## Accessibility

TODO
