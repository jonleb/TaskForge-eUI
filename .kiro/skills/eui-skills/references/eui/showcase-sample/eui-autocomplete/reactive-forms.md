---
description: Reactive form integration with required validation plus reset, disable, and patch actions.
id: reactive-forms
---

```html
<form [formGroup]="form">

    <div euiInputGroup>
        <label euiRequired euiLabel for="autocomplete-1">Select a fruit</label>
        <eui-autocomplete [attr.aria-readonly]="isReadOnly ? true : null"
            [autocompleteData]="autocompleteDataFormAutocomplete"
            isFreeValueAllowed
            [isReadonly]="isReadOnly"
            formControlName="autoComplete"
            inputId="autocomplete-1"
            placeholder="Select a fruit" />
        @if (renderForm('autoComplete')) {
            <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
        }
    </div>

    <button (click)="onResetForm()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Reset</button>
    <button (click)="onDisableField()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Toggle
        disabled
    </button>
    <button (click)="onReadOnlyField()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Toggle
        readonly
    </button>
    <button (click)="onPatchValue()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Patch value
    </button>
    <button (click)="onSubmit()" class="eui-u-mr-xs" euiButton euiPrimary type="button">Submit</button>

    <br />

    <pre>{{ form.value | json }}</pre>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EuiGrowlService } from '@eui/core';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_AUTOCOMPLETE,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {

    public autocompleteDataFormAutocomplete: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
        { id: 100, label: 'Ananas1' },
        { id: 200, label: 'Apple1' },
        { id: 300, label: 'Banana' },
        { id: 400, label: 'Blackberry1' },
        { id: 500, label: 'Coconut1' },
        { id: 600, label: 'Kiwi1' },
        { id: 700, label: 'Lemon1' },
        { id: 900, label: 'Lime1' },
        { id: 1000, label: 'Orange1' },
        { id: 1001, label: 'Strawberry1' },
        { id: 1002, label: 'Raspberry1' },
        { id: 1000, label: 'Ananas2' },
        { id: 2000, label: 'Apple2' },
        { id: 3000, label: 'Banana' },
        { id: 4000, label: 'Blackberry2' },
        { id: 5000, label: 'Coconut2' },
        { id: 6000, label: 'Kiwi2' },
        { id: 7000, label: 'Lemon2' },
        { id: 9000, label: 'Lime2' },
        { id: 10000, label: 'Orange2' },
        { id: 10001, label: 'Strawberry2' },
        { id: 10002, label: 'Raspberry2' },
        { id: 100000, label: 'Ananas3' },
        { id: 200000, label: 'Apple3' },
        { id: 300000, label: 'Banana' },
        { id: 400000, label: 'Blackberry3' },
        { id: 500000, label: 'Coconut3' },
        { id: 600000, label: 'Kiwi3' },
        { id: 700000, label: 'Lemon3' },
        { id: 900000, label: 'Lime3' },
        { id: 1000000, label: 'Orange3' },
        { id: 1000001, label: 'Strawberry3' },
        { id: 1000002, label: 'Raspberry3' },
    ];

    public form: FormGroup;
    public itemsDataLoading = false;
    public isReadOnly = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.form = new FormGroup({
            autoComplete: new FormControl<EuiAutoCompleteItem>(
                { value: this.autocompleteDataFormAutocomplete[0], disabled: false },
                [Validators.required],
            ),
        });

        this.form.get('autoComplete').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderForm(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('required') &&
            !this.isReadOnly;
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onDisableField(): void {
        const formControl = this.form.get('autoComplete');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyField(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    public onPatchValue(): void {
        this.form.get('autoComplete').patchValue(this.autocompleteDataFormAutocomplete[1]);
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
```

