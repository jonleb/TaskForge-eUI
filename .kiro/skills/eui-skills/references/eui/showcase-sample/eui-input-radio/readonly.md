---
description: Demonstrates radio buttons in readonly mode using readonly attribute, allowing users to see the selection but not modify it, with dynamic toggling and responsive layouts.
id: readonly
---

```html
<div euiInputGroup>
    <label euiLabel>Sample (Unchecked)</label>
    <input euiInputRadio
            id="radio-readOnly-unchecked-1"
            name="customLabel"
            value="value1"
            readonly />
    <label for="radio-readOnly-unchecked-1">Radio label 1</label>

    <input euiInputRadio
            id="radio-readOnly-unchecked-2"
            name="customLabel"
            value="value2"
            readonly />
    <label for="radio-readOnly-unchecked-2">Radio label 2</label>
</div>

<div euiInputGroup>
    <label euiLabel>Sample (Checked)</label>
    <input euiInputRadio
            id="radio-readOnly"
            name="radioReadOnly"
            checked
            readonly />
    <label for="radio-readOnly">Radio Label 1</label>

    <input euiInputRadio
            id="radio-readOnly-1"
            name="radioReadOnly"
            readonly />
    <label for="radio-readOnly-1">Radio Label 2</label>
</div>


<div class="doc-sample-section-title">Responsive flexbox radios</div>
<button euiButton euiSizeS (click)="onToggleReadOnly()">
        @if (isReadOnly) {
                <span>Edit mode</span>
        } @else {
                <span>Readonly mode</span>
        }
</button>

<div class="row eui-u-mt-m">
	<div class="col-md-6">
		<div euiInputGroup>
			<label euiLabel>Horizontal layout</label>
			<div class="eui-u-flex eui-u-flex-wrap" [class.eui-u-flex-gap-s]="!isReadOnly">
				<div class="eui-u-inline-flex">
						<input euiInputRadio id="ro-radio-horizontal-1" name="ro-radio-horizontal" [readonly]="isReadOnly" [value]="'one'" checked>
						<label for="ro-radio-horizontal-1">One</label>
				</div>
				<div class="eui-u-inline-flex">
						<input euiInputRadio id="ro-radio-horizontal-2" name="ro-radio-horizontal" [readonly]="isReadOnly" [value]="'two'">
						<label for="ro-radio-horizontal-2">Two</label>
				</div>
				<div class="eui-u-inline-flex">
						<input euiInputRadio id="ro-radio-horizontal-3" name="ro-radio-horizontal" [readonly]="isReadOnly" [value]="'three'">
						<label for="ro-radio-horizontal-3">Three</label>
				</div>
				<div class="eui-u-inline-flex">
						<input euiInputRadio id="ro-radio-horizontal-4" name="ro-radio-horizontal" [readonly]="isReadOnly" [value]="'four'">
						<label for="ro-radio-horizontal-4">Four</label>
				</div>
				<div class="eui-u-inline-flex">
						<input euiInputRadio id="ro-radio-horizontal-5" name="ro-radio-horizontal" [readonly]="isReadOnly" [value]="'five'">
						<label for="ro-radio-horizontal-5">Five</label>
				</div>
			</div>
		</div>
	</div>

	<div class="col-md-6">
		<div euiInputGroup>
			<label euiLabel>Vertical layout</label>
			<div class="eui-u-flex eui-u-flex-wrap" [class.eui-u-flex-gap-s]="!isReadOnly">
				<div class="eui-u-flex">
						<input euiInputRadio id="ro-radio-vertical-1" name="ro-radio-vertical" [readonly]="isReadOnly" [value]="'one'">
						<label for="ro-radio-vertical-1">One</label>
				</div>
				<div class="eui-u-flex">
						<input euiInputRadio id="ro-radio-vertical-2" name="ro-radio-vertical" [readonly]="isReadOnly" [value]="'two'" checked>
						<label for="ro-radio-vertical-2">Two</label>
				</div>
				<div class="eui-u-flex">
						<input euiInputRadio id="ro-radio-vertical-3" name="ro-radio-vertical" [readonly]="isReadOnly" [value]="'three'">
						<label for="ro-radio-vertical-3">Three</label>
				</div>
				<div class="eui-u-flex">
						<input euiInputRadio id="ro-radio-vertical-4" name="ro-radio-vertical" [readonly]="isReadOnly" [value]="'four'">
						<label for="ro-radio-vertical-4">Four</label>
				</div>
				<div class="eui-u-flex">
						<input euiInputRadio id="ro-radio-vertical-5" name="ro-radio-vertical" [readonly]="isReadOnly" [value]="'five'">
						<label for="ro-radio-vertical-5">Five</label>
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
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_INPUT_RADIO, ...EUI_INPUT_GROUP, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {

    public isReadOnly = true;

    public onToggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
```

