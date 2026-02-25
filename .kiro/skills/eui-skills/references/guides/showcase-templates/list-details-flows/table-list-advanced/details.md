# showcase templates   list details flows   table list advanced   details

```html
<form [formGroup]="formValidation">
    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label for="select-country" euiLabel [euiRequired]="isEditActive">Country</label>
                <div euiInputGroupAddOn>
                    <div *ngIf="isCreateActive" euiInputGroupAddOnItem>
                        <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                    </div>
                    <div *ngIf="!isCreateActive" class="eui-flag-icon eui-flag-icon-{{ data?.iso.toLowerCase() }} eui-u-mr-s"></div>
                    <select id="select-country" euiSelect formControlName="countryValue" placeholder="Choose a country" [readonly]="!isEditActive || !isCreateActive" >
                        <option *ngFor="let opt of countriesOptions" [ngValue]="opt.label">{{opt.label}}</option>
                    </select>
                </div>
                <eui-feedback-message euiDanger *ngIf="render('countryValue')">This field is required</eui-feedback-message>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">ISO2 code</label>
                <div euiInputGroupAddOn>
                    <div *ngIf="isCreateActive" euiInputGroupAddOnItem>
                        <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                    </div>
                    <input euiInputText formControlName="countryIsoValue" [euiMaxlength]="2" placeholder="Enter ISO2 code" [readonly]="!isEditActive || !isCreateActive" />
                </div>
                <eui-feedback-message euiDanger *ngIf="render('countryIsoValue')">This field is required</eui-feedback-message>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">Capital</label>
                <div euiInputGroupAddOn>
                    <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                        <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                    </div>
                    <input euiInputText formControlName="capitalValue" placeholder="Enter the Capital name" [readonly]="!isEditActive" />
                </div>
                <eui-feedback-message euiDanger *ngIf="render('capitalValue')">This field is required</eui-feedback-message>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">Spoken language(s)</label>
                <div euiInputGroupAddOn>
                    <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                        <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                    </div>
                    <input euiInputText formControlName="languagesValue" placeholder="Enter the spoken languages" [readonly]="!isEditActive" />
                </div>
                <eui-feedback-message euiDanger *ngIf="render('languagesValue')">This field is required</eui-feedback-message>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">Population</label>
                <div euiInputGroupAddOn>
                    <div *ngIf="isEditActive" euiInputGroupAddOnItem>
                        <eui-icon-svg icon="circle-dashed:regular"></eui-icon-svg>
                    </div>
                    <input euiInputNumber noFormat formControlName="populationValue" placeholder="Enter the population number for the reference year" [readonly]="!isEditActive" />
                </div>
                <eui-feedback-message euiDanger *ngIf="render('populationValue')">This field is required</eui-feedback-message>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label for="reference-year" euiLabel [euiRequired]="isEditActive">Year of reference</label>
                <eui-datepicker type="year" euiYearFormat id="reference-year" formControlName="datepicker" [value]="data?.year" isDatepickerBlock [isReadOnly]="!isEditActive"></eui-datepicker>
                <eui-feedback-message euiDanger *ngIf="render('datepicker')">This field is required</eui-feedback-message>
            </div>
        </div>
    </div>

    <div euiInputGroup>
        <label euiLabel>Description</label>
        <div euiInputGroupAddOn>
            <div *ngIf="isEditActive" euiInputGroupAddOnItem>EN</div>
            <textarea euiTextArea formControlName="textareaValue" [euiMaxlength]="1000" placeholder="Enter some description" [readonly]="!isEditActive"></textarea>
        </div>
        <eui-feedback-message euiDanger *ngIf="render('textareaValue')">This field is required</eui-feedback-message>
    </div>

    <div euiInputGroup>
        <label euiLabel>Favourite</label>
        <div class="eui-u-flex eui-u-flex-wrap">
            <input euiInputCheckBox id="checkbox-fav" formControlName="favouriteCheckbox" [readonly]="!isEditActive"/>
        </div>
    </div>
</form>
```
