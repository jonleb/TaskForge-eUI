---
description: Read-only mode bound to a reactive form value so the time is displayed but not editable.
id: readonly
---

```html
<form [formGroup]="form">
    <div class="row">
        <div class="col">
            <eui-timepicker isreadOnly formControlName="timepickerControl" />
        </div>

        <div class="col">
            <pre class="eui-u-text-pre">{{ form.value | json }}</pre>
        </div>
    </div>
</form>
```

```typescript
import { JsonPipe } from "@angular/common";
import { Component, inject, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    selector: 'readOnly',
    templateUrl: './component.html',
    imports: [ReactiveFormsModule, ...EUI_TIMEPICKER, JsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadOnlyComponent implements OnInit {

    public form: FormGroup;
    private fb: FormBuilder = inject(FormBuilder);

    ngOnInit() {
        this.form = this.fb.group({
            timepickerControl: [
                {
                    hours: 19,
                    mins: 28
                },
                [Validators.required],
            ],
        });
    }
}
```

