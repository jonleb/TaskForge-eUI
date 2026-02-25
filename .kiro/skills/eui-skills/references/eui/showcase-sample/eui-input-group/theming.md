---
description: Shows compact theme usage by applying eui-t-form-compact class to form element, featuring reduced font size and line height for denser form layouts.
id: theming
---

```html
<p class="eui-u-text-paragraph">The following sample contains a reactive form with interactive layout display, featuring the Compact theme.</p>

<br>

<eui-alert>
    <eui-alert-title>Compact mode usage</eui-alert-title>
    <p class="eui-u-text-paragraph">
        To enable the <strong>compact</strong> display mode, use the <code class="eui-u-text-code">eui-t-form-compact</code> style class applied to the <code class="eui-u-text-code">&lt;form&gt;</code> html tag.
        See the code source for example.
    </p>

    <!-- <div class="eui-u-text-h5 eui-u-c-info eui-u-f-bold eui-u-mt-m">Customizing the Compact mode</div>
    <p class="eui-u-text-paragraph">
        The default layout display for Compact mode is using a <strong>14px</strong> font size and a <strong>1.25</strong> line height's ratio.
        You can change those CSS variables with caution by adding the following code in your Application root <strong>styles.scss</strong> stylesheet file:
    </p>
    <br>
    <pre class="eui-u-text-pre" tabindex="0">
form.eui-t-form-compact {{ '{' }}
    // Exposed CSS variables
    --eui-font-size: 14px;                      // Font size base for compact theme
    --eui-line-height-base: 1.25;               // Unitless number value is multiplied by the element's font size
    // Setup
    font-size: var(--eui-font-size);            // Applies the defined custom font size
    line-height: var(--eui-line-height-base);   // Applies the defined custom line height ratio
{{ '}' }}</pre> -->
</eui-alert>


<h2 class="eui-u-text-h5 section-title eui-u-mt-m">Interactive playground</h2>
<div class="row eui-u-mt-m">
    <div class="col-md-3">
        <eui-fieldset label="Layout" [isExpandable]="true" [isExpanded]="true">
            <button euiButton euiButtonBlock euiPrimary euiOutline euiResponsive (click)="onToggleCompact()" euiTooltip="Toggle from compact to normal layout display" position="after" class="eui-u-mb-m">
                <span euiLabel>{{isCompact ? 'To NORMAL mode' : 'To COMPACT mode'}}</span>
            </button>
            <button euiButton euiButtonBlock euiPrimary euiOutline euiResponsive (click)="onToggleVerticalLayout()" euiTooltip="Toggle from vertical to horizontal layout display" position="after" class="eui-u-mb-m">
                <span euiLabel>{{isVerticalLayout ? 'To HORIZONTAL layout' : 'To VERTICAL layout'}}</span>
            </button>
            <button euiButton euiButtonBlock euiPrimary euiOutline euiResponsive (click)="onToggleEdit()" euiTooltip="Toggle from edit to readonly mode display" position="after" class="eui-u-mb-m">
                <span euiLabel>{{isEditActive ? 'To READONLY mode' : 'To EDIT mode'}}</span>
            </button>
        </eui-fieldset>
        <eui-fieldset label="Form" [isExpandable]="true" [isExpanded]="true">
            <div class="eui-u-flex eui-u-mb-m">
                <div class="eui-u-f-bold eui-u-mr-m">Status</div>
                <eui-badge euiSizeS [euiSuccess]="formValidation.status === 'VALID'" [euiDanger]="formValidation.status !== 'VALID'">
                    {{ formValidation.status }}
                </eui-badge>
            </div>
            <button euiButton euiButtonBlock euiSecondary (click)="onResetForm()" class="eui-u-mb-m eui-u-mr-m">Reset</button>
            <button euiButton euiButtonBlock euiSecondary class="eui-u-mb-m eui-u-mr-m" (click)="onDisableForm()"><span euiLabel>{{isFormDisabled ? 'Enable' : 'Disable'}}</span></button>
            <button euiButton euiButtonBlock euiPrimary class="eui-u-mb-m eui-u-mr-m" (click)="onSubmitForm()" [euiDisabled]="isFormDisabled">Submit</button>
        </eui-fieldset>
    </div>
    <div class="col-md-9">
        <form [formGroup]="formValidation" [class.eui-t-form-compact]="isCompact">
            <!-- INJECT A COPONENT HERE -->
            <!-- VERTICAL LAYOUT -->
            @if (isVerticalLayout) {
                <div euiInputGroup>
                    <label for="theming-input-text" euiLabel [euiRequired]="isEditActive">Input text</label>
                    <div euiInputGroupAddOn>
                        @if (isEditActive) {
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-user" size="s" />
                            </div>
                        }
                        <input id="theming-input-text" euiInputText formControlName="inputValue" placeholder="Type some text" [readonly]="!isEditActive" />
                    </div>
                    @if (render('inputValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label for="theming-input-text-with-button-addon" euiLabel [euiRequired]="isEditActive">Input text with button addon</label>
                    <div euiInputGroupAddOn>
                        <input id="theming-input-text-with-button-addon" euiInputText formControlName="inputValue2" placeholder="Type some text" [readonly]="!isEditActive" />
                        <button euiButton euiPrimary euiOutline [euiDisabled]="isFormDisabled">Search</button>
                    </div>
                    @if (render('inputValue2')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label for="theming-input-text-with-icon-button" euiLabel [euiRequired]="isEditActive">Input text with icon button</label>
                    <div euiInputGroupAddOn>
                        <input id="theming-input-text-with-icon-button" euiInputText formControlName="inputValue3" placeholder="Type some text" [readonly]="!isEditActive" />
                        @if (isEditActive) {
                            <button euiButton euiPrimary euiOutline euiIconButton [euiDisabled]="isFormDisabled" aria-label="Search">
                                <eui-icon-svg icon="eui-search" size="s" />
                            </button>
                        }
                    </div>
                    @if (render('inputValue2')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label for="theming-number" euiLabel [euiRequired]="isEditActive">Number</label>
                    <input id="theming-number" euiInputNumber formControlName="numberValue" placeholder="Type some numbers" [readonly]="!isEditActive" />
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
                        <textarea euiTextArea formControlName="textareaValue" placeholder="Type some text" [readonly]="!isEditActive"></textarea>
                    </div>
                    @if (render('textareaValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label for="theming-selectID" euiLabel [euiRequired]="isEditActive">Select</label>
                    <select id="theming-selectID" euiSelect formControlName="selectValue" [readonly]="!isEditActive">
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
                    <label euiLabel>Select a date range</label>
                    <eui-date-range-selector formControlName="daterangeselector" [isReadOnly]="!isEditActive" />
                    @if (render('daterangeselector')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel euiRequired>Single mandatory checkbox</label>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        <input id="theming-agree" euiInputCheckBox formControlName="mySingleCheckbox" [readonly]="!isEditActive"/>
                        <label euiLabel for="theming-agree">I agree</label>
                    </div>
                    @if (isEditActive && render('mySingleCheckbox')) {
                        <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Radio options</label>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        @for (radio of radioOptions; let i = $index; track $index) {
                            <div class="eui-u-inline-flex eui-u-mb-s">
                                <input id="theming-radio1{{i}}" euiInputRadio name="radioForm" formControlName="radioValue" [readonly]="!isEditActive" />
                                <label euiLabel for="theming-radio1{{i}}">{{radio.label}}</label>
                            </div>
                        }
                    </div>
                    @if (render('radioValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel>Composition sample</label>
                    <div euiInputGroupAddOn>
                        <select euiSelect formControlName="selectValue" [readonly]="!isEditActive" class="eui-u-width-8">
                            @for (opt of selectOptions; track $index) {
                                <option [value]="opt.value">{{opt.label}}</option>
                            }
                        </select>
                        <button euiButton euiOutline euiIconButton euiSuccess aria-label="Validate">
                            <eui-icon-svg icon="eui-checkmark" />
                        </button>
                        <button euiButton euiOutline euiIconButton euiDanger aria-label="Remove">
                            <eui-icon-svg icon="eui-close" />
                        </button>
                    </div>
                </div>
            }


            <!-- HORIZONTAL LAYOUT -->
            @if (!isVerticalLayout) {
                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label for="theming-input-text2" euiLabel [euiRequired]="isEditActive">Input text</label>
                    </div>
                    <div class="col-md-9">
                        <div euiInputGroupAddOn>
                            @if (isEditActive) {
                                <div euiInputGroupAddOnItem>
                                    <eui-icon-svg icon="eui-user" size="s" />
                                </div>
                            }
                            <input id="theming-input-text2" euiInputText formControlName="inputValue" placeholder="Type some text" [readonly]="!isEditActive" />
                        </div>
                        @if (render('inputValue')) {
                            <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                        }
                    </div>
                </div>

                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label for="theming-input-button-addon" euiLabel [euiRequired]="isEditActive">Input text with button addon</label>
                    </div>
                    <div class="col-md-9">
                        <div euiInputGroupAddOn>
                            <input id="theming-input-button-addon" euiInputText formControlName="inputValue2" placeholder="Type some text" [readonly]="!isEditActive" />
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
                        <label for="theming-input-icon-button" euiLabel [euiRequired]="isEditActive">Input text with icon button</label>
                    </div>
                    <div class="col-md-9">
                        <div euiInputGroupAddOn>
                            <input id="theming-input-icon-button" euiInputText formControlName="inputValue3" placeholder="Type some text" [readonly]="!isEditActive" />
                            @if (isEditActive) {
                                <button euiButton euiSecondary euiOutline euiIconButton [euiDisabled]="isFormDisabled">
                                    <eui-icon-svg icon="eui-search" size="s" />
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
                        <label for="theming-number2" euiLabel [euiRequired]="isEditActive">Number</label>
                    </div>
                    <div class="col-md-9">
                        <input id="theming-number2" euiInputNumber formControlName="numberValue" placeholder="Type some numbers" [readonly]="!isEditActive" />
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
                            <textarea euiTextArea formControlName="textareaValue" placeholder="Type some text" [readonly]="!isEditActive"></textarea>
                        </div>
                        @if (render('textareaValue')) {
                            <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                        }
                    </div>
                </div>

                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label euiLabel [euiRequired]="isEditActive">Select</label>
                    </div>
                    <div class="col-md-9">
                        <select euiSelect formControlName="selectValue" [readonly]="!isEditActive">
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
                        <eui-datepicker formControlName="datepicker" [isReadOnly]="!isEditActive" />
                        @if (render('datepicker')) {
                            <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                        }
                    </div>
                </div>

                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label euiLabel>Select a date range</label>
                    </div>
                    <div class="col-md-9">
                        <eui-date-range-selector formControlName="daterangeselector" [isReadOnly]="!isEditActive" />
                        @if (render('daterangeselector')) {
                            <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                        }
                    </div>
                </div>

                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label euiLabel [euiRequired]="isEditActive">Single mandatory checkbox</label>
                    </div>
                    <div class="col-md-9">
                        <div class="eui-u-inline-flex eui-u-mb-s">
                            <input id="theming-agree2" euiInputCheckBox formControlName="mySingleCheckbox" label="I agree" [readonly]="!isEditActive"/>
                            <label euiLabel for="theming-agree2">I agree</label>
                        </div>
                        @if (isEditActive && render('mySingleCheckbox')) {
                            <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
                        }
                    </div>
                </div>

                <div euiInputGroup class="row">
                    <div class="col-md-3">
                        <label euiLabel [euiRequired]="isEditActive">Radio options</label>
                    </div>
                    <div class="col-md-9">
                        <div class="eui-u-flex eui-u-flex-wrap">
                            @for (radio of radioOptions; let i = $index; track $index) {
                                <div class="eui-u-inline-flex eui-u-mb-s">
                                    <input id="theming-radio{{i}}" euiInputRadio name="radioForm" formControlName="radioValue" [readonly]="!isEditActive" />
                                    <label euiLabel for="theming-radio{{i}}">{{radio.label}}</label>
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
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_DATE_RANGE_SELECTOR, EuiDateRangeSelectorDates } from '@eui/components/eui-date-range-selector';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from '@eui/components/eui-datepicker';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EuiAppShellService, EuiGrowlService } from '@eui/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';


@Component({
    // tslint:disable-next-line
    selector: 'form-theming',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_RADIO,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_DATEPICKER,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_BADGE,
        ...EUI_ALERT,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_FIELDSET,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemingComponent implements OnInit {
    public isEditActive = true;
    public isCompact = false;
    public isVerticalLayout = true;
    public isFormDisabled = false;
    public value = '';

    public today = new Date('06/08/1987');
    public tenDaysLater = this.today.setDate(this.today.getDate() + 10);
    public newDate = new Date(this.tenDaysLater);

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

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon', typeClass: 'primary', isOutline: true },
        { id: 2, label: 'Lime', typeClass: 'secondary', isRounded: true },
        { id: 3, label: 'Apple', typeClass: 'info', sizeClass: 'euiSizeS' },
        { id: 4, label: 'Orange', typeClass: 'success', isRemovable: false },
        { id: 5, label: 'Strawberry', typeClass: 'warning' },
        { id: 6, label: 'Peer', typeClass: 'danger', isRemovable: false },
    ];
    public growlService: EuiGrowlService = inject(EuiGrowlService);
    private fb: FormBuilder = inject(FormBuilder);

    public asService = inject(EuiAppShellService);

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
            daterangeselector: new FormControl<EuiDateRangeSelectorDates>({
                    startRange: new Date('06/08/1987'),
                    endRange: this.newDate },
                    [Validators.required]),
            mySingleCheckbox: [{ value: false, disabled: false }, [Validators.requiredTrue]],
            radioValue: [{ value: '', disabled: false }, [Validators.required]],
        });
    }

    public onSubmitForm() {
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

    public onSetCompact() {
        this.asService.setBaseFontSize('14px');
    }

    public onToggleVerticalLayout() {
        this.isVerticalLayout = !this.isVerticalLayout;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public onDisableForm() {
        this.isFormDisabled = !this.isFormDisabled;
        this.isFormDisabled ? this.formValidation.disable() : this.formValidation.enable();
    }
}
```

