import { Component } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
})
export class DefaultComponent {

}
