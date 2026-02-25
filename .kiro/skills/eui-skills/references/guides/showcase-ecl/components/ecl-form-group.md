# ecl-form-group

## Overview

This components is used as a wrapper container for several components (for example: input, helpText and label),
to provide proper margins, spacing and alignment of the grouped elements.

## API

API content

## Samples

### [Default](samples/ecl-form-group/Default)

```html
<div eclFormGroup aria-describedby="help-default">
    <label for="example-input-default" eclFormLabel isOptional>Label</label>
    <div eclHelpBlock id="help-default">This is the input help text</div>
    <input id="example-input-default" eclTextInput value="Input value"/>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_TEXT_INPUT],
})
export class DefaultComponent {}
```

### Other examples

- [Disabled](samples/ecl-form-group/disabled)
- [Required](samples/ecl-form-group/required)
- [Invalid](samples/ecl-form-group/invalid)
- [Reactive Forms](samples/ecl-form-group/reactive-forms)
