# ecl-pagination

## Overview

Control to navigate through multiple pages.
<br>
<more-info componentPartUrl="navigation/pagination/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<h6 class="section-title">With default 'Next', 'Previous' and 'ariaLabel' (translated)</h6>
<ecl-pagination>
    <ul eclPaginationList>
        <li eclPaginationItem isPrevious (pageClick)="onPrevClick()"></li>
        <li eclPaginationItem label="24" (pageClick)="onItemClick()"></li>
        <li eclPaginationItem label="25" (pageClick)="onItemClick()"></li>
        <li eclPaginationItem label="26" isCurrent></li>
        <li eclPaginationItem label="27" (pageClick)="onItemClick()"></li>
        <li eclPaginationItem label="28" (pageClick)="onItemClick()"></li>
        <li eclPaginationItem isNext (pageClick)="onNextClick()"></li>
    </ul>
</ecl-pagination>

<h6 class="section-title">With custom ariaLabel</h6>
<ecl-pagination>
    <ul eclPaginationList>
        <li eclPaginationItem label="Previous" isPrevious ariaLabel="Go to previous page"></li>
        <li eclPaginationItem label="1" ariaLabel="Go to page 1"></li>
        <li eclPaginationItem label="..." isTruncated></li>
        <li eclPaginationItem pagesCount="40" label="26" ariaLabel="Page 26 of 40" isCurrent></li>
        <li eclPaginationItem label="27" ariaLabel="Go to page 27"></li>
        <li eclPaginationItem label="..." isTruncated></li>
        <li eclPaginationItem label="40" ariaLabel="Go to page 40"></li>
        <li eclPaginationItem label="Next" isNext ariaLabel="Go to next page"></li>
    </ul>
</ecl-pagination>

<h6 class="section-title">Automatic mode</h6>
<ecl-pagination mode="auto" totalItems=85></ecl-pagination>

<h6 class="section-title">Automatic mode with customized configuration</h6>
<ecl-pagination mode="auto" totalItems=50 pageSize=10 pageWindowSize=3 currentPage=3>
</ecl-pagination>

<h6 class="section-title">Ecl Table Integration</h6>
<table eclTable (sort)="onSort($event)">
    <thead eclTableHead>
        <tr eclTableRow>
            <th eclSortable="name" eclTableHeader>Name</th>
            <th eclSortable="department" eclTableHeader>Department</th>
            <th eclSortable="organization" eclTableHeader>Organization</th>
            <th eclSortable="author" eclTableHeader>Author</th>
            <th eclSortable="price" eclTableHeader>Price</th>
        </tr>
    </thead>
    <tbody eclTableBody>
        @for (item of pageOfItems; track $index ) {
        <tr eclTableRow>
            <td eclTableCellHeader="Name" eclTableCell>{{ item.name }}</td>
            <td eclTableCellHeader="Department" eclTableCell>{{ item.department }}</td>
            <td eclTableCellHeader="Organization" eclTableCell>{{ item.organization }}</td>
            <td eclTableCellHeader="Author" eclTableCell>{{ item.author }}</td>
            <td eclTableCellHeader="Price" eclTableCell>{{ item.price }}</td>
        </tr>
        }
    </tbody>
</table>

<ecl-pagination mode="auto" [totalItems]="dataSource.length" pageSize=5 (page)="onPage($event)">
</ecl-pagination>
```

```typescript
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
```
