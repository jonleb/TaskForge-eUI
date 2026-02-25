---
description: Displays radio buttons in disabled state using the disabled attribute, making them non-focusable and non-interactive, with dynamic toggling and responsive flexbox layouts.
id: disabled
---

```html
<input type="radio"
       id="disabled1"
       name="radioDisabled"
       euiInputRadio
       disabled />
<label euiLabel for="disabled1">Disabled</label>

<input type="radio"
       id="disabled2"
       name="radioDisabled"
       euiInputRadio
       disabled
       checked />
<label euiLabel for="disabled2">Disabled</label>



<div class="doc-sample-section-title">Responsive flexbox radios</div>
<button euiButton euiSizeS (click)="onTogggleDisable()">
        @if (isDisabled) {
                <span>Edit mode</span>
        } @else {
                <span>Disabled mode</span>
        }
</button>

<div class="row eui-u-mt-m">
	<div class="col-md-6">
		<div euiInputGroup>
			<label euiLabel>Horizontal layout</label>
			<div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-xs">
				<div class="eui-u-inline-flex">
					<input euiInputRadio id="disabled-radio-horizontal-1" name="disabled-radio-horizontal" [disabled]="isDisabled" [value]="'one'" checked>
					<label for="disabled-radio-horizontal-1">One</label>
				</div>
				<div class="eui-u-inline-flex">
					<input euiInputRadio id="disabled-radio-horizontal-2" name="disabled-radio-horizontal" [disabled]="isDisabled" [value]="'two'">
					<label for="disabled-radio-horizontal-2">Two</label>
				</div>
				<div class="eui-u-inline-flex">
					<input euiInputRadio id="disabled-radio-horizontal-3" name="disabled-radio-horizontal" [disabled]="isDisabled" [value]="'three'">
					<label for="disabled-radio-horizontal-3">Three</label>
				</div>
				<div class="eui-u-inline-flex">
					<input euiInputRadio id="disabled-radio-horizontal-4" name="disabled-radio-horizontal" [disabled]="isDisabled" [value]="'four'">
					<label for="disabled-radio-horizontal-4">Four</label>
				</div>
				<div class="eui-u-inline-flex">
					<input euiInputRadio id="disabled-radio-horizontal-5" name="disabled-radio-horizontal" [disabled]="isDisabled" [value]="'five'">
					<label for="disabled-radio-horizontal-5">Five</label>
				</div>
			</div>
		</div>
	</div>

	<div class="col-md-6">
		<div euiInputGroup>
			<label euiLabel>Vertical layout</label>
			<div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-s">
				<div class="eui-u-flex">
					<input euiInputRadio id="disabled-radio-vertical-1" name="disabled-radio-vertical" [disabled]="isDisabled" [value]="'one'">
					<label for="disabled-radio-vertical-1">One</label>
				</div>
				<div class="eui-u-flex">
					<input euiInputRadio id="disabled-radio-vertical-2" name="disabled-radio-vertical" [disabled]="isDisabled" [value]="'two'" checked>
					<label for="disabled-radio-vertical-2">Two</label>
				</div>
				<div class="eui-u-flex">
					<input euiInputRadio id="disabled-radio-vertical-3" name="disabled-radio-vertical" [disabled]="isDisabled" [value]="'three'">
					<label for="disabled-radio-vertical-3">Three</label>
				</div>
				<div class="eui-u-flex">
					<input euiInputRadio id="disabled-radio-vertical-4" name="disabled-radio-vertical" [disabled]="isDisabled" [value]="'four'">
					<label for="disabled-radio-vertical-4">Four</label>
				</div>
				<div class="eui-u-flex">
					<input euiInputRadio id="disabled-radio-vertical-5" name="disabled-radio-vertical" [disabled]="isDisabled" [value]="'five'">
					<label for="disabled-radio-vertical-5">Five</label>
				</div>
			</div>
		</div>
	</div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_INPUT_RADIO, ...EUI_INPUT_GROUP, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {

    public isDisabled = true;

    public onTogggleDisable(): void {
        this.isDisabled = !this.isDisabled;
    }
}
```

