# eUI Forms

## Setup

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_DATEPICKER, DEFAULT_FORMATS } from '@eui/components/eui-datepicker';
import { EUI_AUTOCOMPLETE } from '@eui/components/eui-autocomplete';
import { EUI_FILE_UPLOAD } from '@eui/components/eui-file-upload';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-helper-text';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_SPLIT_BUTTON } from '@eui/components/eui-split-button';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  imports: [ReactiveFormsModule, ...EUI_INPUT_TEXT, ...EUI_BUTTON, /* ...spread others */],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS }],
})
```

## Form Components

| Component | Selector | Key Inputs |
|-----------|----------|------------|
| Text | `input[euiInputText]` | `isInvalid`, `readonly`, `disabled` |
| Number | `input[euiInputNumber]` | `min`, `max`, `fractionDigits`, `leadingZero` |
| Checkbox | `input[euiInputCheckBox]` | `checked`, `indeterminate`, `isInvalid` |
| Radio | `input[euiInputRadio]` | `value`, `checked`, `isInvalid` |
| Select | `select[euiSelect]` | `placeholder`, `readonly`, `isInvalid` |
| Textarea | `textarea[euiTextArea]` | `autoResize`, `minRows`, `maxRows` |
| Datepicker | `<eui-datepicker>` | `type`, `minDate`, `maxDate`, `isDatetimepicker`, `isClearable` |
| Date Range | `<eui-date-range-selector>` | `minDate`, `maxDate`, `isDatetimepicker` |
| Date Block | `<eui-date-block>` | `blockDate`, `dateFormat` (display only) |
| Autocomplete | `<eui-autocomplete>` | `autocompleteData`, `hasChips`, `matching`, `groupBy` |
| File Upload | `<eui-file-upload>` | `accept`, `maxFiles`, `isMultiple`, `hasDragArea` |
| Input Button | `<eui-input-button>` | `euiButtonPositionStart`, `euiButtonPositionEnd` |
| Slider | `<eui-slider>` | `minValue`, `maxValue`, `step`, `hasRange`, `hasTicks` |
| Slide Toggle | `<eui-slide-toggle>` | `checked`, `disabled`, `labelPosition` |
| Toggle Group | `<eui-toggle-group>` | `isMultiple` (button group selection) |
| Timepicker | `<eui-timepicker>` | `stepHours`, `stepMinutes`, `hasSeconds` |
| Rating | `<eui-rating>` | `maxRating`, `readonly`, `value` |
| Language Selector | `<eui-language-selector>` | `languages`, `selectedLanguage` |

## Input Enhancements

| Feature | Usage |
|---------|-------|
| Clearable | `[euiClearable]="true"` - X button to clear |
| Loading | `[euiLoading]="true"` - spinner in input |
| Icon | `[euiIcon]="{icon: 'search:eui', clickable: true}"` + `(iconClick)` |
| Char counter | `[euiMaxlength]="100"` - shows remaining chars |
| State variants | `euiDanger`, `euiSuccess`, `euiWarning`, `euiInfo` |

## Input Group (Add-ons)

```html
<div euiInputGroup>
  <eui-input-group-addon><eui-input-group-addon-item>€</eui-input-group-addon-item></eui-input-group-addon>
  <input euiInputText formControlName="price">
  <eui-input-group-addon><button euiButton euiPrimary>Go</button></eui-input-group-addon>
</div>
```

Supports: prefix/suffix text, icons, buttons. Size: `euiSizeS`.

## Buttons

```html
<button euiButton euiPrimary>Primary</button>
<button euiButton euiSecondary euiOutline>Outline</button>
<button euiButton euiDanger euiSizeS>Small Danger</button>
```

Variants: `euiPrimary`, `euiSecondary`, `euiSuccess`, `euiInfo`, `euiWarning`, `euiDanger`, `euiInverse`
Sizes: `euiSizeXS`, `euiSizeS`, `euiSizeM`, `euiSizeL`
Modifiers: `euiOutline`, `euiRounded`, `euiBlockButton`, `euiIconButton`, `euiBasicButton`, `euiCTAButton`

## Split Button & Dropdown

```html
<eui-split-button>
  <button euiButton euiPrimary>Save</button>
  <eui-dropdown>
    <button euiButton euiPrimary euiIconButton><eui-icon-svg icon="caret-down:eui"></eui-icon-svg></button>
    <eui-dropdown-content>
      <eui-dropdown-item>Save as draft</eui-dropdown-item>
    </eui-dropdown-content>
  </eui-dropdown>
</eui-split-button>
```

## Fieldset

```html
<eui-fieldset label="Personal Info" [isExpandable]="true" [isExpanded]="true">
  <!-- form fields -->
</eui-fieldset>
```

## Validation Pattern

```typescript
form = this.fb.group({
  name: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.email]],
  age: [null, [Validators.min(18)]],
});

hasError(field: string, error: string): boolean {
  const ctrl = this.form.get(field);
  return ctrl?.touched && ctrl?.hasError(error);
}
```

```html
<div euiInputGroup>
  <label euiLabel euiRequired>Email</label>
  <input euiInputText formControlName="email">
  @if (hasError('email', 'required')) {
    <eui-helper-text class="eui-u-c-danger">Required</eui-helper-text>
  }
</div>
```

## File Upload Validators

```typescript
import { maxFilesValidator, maxSizeValidator, maxFileSizeValidator, mimeTypeExtensionValidator } from '@eui/components/eui-file-upload';

files: new FormControl(null, [maxFilesValidator(3), maxSizeValidator(5000000)])
```

## Autocomplete Validator

```typescript
import { euiAutocompleteForceSelectionFromData } from '@eui/components/eui-autocomplete';
```

## Datepicker Validator

```typescript
import { dateInputValidator } from '@eui/components/eui-datepicker';
```

## Checkbox Group Validation

```typescript
import { FormGroup, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const requireCheckboxes = (min = 1): ValidatorFn => 
  (group: FormGroup): ValidationErrors | null => {
    const checked = Object.values(group.controls).filter(c => c.value).length;
    return checked >= min ? null : { requireCheckboxes: true };
  };

languages: new FormGroup({
  en: new FormControl(false),
  fr: new FormControl(false),
}, requireCheckboxes(1))
```

## Layout & UX

### Grid Layout

```html
<form [formGroup]="form" class="eui-t-form-compact">
  <div class="row">
    <div class="col-md-6"><input euiInputText formControlName="firstName"></div>
    <div class="col-md-6"><input euiInputText formControlName="lastName"></div>
  </div>
</form>
```

- Group related fields on same row (first/last name, city/country)
- Use `col-md-*` for responsive breakpoints
- Add `eui-t-form-compact` for tighter spacing

### Field Sizing

| Content | Column Width |
|---------|--------------|
| Short text (name, code) | `col-md-3` to `col-md-4` |
| Medium text (email, city) | `col-md-6` |
| Long text (address, description) | `col-md-8` to `col-12` |
| Dates, numbers | `col-md-3` to `col-md-4` |

### Fieldsets

```html
<eui-fieldset label="Personal Info" iconSvgName="user:regular" [isExpandable]="true" [isExpanded]="true">
  <!-- fields -->
</eui-fieldset>

<eui-fieldset label="Advanced Settings" iconSvgName="gear:regular" [isExpandable]="true" [isExpanded]="false">
  <!-- optional fields collapsed by default -->
</eui-fieldset>
```

- Group related fields into fieldsets
- Add icons for visual scanning (`iconSvgName`)
- Make expandable for long forms
- Collapse optional/advanced sections by default (`[isExpanded]="false"`)

### Action Buttons

```html
<div class="eui-u-mt-l eui-u-d-flex eui-u-flex-gap-m">
  <button euiButton euiPrimary type="submit">
    <eui-icon-svg icon="floppy-disk:regular" size="s" class="eui-u-mr-xs"></eui-icon-svg>
    Save
  </button>
  <button euiButton euiSecondary type="button" (click)="form.reset()">Reset</button>
  <button euiButton type="button" routerLink="..">Cancel</button>
</div>
```

- Primary action first, then secondary, then tertiary
- Add icons to primary actions for clarity
- Always use `type="button"` on non-submit buttons
- Use `routerLink` for cancel navigation

### Validation UX

```html
<label euiLabel euiRequired for="email">Email</label>
<input euiInputText formControlName="email" id="email" />
@if (hasError('email', 'required')) {
  <eui-feedback-message euiDanger>Email is required</eui-feedback-message>
}
```

- Mark required fields with `euiRequired`
- Show errors only after touch (`ctrl.touched`)
- Use specific error messages per validation type

## Read-only Mode

```html
<input euiInputText [readonly]="!isEditMode">
<select euiSelect [readonly]="!isEditMode">
<eui-datepicker [isReadOnly]="!isEditMode">
```
