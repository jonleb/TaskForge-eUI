import { Component } from '@angular/core';

import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    // eslint-disable-next-line
    selector: 'custom-icon',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE],
})
export class CustomIconComponent {
    public isFolderOpen1 = false;
    public isFolderOpen2 = false;

    public onOpenFolderToggle1(event: boolean) {
        this.isFolderOpen1 = !this.isFolderOpen1;
    }

    public onOpenFolderToggle2(event: boolean) {
        this.isFolderOpen2 = !this.isFolderOpen2;
    }

}
