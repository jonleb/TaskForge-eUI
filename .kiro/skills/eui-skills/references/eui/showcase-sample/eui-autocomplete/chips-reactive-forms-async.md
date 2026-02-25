---
description: Async multi-select chips with reactive-form validation and loading state.
id: chips-reactive-forms-async
---

```html
<form [formGroup]="formAsyncChips">
    <div euiInputGroup>
        <label euiRequired euiLabel for="autocomplete-4">Select countries</label>
        <eui-autocomplete (inputChange)="onInputChanged($event)"
            [autocompleteData]="itemsServiceDataChips()"
            hasChips
            [isChipsRemovable]="formAsyncChips.controls['autoCompleteChips'].status !== 'DISABLED'"
            isFreeValueAllowed
            [isLoading]="itemsDataLoadingChips"
            [isReadonly]="isReadOnlyFormAsync"
            formControlName="autoCompleteChips"
            inputId="autocomplete-4"
            isAsync
            placeholder="EU country name" />
        @if (renderFormAsyncChips('autoCompleteChips')) {
            <eui-feedback-message euiDanger>
                Please choose at least 2 countries and maximum 4
            </eui-feedback-message>
        }
    </div>

    <button (click)="onResetFormAsyncChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Reset
    </button>
    <button (click)="onDisableFieldFormAsyncChips()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Toggle disabled
    </button>
    <button (click)="onReadOnlyFieldFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Toggle readonly
    </button>
    <button (click)="onPatchValueFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Patch value
    </button>
    <button (click)="onSubmitFormAsyncChips()" class="eui-u-mr-xs" euiButton euiPrimary type="button">Submit</button>

    <br /><br />

    <pre>{{ formAsyncChips.value | json }}</pre>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, Subject, take, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EuiGrowlService } from '@eui/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

import { EuiAutocompleteService } from '../reactive-forms-async/services/eui-autocomplete.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-reactive-forms-async',
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
export class ChipsReactiveFormsAsyncComponent implements OnInit, OnDestroy {

    public itemsServiceDataChips = signal<EuiAutoCompleteItem[]>([]);
    public formAsyncChips: FormGroup;
    public itemsDataLoadingChips = signal(false);
    public isReadOnlyFormAsync = signal(false);

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private euiAutocompleteService = inject(EuiAutocompleteService);
    private growlService = inject(EuiGrowlService);

    ngOnInit(): void {
        this.formAsyncChips = new FormGroup({
            autoCompleteChips: new FormControl(
                { value: null, disabled: false },
                [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
            ),
        });

        this.formAsyncChips.get('autoCompleteChips').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderFormAsyncChips(controlName: string): boolean {
        return this.formAsyncChips?.get(controlName).invalid &&
            this.formAsyncChips?.get(controlName).touched &&
            (
                this?.formAsyncChips.get(controlName).hasError('required') ||
                this?.formAsyncChips.get(controlName).hasError('minlength') ||
                this?.formAsyncChips.get(controlName).hasError('maxlength')
            ) &&
            !this.isReadOnlyFormAsync();
    }

    public onResetFormAsyncChips(): void {
        this.formAsyncChips.reset();
    }

    public onDisableFieldFormAsyncChips(): void {
        const formControl = this.formAsyncChips.get('autoCompleteChips');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldFormAsync(): void {
        this.isReadOnlyFormAsync.update(value => !value);
    }

    public onPatchValueFormAsync(): void {
        this.euiAutocompleteService.getValues().pipe(take(1)).subscribe((values: any) => {
            const v = values.map((value: any) => ({ id: value.id, label: value.name }));

            if (this.itemsServiceDataChips().length === 0) {
                this.itemsServiceDataChips.set(v);
            }
            this.formAsyncChips.get('autoCompleteChips').patchValue(v);
        });
    }

    public onSubmitFormAsyncChips(): void {
        this.formAsyncChips.markAllAsTouched();
        if (this.formAsyncChips.status !== 'VALID') {
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

    public onInputChanged(value: string): void {
        if (typeof (value) === 'string') {
            this.itemsDataLoadingChips.set(true);
            this.euiAutocompleteService.getSearchResult(value).pipe(
                take(1),
                debounceTime(500),
                delay(500),
            ).subscribe((searchResults: any) => {
                this.itemsServiceDataChips.set(searchResults.data.map((s: any) => ({ id: s.id, label: s.name })));
                this.itemsDataLoadingChips.set(false);
            });
        }
    }
}
```

