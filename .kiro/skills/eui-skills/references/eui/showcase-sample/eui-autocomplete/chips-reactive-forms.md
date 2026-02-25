---
description: Chips-based multi-select in reactive forms with min and max validation.
id: chips-reactive-forms
---

```html
<form [formGroup]="formChips">
    <div euiInputGroup>
        <label euiRequired euiLabel for="autocomplete-3">Select fruits</label>
        <eui-autocomplete [autocompleteData]="autocompleteData()"
            hasChips
            [isChipsRemovable]="formChips.controls['autoCompleteChips'].status !== 'DISABLED'"
            [isReadonly]="isReadOnly"
            formControlName="autoCompleteChips"
            inputId="autocomplete-3"
            isChipsSorted
            placeholder="Select a fruit" />
        @if (renderFormChips('autoCompleteChips')) {
            <eui-feedback-message euiDanger>
                Please choose at least 2 fruits and maximum 4
            </eui-feedback-message>
        }
    </div>

    <button (click)="onResetFormChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Reset
    </button>
    <button (click)="onDisableFieldChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Toggle disabled
    </button>
    <button (click)="onReadOnlyFieldChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Toggle readonly
    </button>
    <button (click)="onPatchValueChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Patch value
    </button>
    <button (click)="onSubmitChips()" class="eui-u-mr-xs" euiButton euiPrimary type="button">Submit</button>

    <br /><br />

    <pre class="eui-u-text-pre">{{ formChips.value | json }}</pre>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EuiGrowlService } from '@eui/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { FakerService } from '../../../../faker.service';

import { EuiAutocompleteService } from '../reactive-forms-async/services/eui-autocomplete.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-reactive-forms',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        JsonPipe,
    ],
    providers: [EuiAutocompleteService],
})
export class ChipsReactiveFormsComponent implements OnInit {
    private faker = inject(FakerService).instance;
    public autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public itemsServiceDataChips = signal<EuiAutoCompleteItem[]>([]);

    public formChips: FormGroup;
    public isReadOnly = signal(false);
    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formChips = new FormGroup({
            autoCompleteChips: new FormControl(
                {
                    value: [this.autocompleteData()[0], this.autocompleteData()[4]],
                    disabled: false,
                },
                [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
            ),
        });
    }

    public renderFormChips(controlName: string): boolean {
        return this.formChips?.get(controlName).invalid &&
            this.formChips?.get(controlName).touched &&
            (
                this?.formChips.get(controlName).hasError('required') ||
                this?.formChips.get(controlName).hasError('minlength') ||
                this?.formChips.get(controlName).hasError('maxlength')
            ) &&
            !this.isReadOnly();
    }

    public onResetFormChips(): void {
        this.formChips.reset();
    }

    public onDisableFieldChips(): void {
        const formControl = this.formChips.get('autoCompleteChips');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldChips(): void {
        this.isReadOnly.update(value => !value);
    }

    public onPatchValueChips(): void {
        this.formChips.get('autoCompleteChips').patchValue([
            this.autocompleteData()[1],
            this.autocompleteData()[2],
        ]);
    }

    public onSubmitChips(): void {
        this.formChips.markAllAsTouched();
        if (this.formChips.status !== 'VALID') {
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

