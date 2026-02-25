---
description: Reactive form with async data loading, isAsync, and a loading indicator.
id: reactive-forms-async
---

```html
<form [formGroup]="formAsync">

    <div euiInputGroup>
        <label euiRequired euiLabel for="autocomplete-2">Select a country</label>
        <eui-autocomplete [autocompleteData]="itemsServiceData"
            isFreeValueAllowed
            [isLoading]="itemsDataLoading"
            [isReadonly]="isReadOnlyAsync"
            [placeholder]="'EU country name'"
            formControlName="autoComplete"
            inputId="autocomplete-2"
            isAsync />
        @if (renderFormAsync('autoComplete')) {
            <eui-feedback-message euiDanger>This field is <strong>required</strong></eui-feedback-message>
        }
    </div>

    <button (click)="onResetFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Reset
    </button>
    <button (click)="onDisableFieldFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Toggle
        disabled
    </button>
    <button (click)="onReadOnlyFieldFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">
        Toggle readonly
    </button>
    <button (click)="onPatchValueFormAsync()" class="eui-u-mr-xs" euiButton euiOutline euiPrimary type="button">Patch
        value
    </button>
    <button (click)="onSubmitFormAsync()" class="eui-u-mr-xs" euiButton euiPrimary type="button">Submit</button>

    <br />

    <pre>{{ formAsync.value | json }}</pre>
</form>
```

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, delay, take, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EuiGrowlService } from '@eui/core';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

import { EuiAutocompleteService } from './services/eui-autocomplete.service';


@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms-async',
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
    providers: [EuiAutocompleteService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsAsyncComponent implements OnInit, OnDestroy {

    public formAsync: FormGroup;
    public itemsDataLoading = false;
    public itemsServiceData: EuiAutoCompleteItem[] = [];
    public isReadOnlyAsync = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    private euiAutocompleteService = inject(EuiAutocompleteService);
    private growlService = inject(EuiGrowlService);
    private cd = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.formAsync = new FormGroup({
            autoComplete: new FormControl<EuiAutoCompleteItem>(
                { value: null, disabled: false },
                [Validators.required],
            ),
        });

        this.formAsync.get('autoComplete').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.itemsDataLoading = true;
                this.euiAutocompleteService.getSearchResult(value.label).pipe(
                    take(1),
                    debounceTime(500),
                    delay(500),
                ).subscribe((searchResults: any) => {
                    this.itemsServiceData = searchResults.data.map((s: any) => ({ id: s.id, label: s.name }));

                    this.itemsDataLoading = false;
                    this.cd.detectChanges();
                });
            } else {
                this.itemsServiceData = [];
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public renderFormAsync(controlName: string): boolean {
        return this.formAsync?.get(controlName).invalid &&
            this.formAsync?.get(controlName).touched &&
            this?.formAsync.get(controlName).hasError('required') &&
            !this.isReadOnlyAsync;
    }

    public onResetFormAsync(): void {
        this.formAsync.reset();
    }

    public onDisableFieldFormAsync(): void {
        const formControl = this.formAsync.get('autoComplete');
        formControl.disabled ? formControl.enable() : formControl.disable();
    }

    public onReadOnlyFieldFormAsync(): void {
        this.isReadOnlyAsync = !this.isReadOnlyAsync;
    }

    public onPatchValueFormAsync(): void {
        this.euiAutocompleteService.getOneValue().pipe(take(1)).subscribe((oneValue: any) => {
            const value = { id: oneValue.id, label: oneValue.name };
            if (this.itemsServiceData.length === 0) {
                this.itemsServiceData = [value];
            }
            this.formAsync.get('autoComplete').patchValue(value);
        });
    }

    public onSubmitFormAsync(): void {
        this.formAsync.markAllAsTouched();
        if (this.formAsync.status !== 'VALID') {
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

