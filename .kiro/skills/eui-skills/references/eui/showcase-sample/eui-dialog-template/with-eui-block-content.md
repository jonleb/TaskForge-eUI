---
description: Template-driven dialog opened via ViewChild using eui-block-content to block the form area during async validation.
id: with-eui-block-content
---

```html
<button euiButton type="button" (click)="openDialog()" aria-haspopup="dialog">Open Dialog</button>

<eui-dialog #dialog [title]="'Dialog with eui-block-content'">
    <eui-block-content [isBlocked]="isBlocked">
        <form [formGroup]="form">
            <div euiInputGroup>
                <label euiLabel [euiRequired]="true">Name</label>
                <input euiInputText formControlName="name" placeholder="Enter your name" />
                @if (render('name')) {
                    <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
                }
            </div>
            <div euiInputGroup>
                <label euiLabel [euiRequired]="true">E-mail</label>
                <input euiInputText formControlName="email" placeholder="Enter your e-mail" />
                @if (render('email')) {
                    <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
                }
            </div>
        </form>
        <br/>
        <button euiButton type="button" euiOutline euiPrimary (click)="closeDialog()">
            Close dialog from injected component
        </button>
    </eui-block-content>

    <eui-dialog-footer>
        <div class="eui-u-flex eui-u-flex-justify-content-between">
            <div class="eui-u-inline-flex eui-u-flex-justify-content-start eui-u-flex-gap-s">
                <button euiButton type="button" euiSecondary (click)="resetForm()">Reset</button>
            </div>
            <div class="eui-u-inline-flex eui-u-flex-justify-content-end eui-u-flex-gap-s">
                <button euiButton type="button" euiOutline (click)="closeDialog()">Cancel</button>
                <button euiButton type="button" euiPrimary (click)="onSubmitForm()"euiPrimary>OK</button>
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
import { EUI_BLOCK_CONTENT } from '@eui/components/eui-block-content';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'with-eui-block-content',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_BLOCK_CONTENT,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithEuiBlockContentComponent implements OnInit {
    public form: FormGroup;
    public isBlocked = false;

    readonly dialog = viewChild<EuiDialogComponent>('dialog');

    private euiDialogService = inject(EuiDialogService);
    private fb = inject(FormBuilder);
    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    public onSubmitForm() {
        if (this.isFormValid()) {
            this.simulateBackendBusinessValidation2();
        } else {
            this.growlService.growl({
                severity: 'danger',
                summary: 'Something went wrong...',
                detail: 'The form is invalid, please fix the errors first.',
            });
        }
    }

    public simulateBackendBusinessValidation2() {
        this.isBlocked = true;
        this.growlService.growl({
            severity: 'info',
            summary: 'Verifying backend business rules...',
        });
        setTimeout(() => {
            this.isBlocked = false;
            this.growlService.growl({
                severity: 'success',
                summary: 'Back-end verified!',
                detail: 'The form data has been successfully saved',
            });
            this.resetForm();
            this.dialog().closeDialog();
        }, 2500);
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
            this.form?.get(controlName).hasError('required')
        );
    }
}
```

