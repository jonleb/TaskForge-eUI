---
description: Shows textarea integration with Angular reactive forms and template-driven forms (ngModel), including formControlName binding, validation, readonly/disabled states, and maxLengthReached event handling.
id: reactive-forms
---

```html
<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Reactive forms</div>

        <form [formGroup]="form">

            <div euiInputGroup>
                <label euiLabel euiRequired for="story-form">Tell us your story</label>
                <textarea euiTextArea
                        #textarea
                        id="story-form"
                        name="story-form"
                        rows="5"
                        formControlName="control"
                        placeholder="Compose an epic..."
                        [readonly]="!isEditActive">
                </textarea>
                @if (render('control')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>

            <div euiInputGroup>
                <label euiLabel euiRequired for="story_max1000">Tell us your story (euiMaxlength={{maxLength}})</label>
                <textarea euiTextArea
                        id="story_max{{maxLength}}"
                        name="large-story"
                        rows="8"
                        formControlName="largeControl"
                        [readonly]="!isEditActive"
                        [euiMaxlength]="maxLength"
                        (maxLengthReached)="onMaxLengthReached($event)">
                </textarea>
                @if (render('largeControl')) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
                @if (isMaxLengthReached) {
                    <eui-feedback-message euiWarning>The maximum length of {{maxLength}} characters has been reached !</eui-feedback-message>
                }
            </div>
        </form>
    </div>
    <div class="col-md-5">
        <div class="doc-sample-section-title">Reactive Form content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{form.getRawValue() | json}}</pre>
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
            <button euiButton euiPrimary euiOutline (click)="onToggleReadonly()" class="eui-u-mr-m eui-u-mb-m">Toggle Readonly</button>
            <button euiButton euiPrimary euiOutline (click)="onToggleDisabled()" class="eui-u-mr-m eui-u-mb-m">Toggle Disabled</button>
            <button euiButton euiPrimary euiOutline (click)="changeState()" class="eui-u-mr-m eui-u-mb-m">Change value</button>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-7">
        <div class="doc-sample-section-title">Two-way data binding (ngModel)</div>
        <form #myForm="ngForm" id="my-form" novalidate (ngSubmit)="onSubmitModel(myForm)">
            <div euiInputGroup>
                <label euiLabel euiRequired for="template_driven">Tell us your story</label>
                <textarea euiTextArea
                        id="template_driven"
                        name="story"
                        rows="5"
                        [(ngModel)]="model"
                        [readonly]="!isEditActive"
                        [disabled]="isDisabled"
                        required
                        #story="ngModel">
                </textarea>
                @if (isEditActive && story.errors?.required) {
                    <eui-feedback-message euiDanger>This field is required</eui-feedback-message>
                }
            </div>
        </form>
    </div>

    <div class="col-md-5">
        <div class="doc-sample-section-title">NgModel content</div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <pre class="eui-u-text-pre" tabindex="0">{{ myForm.value | json }}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="myForm.status === 'VALID'" [euiDanger]="myForm.status !== 'VALID'">
                        {{ myForm.status }}
                    </eui-badge>
                </div>
            </div>
        </div>
        <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
            <button form="my-form" type="submit" euiButton euiPrimary class="eui-u-mr-m eui-u-mb-m">Submit form</button>
            <button euiButton euiOutline euiPrimary (click)="changeState()" class="eui-u-mr-m eui-u-mb-m">Change value </button>
        </div>
    </div>
</div>
```

```typescript
/* eslint-disable max-len */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiGrowlService } from '@eui/core';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_TEXTAREA,
        EuiMaxLengthDirective,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {
    public isEditActive = true;
    public isDisabled = false;

    public isMaxLengthReached = false;
    public maxLength = 1000;
    public smallValue = 'It was a dark and stormy night...';
    public largeValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin mi velit, ac ornare nunc vehicula in. Pellentesque ultrices vitae eros rhoncus feugiat.
Sed in diam vitae felis posuere tempor eu nec augue. Duis nisl orci, finibus at pharetra at, ullamcorper at metus. Fusce ac neque ex. Nunc malesuada magna et arcu porttitor, tincidunt molestie diam posuere.
Praesent sit amet mi posuere, congue sem eget, iaculis leo. Phasellus fermentum tristique quam. Pellentesque eget lorem elit. Sed aliquet orci sed vestibulum volutpat.`;
    public readonly: boolean;
    public model = 'It was a dark and stormy night...';

    public form: FormGroup = new FormGroup({
        control: new FormControl('', [Validators.required]),
        largeControl: new FormControl(this.largeValue, [Validators.required]),
    });

    public growlService = inject(EuiGrowlService);

    public changeState() {
        const value = `It was a dark and stormy night...${Math.floor(Math.random() * 100)}`;
        this.form.get('control').setValue(value);
        this.model = value;
    }

    public onSubmit() {
        this.form.markAllAsTouched();
        this.form.get('control').markAsDirty();
        this.form.get('largeControl').markAsDirty();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public onSubmitModel(form: NgForm) {
        // console.log(form);
        if (form.status !== 'VALID') {
            this.growlService.growl({ severity: 'danger', summary: 'SUBMIT FAILED!', detail: 'Please fill in all required fields !' });
        } else {
            this.growlService.growl({ severity: 'success', summary: 'SUBMIT SUCCESS', detail: 'The Form has been successfully submitted.' });
        }
    }

    public changeReadonly() {
        this.readonly = !this.readonly;
    }

    public onMaxLengthReached(event: boolean) {
        this.isMaxLengthReached = event;
    }

    public onToggleDisabled() {
        this.isDisabled = !this.isDisabled;
        this.isDisabled ? this.form.disable() : this.form.enable();
    }

    public onToggleReadonly() {
        this.isEditActive = !this.isEditActive;
    }

    public render(controlName: string): boolean {
        return this.isEditActive && this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required');
    }
}
```

