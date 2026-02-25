import { Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    // eslint-disable-next-line
    selector: 'isExpandable',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
})
export class IsExpandableComponent {
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
