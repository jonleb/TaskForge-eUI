# ecl-date-picker

## Overview

<more-info componentPartUrl="forms/datepicker/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-date-picker/Default)

```html
<div eclFormGroup>
    <div eclFormLabel for="datepicker-1" id="datepicker-label-1" isRequired>Label</div>
    <div eclHelpBlock id="datepicker-helper-1">This is the input's helper text.</div>
    <input
        id="datepicker-1"
        eclTextInput
        eclDatePicker
        aria-describedby="datepicker-helper-1"
        aria-label="Date picker"
        [yearRange]="10"
        format="DD-MM-YYYY"
        eclSize="s"
        placeholder="DD-MM-YYYY"
        (datePicked)="onDatePicked($event)"/>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EclDatePickerDatePickedEvent, EUI_ECL_DATE_PICKER } from '@eui/ecl/components/ecl-date-picker';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_DATE_PICKER, ...EUI_ECL_TEXT_INPUT],
})
export class DefaultComponent {

    onDatePicked(evt: EclDatePickerDatePickedEvent) {
        console.log('picked date', evt);
    }
}
```

### Other examples

- [Reactive Forms](samples/ecl-date-picker/reactive-forms)
