# showcase templates   view states   routes edit state   item1

```html
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas faucibus in consequat, tempor. Aenean in at nisl tristique habitant volutpat euismod tempor nec.
Eget enim massa nulla urna. Sodales nec velit varius nec dolor arcu, venenatis tortor.

<form [formGroup]="form" class="eui-u-mt-m">

    <!-- PERSONAL SECTION -->
    <eui-fieldset label="Personal informations" isExpandable [isExpanded]="true">

        <euiFieldsetLabelExtraContent>
            <eui-badge euiSecondary class="eui-u-ml-m" euiTooltip="Tooltip information text here">?</eui-badge>
        </euiFieldsetLabelExtraContent>

        <div class="row eui-u-mt-m">
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">First name</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="user:regular" />
                        </div>
                        <input euiInputText formControlName="inputFirstNameValue" placeholder="Enter your first name" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('inputFirstNameValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Last name</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="user:regular" />
                        </div>
                        <input euiInputText formControlName="inputLastNameValue" placeholder="Enter your last name" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('inputLastNameValue')">This field is required</eui-feedback-message>
                </div>
            </div>
        </div>

        <div euiInputGroup>
            <label euiLabel [euiRequired]="isEditActive">Address</label>
            <div euiInputGroupAddOn>
                <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                    <eui-icon-svg icon="eui-home" />
                </div>
                <input euiInputText formControlName="inputAddressValue" placeholder="Type in your postal address" [readonly]="!(uiStateService.state$ | async).isEditActive" />
            </div>
            <eui-feedback-message euiDanger *ngIf="render('inputAddressValue')">This field is required</eui-feedback-message>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Postal code</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="circle-dashed:regular" />
                        </div>
                        <input euiInputNumber noFormat formControlName="numberPostalCodeValue" placeholder="Enter numeric postal code" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('numberPostalCodeValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-6">
                <div euiInputGroup>
                    <label for="select-city" euiLabel [euiRequired]="isEditActive">City</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="circle-dashed:regular" />
                        </div>
                        <select id="select-city" euiSelect formControlName="selectCityValue" placeholder="Select a city"  [readonly]="!(uiStateService.state$ | async).isEditActive" >
                            <option *ngFor="let opt of selectCityOptions" [value]="opt.value">{{opt.label}}</option>
                        </select>
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('selectCityValue')">This field is required</eui-feedback-message>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Country</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="globe:regular" />
                        </div>
                        <eui-autocomplete formControlName="autoCompleteCountryValue"
                                        [autocompleteData]="autocompleteCountryOptions"
                                        [isFreeValueAllowed]="true"
                                        placeholder="Select a country"
                                        [isReadonly]="!(uiStateService.state$ | async).isEditActive"
                                        aria-label="Select a country">
                        </eui-autocomplete>
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('autoCompleteCountryValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">
                        Email
                        <eui-icon-svg icon="eui-info" fillColor="info" euiTooltip="Enter a valid email address" class="eui-u-ml-s" />
                    </label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="eui-email" />
                        </div>
                        <input euiInputText formControlName="mailBoxValue" placeholder="Enter your email address" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('mailBoxValue')">The email address is required</eui-feedback-message>
                    <eui-feedback-message euiDanger *ngIf="checkEmail('mailBoxValue')">Not a valid email address</eui-feedback-message>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Gender</label>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        <div *ngFor="let radio of radioGenderOptions; let i=index" class="eui-u-inline-flex">
                            <input euiInputRadio id="reactive-vertical-radio{{i}}" name="radioForm-vertical" formControlName="genderValue" value="{{ radio.value }}" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                            <label euiLabel for="reactive-vertical-radio{{i}}">{{radio.label}}</label>
                        </div>
                        <eui-feedback-message euiDanger *ngIf="render('genderValue')">This field is required</eui-feedback-message>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div euiInputGroup formGroupName="myCheckboxLanguagesGroup">
                    <label euiLabel [euiRequired]="isEditActive">Spoken language(s)</label>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        <div *ngFor="let checkbox of checkboxOptions; let i=index" class="eui-u-inline-flex eui-u-mb-s">
                            <input euiInputCheckBox id="reactive-vertical-checkid-{{i}}" name="checkbox-vertical" formControlName="{{checkbox.controlName}}" [readonly]="!(uiStateService.state$ | async).isEditActive"/>
                            <label euiLabel for="reactive-vertical-checkid-{{i}}">{{checkbox.label}}</label>
                        </div>
                    </div>
                    <eui-feedback-message euiDanger *ngIf="isEditActive && myCheckboxLanguagesGroup?.errors?.requireCheckboxesToBeChecked && myCheckboxLanguagesGroup.touched">
                        At least one checkbox is required to be checked
                    </eui-feedback-message>
                </div>
            </div>
        </div>

        <div euiInputGroup>
            <label euiLabel>Remarks</label>
            <textarea euiTextArea formControlName="textareaRemarksValue" [euiMaxlength]="4000" placeholder="Enter any extra information here" [readonly]="!(uiStateService.state$ | async).isEditActive"></textarea>
            <eui-feedback-message euiDanger *ngIf="render('textareaRemarksValue')">This field is required</eui-feedback-message>
        </div>
    </eui-fieldset>

    <!-- FINANCIAL SECTION -->
    <eui-fieldset label="Financial informations" isExpandable [isExpanded]="true" class=" eui-u-mt-m">

        <euiFieldsetLabelExtraContent>
            <eui-badge euiSecondary class="eui-u-ml-m" euiTooltip="Tooltip information text here">?</eui-badge>
        </euiFieldsetLabelExtraContent>

        <div class="row eui-u-mt-m">
            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Invoice reference</label>
                    <input euiInputText formControlName="inputInvoiceRefValue" placeholder="Enter the invoice data reference" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                    <eui-feedback-message euiDanger *ngIf="render('inputInvoiceRefValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label for="select" euiLabel [euiRequired]="isEditActive">Invoice type</label>
                    <select id="select" euiSelect formControlName="selectInvoiceTypeValue" placeholder="Select invoice type"  [readonly]="!(uiStateService.state$ | async).isEditActive" >
                        <option *ngFor="let opt of selectInvoiceTypeOptions" [value]="opt.value">{{opt.label}}</option>
                    </select>
                    <eui-feedback-message euiDanger *ngIf="render('selectInvoiceTypeValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label for="select" euiLabel [euiRequired]="isEditActive">Scan reference</label>
                    <select id="select" euiSelect formControlName="selectInvoiceScanRefValue" placeholder="Select invoice scan reference"  [readonly]="!(uiStateService.state$ | async).isEditActive" >
                        <option *ngFor="let opt of selectInvoiceScanRefOptions" [value]="opt.value">{{opt.label}}</option>
                    </select>
                    <eui-feedback-message euiDanger *ngIf="render('selectInvoiceScanRefValue')">This field is required</eui-feedback-message>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Invoice date</label>
                    <eui-datepicker isDatepickerBlock isClearable formControlName="datepickerInvoiceDateValue" [isReadOnly]="!isEditActive"></eui-datepicker>
                    <eui-feedback-message euiDanger *ngIf="render('datepickerInvoiceDateValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel>Start date</label>
                    <eui-datepicker isDatepickerBlock isClearable formControlName="datepickerInvoiceStartDateValue" [isReadOnly]="!isEditActive"></eui-datepicker>
                    <eui-feedback-message euiDanger *ngIf="render('datepickerInvoiceStartDateValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel>End date</label>
                    <eui-datepicker isDatepickerBlock isClearable formControlName="datepickerInvoiceEndDateValue" [isReadOnly]="!isEditActive"></eui-datepicker>
                    <eui-feedback-message euiDanger *ngIf="render('datepickerInvoiceEndDateValue')">This field is required</eui-feedback-message>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Beneficiary</label>
                    <div euiInputGroupAddOn>
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                        </div>
                        <eui-autocomplete formControlName="autoCompleteBeneficiaryValue"
                                        [autocompleteData]="autocompleteBeneficiaryOptions"
                                        [isFreeValueAllowed]="true"
                                        placeholder="Choose a beneficiary"
                                        [isReadonly]="!(uiStateService.state$ | async).isEditActive"
                                        aria-label="Select a beneficiary">
                        </eui-autocomplete>
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('autoCompleteBeneficiaryValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Total amount</label>
                    <div euiInputGroupAddOn>
                        <input euiInputNumber formControlName="numberTotalAmountValue" placeholder="Enter invoice total amount" [readonly]="!(uiStateService.state$ | async).isEditActive" />
                        <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                            <span>{{ selectedCurrency }}</span>
                        </div>
                    </div>
                    <eui-feedback-message euiDanger *ngIf="render('numberTotalAmountValue')">This field is required</eui-feedback-message>
                </div>
            </div>

            <div class="col-md-4">
                <div euiInputGroup>
                    <label euiLabel [euiRequired]="isEditActive">Currency</label>
                    <select id="select" euiSelect formControlName="selectCurrencyValue" placeholder="Select invoice currency"  [readonly]="!(uiStateService.state$ | async).isEditActive">
                        <option *ngFor="let opt of selectInvoiceCurrencyOptions" [value]="opt.value">{{opt.label}}</option>
                    </select>
                    <eui-feedback-message euiDanger *ngIf="render('selectCurrencyValue')">This field is required</eui-feedback-message>
                </div>
            </div>
        </div>
    </eui-fieldset>

    <!-- OTHER SECTIONS -->
    <eui-fieldset label="Real estate informations" isExpandable [isExpanded]="false" class="eui-u-mt-m">
        <euiFieldsetLabelExtraContent>
            <eui-badge euiSecondary class="eui-u-ml-m" euiTooltip="Tooltip information text here">?</eui-badge>
        </euiFieldsetLabelExtraContent>
        <p class="eui-u-text-paragraph">No content available for this section.</p>
    </eui-fieldset>

    <eui-fieldset label="Business informations" isExpandable [isExpanded]="false" class="eui-u-mt-m">
        <euiFieldsetLabelExtraContent>
            <eui-badge euiSecondary class="eui-u-ml-m" euiTooltip="Tooltip information text here">?</eui-badge>
        </euiFieldsetLabelExtraContent>
        <p class="eui-u-text-paragraph">No content available for this section.</p>
    </eui-fieldset>

    <eui-fieldset label="Other informations" isExpandable [isExpanded]="false" class="eui-u-mt-m">
        <euiFieldsetLabelExtraContent>
            <eui-badge euiSecondary class="eui-u-ml-m" euiTooltip="Tooltip information text here">?</eui-badge>
        </euiFieldsetLabelExtraContent>
        <p class="eui-u-text-paragraph">No content available for this section.</p>
    </eui-fieldset>
</form>
```
