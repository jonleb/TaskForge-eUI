---
description: Shows horizontal form layout using Bootstrap grid system (row and col-% classes) with euiInputGroup, displaying labels in left column and form controls in right column, not applicable in mobile mode.
id: Horizontal
---

```html
<p class="eui-u-text-paragraph">The horizontal layout uses classic Bootstrap's <strong>Grid System</strong> for a responsive layout. It is <u>not applicable</u> when in <strong>mobile</strong> mode where the default vertical layout is applied.</p>

<p class="eui-u-text-paragraph">It is achieved by using <code class="eui-u-text-code">euiInputGroup class="row"</code>.
Then use the grid <code class="eui-u-text-code">col-%</code> classes to display and distribute the left column containing the label and the right column containing the form control.</p>

<p class="eui-u-text-paragraph">Usage sample:</p>
<pre class="eui-u-text-pre">
    &lt;div euiInputGroup class="row"&gt;
        &lt;div class="col-md-3"&gt;
            Label
        &lt;/div&gt;
        &lt;div class="col-md-9"&gt;
            Form control
        &lt;/div&gt;
    &lt;/div&gt;
</pre>


<form [formGroup]="form">

    <div class="doc-sample-section-title">With required input field</div>
    <div euiInputGroup class="row">
        <div class="col-md-3">
            <label for="horizontal" euiLabel euiRequired>Sample Label</label>
        </div>
        <div class="col-md-9">
            <input euiInputText formControlName="inputHorizontal" id="horizontal" />
            @if (form.get('inputHorizontal').hasError('required')) {
                <eui-feedback-message euiDanger>
                    This field is <strong>required</strong>
                </eui-feedback-message>
            }
        </div>
    </div>

    <div class="doc-sample-section-title">With required input field and <strong>recommended</strong> label info icon + Tooltip text</div>
    <div euiInputGroup class="row">
        <div class="col-md-3">
            <label for="horizontal-required" euiLabel euiRequired>
                Sample Label
                <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the label info tooltip text" />
            </label>
        </div>
        <div class="col-md-9">
            <input euiInputText formControlName="inputHorizontal" id="horizontal-required" />
            @if (form.get('inputHorizontal').hasError('required')) {
                <eui-feedback-message euiDanger>
                    This field is <strong>required</strong>
                </eui-feedback-message>
            }
        </div>
    </div>

    <div class="doc-sample-section-title">With required input field and <strong>custom</strong> label info icon + Tooltip text</div>
    <div euiInputGroup class="row">
        <div class="col-md-3">
            <label for="horizontal-custom" euiLabel euiRequired>
                Sample Label
                <eui-icon-svg icon="eui-question-circle" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the label info tooltip text" euiTooltipInfo />
            </label>
        </div>
        <div class="col-md-9">
            <input euiInputText formControlName="inputHorizontal" id="horizontal-custom" />
            @if (form.get('inputHorizontal').hasError('required')) {
                <eui-feedback-message euiDanger>
                    This field is <strong>required</strong>
                </eui-feedback-message>
            }
        </div>
    </div>

    <div class="doc-sample-section-title">With a textarea field</div>
    <div euiInputGroup class="row">
        <div class="col-md-3">
            <label id="textarea-label" euiLabel euiRequired>Tell us your story (euiMaxlength=4000)</label>
        </div>
        <div class="col-md-9">
            <textarea euiTextArea aria-labelledby="textarea-label" name="story" rows="5" [euiMaxlength]="4000">It was a dark and stormy night...</textarea>
        </div>
    </div>

    <div class="doc-sample-section-title">Label position top</div>
    <p class="eui-u-text-paragraph">Add the <strong>eui-u-flex-align-items-start</strong> class name to <code class="eui-u-text-code">euiInputGroup</code></p>
    <br>
    <div euiInputGroup class="row eui-u-flex-align-items-start">
        <div class="col-md-3">
            <label id="label-top-position" euiLabel euiRequired>Tell us your story</label>
        </div>
        <div class="col-md-9">
            <textarea euiTextArea aria-labelledby="label-top-position" name="story" rows="3">It was a dark and stormy night...</textarea>
        </div>
    </div>

    <div class="doc-sample-section-title">Label position center (default)</div>
    <div euiInputGroup class="row">
        <div class="col-md-3">
            <label euiLabel id="label-position-center" euiRequired>Tell us your story</label>
        </div>
        <div class="col-md-9">
            <textarea euiTextArea aria-labelledby="label-position-center" name="story" rows="3">It was a dark and stormy night...</textarea>
        </div>
    </div>

    <div class="doc-sample-section-title">Label position bottom</div>
    <p class="eui-u-text-paragraph">Add the <strong>eui-u-flex-align-items-end</strong> class name to <code class="eui-u-text-code">euiInputGroup</code></p>
    <br>
    <div euiInputGroup class="row eui-u-flex-align-items-end">
        <div class="col-md-3">
            <label euiLabel euiRequired id="label-position-bottom">Tell us your story</label>
        </div>
        <div class="col-md-9">
            <textarea euiTextArea name="story" rows="3" aria-labelledby="label-position-bottom">It was a dark and stormy night...</textarea>
        </div>
    </div>

</form>


<div class="doc-sample-section-title">Responsive Flexbox layout checkboxes</div>
<div euiInputGroup class="row">
    <div class="col-md-3 eui-u-mb-s">
        <label euiLabel>Select preferred language(s)</label>
    </div>
    <div class="col-md-9">
        <div class="eui-u-flex eui-u-flex-wrap">
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-en" name="checkbox-h-lang-en" />
                <label euiLabel for="checkbox-h-lang-en">English</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-de" name="checkbox-h-lang-de" />
                <label euiLabel for="checkbox-h-lang-de">deutsch</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-fr" name="checkbox-h-lang-fr" checked="checked" />
                <label euiLabel for="checkbox-h-lang-fr">french</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-es" name="checkbox-h-lang-es" />
                <label euiLabel for="checkbox-h-lang-es">spanish</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-it" name="checkbox-h-lang-it" />
                <label euiLabel for="checkbox-h-lang-it">italian</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputCheckBox id="checkbox-h-lang-el" name="checkbox-h-lang-el" />
                <label euiLabel for="checkbox-h-lang-el">greek</label>
            </div>
        </div>
    </div>
</div>


<div class="doc-sample-section-title">Responsive Flexbox layout radios</div>
<div euiInputGroup class="row">
    <div class="col-md-3 eui-u-mb-s">
        <label euiLabel>How do you like your chocolate?</label>
    </div>
    <div class="col-md-9">
        <div class="eui-u-flex eui-u-flex-wrap">
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-white" name="chocolate" value="choco-white">
                <label euiLabel for="choco-white">white</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-milk" name="chocolate" value="choco-milk">
                <label euiLabel for="choco-milk">milk</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-dark" name="chocolate" value="choco-dark">
                <label euiLabel for="choco-dark">dark</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-nutty" name="chocolate" value="choco-nutty">
                <label euiLabel for="choco-nutty">nutty</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-fudge" name="chocolate" value="choco-fudge">
                <label euiLabel for="choco-fudge">fudge</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-caramel" name="chocolate" value="choco-caramel">
                <label euiLabel for="choco-caramel">caramelicious</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-fruity" name="chocolate" value="choco-fruity">
                <label euiLabel for="choco-fruity">fruity</label>
            </div>
            <div class="eui-u-inline-flex eui-u-mb-s">
                <input euiInputRadio id="choco-liquor" name="chocolate" value="choco-liquor">
                <label euiLabel for="choco-liquor">liquor</label>
            </div>
        </div>
    </div>
</div>


<div class="doc-sample-section-title">Advanced horizontal reactive sample form</div>

<eui-card class="eui-t-card-compact" euiSelected [euiHighlighted]="isEditActive">
	<eui-card-header>
		<eui-card-header-title>Traceability</eui-card-header-title>
        <eui-card-header-right-content>
            @if (!isEditActive) {
                <div class="eui-u-flex">
                    <button euiButton euiBasicButton euiPrimary euiOutline euiTooltip="Edit card content" aria-label="Edit card" class="eui-u-mr-m" (click)="onToggleEdit($event)">
                        <eui-icon-svg icon="eui-edit" size="s" aria-label="Edit Icon" />
                        <span euiLabel>Edit</span>
                    </button>
                </div>
            }
            @if (isEditActive) {
                <div class="eui-u-flex">
                    <button euiButton euiSecondary class="eui-u-ml-s" (click)="onToggleEdit($event)">Cancel</button>
                    <button euiButton euiPrimary class="eui-u-ml-s" (click)="onToggleEdit($event)">Save</button>
                </div>
            }
        </eui-card-header-right-content>
	</eui-card-header>
	<eui-card-content>

        <form [formGroup]="formValidation">

            <div class="row">

                <!-- ORIGIN -->
                <div class="col-md-6">
                    <div euiInputGroup class="row">
                        <div class="col-md-6">
                            <label euiLabel [euiRequired]="isEditActive">
                                <span class="eui-u-c-info">Country of origin</span>
                                <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the tooltip text" euiTooltipInfo />
                            </label>

                        </div>
                        <div class="col-md-6">
                            <select euiSelect formControlName="originCountry" [readonly]="!isEditActive">
                                @for (country of countryOptions; track $index) {
                                    <option [value]="country.value">{{country.label}}</option>
                                }
                            </select>
                            @if (render('originCountry')) {
                                <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
                            }
                        </div>
                    </div>
                </div>

                <!-- DESTINATION -->
                <div class="col-md-6">
                    <div euiInputGroup class="row">
                        <div class="col-md-6">
                            <label euiLabel [euiRequired]="isEditActive">
                                <span class="eui-u-c-info">Country(-ies) of destination</span>
                                <eui-icon-svg icon="eui-state-info" class="eui-u-ml-2xs" fillColor="info" euiTooltip="This is the tooltip text" euiTooltipInfo />
                            </label>
                        </div>
                        <div class="col-md-6">
                            @if (isEditActive) {
                                <select euiSelect id="country-multi" name="country-multi" formControlName="destinationCountries" [readonly]="!isEditActive" multiple>
                                    @for (country of countryOptions; track $index) {
                                        <option [value]="country.value">
                                            {{country.label}}
                                        </option>
                                    }
                                </select>
                            }
                            <!-- READONLY: we display multiple selected values string -->
                            @if (!isEditActive) {
                                <span>
                                    <strong>{{selectedDestinationCountries}}</strong>
                                </span>
                            }
                            @if (render('destinationCountries')) {
                                <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <br>

        <eui-fieldset label="Contact details of the manufacturer(s)">

            <!-- DETAILS -->
            @for (detail of manufacturersData; let i = $index, odd = $odd, even = $even; track $index) {
                <div [class]="{ odd: odd, even: even }">
                    <sample-form-detail [formData]="detail" [isEditActive]="isEditActive" />
                </div>
            }

        </eui-fieldset>
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EuiAppShellService, markFormGroupTouched } from '@eui/core';
import { Subject, startWith, takeUntil } from 'rxjs';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FIELDSET } from '@eui/components/eui-fieldset';
import { EUI_CARD } from '@eui/components/eui-card';
import { EuiMaxLengthDirective, EuiTooltipDirective } from '@eui/components/directives';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

import { HorizontalFormComponent } from './sample/component';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Horizontal',
    templateUrl: 'component.html',
    styles: [`
    .even {
        background-color: var(--eui-c-neutral-bg-light);
        padding-top: var(--eui-s-s);
    }
    .odd {
        background-color: var(--eui-c-neutral-bg-light);
        padding-top: var(--eui-s-s);
    }
    `],
    imports: [
        ReactiveFormsModule,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_SELECT,
        ...EUI_INPUT_RADIO,
        ...EUI_FIELDSET,
        ...EUI_CARD,
        EuiMaxLengthDirective,
        ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA,
        ...EUI_INPUT_CHECKBOX,
        EuiTooltipDirective,
        HorizontalFormComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalComponent implements OnInit, OnDestroy {

    isEditActive = false;
    value = 'Lorem ipsum';
    form: FormGroup = new FormGroup({
        inputHorizontal: new FormControl(this.value, [Validators.required]),
    });

    public formValidation: FormGroup;

    public countryOptions: any[] = [
        { value: 'be', label: 'Belgium' },
        { value: 'it', label: 'Italy' },
        { value: 'es', label: 'Spain' },
    ];
    public selectedDestinationCountries = '';

    // Used for details as demo datasource
    public manufacturersData: any[] = [
        { id: 1, name: 'Company 1', address: 'Address 1', countryCode: 'be', country: 'Belgium', zip: '1000', city: 'Brussels' },
        { id: 2, name: 'Company 2', address: 'Address 2', countryCode: 'it', country: 'Italy', zip: '00100', city: 'Roma' },
        { id: 3, name: 'Company 3', address: 'Address 3', countryCode: 'es', country: 'Spain', zip: '28001', city: 'Madrid' },
    ];

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private fb: FormBuilder = inject(FormBuilder);
    public asService: EuiAppShellService = inject(EuiAppShellService);

    ngOnInit(): void {
        // Get screen dimmer state and assign to isEditActive
        this.asService.state$.subscribe((state) => {
            this.isEditActive = state.isDimmerActive;
        });
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    // Form validators inits/reset
    public buildForm(): void {
        this.formValidation = this.fb.group({
            originCountry: [{ value: 'be', disabled: false }, [Validators.required]],
            destinationCountries: [{ value: ['be', 'it', 'es'], disabled: false }, [Validators.required]],
        });

        // Changing values from multi-select
        this.formValidation.get('destinationCountries').valueChanges
            .pipe(
                takeUntil(this.destroy$),
                startWith(this.formValidation.get('destinationCountries').value))
            .subscribe(value => {
                this.selectedDestinationCountries = this._getSelectedCountryLabels(value);
            });
    }

    public isFormValid(): boolean {
        markFormGroupTouched(this.formValidation.controls);
        if (this.formValidation.valid) {
            // Add customs checks here...
            return true;
        }
        return false;
    }

    public onToggleEdit(event: Event): void {
        this.isEditActive = !this.isEditActive;
        this.asService.dimmerActiveToggle();
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.formValidation?.get(controlName).invalid &&
            this.formValidation?.get(controlName).touched &&
            this?.formValidation.get(controlName).hasError('required');
    }

    private _getSelectedCountryLabels(value: string[] ): string {
        return this.countryOptions.filter((countryOption) => value.indexOf(countryOption.value) !== -1).map(c => c.label).join(', ');
    }
}
```

