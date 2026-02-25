# ecl-feedback-message

## Overview

This directive is mainly used within the eclFormGroup component. To provide some feedback for some form action.

## API

API content

## Samples

### Default

```html
<div eclFeedbackMessage>
    Feedback message
</div>

<h6 class="section-title">With Icon</h6>
<div eclFeedbackMessage>
    <ecl-icon icon="error" size="s" ariaHidden="false" role="img">
        <title>Error</title>
    </ecl-icon>
    This is the error message
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON],
})
export class DefaultComponent {}
```
