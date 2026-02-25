import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { EuiAppShellService } from '@eui/core';
import { EUI_FIELDSET } from "@eui/components/eui-fieldset";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    // eslint-disable-next-line
    selector: 'editableState',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_FIELDSET,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
    ],
})
export class EditableStateComponent implements OnInit {
    isEditActive = false;
    value1 = 'Editable value 1';
    value2 = 'Editable value 2';
    tmp1: any;
    tmp2: any;

    constructor(public asService: EuiAppShellService) {}

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
