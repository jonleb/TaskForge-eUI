---
description: Shows comprehensive reactive form validation within eui-card, with dynamic switching between vertical/horizontal layouts, compact/normal display, and edit/readonly modes, including validation feedback messages.
id: reactive-form-validation
---

```html
<p class="eui-u-text-paragraph">The following <code class="eui-u-text-code">eui-card</code> contains a reactive form with interactive layout display features allowing to switch from:
<strong>vertical to horizontal</strong> layouts,
<strong>compact to normal</strong> layout display,
<strong>edit to readonly</strong> display modes.</p>

<br>

  <eui-card>
    <eui-card-header>
      <eui-card-header-title>Reactive form validation sample</eui-card-header-title>
      <eui-card-header-right-content>
        <button euiButton euiPrimary euiOutline euiSizeS (click)="onToggleVerticalLayout()" euiTooltip="Toggle from vertical to horizontal layout display" class="eui-u-ml-m">
          @if (!isVerticalLayout) {
            <span>Vertical layout</span>
          }
          @if (isVerticalLayout) {
            <span>Horizontal layout</span>
          }
        </button>
        <button euiButton euiPrimary euiOutline euiSizeS (click)="onToggleCompact()" euiTooltip="Toggle from compact to normal layout display" class="eui-u-ml-m">
          @if (!isCompact) {
            <span>Compact display</span>
          }
          @if (isCompact) {
            <span>Normal display</span>
          }
        </button>
        <button euiButton euiPrimary euiOutline euiSizeS (click)="onToggleEdit()" euiTooltip="Toggle from edit to readonly mode display" class="eui-u-ml-m">
          @if (!isEditActive) {
            <span>Edit mode</span>
          }
          @if (isEditActive) {
            <span>Readonly mode</span>
          }
        </button>
      </eui-card-header-right-content>
    </eui-card-header>

    <eui-card-content>
      <div class="row">
        <form [formGroup]="formValidation" [class.eui-t-form-compact]="isCompact" class="col-md-8">
          <!-- INJECT A COPONENT HERE -->
          <!-- VERTICAL LAYOUT -->
          @if (isVerticalLayout) {
            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Input text</label>
              <eui-helper-text>Any extra helper text should be displayed here, after the label</eui-helper-text>
              <div euiInputGroupAddOn>
                @if (isEditActive) {
                  <div euiInputGroupAddOnItem>
                    <eui-icon-svg icon="eui-user" size="s" />
                  </div>
                }
                <input euiInputText formControlName="inputValue" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text"/>
              </div>
              @if (render('inputValue')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">
                Email <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="Enter your email address" />
              </label>
              <div euiInputGroupAddOn>
                @if (isEditActive) {
                  <div euiInputGroupAddOnItem>
                    <eui-icon-svg icon="eui-email" size="s" />
                  </div>
                }
                <input euiInputText formControlName="mailBoxValue" placeholder="Enter a valid email address" [readonly]="!isEditActive" aria-label="Email address"/>
              </div>
              @if (render('mailBoxValue')) {
                <eui-feedback-message euiDanger>The email address is required</eui-feedback-message>
              }
              @if (checkEmail('mailBoxValue')) {
                <eui-feedback-message euiDanger>Not a valid email address</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Input text with button addon</label>
              <div euiInputGroupAddOn>
                <input euiInputText formControlName="inputValue2" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text with button addon"/>
                @if (isEditActive) {
                  <button euiButton euiPrimary euiOutline [euiDisabled]="isFormDisabled">Search</button>
                }
              </div>
              @if (render('inputValue2')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Input text with icon button</label>
              <div euiInputGroupAddOn>
                <input euiInputText formControlName="inputValue3" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text with icon button"/>
                @if (isEditActive) {
                  <button euiButton euiPrimary euiOutline euiIconButton [euiDisabled]="isFormDisabled" aria-label="Search">
                    <eui-icon-svg icon="eui-search" />
                  </button>
                }
              </div>
              @if (render('inputValue2')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Number</label>
              <input euiInputNumber formControlName="numberValue" placeholder="Type some numbers" [readonly]="!isEditActive" aria-label="Number"/>
              @if (render('numberValue')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Textarea</label>
              <div euiInputGroupAddOn>
                @if (isEditActive) {
                  <div euiInputGroupAddOnItem>EN</div>
                }
                <textarea euiTextArea formControlName="textareaValue" [euiMaxlength]="100" placeholder="Type some text" [readonly]="!isEditActive"></textarea>
              </div>
              @if (render('textareaValue')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label for="select" euiLabel [euiRequired]="isEditActive">Select</label>
              <select id="select" euiSelect formControlName="selectValue" placeholder="Choose an option..." [readonly]="!isEditActive">
                @for (opt of selectOptions; track $index) {
                  <option [value]="opt.value">{{opt.label}}</option>
                }
              </select>
              @if (render('selectValue')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Autocomplete</label>
              <eui-autocomplete formControlName="autoComplete"
                [autocompleteData]="autocompleteDataFormAutocomplete"
                [isFreeValueAllowed]="true"
                placeholder="Select a fruit"
                [isReadonly]="!isEditActive" />
              @if (render('autoComplete')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Datepicker</label>
              <eui-datepicker isClearable formControlName="datepicker" [isReadOnly]="!isEditActive" />
              @if (render('datepicker')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Date range selector</label>
              <eui-date-range-selector formControlName="daterangeselector" [isReadOnly]="!isEditActive" />
              @if (isEditActive && render('daterangeselector')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel euiRequired>Single mandatory checkbox</label>
              <div class="eui-u-inline-flex">
                <input id="agree" euiInputCheckBox formControlName="mySingleCheckbox" [readonly]="!isEditActive"/>
                <label euiLabel for="agree">I agree</label>
              </div>
              @if (isEditActive && render('mySingleCheckbox')) {
                <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
              }
            </div>

            <div euiInputGroup formGroupName="myCheckboxGroup">
              <label euiLabel [euiRequired]="isEditActive">Choose preferred language(s)</label>
              @for (checkbox of checkboxOptions; let i = $index; track $index) {
                <div class="eui-u-flex eui-u-mb-s">
                  <input euiInputCheckBox id="reactive-vertical-checkid-{{i}}" name="checkbox-vertical" formControlName="{{checkbox.controlName}}" [readonly]="!isEditActive"/>
                  <label euiLabel for="reactive-vertical-checkid-{{i}}">{{checkbox.label}}</label>
                </div>
              }
              @if (isEditActive && myCheckboxGroup?.errors?.requireCheckboxesToBeChecked && myCheckboxGroup.touched) {
                <eui-feedback-message euiDanger>At least one checkbox is required to be checked</eui-feedback-message>
              }
            </div>

            <div euiInputGroup>
              <label euiLabel [euiRequired]="isEditActive">Radio options</label>
              @for (radio of radioOptions; let i = $index; track $index) {
                <div class="eui-u-flex" [class.eui-u-mb-s]="isEditActive">
                  <input id="reactive-vertical-radio{{i}}" euiInputRadio name="radioForm-vertical" formControlName="radioValue" [value]="radio" [readonly]="!isEditActive" />
                  <label euiLabel for="reactive-vertical-radio{{i}}">{{radio.label}}</label>
                </div>
              }
              @if (render('radioValue')) {
                <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
              }
            </div>
          }



          <!-- HORIZONTAL LAYOUT -->
          @if (!isVerticalLayout) {
            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Input text</label>
                <eui-helper-text>Any extra helper text should be displayed here, after the label</eui-helper-text>
              </div>
              <div class="col-md-9">
                <div euiInputGroupAddOn>
                  @if (isEditActive) {
                    <div euiInputGroupAddOnItem>
                      <eui-icon-svg icon="eui-user" size="s" />
                    </div>
                  }
                  <input euiInputText formControlName="inputValue" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text" />
                </div>
                @if (render('inputValue')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">
                  Email <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="Enter your email address" />
                </label>
              </div>
              <div class="col-md-9">
                <div euiInputGroupAddOn>
                  @if (isEditActive) {
                    <div euiInputGroupAddOnItem>
                      <eui-icon-svg icon="eui-email" />
                    </div>
                  }
                  <input euiInputText formControlName="mailBoxValue" placeholder="Enter email address" [readonly]="!isEditActive" aria-label="Email address"/>
                </div>
                @if (render('mailBoxValue')) {
                  <eui-feedback-message euiDanger>The email address is required</eui-feedback-message>
                }
                @if (checkEmail('mailBoxValue')) {
                  <eui-feedback-message euiDanger>Not a valid email address</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Input text with button addon</label>
              </div>
              <div class="col-md-9">
                <div euiInputGroupAddOn>
                  <input euiInputText formControlName="inputValue2" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text with button addon"/>
                  @if (isEditActive) {
                    <button euiButton euiSecondary euiOutline [euiDisabled]="isFormDisabled">Search</button>
                  }
                </div>
                @if (render('inputValue2')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Input text with icon button</label>
              </div>
              <div class="col-md-9">
                <div euiInputGroupAddOn>
                  <input euiInputText formControlName="inputValue3" placeholder="Type some text" [readonly]="!isEditActive" aria-label="Input text with icon button"/>
                  @if (isEditActive) {
                    <button euiButton euiSecondary euiOutline euiIconButton [euiDisabled]="isFormDisabled" aria-label="Search">
                      <eui-icon-svg icon="eui-search" />
                    </button>
                  }
                </div>
                @if (render('inputValue2')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Number</label>
              </div>
              <div class="col-md-9">
                <input euiInputNumber formControlName="numberValue" placeholder="Type some numbers" [readonly]="!isEditActive" aria-label="Number"/>
                @if (render('numberValue')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Textarea</label>
              </div>
              <div class="col-md-9">
                <div euiInputGroupAddOn>
                  @if (isEditActive) {
                    <div euiInputGroupAddOnItem>EN</div>
                  }
                  <textarea euiTextArea formControlName="textareaValue" placeholder="Type some text" [euiMaxlength]="100" [readonly]="!isEditActive"></textarea>
                </div>
                @if (render('textareaValue')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label for="select2" euiLabel [euiRequired]="isEditActive">Select</label>
              </div>
              <div class="col-md-9">
                <select id="select2" euiSelect formControlName="selectValue" [readonly]="!isEditActive">
                  @for (opt of selectOptions; track $index) {
                    <option [value]="opt.value">{{opt.label}}</option>
                  }
                </select>
                @if (render('selectValue')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Autocomplete</label>
              </div>
              <div class="col-md-9">
                <eui-autocomplete formControlName="autoComplete"
                  [autocompleteData]="autocompleteDataFormAutocomplete"
                  [isFreeValueAllowed]="true"
                  placeholder="Select a fruit"
                  [isReadonly]="!isEditActive" />
                @if (render('autoComplete')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Datepicker</label>
              </div>
              <div class="col-md-9">
                <eui-datepicker isClearable formControlName="datepicker" [isReadOnly]="!isEditActive" />
                @if (render('datepicker')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Date range selector</label>
              </div>
              <div class="col-md-9">
                <eui-date-range-selector formControlName="daterangeselector" [isReadOnly]="!isEditActive" />
                @if (isEditActive && render('daterangeselector')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Single mandatory checkbox</label>
              </div>
              <div class="col-md-9">
                <div class="eui-u-flex">
                  <input id="agree1" euiInputCheckBox formControlName="mySingleCheckbox" [readonly]="!isEditActive"/>
                  <label euiLabel for="agree1">I agree</label>
                </div>
                @if (isEditActive && render('mySingleCheckbox')) {
                  <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row" formGroupName="myCheckboxGroup">
              <div class="col-md-3">
                <label euiLabel [euiRequired]="isEditActive">Choose preferred language(s)</label>
              </div>
              <div class="col-md-9">
                <div class="eui-u-flex eui-u-flex-wrap">
                  @for (checkbox of checkboxOptions; let i = $index; track $index) {
                    <div class="eui-u-inline-flex eui-u-mb-s">
                      <input euiInputCheckBox name="checkbox" id="reactive-horizontal-checkid-{{i}}" formControlName="{{checkbox.controlName}}" [readonly]="!isEditActive"/>
                      <label euiLabel for="reactive-horizontal-checkid-{{i}}">{{checkbox.label}}</label>
                    </div>
                  }
                </div>
                @if (isEditActive && myCheckboxGroup?.errors?.requireCheckboxesToBeChecked && myCheckboxGroup.touched) {
                  <eui-feedback-message euiDanger>At least one checkbox is required to be checked</eui-feedback-message>
                }
              </div>
            </div>

            <div euiInputGroup class="row">
              <div class="col-md-3 eui-u-mb-s">
                <label euiLabel [euiRequired]="isEditActive">Radio options</label>
              </div>
              <div class="col-md-9">
                <div class="eui-u-flex eui-u-flex-wrap">
                  @for (radio of radioOptions; track radio; let i = $index) {
                    <div class="eui-u-inline-flex eui-u-mb-s">
                      <input euiInputRadio id="reactive-horizontal-radio-{{i}}" name="radioForm" formControlName="radioValue" [readonly]="!isEditActive" />
                      <label euiLabel for="reactive-horizontal-radio-{{i}}">{{radio.label}}</label>
                    </div>
                  }
                </div>
                @if (render('radioValue')) {
                  <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
              </div>
            </div>
          }
        </form>

        <div class="col-md-4">
          <div class="eui-u-f-bold">Reactive Form content</div>
          <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
              <pre class="eui-u-text-pre" tabindex="0">{{ formValidation.value | json }}</pre>
            </div>
          </div>

          <div class="eui-u-f-bold eui-u-mt-l eui-u-mb-m">Form status</div>
          <eui-badge [euiSuccess]="formValidation.status === 'VALID'" [euiDanger]="formValidation.status !== 'VALID'">
            {{ formValidation.status }}
          </eui-badge>
        </div>
      </div>
    </eui-card-content>

    <eui-card-footer>
      <eui-card-footer-action-buttons>
        <div class="eui-u-flex eui-u-flex-justify-content-start">
          <button euiButton euiSecondary (click)="onResetForm()">Reset</button>
        </div>
        <div class="eui-u-flex eui-u-flex-justify-content-end">
          <button euiButton euiSecondary (click)="onDisableForm()">{{isFormDisabled ? 'Enable' : 'Disable'}}</button>
          <button euiButton euiPrimary (click)="onSubmitForm()" [euiDisabled]="isFormDisabled">Submit</button>
        </div>
      </eui-card-footer-action-buttons>
    </eui-card-footer>
  </eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    Validators,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from '@eui/components/eui-datepicker';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective, EuiTooltipDirective } from '@eui/components/directives';
import { EUI_DATE_RANGE_SELECTOR } from '@eui/components/eui-date-range-selector';
import { EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EUI_HELPER_TEXT } from '@eui/components/eui-helper-text';

/**
 * A Group Control Validator that checks if a threshold of checked control checkboxes is reached and
 * returns an error otherwise clear existing control errors.
 *
 * @param minRequired
 */
export const requireCheckboxesToBeCheckedValidator = (minRequired = 1): ValidatorFn => (formGroup: FormGroup): ValidationErrors | null => {
    // indicate how many checkboxes are checked
    let checked = 0;
    // find how many checkboxes are checked
    Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
            checked++;
        }
    });
    // if number of checked checkboxes is less than required, return error
    if (checked < minRequired) {
        // invalid all children
        Object.keys(formGroup.controls).forEach(key => {
            formGroup.controls[key].setErrors({ incorrect: true }, { emitEvent: true });
        });
        return { requireCheckboxesToBeChecked: true };
    } else {
        Object.keys(formGroup.controls).forEach(key => {
            // Clear the errors
            formGroup.controls[key].setErrors(null, { emitEvent: true });
        });
    }
    return null;
};


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-form-validation',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_CARD,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_ICON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_RADIO,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_DATEPICKER,
        ...EUI_INPUT_NUMBER,
        ...EUI_AUTOCOMPLETE,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_HELPER_TEXT,
        EuiMaxLengthDirective,
        EuiTooltipDirective,
        JsonPipe,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormValidationComponent implements OnInit {
    public isEditActive = true;
    public isCompact = false;
    public isVerticalLayout = true;
    public isFormDisabled = false;
    public value = '';

    public formValidation: FormGroup;
    public selectOptions: any[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    public radioOptions: any[] = [
        { value: '1', label: 'Choice 1' },
        { value: '2', label: 'Choice 2' },
        { value: '3', label: 'Choice 3' },
        { value: '4', label: 'Choice 4' },
    ];

    public myCheckboxGroup: FormGroup;
    public checkboxOptions: Array<any> = [
        { id: 1, value: 'en', label: 'English', controlName: 'myCheckbox1', controlValue: false },
        { id: 2, value: 'fr', label: 'french', controlName: 'myCheckbox2', controlValue: false },
        { id: 3, value: 'de', label: 'deutsch', controlName: 'myCheckbox3', controlValue: false },
        { id: 4, value: 'es', label: 'spanish', controlName: 'myCheckbox4', controlValue: false },
        { id: 5, value: 'el', label: 'greek', controlName: 'myCheckbox5', controlValue: false },
    ];

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon', typeClass: 'primary', isOutline: true },
        { id: 2, label: 'Lime', typeClass: 'secondary', isRounded: true },
        { id: 3, label: 'Apple', typeClass: 'info', sizeClass: 'euiSizeS' },
        { id: 4, label: 'Orange', typeClass: 'success', isRemovable: false },
        { id: 5, label: 'Strawberry', typeClass: 'warning' },
        { id: 6, label: 'Peer', typeClass: 'danger', isRemovable: false },
    ];
    private fb: FormBuilder = inject(FormBuilder);
    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            inputValue: [{ value: null, disabled: false }, [Validators.required]],
            inputValue2: [{ value: null, disabled: false }, [Validators.required]],
            inputValue3: [{ value: null, disabled: false }, [Validators.required]],
            numberValue: [{ value: null, disabled: false }, [Validators.required]],
            textareaValue: [{ value: null, disabled: false }, [Validators.required]],
            selectValue: [{ value: null, disabled: false }, [Validators.required]],
            autoComplete: [{ value: null, disabled: false }, [Validators.required]],
            datepicker: [{ value: null, disabled: false }, [Validators.required]],
            daterangeselector: [{
                    value: null,
                    disabled: false },
                    [Validators.required]],
            mySingleCheckbox: [{ value: false, disabled: false }, [Validators.requiredTrue]],
            myCheckboxGroup: this.myCheckboxGroup = new FormGroup({
                myCheckbox1: new FormControl({ value: false, disabled: false }),
                myCheckbox2: new FormControl({ value: false, disabled: false }),
                myCheckbox3: new FormControl({ value: false, disabled: false }),
                myCheckbox4: new FormControl({ value: false, disabled: false }),
                myCheckbox5: new FormControl({ value: false, disabled: false }),
            }, requireCheckboxesToBeCheckedValidator() ),
            radioValue: new FormControl({ value: null, disabled: false }, [Validators.required]),
            mailBoxValue: new FormControl({ value: null, disabled: false }, Validators.compose( [Validators.email, Validators.required])),
        });
    }

    public onSubmitForm() {
        // markFormGroupTouched(this.formValidation.controls);
        this.formValidation.markAllAsTouched();
        if (this.formValidation.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onResetForm() {
        this.formValidation.reset();
    }

    public onToggleEdit() {
        this.isEditActive = !this.isEditActive;
    }

    public onToggleCompact() {
        this.isCompact = !this.isCompact;
    }

    public onToggleVerticalLayout() {
        this.isVerticalLayout = !this.isVerticalLayout;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public checkEmail(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('email');
    }

    public onDisableForm() {
        this.isFormDisabled = !this.isFormDisabled;
        this.isFormDisabled ? this.formValidation.disable() : this.formValidation.enable();
    }
}
```

