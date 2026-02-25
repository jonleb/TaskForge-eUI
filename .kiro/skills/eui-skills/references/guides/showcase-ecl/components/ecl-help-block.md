# ecl-help-block

## Overview

This directive is mainly used within the eclFormGroup component. To provide some additional information for a text field or some other form component.

## API

API content

## Samples

### [Default](samples/ecl-help-block/Default)

```html
<h6 class="section-title">Default</h6>
<div eclHelpBlock>Help block</div>
  
<h6 class="section-title">Disabled</h6>
<div eclHelpBlock isDisabled>Help block</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_HELP_BLOCK],
})
export class DefaultComponent {}
```
