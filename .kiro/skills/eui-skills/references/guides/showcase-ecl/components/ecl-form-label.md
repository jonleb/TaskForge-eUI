# ecl-form-label

## Overview

This component is mainly used within eclFormGroup component. As a label for an input, text-area, select, etc.

## API

API content

## Samples

### [Default](samples/ecl-form-label/Default)

```html
<div>
    <label eclFormLabel>Form label</label>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_LABEL],
})
export class DefaultComponent {}
```

### Other examples

- [Optional](samples/ecl-form-label/optional)
- [Required](samples/ecl-form-label/required)
