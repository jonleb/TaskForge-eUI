import { Component, OnInit } from "@angular/core";

import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_PAGINATOR } from "@eui/components/eui-paginator";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PAGINATOR, ...EUI_ALERT],
})
export class DefaultComponent implements OnInit {

    public dataSource: any[] = [
        { id: 0},
    ];

    ngOnInit() {
        for (let i = 1; i < 1100; i++) {
            this.dataSource.push({ id: i });
        }
    }

}
