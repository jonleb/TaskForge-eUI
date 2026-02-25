# showcase templates   view states   page edit state   list   details   :id

```html
<eui-card *ngIf="(uiStateService.state$ | async).isEditActive" [euiHighlighted]="(asService.state$ | async).isDimmerActive">
    <eui-card-header>
        <eui-card-header-title>
            <span euiLabel euiSizeXL>
                <span *ngIf="!car?.vin">CREATE A NEW CAR &mdash; Fill in the car information</span>
                <span *ngIf="car?.vin">EDIT CAR &mdash; <span class="eui-u-f-bold">{{ car.brand.title }} {{ car.brand.model }} - {{ car.color }} {{ car.year }}</span></span>
            </span>
        </eui-card-header-title>
    </eui-card-header>

    <eui-card-content>

        <form [formGroup]="form">
            <eui-fieldset label="Identification info" isLarge>
                <div class="row">
                    <div class="col-md-6">
                        <div euiInputGroup>
                            <label for="car-vin" euiLabel euiRequired>Vendor identification number (Vin)</label>
                            <input euiInputText id="car-vin" formControlName="vin" placeholder="Enter vendor identification" [readonly]="!(asService.state$ | async).isDimmerActive" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div euiInputGroup>
                            <label for="car-year" euiLabel euiRequired>Year</label>
                            <input euiInputNumber id="car-year" noFormat formControlName="year" placeholder="Enter year of construction" [digits]="4" [readonly]="!(asService.state$ | async).isDimmerActive" />
                            <!-- <eui-datepicker type="year" dateOutputFormat="YYYY" euiYearFormat formControlName="yearPickerValue" placeholder="Enter year of construction" isDatepickerBlock [isReadOnly]="!(asService.state$ | async).isDimmerActive"></eui-datepicker> -->

                        </div>
                    </div>
                </div>

                <ng-container formGroupName="brand">
                    <div class="row">
                        <div class="col-md-6">
                            <div euiInputGroup>
                                <label euiLabel for="car-brandname" euiRequired>Brand name</label>
                                <select euiSelect name="car-brandname" id="car-brandname" formControlName="title" placeholder="Select a brand name" [readonly]="!(asService.state$ | async).isDimmerActive">
                                    <option *ngFor="let option of brandOptions" [ngValue]="option.value">{{option.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div euiInputGroup>
                                <label for="car-brand-model" euiLabel euiRequired>Brand model</label>
                                <input euiInputText id="car-brand-model" formControlName="model" placeholder="Enter brand's model" [readonly]="!(asService.state$ | async).isDimmerActive" />
                            </div>
                        </div>
                    </div>
                </ng-container>
            </eui-fieldset>

            <eui-fieldset label="Commercial info" isLarge>
                <div class="row">
                    <div class="col-md-6">
                        <div euiInputGroup>
                            <label for="car-price" euiLabel euiRequired>Price (€)</label>
                            <input euiInputNumber id="car-price" formControlName="price" placeholder="Enter the car's price" [readonly]="!(asService.state$ | async).isDimmerActive" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div euiInputGroup>
                            <label euiLabel for="car-colorname" euiRequired>Color</label>
                            <select euiSelect name="car-colorname" id="car-colorname" formControlName="color" placeholder="Choose the color" [readonly]="!(asService.state$ | async).isDimmerActive">
                                <option *ngFor="let option of colorOptions" [ngValue]="option.value">{{option.label}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div euiInputGroup>
                    <label euiLabel for="story-form">Description</label>
                    <textarea euiTextArea
                            id="descr"
                            name="descr"
                            rows="5"
                            formControlName="description"
                            placeholder="Enter the description of the car..."
                            [euiMaxlength]="4000"
                            [readonly]="!(asService.state$ | async).isDimmerActive">
                    </textarea>
                </div>

                <div euiInputGroup>
                    <label euiLabel>Availability</label>
                    <div class="eui-u-flex eui-u-flex-wrap">
                        <input euiInputCheckBox id="car-available" formControlName="available" [readonly]="!(asService.state$ | async).isDimmerActive" />
                        <label for="car-available" euiLabel>Available</label>
                    </div>
                </div>
            </eui-fieldset>
        </form>

    </eui-card-content>
</eui-card>

<!-- For DEBUG purposes only! -->
<!-- <pre class="eui-u-text-pre">{{ (uiStateService.state$ | async) | json }}</pre> -->
```
