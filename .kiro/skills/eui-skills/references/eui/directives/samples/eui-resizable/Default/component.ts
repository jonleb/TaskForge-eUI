import { Component } from '@angular/core';

import { EuiResizableDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        EuiResizableDirective,
    ],
})
export class DefaultComponent {
}
