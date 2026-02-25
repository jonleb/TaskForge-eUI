# showcase templates   view states   modal edit state   details

```html
<form [formGroup]="form">
    <eui-fieldset [label]="car ? 'Edit the car information' : 'Fill in the car information'" isLarge>

        <div *ngIf="car" euiInputGroup class="row">
            <div class="eui-u-flex">
                <label for="car-id" euiLabel euiRequired class="eui-u-mr-m">Id</label>
                <input euiInputText id="car-id" formControlName="id" placeholder="Enter unique id" readonly />
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel euiRequired>Vendor identification number (Vin)</label>
                    <input euiInputText formControlName="vin" placeholder="Enter vendor identification" />
                </div>
            </div>
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel euiRequired>Year</label>
                    <input euiInputNumber noFormat formControlName="year" placeholder="Enter year of construction" [digits]="4" />
                </div>
            </div>
        </div>

        <ng-container formGroupName="brand">
            <div class="row">
                <div class="col-md-6">
                    <div euiInputGroup>
                        <label euiLabel for="brandname" euiRequired>Brand's name</label>
                        <select euiSelect name="brandname" id="brandname" formControlName="title" placeholder="Select a brand name">
                            <option *ngFor="let option of brandOptions" [ngValue]="option.value">{{option.label}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div euiInputGroup>
                        <label for="car-brand" euiLabel euiRequired>Brand's model</label>
                        <input euiInputText id="car-brand" formControlName="model" placeholder="Enter brand's model" />
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
                    <input id="car-price" euiInputNumber formControlName="price" placeholder="Enter the car's price" />
                </div>
            </div>
            <div class="col-md-6">
                <div euiInputGroup>
                    <label euiLabel for="colorname">Color</label>
                    <select euiSelect name="colorname" id="colorname" formControlName="color" placeholder="Choose the color">
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
                   >
            </textarea>
        </div>

        <div euiInputGroup>
            <label euiLabel>Availability</label>
            <div class="eui-u-flex eui-u-flex-wrap">
                <input euiInputCheckBox id="car-available" formControlName="available" />
                <label for="car-available" euiLabel>Available</label>
            </div>
        </div>
    </eui-fieldset>

</form>
```
