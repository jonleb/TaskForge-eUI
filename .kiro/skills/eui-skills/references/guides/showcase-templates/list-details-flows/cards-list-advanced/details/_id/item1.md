# showcase templates   list details flows   cards list advanced   details   :id   item1

```html
<form [formGroup]="formValidation">
    <!-- READONLY -->
    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label for="select-contry" euiLabel [euiRequired]="isEditActive">Country</label>
                <select id="select-contry" euiSelect formControlName="countryValue" readonly="true" >
                    <option *ngFor="let opt of countriesOptions" [ngValue]="opt.value">{{opt.label}}</option>
                </select>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">ISO code</label>
                <div class="eui-u-flex eui-u-flex-gap-s">
                    <div class="eui-flag-icon eui-flag-icon-{{ data.iso.toLowerCase() }}"></div>
                    <input euiInputText formControlName="countryIsoValue" placeholder="Enter ISO2 code" readonly="true" />
                </div>
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
                    <input euiInputText formControlName="capitalValue" placeholder="Enter the Capital name" [readonly]="!(asService.state$ | async).isDimmerActive" />
                </div>
                <eui-feedback-message euiDanger *ngIf="render('capitalValue')">This field is required</eui-feedback-message>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">Spoken language(s)</label>
                <input euiInputText formControlName="languagesValue" placeholder="Enter the spoken languages" [readonly]="!(asService.state$ | async).isDimmerActive" />
                <eui-feedback-message euiDanger *ngIf="render('languagesValue')">This field is required</eui-feedback-message>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="isEditActive">Population</label>
                <input euiInputNumber formControlName="populationValue" placeholder="Enter the population number for the reference year" [readonly]="!(asService.state$ | async).isDimmerActive" />
                <eui-feedback-message euiDanger *ngIf="render('populationValue')">This field is required</eui-feedback-message>
            </div>
        </div>
        <div class="col-md-6">
            <div euiInputGroup>
                <label for="reference-year" euiLabel [euiRequired]="isEditActive">Year of reference</label>
                <eui-datepicker type="year" euiYearFormat id="reference-year" formControlName="datepicker" [value]="data.year" isDatepickerBlock [isReadOnly]="!(asService.state$ | async).isDimmerActive"></eui-datepicker>
                <eui-feedback-message euiDanger *ngIf="render('datepicker')">This field is required</eui-feedback-message>
            </div>
        </div>
    </div>

    <div euiInputGroup>
        <label euiLabel>Description</label>
        <div euiInputGroupAddOn>
            <div *ngIf="isEditActive" euiInputGroupAddOnItem>EN</div>
            <textarea euiTextArea formControlName="textareaValue" [euiMaxlength]="1000" placeholder="Type some text" [readonly]="!(asService.state$ | async).isDimmerActive"></textarea>
        </div>
        <eui-feedback-message euiDanger *ngIf="render('textareaValue')">This field is required</eui-feedback-message>
    </div>

    <div euiInputGroup>
        <label euiLabel>Favourite</label>
        <div class="eui-u-flex eui-u-flex-wrap">
            <input euiInputCheckBox id="checkbox-fav" formControlName="favouriteCheckbox" [readonly]="!(asService.state$ | async).isDimmerActive"/>
        </div>
    </div>
</form>
```
