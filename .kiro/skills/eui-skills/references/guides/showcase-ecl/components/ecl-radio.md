# ecl-radio

## Overview

<more-info componentPartUrl="forms/radio/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-radio/Default)

```html
<fieldset eclFormGroup aria-describedby="radio-default-helper" role="radiogroup" aria-required="true">
    <legend eclFormLabel isRequired>Select your country</legend>
    <div eclHelpBlock id="radio-default-helper">This is the group's helper text</div>

    <div eclRadio>
        <input eclRadioInput type="radio" id="radio-default1" name="radio-default" value="lu" required>
        <label for="radio-default1" eclRadioLabel>Luxembourg</label>
    </div>

    <div eclRadio>
        <input eclRadioInput type="radio" id="radio-default2" name="radio-default" value="be" required>
        <label for="radio-default2" eclRadioLabel>Belgium</label>
    </div>

    <div eclRadio isDisabled>
        <input eclRadioInput type="radio" disabled id="radio-default3" name="radio-default" value="pl" required>
        <label for="radio-default3" eclRadioLabel>Poland</label>
    </div>
</fieldset>

<h6 class="section-title">Invalid radio group</h6>
<fieldset eclFormGroup aria-describedby="radio-invalid-helper radio-invalid-feedback" role="radiogroup" aria-required="true">
    <legend eclFormLabel isRequired>Select your country</legend>
    <div eclHelpBlock id="radio-invalid-helper">This is the group's helper text</div>

    <div eclRadio isInvalid>
        <input eclRadioInput type="radio" id="radio-invalid1" name="radio-invalid" value="lu" required>
        <label for="radio-invalid1" eclRadioLabel>Luxembourg</label>
    </div>
    <div eclRadio isInvalid>
        <input eclRadioInput type="radio" id="radio-invalid2" name="radio-invalid" value="be">
        <label for="radio-invalid2" eclRadioLabel>Belgium</label>
    </div>
    <div eclRadio isInvalid isDisabled>
        <input eclRadioInput type="radio" disabled id="radio-invalid3" name="radio-invalid" value="pl">
        <label for="radio-invalid3" eclRadioLabel>Poland</label>
    </div>
    <div eclFeedbackMessage id="radio-invalid-feedback">
        <ecl-icon icon="error" size="s" ariaHidden="false" role="img">
            <title>Error</title>
        </ecl-icon>
        This is the error message
    </div>
</fieldset>

<h6 class="section-title">Optional radio group</h6>
<fieldset eclFormGroup aria-describedby="radio-optional-helper" role="radiogroup">
    <legend eclFormLabel isOptional>Select your country</legend>
    <div eclHelpBlock id="radio-optional-helper">This is the group's helper text</div>

    <div eclRadio>
        <input eclRadioInput type="radio" id="radio-optional1" name="radio-optional" value="lu">
        <label for="radio-optional1" eclRadioLabel>Luxembourg</label>
    </div>

    <div eclRadio>
        <input eclRadioInput type="radio" id="radio-optional2" name="radio-optional" value="be">
        <label for="radio-optional2" eclRadioLabel>Belgium</label>
    </div>

    <div eclRadio isDisabled>
        <input eclRadioInput type="radio" disabled id="radio-optional3" name="radio-optional" value="pl">
        <label for="radio-optional3" eclRadioLabel>Poland</label>
    </div>
</fieldset>

<h6 class="section-title">Binary radio group</h6>
<fieldset eclFormGroup aria-describedby="radio-binary-helper" role="radiogroup" aria-required="true">
    <legend eclFormLabel isRequired>Do you need help?</legend>
    <p eclHelpBlock id="radio-binary-helper">Helper text for the group</p>

    <div eclRadio isBinary>
        <input eclRadioInput type="radio" id="radio-binary5" name="radio-binary" value="yes" checked required>
        <label for="radio-binary5" eclRadioLabel>Yes</label>
    </div>

    <div eclRadio isBinary>
        <input eclRadioInput type="radio" id="radio-binary6" name="radio-binary" value="no" required>
        <label for="radio-binary6" eclRadioLabel>No</label>
    </div>
</fieldset>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_RADIO } from '@eui/ecl/components/ecl-radio';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_RADIO],
})
export class DefaultComponent {}
```

### Other examples

- [Binary radio group](samples/ecl-radio/binary)
- [Reactive forms](samples/ecl-radio/reactive-forms)
