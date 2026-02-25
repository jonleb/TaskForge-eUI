import { Component } from '@angular/core';
import { EclSortTableEvent, EUI_ECL_TABLE, SortOrder } from '@eui/ecl/components/ecl-table';
import { EclPaginationEvent, EUI_ECL_PAGINATION} from '@eui/ecl/components/ecl-pagination';
import faker from 'faker';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_PAGINATION, ...EUI_ECL_TABLE],
})
export class DefaultComponent {
    dataSource: any[] = [];
    pageOfItems: any[] = [];
    showingFrom: number;
    showingTo: number;

    constructor() {
        for (let i = 0; i < 94; i++) {
            this.dataSource.push(
                {
                    name: faker.commerce.productName(),
                    department: faker.commerce.department(),
                    organization: faker.company.companyName(),
                    author: faker.name.findName(),
                    price: faker.commerce.price()
                }
            )
        }
    }

    onPage(evt: EclPaginationEvent) {
        this.showingFrom = evt.showingFrom;
        this.showingTo = evt.showingTo;

        this.pageOfItems = this.getPage(
            this.dataSource,
            this.showingFrom,
            this.showingTo
        );
    }

    onSort(evt: EclSortTableEvent) {
        this.dataSource = this.getSorted(
            this.dataSource,
            evt.columnId,
            evt.sortOrder
        );

        this.pageOfItems = this.getPage(
            this.dataSource,
            this.showingFrom,
            this.showingTo
        );
    }

    private getPage(ds: Array<any>, from: number, to: number): Array<any> {
        return ds.slice(from - 1, to);
    }

    private getSorted(ds: Array<any>, columnId: string, sortOrder: SortOrder): Array<any> {
        return ds.slice().sort((rowA, rowB) => {
            const a = rowA[columnId];
            const b = rowB[columnId];

            switch (sortOrder) {
                case SortOrder.ASCENDING:
                    return -a.localeCompare(b, undefined, { numeric: true });
                case SortOrder.DESCENDING:
                    return a.localeCompare(b, undefined, { numeric: true });
                case null:
                    return 0;
            };
        });
    }

    onPrevClick(): void {
        console.log('Go to previous.');
    }

    onNextClick(): void {
        console.log('Go to next.');
    }

    onItemClick(): void {
        console.log('Go to ...');
    }
}
