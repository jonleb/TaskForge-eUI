import { Component } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    // eslint-disable-next-line
    selector: 'custom-styles',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
})
export class CustomStylesComponent {


}
