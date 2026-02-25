# ecl-text-area

## Overview

A textarea is an input field allowing users to enter multiple lines of text.
<br>
<more-info componentPartUrl="forms/text-area/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div eclFormGroup>
    <label for="text-area-default" id="text-area-label-default" eclFormLabel isOptional>Label</label>
    <div eclHelpBlock id="text-area-helper-default">This is the textarea help text.</div>
    <textarea id="text-area-default" aria-describedby="text-area-helper-default" eclTextArea placeholder="Placeholder text"></textarea>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_TEXT_AREA } from '@eui/ecl/components/ecl-text-area';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_TEXT_AREA],
})
export class DefaultComponent {}
```
