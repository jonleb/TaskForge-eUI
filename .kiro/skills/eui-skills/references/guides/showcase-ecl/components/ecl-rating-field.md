# ecl-rating-field

## Overview

Allows to submit rate between certain amount of stars.
<br>
<more-info componentPartUrl="forms/rating-field/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-rating-field/Default)

```html
<fieldset eclFormGroup aria-describedby="rating-field-helper-default">
    <legend eclFormLabel id="rating-field-label-default" isRequired>Please Rate</legend>
    <div eclHelpBlock id="rating-field-helper-default">This is the group's helper text.</div>

    <ecl-rating-field name="rating" (ratingChange)="onRatingChange($event)"></ecl-rating-field>
</fieldset>

<h6 class="section-title">Preselect rating</h6>
<fieldset eclFormGroup aria-describedby="rating-field-helper-preselect">
    <legend eclFormLabel id="rating-field-label-preselect" isRequired>Please Rate</legend>
    <div eclHelpBlock id="rating-field-helper-preselect">This is the group's helper text.</div>

    <ecl-rating-field name="preselect"
                      rating="4"
                      (ratingChange)="onRatingChange($event)">
    </ecl-rating-field>
</fieldset>

<h6 class="section-title">Adjust stars number</h6>
<fieldset eclFormGroup aria-describedby="rating-field-helper-adjust-stars">
    <legend eclFormLabel id="rating-field-label-adjust-stars" isRequired>Please Rate</legend>
    <div eclHelpBlock id="rating-field-helper-adjust-stars">This is the group's helper text.</div>

    <ecl-rating-field name="stars"
                      numberOfStars="8"
                      (ratingChange)="onRatingChange($event)">
    </ecl-rating-field>
</fieldset>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EclRatingChangeEvent, EUI_ECL_RATING_FIELD } from '@eui/ecl/components/ecl-rating-field';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RATING_FIELD],
})
export class DefaultComponent {
    onRatingChange(evt: EclRatingChangeEvent) {
        console.log('rated', evt.value);
    }
}
```

### Other examples

- [Disabled](samples/ecl-rating-field/disabled)
- [Invalid](samples/ecl-rating-field/invalid)
- [Optional](samples/ecl-rating-field/optional)
- [Reactive forms](samples/ecl-rating-field/reactive-forms)
