# ecl-multiselect

## Overview

The multi-select displays a list of selectable items from which
the user can select one or more values.
<br>
<more-info componentPartUrl="forms/select/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div eclFormGroup>
    <label id="label-multi-default" eclFormLabel isOptional>Select countries</label>
    <div id="helper-multi-default" eclHelpBlock>This is help block</div>
    <select eclMultiselect eclPlaceholder="Custom placeholder" id="my_id"
        ariaLabeledby="label-multi-default" ariaDescribedby="helper-multi-default">
        @for (country of countries; track country.id) {
        <option eclMultiselectOption [value]="country.id" [label]="country.name"></option>
        }
    </select>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_MULTISELECT } from '@eui/ecl/components/ecl-multiselect';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_MULTISELECT],
})
export class DefaultComponent {

    countries = [
        { name: 'Bulgaria', id: 'bg', active: true },
        { name: 'Luxembourg', id: 'lu', active: true },
        { name: 'France', id: 'fr', active: true },
        { name: 'Malta', id: 'mt', active: true },
        { name: 'Spain', id: 'es', active: true },
    ];
}
```
