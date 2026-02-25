import { Component } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    // eslint-disable-next-line
    selector: 'multiple-skeleton',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
})
export class MultipleSkeletonComponent {

}
