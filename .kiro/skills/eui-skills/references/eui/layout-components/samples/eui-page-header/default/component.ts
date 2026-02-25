import { Component } from '@angular/core';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGE,
    ],
})
export class DefaultComponent {
}

