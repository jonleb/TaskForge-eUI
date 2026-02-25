# ecl-range

## Overview

Slider input providing visual way of selecting numerical value.
<br>
<more-info componentPartUrl="forms/range/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div eclFormGroup>
    <label for="range1" id="range1-id-label" eclFormLabel isOptional>Range slider</label>
    <div eclHelpBlock id="range1-id-helper">This is the input's helper text.</div>
    <input id="range1" rangeValueId="range1-id-value" eclRange aria-describedby="range1-id-value" type="range" max="10" step="1"
        value="7" (rangeChange)="onRangeChange($event)" />
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EclRangeEvent, EUI_ECL_RANGE } from '@eui/ecl/components/ecl-range';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RANGE],
})
export class DefaultComponent {
    onRangeChange(evt: EclRangeEvent) {
        console.log('ecl range event', evt);
    }
}
```
