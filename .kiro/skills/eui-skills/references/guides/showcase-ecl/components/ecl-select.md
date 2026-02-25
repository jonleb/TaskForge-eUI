# ecl-select

## Overview

<more-info componentPartUrl="forms/select/usage/"></more-info>

## API

API content

## Samples

### [Default](samples/ecl-select/Default)

```html
<div eclFormGroup>
    <label for="select-1" id="select-label-1" eclFormLabel isOptional>Select a country</label>
    <div eclHelpBlock id="select-helper-1">This is the helper text.</div>
    <select id="select-1" eclSelect name="country" aria-describedby="select-helper-1">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
</div>

<h6 class="section-title">Option groups</h6>
<div eclFormGroup>
    <label for="select-2" id="select-label-2" eclFormLabel isOptional>Select a country</label>
    <div eclHelpBlock id="select-helper-2">This is the helper text.</div>
    <select id="select-2" eclSelect name="country" aria-describedby="select-helper-2">
      <optgroup label="European countries">
        <option value="1">Belgium</option>
        <option value="2">France</option>
        <option value="3" disabled="">Luxembourg</option>
        <option value="4">Germany</option>
        <option value="5" selected="">Bulgaria</option>
        <option value="6">Italy</option>
        <option value="7">Romania</option>
        <option value="8">Greece</option>
        <option value="9">Hungary</option>
        <option value="10">Portugal</option>
      </optgroup>
      <optgroup label="Non European countries">
        <option value="11">China</option>
      </optgroup>
      <option value="12">standalone option</option>
    </select>
</div>

<h6 class="section-title">Preselection</h6>
<div eclFormGroup>
    <label for="select-3" id="select-label-3" eclFormLabel isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-3">This is the helper text.</div>
    <select eclSelect id="select-3" name="country" aria-describedby="select-helper-3">
        <option value="1">Belgium</option>
        <option value="2">France</option>
        <option value="3" selected>Luxembourg</option>
    </select>
</div>


<h6 class="section-title">Item Disabled</h6>
<div eclFormGroup>
    <label for="select-4" id="select-label-4" eclFormLabel isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-4">One select item is disabled</div>
    <select eclSelect toggleLabel="Custom toggle label" id="select-4" name="country" aria-describedby="select-helper-4">
        <option value="1">Belgium</option>
        <option value="2" disabled>France</option>
        <option value="3">Luxembourg</option>
    </select>
</div>


<h6 class="section-title">Disabled</h6>
<div eclFormGroup>
    <label for="select-5" id="select-label-5" eclFormLabel isDisabled>Label</label>
    <div eclHelpBlock id="select-helper-5">This field is disabled</div>
    <select id="select-5" eclSelect disabled aria-describedby="select-helper-5">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
</div>


<h6 class="section-title">Invalid</h6>
<div eclFormGroup>
    <label for="select-6" id="select-label-6" eclFormLabel isInvalid isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-6">This field is invalid</div>
    <select id="select-6" eclSelect isInvalid name="country" required aria-describedby="select-helper-6">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
    <div eclFeedbackMessage>
        <ecl-icon icon="error" size="s" ariaHidden="false" role="img">
            <title>Error</title>
        </ecl-icon>
        This is the error message
    </div>
</div>


<h6 class="section-title">Small</h6>
<div eclFormGroup>
    <label for="select-7" id="select-label-7" eclFormLabel isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-7">This is the helper text.</div>
    <select id="select-7" eclSelect eclSize="s" name="country" aria-describedby="select-helper-7">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
</div>

<h6 class="section-title">Medium</h6>
<div eclFormGroup>
    <label for="select-8" id="select-label-8" eclFormLabel isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-8">This is the helper text.</div>
    <select id="select-8" eclSelect eclSize="m" name="country" aria-describedby="select-helper-8">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
</div>

<h6 class="section-title">Large</h6>
<div eclFormGroup>
    <label for="select-9" id="select-label-9" eclFormLabel isRequired>Select a country</label>
    <div eclHelpBlock id="select-helper-9">This is the helper text.</div>
    <select id="select-9" eclSelect eclSize="l" name="country" aria-describedby="select-helper-9">
      <option value="1">Belgium</option>
      <option value="2">France</option>
      <option value="3">Luxembourg</option>
    </select>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_SELECT],
})
export class DefaultComponent {}
```

### Other examples

- [Reactive Forms](samples/ecl-select/reactive-forms)
