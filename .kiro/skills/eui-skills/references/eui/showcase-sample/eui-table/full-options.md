---
description: Full-feature example combining virtual scroll, sticky parts, sorting, and drag-and-drop.
id: full-options
---

```html
<div class="eui-u-mb-xs eui-u-flex eui-u-flex-justify-content-between">
    <div>European Union <eui-badge euiPrimary>{{ dataLength }}</eui-badge> countries found</div>
    <div class="eui-u-width-20">
        <eui-table-filter placeholder="Search filter..." (filterChange)="onFilterChange($event)" />
    </div>
</div>
<div class="eui-table__scrollable-wrapper eui-u-flex" style="height: 600px">
    <eui-table
        #euiTable
        isVirtualScroll
        hasStickyHeader
        hasStickyFooter
        hasStickyCols
        isTableResponsive
        isAsync
        isColsOrderable
        [virtualScrollAsyncItemsLength]="dataLength"
        [data]="data"
        [itemSize]="65"
        [virtualScrollNbRows]="virtualScrollNbRows"
        (scrollChange)="onScrollChange($event)"
        cdkDropList (cdkDropListDropped)="onDropRow($event)" cdkDropListGroup
        (sortChange)="onSortChange($event)"
        style="width: 1400px">
        <ng-template euiTemplate="header">
            <tr cdkDropList cdkDropListOrientation="horizontal" cdkDropListLockAxis="x" (cdkDropListDropped)="onDrop($event)">
                <th isStickyCol aria-hidden="true" width="56"></th>
                @for (col of cols; track col.prop) {
                    @if (col.prop === 'id') {
                        <th class="eui-u-text-center" isStickyCol isSortable isMultiSortable sortOn="id" width="100">Id</th>
                    } @else if (col.prop === 'country') {
                        <th isStickyCol isSortable isMultiSortable sortOn="country" width="300">Country</th>
                    } @else if (col.prop === 'coordinates') {
                        <th class="eui-u-text-center" isSortable isMultiSortable sortOn="coordinates.lon" cdkDrag cdkDragPreviewClass="eui-table__orderable-cols-preview">Coordinates</th>
                    } @else {
                        <th class="eui-u-text-center" isSortable isMultiSortable [sortOn]="col.prop" cdkDrag cdkDragPreviewClass="eui-table__orderable-cols-preview">{{ col.label }}</th>
                    }
                }
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr cdkDrag cdkDragPreviewClass="eui-table__orderable-rows-preview" [cdkDragData]="row">
                <td isStickyCol>
                    <button cdkDragHandle euiButton euiRounded euiIconButton euiSizeS euiBasicButton euiTooltip="Click to drag & drop" aria-label="Click to drag & drop">
                        <eui-icon-svg icon="dots-six-vertical:regular" />
                    </button>
                </td>
                @for (col of cols; track col.prop) {
                    @if (col.prop === 'id') {
                        <td isStickyCol class="eui-u-text-center" data-col-label="Id">{{ row.id }}</td>
                    } @else if (col.prop === 'country') {
                        <td isStickyCol data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
                    } @else if (col.prop === 'population') {
                        <td class="eui-u-text-center" data-col-label="Population">{{ row.population | number }}</td>
                    } @else if (col.prop === 'coordinates') {
                        <td class="eui-u-text-center" data-col-label="Coordinates">
                            Lon: {{ row.coordinates.lon }}<br/>
                            Lat: {{ row.coordinates.lat }}<br/>
                        </td>
                    } @else {
                        <td class="eui-u-text-center" [attr.data-col-label]="col.label">{{ row[col.prop] }}</td>
                    }
                }
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td isStickyCol></td>
                <td isStickyCol></td>
                <td isStickyCol></td>
                <td colspan="6" class="eui-u-text-center">Footer</td>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="noData">
            <tr>
                <td class="eui-u-text-center" colspan="9">There are currently no data to display</td>
            </tr>
        </ng-template>
    </eui-table>
</div>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, viewChild } from '@angular/core';
import { delay } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE, EuiTableComponent, Sort } from '@eui/components/eui-table';
import { EuiTemplateDirective, EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'full-options',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, DragDropModule, EuiTemplateDirective, EuiTooltipDirective, DecimalPipe, ...EUI_ICON, ...EUI_BADGE, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [EuiTableService],
})
export class FullOptionsComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public virtualScrollNbRows = 50;
    public totalPopulation = 0;
    public cols = [
        { prop: 'id', label: 'Id' },
        { prop: 'country', label: 'Country' },
        { prop: 'year', label: 'Year' },
        { prop: 'iso', label: 'Iso' },
        { prop: 'population', label: 'Population' },
        { prop: 'capital', label: 'Capital' },
        { prop: 'coordinates', label: 'Coordinates' },
        { prop: 'cities', label: 'Cities' },
    ];
    private searchFilter = null;
    private sorts: Sort[] = null;

    readonly euiTable = viewChild<EuiTableComponent>('euiTable');

    private euiTableService = inject(EuiTableService);
    private cd = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

    onScrollChange(e: { start: number, end: number }): void {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', e.start, e.end)
        this.euiTableService.lazyDuplicateEntries(1000, { start: e.start, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
            this.cd.detectChanges();
        });
    }

    onDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.cols, event.previousIndex + 2, event.currentIndex + 2);
    }

    onDropRow(event: CdkDragDrop<Country[], Country[], Country>): void {
        this.euiTable().moveItem(event.item.data.id, event.previousIndex, event.currentIndex);
    }

    onFilterChange(e: string): void {
        this.searchFilter = e;
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', 0, this.virtualScrollNbRows)
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            console.log(data)
            this.data = data.data;
            this.dataLength = data.length;
            this.cd.detectChanges();
        });
    }

    public onSortChange(e: Sort[]) {
        console.log(e);
        this.sorts = e;
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', 0, this.virtualScrollNbRows)
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }, this.searchFilter, this.sorts).subscribe((data) => {
            console.log(data)
            this.data = data.data;
            this.dataLength = data.length;
            this.cd.detectChanges();
        });
    }

}
```

