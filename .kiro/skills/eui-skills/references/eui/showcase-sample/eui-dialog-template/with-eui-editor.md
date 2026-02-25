---
description: Template-driven dialog opened via ViewChild embedding eui-editor in a validated form with a custom footer.
id: with-eui-editor
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog [title]="'Dialog with eui-editor'">
    <form [formGroup]="form">
        <div euiInputGroup>
            <label euiLabel [euiRequired]="true">Subject</label>
            <input euiInputText formControlName="subjectValue" placeholder="Email subject" />
            @if (render('subjectValue')) {
                <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
            }
        </div>
        <div euiInputGroup>
            <label euiLabel [euiRequired]="true">E-mail content</label>
            <eui-editor formControlName="emailValue" placeholder="Email content" format="html" />
            @if (render('emailValue')) {
                <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
            }
        </div>
    </form>

    <eui-dialog-footer>
        <div class="eui-u-flex eui-u-flex-justify-content-between eui-u-flex-gap-m">
            <div class="eui-u-inline-flex eui-u-flex-justify-content-start eui-u-flex-gap-s">
                <button euiButton type="button" euiSecondary (click)="resetForm()">Reset</button>
            </div>
            <div class="eui-u-inline-flex eui-u-flex-justify-content-end eui-u-flex-gap-s">
                <button euiButton type="button" euiOutline (click)="closeDialog()">Cancel</button>
                <button euiButton type="button" euiPrimary (click)="onSubmitForm()" euiPrimary>OK</button>
            </div>
        </div>
    </eui-dialog-footer>
</eui-dialog>
```

```typescript
import { Component, inject, OnInit, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EuiGrowlService } from '@eui/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    selector: 'with-eui-editor',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_GROUP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithEuiEditorComponent implements OnInit {
    public form: FormGroup;

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    private euiDialogService = inject(EuiDialogService);
    private fb = inject(FormBuilder);
    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.form = this.fb.group({
            subjectValue: ['', Validators.required],
            emailValue: ['', Validators.required],
        });
    }

    public onSubmitForm() {
        if (this.isFormValid()) {
            this.closeDialog();
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'Something went wrong...',
                detail: 'The form is invalid, please fix the errors first.',
            });
        }
    }

    public openDialog(): void {
        this.dialog().openDialog();
    }

    public isFormValid(): boolean {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            return true;
        }
        return false;
    }

    public resetForm() {
        this.form.reset();
    }

    public closeDialog(): void {
        this.euiDialogService.closeDialog();
    }

    public render(controlName: string): boolean {
        return (
            this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required')
        );
    }
}
```

