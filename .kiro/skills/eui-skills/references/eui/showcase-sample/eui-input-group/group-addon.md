---
description: Shows euiInputGroupAddOn usage to combine input fields with buttons, icons, or other elements, including responsive layouts with euiInputGroupAddOnItem for complex input compositions.
id: group-addon
---

```html
<div class="doc-sample-section-title">Input field with action button within an eui-card</div>
<eui-card>
    <eui-card-header>
        <eui-card-header-title>Knowledge base solutions</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <div euiInputGroup class="eui-u-mb-2xs">
            <div euiInputGroupAddOn>
                <input euiInputText id="solution_kb" value="" placeholder="Enter new incident solution" aria-label="Enter new incident solution"/>
                <button euiButton euiPrimary euiIconButton aria-label="Add solution">
                    <eui-icon-svg icon="eui-add" size="s" />
                </button>
            </div>
            <eui-feedback-message euiInfo>Please, describe the solution starting with one of the following keywords: what, how (many), where, which, etc.</eui-feedback-message>
        </div>
    </eui-card-content>
</eui-card>


<div class="doc-sample-section-title">Responsive layout using reactive forms and eui-input-group-addon class</div>
<form [formGroup]="formValidation">
    <div class="row">
        <div class="col-md-6">
            <div euiInputGroup>
                <label euiLabel for="user" euiRequired>User</label>
                <div euiInputGroupAddOn>
                    <div euiInputGroupAddOnItem>
                        <eui-icon-svg icon="eui-user" size="s" />
                    </div>
                    <input euiInputText id="user" formControlName="userValue" placeholder="Enter user name or code" />
                </div>
                @if (validateRequired('userValue')) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired>eMail</label>
                <div euiInputGroupAddOn>
                    <div euiInputGroupAddOnItem>
                        <eui-icon-svg icon="eui-email" size="s" />
                    </div>
                    <input euiInputText formControlName="emailValue" placeholder="Email address" aria-label="Enter email address"/>
                </div>
                @if (validateRequired('emailValue')) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
                @if (validateEmail('emailValue')) {
                    <eui-feedback-message euiDanger>
                        Email address is invalid
                    </eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel for="country" euiRequired>Country</label>
                <div euiInputGroupAddOn>
                    <div euiInputGroupAddOnItem>
                        <eui-icon-svg icon="globe-x:regular" size="s" />
                    </div>
                    <select euiSelect id="country" formControlName="countryValue">
                        @for (country of countries; track country.id) {
                            <option euiPrimary [value]="country.id">{{country.name}}</option>
                        }
                    </select>
                </div>
                @if (validateRequired('countryValue')) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
            </div>
        </div>

        <div class="col-md-6">

            <div euiInputGroup>
                <label euiLabel for="address" euiRequired>Address</label>
                <div euiInputGroupAddOn>
                    <div euiInputGroupAddOnItem>
                        Address
                    </div>
                    <input euiInputText id="address" formControlName="addressValue" placeholder="Enter postal address"/>
                </div>
                @if (validateRequired('addressValue')) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel for="amount" euiRequired>Donation amount</label>
                <div euiInputGroupAddOn>
                    <input euiInputNumber id="amount" formControlName="amountValue" placeholder="Total amount"/>
                    <div euiInputGroupAddOnItem>
                        <eui-icon-svg icon="currency-eur:regular" size="s" />
                    </div>
                </div>
                @if (validateRequired('amountValue')) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
            </div>
        </div>
    </div>
</form>

<div class="eui-u-flex eui-u-flex-justify-content-end">
    <button euiButton euiPrimary (click)="onSubmitForm()">Submit</button>
</div>

<strong>Reactive Form content</strong>
<div class="eui-showcase-demo eui-u-mt-m">
    <div class="code" style="overflow-y: auto;" tabindex="0">
        <pre class="eui-u-text-pre" tabindex="0">{{ formValidation.value | json }}</pre>
    </div>
</div>


<div class="doc-sample-section-title">Using action buttons</div>
<div euiInputGroup>
    <div euiInputGroupAddOn>
        <button euiButton euiPrimary euiOutline euiIconButton (click)="onActionButtonClicked($event, 'Left')" aria-label="Go back">
            <eui-icon-svg icon="eui-arrow-left" size="s" />
        </button>

        <input euiInputText type="search" placeholder="Search website..." aria-label="Search website"/>

        <button euiButton euiPrimary euiIconButton (click)="onActionButtonClicked($event, 'Right')" aria-label="Search">
            <eui-icon-svg icon="eui-search" size="s" />
        </button>
    </div>
</div>


<div class="doc-sample-section-title">Using addon items</div>
<div euiInputGroup>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-arrow-left"size="s" />
        </div>

        <input euiInputText type="search" placeholder="Search website..." aria-label="Search website"/>

        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-search" size="s" />
        </div>
    </div>
</div>


<div class="doc-sample-section-title">Using both button and addon item</div>
<div euiInputGroup>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-email" size="s" />
        </div>

        <input euiInputText placeholder="Enter email address..." aria-label="Enter email address"/>

        <button euiButton euiPrimary euiOutline euiIconButton (click)="onActionButtonClicked($event, 'Search')" aria-label="Search">
            <eui-icon-svg icon="eui-search" size="s" />
        </button>
    </div>
</div>

<div class="doc-sample-section-title">Addon with euiMaxLength</div>
<form [formGroup]="formValidation">

    <div euiInputGroup>
        <label euiLabel>Phone with max length</label>
        <div euiInputGroupAddOn>
            <div euiInputGroupAddOnItem>
                <eui-icon-svg icon="circle-dashed:regular" />
            </div>
            <input euiInputText [euiMaxlength]="50" mask="(00) 00000000||+00 (00) 00000000" aria-label="Phone number" />
        </div>
    </div>

</form>


<div class="doc-sample-section-title">Using textareas</div>
<div class="row">
    <div class="col-xl-4 col-md-6">
        <div euiInputGroup>
            <label euiLabel for="story_max_en">Tell us your story</label>
            <div euiInputGroupAddOn>
                <div euiInputGroupAddOnItem>
                    English
                </div>
                <textarea euiTextArea id="story_max_en" name="story_en" rows="5">It was a dark and stormy night...</textarea>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-6">
        <div euiInputGroup>
            <label euiLabel for="story_max_fr">Racontez-nous votre histoire</label>
            <div euiInputGroupAddOn>
                <div euiInputGroupAddOnItem>
                    français
                </div>
                <textarea euiTextArea id="story_max_fr" name="story_fr" rows="5">C'était une nuit sombre et orageuse...</textarea>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-6">
        <div euiInputGroup>
            <label euiLabel for="story_max_es">Cuéntanos tu historia</label>
            <div euiInputGroupAddOn>
                <div euiInputGroupAddOnItem>
                    español
                </div>
                <textarea euiTextArea id="story_max_es" name="story_es" rows="5">Era una noche oscura y tormentosa...</textarea>
            </div>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EuiGrowlService } from '@eui/core';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'group-addon',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
        ...EUI_SELECT,
        ...EUI_TEXTAREA,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        EuiMaxLengthDirective,
        NgxMaskDirective,
        JsonPipe,
    ],
    providers: [
        provideNgxMask(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupAddonComponent implements OnInit {
    public formValidation: FormGroup;
    public selectOptions: any[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];
    public countries: any[] = [
        { id: 1, name: 'Austria', iso: 'AT' },
        { id: 2, name: 'Belgium', iso: 'BE' },
        { id: 3, name: 'Bulgaria', iso: 'BG' },
        { id: 4, name: 'Croatia', iso: 'HR' },
        { id: 5, name: 'Cyprus', iso: 'CY' },
        { id: 6, name: 'Czechia', iso: 'CZ' },
        { id: 7, name: 'Denmark', iso: 'DK' },
        { id: 8, name: 'Estonia', iso: 'EE' },
        { id: 9, name: 'Finland', iso: 'FI' },
        { id: 10, name: 'France', iso: 'FR' },
        { id: 11, name: 'Germany', iso: 'DE' },
        { id: 12, name: 'Greece', iso: 'GR' },
        { id: 13, name: 'Hungary', iso: 'HU' },
        { id: 14, name: 'Ireland', iso: 'IE' },
        { id: 15, name: 'Italy', iso: 'IT' },
        { id: 16, name: 'Latvia', iso: 'LV' },
        { id: 17, name: 'Lithuania', iso: 'LT' },
        { id: 18, name: 'Luxembourg', iso: 'LU' },
        { id: 19, name: 'Malta', iso: 'MT' },
        { id: 20, name: 'Netherlands', iso: 'NL' },
        { id: 21, name: 'Poland', iso: 'PL' },
        { id: 22, name: 'Portugal', iso: 'PT' },
        { id: 23, name: 'Romania', iso: 'RO' },
        { id: 24, name: 'Slovakia', iso: 'SK' },
        { id: 25, name: 'Slovenia', iso: 'SI' },
        { id: 26, name: 'Spain', iso: 'ES' },
        { id: 27, name: 'Sweden', iso: 'SE' },
        { id: 28, name: 'Other', iso: 'XX' },
    ];
    private fb: FormBuilder = inject(FormBuilder);
    public growlService: EuiGrowlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formValidation = this.fb.group({
            userValue: [null, [Validators.required]],
            emailValue: [null, [
                Validators.required,
                Validators.email,
                Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
            ]],
            countryValue: [null, [Validators.required]],
            addressValue: [null, [Validators.required]],
            amountValue: [null, [Validators.required]],
        });
    }

    public onSubmitForm() {
        this.formValidation.markAllAsTouched();
    }

    public validateRequired(controlName: string): boolean {
        return this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    public validateEmail(controlName: string): boolean {
        return this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('email');
    }

    public onActionButtonClicked(event: Event, position) {
        this.growlService.growl({ severity: 'info', summary: 'ACTION BUTTON CLICKED', detail: position + ' action button clicked !' });
    }
}
```

