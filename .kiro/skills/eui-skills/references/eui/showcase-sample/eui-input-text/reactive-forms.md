---
description: Angular reactive forms integration with FormControl, validation, euiMaxlength directive, and form state management.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Reactive form</div>
        <form [formGroup]="form">
            <div euiInputGroup>
                <label euiLabel euiRequired for="text-form">Label</label>
                <div euiInputGroupAddOn>
                    <input euiInputText id="text-form" formControlName="control" [readonly]="isReadonly"/>
                    @if (!isReadonly) {
                        <button euiButton euiPrimary euiOutline [euiDisabled]="isDisabled" (click)="onSubmit()">Submit</button>
                    }
                </div>
                @if (!isReadonly && render('control')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired for="story_max255">Tell us your story (euiMaxlength=255)</label>
                <input euiInputText
                        id="story_max255"
                        formControlName="storyControl"
                        [readonly]="isReadonly"
                        [euiMaxlength]="255"
                        (maxLengthReached)="onMaxLengthReached($event)" />
                @if (!isReadonly && render('storyControl')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
                @if (!isReadonly && isMaxLengthReached) {
                    <eui-feedback-message euiWarning>The maximum length of 255 characters has been reached !</eui-feedback-message>
                }
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ form.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.status === 'VALID'" [euiDanger]="form.status !== 'VALID'">
                        {{ form.status }}
                    </eui-badge>
                </div>
            </div>
        </div>

        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button euiButton euiPrimary (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiOutline euiPrimary (click)="isReadonly = !isReadonly" class="eui-u-mr-m eui-u-mb-m">Toggle readonly</button>
            <button euiButton euiOutline euiPrimary (click)="toggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle disabled</button>
            <button euiButton euiOutline euiPrimary (click)="onChangeValue()" class="eui-u-mr-m eui-u-mb-m">Set random value</button>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiGrowlService } from '@eui/core';


@Component({
    // tslint:disable:max-line-length
    // tslint:disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        EuiMaxLengthDirective,
        ...EUI_ICON,
        JsonPipe,
    ],
    providers: [
        EuiGrowlService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {

    public isReadonly = false;
    public isDisabled = false;
    public isMaxLengthReached = false;
    public model1 = 'Input text sample';
    public model2 = 'Input text sample with addon';
    public largeValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ' +
        'ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.';

    public form: FormGroup = new FormGroup({
        control: new FormControl({ value: null, disabled: this.isDisabled }, [Validators.required]),
        storyControl: new FormControl({ value: this.largeValue, disabled: this.isDisabled }, [Validators.required]),
    });

    public growlService = inject(EuiGrowlService);

    public onChangeValue() {
        const value = `Input text sample ${Math.floor(Math.random() * 100)}`;
        this.form.get('control').setValue(value);
        this.model1 = value;
        this.model2 = value;
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onMaxLengthReached(event: boolean) {
        this.isMaxLengthReached = event;
    }

    public render(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }
}
```

