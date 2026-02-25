import { Component, OnInit } from '@angular/core';
import { EUI_ECL_TABLE } from '@eui/ecl/components/ecl-table';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABLE],
})
export class DefaultComponent implements OnInit {
    date: Date = new Date();

    ngOnInit() {
        this.date.setDate(5);
        this.date.setMonth(0);
        this.date.setFullYear(2018);
    }
}
