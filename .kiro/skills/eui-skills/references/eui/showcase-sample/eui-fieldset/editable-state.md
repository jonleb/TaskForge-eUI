---
description: Combines highlighted state and right-header actions to switch between view, edit, save, and cancel flows.
id: editable-state
---

```html
<eui-fieldset label="Editable fieldset" [euiHighlighted]="isEditActive" isExpanded>
    <euiFieldsetLabelRightContent class="eui-u-mr-s">
    @if (!isEditActive) {
        <button euiButton euiBasicButton euiSizeS euiPrimary euiOutline euiTooltip="Edit" aria-label="Edit" (click)="onEdit($event)">Edit</button>
    } @else {
        <button euiButton euiSecondary euiSizeS class="eui-u-ml-s" (click)="onCancel($event)">Cancel</button>
        <button euiButton euiPrimary euiSizeS class="eui-u-ml-s" (click)="onSave($event)">Save</button>
    }
    </euiFieldsetLabelRightContent>

    <div class="eui-u-flex eui-u-flex-column">

        <div euiInputGroup class="row">
            <div class="col-md-3">
                <label for="firstInput" euiLabel>first label</label>
            </div>
            <div class="col-md-9">
                <input id="firstInput" euiInputText [(ngModel)]="value1" [ngModelOptions]="{standalone: true}" placeholder="Type some text" [readonly]="!isEditActive" />
            </div>
        </div>

        <div euiInputGroup class="row">
            <div class="col-md-3">
                <label for="secondInput" euiLabel>second label</label>
            </div>
            <div class="col-md-9">
                <input id="secondInput" euiInputText [(ngModel)]="value2" [ngModelOptions]="{standalone: true}" placeholder="Type some text" [readonly]="!isEditActive" />
            </div>
        </div>
    </div>
</eui-fieldset>
```

```typescript
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { EuiAppShellService } from '@eui/core';
import { EUI_FIELDSET } from "@eui/components/eui-fieldset";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    selector: 'editableState',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_FIELDSET,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableStateComponent implements OnInit {
    isEditActive = false;
    value1 = 'Editable value 1';
    value2 = 'Editable value 2';
    tmp1: any;
    tmp2: any;

    public asService = inject(EuiAppShellService);

    ngOnInit() {
        this.tmp1 = this.value1;
        this.tmp2 = this.value2;
        this.asService.state$.subscribe((state) => {
            this.isEditActive = state.isDimmerActive;
        });
    }

    onEdit(event: any) {
        this.isEditActive = !this.isEditActive;
        this.asService.setDimmerActiveState(this.isEditActive);
    }

    onSave(event: any) {
        this.tmp1 = this.value1;    // Backup current values
        this.tmp2 = this.value2;
        this.isEditActive = !this.isEditActive;
        this.asService.setDimmerActiveState(this.isEditActive);
    }

    onCancel(event: any) {
        this.value1 = this.tmp1;    // Restore previous values
        this.value2 = this.tmp2;
        this.isEditActive = !this.isEditActive;
        this.asService.setDimmerActiveState(this.isEditActive);
    }
}
```

