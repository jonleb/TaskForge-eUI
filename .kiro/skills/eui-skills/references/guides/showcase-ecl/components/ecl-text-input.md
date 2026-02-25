# ecl-text-input

## Overview

A text field is an input that can be used any place, where data is requested from the user.

## API

API content

## Samples

### [Default](samples/ecl-text-input/Default)

```html
<div eclFormGroup>
    <label eclFormLabel for="input-default" isOptional>Label</label>
    <div eclHelpBlock id="input-default-helper">This is the help text</div>
    <input eclTextInput id="input-default" aria-describedby="input-default-helper" placeholder="Placeholder text" />
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

- [Disabled](samples/ecl-text-input/disabled)
- [Invalid](samples/ecl-text-input/invalid)
- [Sizes](samples/ecl-text-input/sizes)
- [Reactive Forms](samples/ecl-text-input/reactive-forms)
- [Miscellaneous](samples/ecl-text-input/misc)
