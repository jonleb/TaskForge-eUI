import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BreadCrumbItem,
    EuiBreadcrumbComponent,
    EUI_BREADCRUMB,
    EuiBreadcrumbService,
} from '@eui/components/eui-breadcrumb';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'NavigationExtras',
    templateUrl: 'component.html',
    imports: [
        CommonModule,
        ...EUI_BREADCRUMB, ...EUI_BUTTON,
    ],
    providers: [
        EuiBreadcrumbService,
    ],
})
export class NavigationExtrasComponent {
    @ViewChild('breadCrumbRef', { read: EuiBreadcrumbComponent }) breadCrumbRef: EuiBreadcrumbComponent;
    private counter = 4;

    constructor(public service: EuiBreadcrumbService) {
        this.service.setBreadcrumb([
            { id: '1', label: 'Item 1', link: `/style-guide/layout-components/eui-breadcrumb/route_1` },
            { id: '2', label: 'Item 2', link: `/style-guide/layout-components/eui-breadcrumb/route_2` },
            { id: '3', label: 'Item 3', link: `/style-guide/layout-components/eui-breadcrumb/route_3` },
        ]);
    }

    addLast($event: MouseEvent) {
        // generate Item
        const item = new BreadCrumbItem();
        item.id = `test_${this.counter}`;
        item.label = `Item ${this.counter}`;
        item.link = `/style-guide/layout-components/eui-breadcrumb/route_${this.counter++}`;

        this.service.addCrumb(item);
    }

    removeLast($event: MouseEvent) {
        this.service.removeCrumb();
        if (this.counter > 0) {
            this.counter--;
        }
    }
}
