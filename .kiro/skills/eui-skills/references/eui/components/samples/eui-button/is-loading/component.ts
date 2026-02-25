import { Component, ChangeDetectorRef } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'is-loading',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_ICON]
})
export class IsLoadingComponent {
    isLoading = true;

    constructor(private cd: ChangeDetectorRef) {}

    toggleLoading() {
        this.isLoading = !this.isLoading;
        this.cd.detectChanges();
    }
}
