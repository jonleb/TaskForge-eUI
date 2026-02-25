import { Component } from '@angular/core';

import { EUI_SHOWCASE } from '@eui/showcase';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    selector: 'default',
    templateUrl: './component.html',
    imports: [...EUI_PAGE, ...EUI_SHOWCASE],
})
export class DefaultComponent {

    public sidebarItems = [
        { label: 'Item 1', url: 'dummy-route-1', iconSvgName: 'eui-state-info', iconTypeClass: "primary" },
        { label: 'Item 2', url: 'dummy-route-2', iconSvgName: 'eui-state-warning', iconTypeClass: "warning" },
        { label: 'Item 3', url: 'dummy-route-3', iconSvgName: 'eui-state-danger', iconTypeClass: "danger" },
        { label: 'Item 4', url: 'dummy-route-4', iconSvgName: 'eui-state-success', iconTypeClass: "success" },
    ];

}
