---
description: Multiple selection functionality with reactive forms, displaying selected values and optgroup support.
id: multiple
---

```html
<form [formGroup]="form">
    <div class="row">
        <div class="col-md-6">
            <div class="doc-sample-section-title">Default</div>
            <select euiSelect name="dino-multi" formControlName="dinoMulti" multiple aria-label="Select multiple dinosaurs">
                <option value="Deinonychus">Deinonychus</option>
                <option value="Tyrannosaurus" selected>Tyrannosaurus</option>
                <option value="Velociraptor">Velociraptor</option>
            </select>

            <div class="doc-sample-section-title">With groups</div>
            <label euiLabel for="dino-select">Choose a dinosaur</label>
            <select euiSelect id="dino-select" formControlName="dinoGroup" multiple aria-label="Select dinosaurs in groups">
                <optgroup label="Sauropods">
                    <option value="Apatosaurus">Apatosaurus</option>
                    <option value="Diplodocus">Diplodocus</option>
                    <option value="Saltasaurus">Saltasaurus</option>
                </optgroup>
                <optgroup label="Theropods">
                    <option value="Deinonychus">Deinonychus</option>
                    <option value="Tyrannosaurus">Tyrannosaurus</option>
                    <option value="Velociraptor">Velociraptor</option>
                </optgroup>
            </select>
        </div>
        <div class="col-md-6">
            <pre class="eui-u-text-pre"><strong>Selected values:</strong> {{form.value | json}} </pre>
        </div>
    </div>
</form>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EuiAppShellService, markFormGroupTouched } from '@eui/core';
import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';


@Component({
    // tslint:disable-next-line
    selector: 'multiple',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_LABEL, ...EUI_SELECT, JsonPipe],
    providers: [EuiAppShellService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleComponent implements OnInit {

    public form: FormGroup;

    public optionsMulti: {value: string; label: string; selected?: boolean}[] = [
        { value: 'Deinonychus', label: 'Deinonychus' },
        { value: 'Tyrannosaurus', label: 'Tyrannosaurus', selected: true },
        { value: 'Velociraptor', label: 'Velociraptor' },
    ];

    public asService = inject(EuiAppShellService);
    private fb = inject(FormBuilder);

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            dinoMulti: new FormControl(null, [Validators.required]),
            dinoGroup: new FormControl(null, [Validators.required]),
        });
    }

    public isFormValid(): boolean {
        markFormGroupTouched(this.form.controls);
        if (this.form.valid) {
            // Add customs checks here...
            return true;
        }
        return false;
    }
}
```

