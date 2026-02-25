# ecl-label

## Overview

Labels are used to indicate the different states for items in a list. They bring supplementary meaning by adding an indicative state (label) that is visually distinct (background colour) from other elements.
<br>
<more-info componentPartUrl="label/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">Low Importance</h6>
<div>
    <span eclLabel variant="low">Form label</span>
</div>

<h6 class="section-title">Medium Importance</h6>
<div>
    <span eclLabel variant="medium">Form label</span>
</div>

<h6 class="section-title">High Importance</h6>
<div>
    <span eclLabel variant="high">Form label</span>
</div>

<h6 class="section-title">Highlight</h6>
<div>
    <span eclLabel variant="highlight">Form label</span>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_LABEL],
})
export class DefaultComponent {}
```
