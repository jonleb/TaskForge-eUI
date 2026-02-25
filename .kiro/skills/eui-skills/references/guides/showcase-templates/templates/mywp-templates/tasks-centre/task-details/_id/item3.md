# showcase templates   templates   mywp templates   tasks centre   task details   :id   item3

```html
<eui-card label="Internal communication" [euiHighlighted]="(uiStateService.state$ | async).isEditActive">
    <eui-card-content>
        <p class="eui-u-text-paragraph">Please fill in all required fields.</p>
        <div class="row">
            <form [formGroup]="formValidation" class="col-md-8">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Input text</label>
                    <div euiInputGroupAddOn>
                        @if ((uiStateService.state$ | async).isEditActive) {
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-user" size="m" fillColor="secondary"></eui-icon-svg>
                            </div>
                        }
                        <input euiInputText formControlName="inputValue" placeholder="Type some text" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    @if (render('inputValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">
                        Email
                        <eui-icon-svg icon="eui-state-info" size="s" fillColor="info" class="eui-u-cursor-help eui-u-ml-2xs" euiTooltip="Enter your email address"></eui-icon-svg>
                    </label>
                    <div euiInputGroupAddOn>
                        @if ((uiStateService.state$ | async).isEditActive) {
                            <div euiInputGroupAddOnItem>
                                <eui-icon-svg icon="eui-email"></eui-icon-svg>
                            </div>
                        }
                        <input euiInputText formControlName="mailBoxValue" placeholder="Enter a valid email address" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    @if (render('mailBoxValue')) {
                        <eui-feedback-message euiDanger>The email address is required</eui-feedback-message>
                    }
                    @if (checkEmail('mailBoxValue')) {
                        <eui-feedback-message euiDanger>Not a valid email address</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Input text with button addon</label>
                    <div euiInputGroupAddOn>
                        <input euiInputText formControlName="inputValue2" placeholder="Type some text" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                        @if ((uiStateService.state$ | async).isEditActive) {
                            <button euiButton euiPrimary euiOutline [euiDisabled]="isFormDisabled">Search</button>
                        }
                    </div>
                    @if (render('inputValue2')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Input text with icon button</label>
                    <div euiInputGroupAddOn>
                        <input euiInputText formControlName="inputValue3" placeholder="Type some text" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                        @if ((uiStateService.state$ | async).isEditActive) {
                            <button euiButton euiPrimary euiOutline euiIconButton [euiDisabled]="isFormDisabled">
                                <eui-icon-svg icon="eui-search"></eui-icon-svg>
                            </button>
                        }
                    </div>
                    @if (render('inputValue2')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Number</label>
                    <input euiInputNumber formControlName="numberValue" placeholder="Type some numbers" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    @if (render('numberValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Textarea</label>
                    <div euiInputGroupAddOn>
                        @if ((uiStateService.state$ | async).isEditActive) {
                            <div euiInputGroupAddOnItem>EN</div>
                        }
                        <textarea euiTextArea formControlName="textareaValue" [euiMaxlength]="100" placeholder="Type some text" [readonly]="!(uiStateService.state$ | async).isEditActive"></textarea>
                    </div>
                    @if (render('textareaValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label for="select" euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Select</label>
                    <select id="select" euiSelect formControlName="selectValue" placeholder="Choose an option..." [readonly]="!(uiStateService.state$ | async).isEditActive" >
                        @for (opt of selectOptions; track $index) {
                            <option [value]="opt.value">{{opt.label}}</option>
                        }
                    </select>
                    @if (render('selectValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Autocomplete</label>
                    <eui-autocomplete formControlName="autoComplete"
                                    [autocompleteData]="autocompleteDataFormAutocomplete"
                                    [isFreeValueAllowed]="true"
                                    placeholder="Select a fruit"
                                    [isReadonly]="!(uiStateService.state$ | async).isEditActive"
                                    aria-label="Select a fruit">
                    </eui-autocomplete>
                    @if (render('autoComplete')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Datepicker</label>
                    <eui-datepicker isClearable formControlName="datepicker" [isReadOnly]="!(uiStateService.state$ | async).isEditActive"></eui-datepicker>
                    @if (render('datepicker')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Date range selector</label>
                    <eui-date-range-selector formControlName="daterangeselector" [isReadOnly]="!(uiStateService.state$ | async).isEditActive"></eui-date-range-selector>
                    @if ((uiStateService.state$ | async).isEditActive && render('daterangeselector')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel euiRequired>Single mandatory checkbox</label>
                    <input id="agree" euiInputCheckBox formControlName="mySingleCheckbox" [readonly]="!(uiStateService.state$ | async).isEditActive"/>
                    <label euiLabel for="agree">I agree</label>
                    @if ((uiStateService.state$ | async).isEditActive && render('mySingleCheckbox')) {
                        <eui-feedback-message euiDanger>This checkbox is mandatory and must be checked</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup formGroupName="myCheckboxGroup">
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Choose preferred language(s)</label>
                    @for (checkbox of checkboxOptions; track $index) {
                        <div class="eui-u-flex eui-u-mb-s">
                            <input euiInputCheckBox id="reactive-vertical-checkid-{{i}}" name="checkbox-vertical" formControlName="{{checkbox.controlName}}" [readonly]="!(uiStateService.state$ | async).isEditActive"/>
                            <label euiLabel for="reactive-vertical-checkid-{{i}}">{{checkbox.label}}</label>
                        </div>
                    }
                    @if ((uiStateService.state$ | async).isEditActive && myCheckboxGroup?.errors?.requireCheckboxesToBeChecked && myCheckboxGroup.touched) {
                        <eui-feedback-message euiDanger>At least one checkbox is required to be checked</eui-feedback-message>
                    }
                </div>

                <div euiInputGroup>
                    <label euiLabel [euiRequired]="(uiStateService.state$ | async).isEditActive">Radio options</label>
                    @for (radio of radioOptions; track $index) {
                        <div class="eui-u-flex" [class.eui-u-mb-s]="(uiStateService.state$ | async).isEditActive">
                            <input id="reactive-vertical-radio{{i}}" euiInputRadio name="radioForm-vertical" formControlName="radioValue" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                            <label euiLabel for="reactive-vertical-radio{{i}}">{{radio.label}}</label>
                        </div>
                    }
                    @if (render('radioValue')) {
                        <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                    }
                </div>
            </form>

            <div class="col-md-4">
                <div class="eui-u-f-bold">Reactive Form content</div>
                <div class="eui-showcase-demo eui-u-mt-m">
                    <div class="code" style="overflow-y: auto;" tabindex="0">
                        <pre tabindex="0">{{ formValidation.value | json }}</pre>
                    </div>
                </div>

                <div class="eui-u-f-bold eui-u-mt-l eui-u-mb-m">Form status</div>
                <eui-badge [euiSuccess]="formValidation.status === 'VALID'" [euiDanger]="formValidation.status !== 'VALID'">
                    {{ formValidation.status }}
                </eui-badge>
            </div>
        </div>
    </eui-card-content>
</eui-card>
```
