import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EuiGrowlService } from '@eui/core';

import { EUI_RATING } from '@eui/components/eui-rating';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ...EUI_RATING,
        JsonPipe,
        ...EUI_BUTTON,
    ],
})
export class ReactiveFormsComponent {
    public isReadOnly = false;
    public form: FormGroup = new FormGroup({
        rating: new FormControl({ value: 3, disabled: false }),
    });

    private growlService = inject(EuiGrowlService);

    public onResetForm(): void {
        this.form.reset();
    }

    public onDisableField(): void {
        this.form.get('rating').disabled ? this.form.get('rating').enable() : this.form.get('rating').disable();
    }

    public onReadOnlyField(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    public onPatchValue(): void {
        this.form.get('rating').patchValue(1);
    }

    public onSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.status !== 'VALID') {
            this.growlService.growl({
                severity: 'danger',
                summary: 'SUBMIT FAILED!',
                detail: 'Please fill in all required fields !',
            });
        } else {
            this.growlService.growl({
                severity: 'success',
                summary: 'SUBMIT SUCCESS',
                detail: 'The Form has been successfully submitted.',
            });
        }
    }
}
