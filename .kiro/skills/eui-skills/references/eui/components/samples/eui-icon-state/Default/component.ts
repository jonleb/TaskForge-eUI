import { Component } from '@angular/core';
import { EUI_ICON_STATE } from '@eui/components/eui-icon-state';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_STATE,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
