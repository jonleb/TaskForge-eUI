---
description: Virtual scroll for large datasets.
id: virtual-scroll-default
---

```html
<div class="eui-table__scrollable-wrapper" style="height: 600px">
    <eui-table isTableResponsive isVirtualScroll [data]="data">
        <ng-template euiTemplate="header">
            <tr>
                <th width="15%">Id</th>
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
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { EuiTableService } from '../../services/eui-table.service';
import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'virtual-scroll-default',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, DecimalPipe],
    providers: [EuiTableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollDefaultComponent implements OnInit {
    public data: Country[];
    public dataLength: number;
    public virtualScrollNbRows = 50;

    private euiTableService = inject(EuiTableService);

    ngOnInit(): void {
        this.euiTableService.lazyDuplicateEntries(1000, { start: 0, end: this.virtualScrollNbRows }).subscribe((data) => {
            this.data = data.data;
            this.dataLength = data.length;
        });
    }

}
```

