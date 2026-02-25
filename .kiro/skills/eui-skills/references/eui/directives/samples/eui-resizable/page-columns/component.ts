import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EuiResizableDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'page-columns',
    templateUrl: 'component.html',
    imports: [
        RouterLink,
    ],
})
export class PageColumnsComponent {
}
