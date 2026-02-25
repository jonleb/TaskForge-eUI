---
description: Explains reactive forms approach with euiInputGroup, providing synchronous data flow, scalable model-driven form handling, and proper disabled attribute usage to avoid ExpressionChangedAfterItHasBeenCheckedError.
id: Forms
---

```html
<strong>Reactive forms</strong> provide a scalable model-driven approach to handling form inputs whose values change over time.

<p class="eui-u-text-paragraph">They provide direct access to the underlying form API and use <strong>synchronous data flow</strong> between the view and the data model, which makes creating large-scale forms easier.
Reactive forms require less setup for testing, and testing does not require deep understanding of change detection to properly test form updates and validation.</p>

<p class="eui-u-text-paragraph">Reactive forms differ from template-driven forms in distinct ways.
They provide synchronous access to the data model, immutability with observable operators, change tracking through observable streams, having multiple controls in a group, validate form values, etc.
They can also be created dynamically by adding or removing controls at run time.</p>

<p class="eui-u-text-paragraph">For more information see :</p>
<ul>
    <li><a class="eui-u-text-link-external" href="https://angular.io/guide/reactive-forms" target="_blank">Reactive forms</a></li>
    <li><a class="eui-u-text-link-external" href="https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/" target="_blank">Angular Forms Guide - Template Driven and Reactive Forms</a></li>

</ul>
<br><br>

<eui-alert>
    <eui-alert-title>Important remark when using the <u>disabled</u> attribute with reactive forms</eui-alert-title>
    <p class="eui-u-text-paragraph">If you set the <strong>disabled</strong> attribute to true when you set up the form control in your component class, it will actually be set in the DOM for you.
    We recommend using the following approach to avoid the <code class="eui-u-text-code">ExpressionChangedAfterItHasBeenCheckedError</code>.</p>
    Example:<br>
<pre class="eui-u-text-pre">
    form = new FormGroup({{ '{' }}
        firstName: new FormControl({{ '{' }}value: 'Nancy', disabled: true{{ '}' }}, Validators.required),
        lastName: new FormControl('Drew', Validators.required),
    {{ '}' }});</pre>

    More resources and information can be found here :<br>
    <ul>
        <li><a class="eui-u-text-link-external" href="https://angular.io/errors/NG0100" target="_blank">NG0100: Expression has changed after it was checked</a></li>
        <li><a class="eui-u-text-link-external" href="https://blog.angular-university.io/angular-debugging/" target="_blank">Angular Debugging "Expression has changed after it was checked": Simple Explanation (and Fix)</a></li>
    </ul>
</eui-alert>


<div class="doc-sample-section-title">Reactive form with errors management & validators</div>
<div class="row">
    <div class="col-md-8">
        <form [formGroup]="form">
            <div euiInputGroup>
                <label for="email" euiLabel euiRequired>Email address</label>
                <eui-helper-text>Hint: provide a valid email address</eui-helper-text>
                <input euiInputText formControlName="multiErrors" id="email" />
                @if (form.get('multiErrors').errors?.required) {
                    <eui-feedback-message euiDanger>
                        This field is required
                    </eui-feedback-message>
                }
                @if (form.get('multiErrors').errors?.minlength) {
                    <eui-feedback-message euiDanger>
                        This minimum length is 10 characters
                    </eui-feedback-message>
                }
                @if (form.get('multiErrors').errors?.maxlength) {
                    <eui-feedback-message euiDanger>
                        The maximum length is 50 characters
                    </eui-feedback-message>
                }
                @if (form.get('multiErrors').errors?.email) {
                    <eui-feedback-message euiDanger>
                        This is not a valid email
                    </eui-feedback-message>
                }
            </div>
            <div euiInputGroup>
                <label for="max-length-bytes" euiLabel>Max length in bytes</label>
                <input euiInputText formControlName="maxLengthBytes" id="max-length-bytes" />
                @if (form.get('maxLengthBytes').errors?.maxLengthBytes) {
                    <eui-feedback-message euiDanger>
                        The maximum length is {{form.get('maxLengthBytes').errors.maxLengthBytes.required}} bytes (currently: {{form.get('maxLengthBytes').errors.maxLengthBytes.actual}} bytes)
                    </eui-feedback-message>
                }
            </div>
        </form>
    </div>
    <div class="col-md-4">
        <div class="doc-sample-section-title"><strong>Reactive form content</strong></div>
        <div class="eui-showcase-demo eui-u-mt-m">
            <div class="code" style="overflow-y: auto;" tabindex="0">
                <strong>Form errors</strong>
                <pre class="eui-u-text-pre" tabindex="0">&lcub; multiErrors: {{form.get('multiErrors').errors | json}}, maxLengthBytes: {{form.get('maxLengthBytes').errors | json}} &rcub;</pre>
                <strong>Form value</strong>
                <pre class="eui-u-text-pre" tabindex="0">{{form.value | json}}</pre>
                <div class="eui-u-flex">
                    <div class="eui-u-f-bold eui-u-mr-m">Form status</div>
                    <eui-badge euiSizeS [euiSuccess]="form.status === 'VALID'" [euiDanger]="form.status !== 'VALID'">
                        {{ form.status }}
                    </eui-badge>
                </div>
            </div>
            <div class="eui-u-flex eui-u-flex-wrap eui-u-mt-m">
                <button euiButton euiPrimary (click)="onSubmit()" class="eui-u-mr-m eui-u-mb-m">Submit form</button>
                <button euiButton euiOutline euiPrimary (click)="onResetForm()" class="eui-u-mr-m eui-u-mb-m">Reset</button>
            </div>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormsModule as AngularFormsModule,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { markFormGroupTouched } from '@eui/core';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_HELPER_TEXT } from '@eui/components/eui-helper-text';
import { maxLengthBytes } from '@eui/components/validators';


@Component({
    // tslint:disable-next-line
    selector: 'Forms',
    templateUrl: 'component.html',
    styles: [`ul li {
        list-style:outside;
        margin-left: 1rem;
    }`],
    imports: [
        AngularFormsModule,
        ReactiveFormsModule,
        ...EUI_ALERT,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_BADGE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_HELPER_TEXT,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent implements OnInit {

    public form: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);

    ngOnInit(): void {
        this.form = this.fb.group({
            multiErrors: new FormControl('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50),
                Validators.email,
            ]),
            maxLengthBytes: new FormControl('', maxLengthBytes(6)),
        });
    }

    public onSubmit() {
        markFormGroupTouched(this.form.controls);
    }

    public onResetForm() {
        this.form.reset();
    }

}
```

