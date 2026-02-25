---
description: Virtual scroll caching to avoid reloading already fetched ranges.
id: virtual-scroll-async-cache
---

```html
<div class="eui-table__scrollable-wrapper" style="height: 600px">
    <eui-table isVirtualScroll isVirtualScrollCache isTableResponsive isAsync [virtualScrollAsyncItemsLength]="dataLength" [data]="data" [virtualScrollNbRows]="virtualScrollNbRows" (scrollChange)="onScrollChange($event)">
        <ng-template euiTemplate="header">
            <tr>
                <th>Id</th>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td>{{ row.id }}</td>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td>{{ row.iso }}</td>
                <td>{{ row.population | number }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="5">Footer</td>
            </tr>
        </ng-template>
    </eui-table>
</div>
```

```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { delay } from 'rxjs';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'virtual-scroll-async-cache',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, DecimalPipe],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollAsyncCacheComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public virtualScrollNbRows = 50;

    private euiTableService = inject(EuiTableService);
    private cd = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

    onScrollChange(e: { start: number, end: number }): void {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++BACKEND CALL', e.start, e.end)
        this.euiTableService.lazyDuplicateEntries(1000, { start: e.start, end: this.virtualScrollNbRows }).pipe(delay(2000)).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
            this.cd.detectChanges();
            
        });
    }
}
```

