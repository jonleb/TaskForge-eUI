# ecl-checkbox

## Overview

<more-info componentPartUrl="forms/checkbox/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-checkbox/Default)

```html
<h6 class="section-title">Default checkbox group</h6>
<fieldset eclFormGroup aria-describedby="checkbox-default-helper">
    <legend eclFormLabel isRequired id="checkbox-default-label">Select your preferred destinations</legend>
    <div eclHelpBlock id="checkbox-default-helper">Helper text for the group</div>
    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-default1" name="checkbox-default" value="lu">
        <label for="checkbox-default1" eclCheckboxLabel>Luxembourg</label>
    </div>
    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-default2" name="checkbox-default" value="be">
        <label for="checkbox-default2" eclCheckboxLabel>Belgium</label>
    </div>
    <div eclCheckbox isDisabled>
        <input eclCheckboxInput type="checkbox" disabled id="checkbox-default3" name="checkbox-default" value="pl">
        <label for="checkbox-default3" eclCheckboxLabel>Poland (disabled)</label>
    </div>
    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-default4" name="checkbox-default" value="lorem">
        <label for="checkbox-default4" eclCheckboxLabel>Lorem ipsum dolor sit amet,<a
                href="/component-library/v3.13.0/example">consectetur adipiscing elit</a>.</label>
    </div>
</fieldset>

<h6 class="section-title">Invalid checkbox group</h6>
<fieldset eclFormGroup aria-describedby="checkbox-default-helper">
    <legend eclFormLabel isRequired id="checkbox-default-label">Select your preferred destinations</legend>
    <div eclHelpBlock id="checkbox-default-helper">Helper text for the group</div>

    <div eclCheckbox isInvalid>
        <input eclCheckboxInput type="checkbox" id="checkbox-invalid1" name="checkbox-invalid" value="lu">
        <label for="checkbox-invalid1" eclCheckboxLabel>Luxembourg</label>
    </div>

    <div eclCheckbox isInvalid>
        <input eclCheckboxInput type="checkbox" id="checkbox-invalid2" name="checkbox-invalid" value="be">
        <label for="checkbox-invalid2" eclCheckboxLabel>Belgium</label>
    </div>

    <div eclCheckbox isInvalid isDisabled>
        <input eclCheckboxInput type="checkbox" disabled id="checkbox-invalid3" name="checkbox-invalid" value="pl">
        <label for="checkbox-invalid3" eclCheckboxLabel>Poland (disabled)</label>
    </div>

    <div eclCheckbox isInvalid>
        <input eclCheckboxInput type="checkbox" id="checkbox-invalid4" name="checkbox-invalid" value="lorem">
        <label for="checkbox-invalid4" eclCheckboxLabel>Lorem ipsum dolor sit amet,<a
                href="/component-library/v3.13.0/example">consectetur adipiscing elit</a>.</label>
    </div>
    <div eclFeedbackMessage>
        <ecl-icon icon="error" size="s" ariaHidden="false" role="img">
            <title>Error</title>
        </ecl-icon>
        Error message for the group.
    </div>
</fieldset>

<h6 class="section-title">Optional checkbox group</h6>
<fieldset eclFormGroup aria-describedby="checkbox-default-helper">
    <legend eclFormLabel isOptional id="checkbox-default-label">Select your preferred destinations</legend>

    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-optional1" name="checkbox-optional1" value="lu">
        <label for="checkbox-optional1" eclCheckboxLabel>Luxembourg</label>
    </div>

    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-optional2" name="checkbox-optional2" value="be">
        <label for="checkbox-optional2" eclCheckboxLabel>Belgium</label>
    </div>

    <div eclCheckbox isDisabled>
        <input eclCheckboxInput type="checkbox" disabled id="checkbox-optional3" name="checkbox-optional3" value="pl">
        <label for="checkbox-optional3" eclCheckboxLabel>Poland (disabled)</label>
    </div>

    <div eclCheckbox>
        <input eclCheckboxInput type="checkbox" id="checkbox-optional4" name="checkbox-optional4" value="lorem">
        <label for="checkbox-optional4" eclCheckboxLabel>Lorem ipsum dolor sit amet,<a
                href="/component-library/v3.13.0/example">consectetur adipiscing elit</a>.</label>
    </div>
</fieldset>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_CHECKBOX } from '@eui/ecl/components/ecl-checkbox';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ICON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_CHECKBOX,
        ...EUI_ECL_FEEDBACK_MESSAGE],
})
export class DefaultComponent {}
```

### Other examples

- [Reactive forms](samples/ecl-checkbox/reactive-forms)
- [Standalone checkbox](samples/ecl-checkbox/standalone)
