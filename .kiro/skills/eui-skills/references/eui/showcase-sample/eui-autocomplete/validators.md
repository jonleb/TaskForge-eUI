---
description: Uses the euiAutocompleteForceSelectionFromData validator to enforce selection from the list.
id: validators
---

```html
<div class="doc-sample-section-title">Reactive Form Support</div>
<form [formGroup]="form">

    <div euiInputGroup>
        <label euiRequired euiLabel>Select a fruit</label>
        <eui-autocomplete [autocompleteData]="autocompleteDataForm"
            formControlName="autoComplete"
            placeholder="Select a fruit" />
        @if (renderForm('autoComplete')) {
            <eui-feedback-message euiDanger>Value in not part of the data</eui-feedback-message>
        }
    </div>

    <button (click)="onSubmit()"euiButton euiPrimary type="button">Submit</button>
</form>

<div class="doc-sample-section-title">Reactive Form with chips Support</div>
<form [formGroup]="formChips">

    <div euiInputGroup>
        <label euiRequired euiLabel>Select fruits</label>
        <eui-autocomplete [autocompleteData]="autocompleteDataFormChips"
            hasChips
            formControlName="autoCompleteChips"
            placeholder="Select a fruit" />
        @if (renderFormChips('autoCompleteChips')) {
            <eui-feedback-message euiDanger>Value in not part of the data</eui-feedback-message>
        }
    </div>

    <button (click)="onSubmitChips()"euiButton euiPrimary type="button">Submit</button>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import {
    EUI_AUTOCOMPLETE,
    euiAutocompleteForceSelectionFromData,
    EuiAutoCompleteItem,
} from '@eui/components/eui-autocomplete';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    // eslint-disable-next-line
    selector: 'validators',
    templateUrl: './component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidatorsComponent implements OnInit, OnDestroy {

    public autocompleteDataForm: EuiAutoCompleteItem[] = [
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
    ];

    public autocompleteDataFormChips: EuiAutoCompleteItem[] = [
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
    ];

    public form: FormGroup;
    public formChips: FormGroup;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnInit(): void {
        this.form = new FormGroup({
            autoComplete: new FormControl(null, [euiAutocompleteForceSelectionFromData]),
        });

        this.formChips = new FormGroup({
            autoCompleteChips: new FormControl(null, [euiAutocompleteForceSelectionFromData]),
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderForm(controlName: string): boolean {
        return this.form?.get(controlName).invalid &&
            this.form?.get(controlName).touched &&
            this?.form.get(controlName).hasError('isInData');
    }

    public renderFormChips(controlName: string): boolean {
        return this.formChips?.get(controlName).invalid &&
            this.formChips?.get(controlName).touched &&
            this?.formChips.get(controlName).hasError('isInData');
    }

    public onResetForm(): void {
        this.form.reset();
    }

    public onSubmit(): void {
        console.log(this.form);
    }

    public onSubmitChips(): void {
        console.log(this.formChips);
    }
}
```

