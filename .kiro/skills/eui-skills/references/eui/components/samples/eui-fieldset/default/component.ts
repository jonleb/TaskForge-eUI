import { Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
})
export class DefaultComponent {
    isEditActive = false;

    onEdit(event: any) {
        this.isEditActive = !this.isEditActive;
    }

    onSave(event: any) {
        this.isEditActive = !this.isEditActive;
    }

    onCancel(event: any) {
        this.isEditActive = !this.isEditActive;
    }
}
