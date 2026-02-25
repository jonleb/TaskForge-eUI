---
description: Only one row can be expanded at a time.
id: expandable-row-close-other
---

```html
<div class="eui-table__scrollable-wrapper">
    <table euiTable isTableResponsive [data]="data">
        <ng-template euiTemplate="header">
            <tr>
                <th aria-hidden="true"></th>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
                <th>Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td data-col-label="Click to expand/collapse">
                    <eui-icon-button
                        size="s"
                        [icon]="!(expandedPanelId === row.id) ? 'eui-chevron-right' : 'eui-chevron-down'"
                        [ariaLabel]="'Click to ' + (row.expanded ? 'collapse' : 'expand')"
                        (click)="expandedPanelId === row.id ? expandedPanelId = null : expandedPanelId = row.id" />
                </td>
                <td data-col-label="Country" nowrap><span class="eui-flag-icon eui-flag-icon--rounded eui-flag-icon-{{ row.iso.toLowerCase() }} eui-u-mr-s"></span>{{ row.country }}</td>
                <td data-col-label="Year">{{ row.year }}</td>
                <td data-col-label="ISO">{{ row.iso }}</td>
                <td data-col-label="Population">{{ row.population | number }}</td>
                <td data-col-label="Capital city">{{ row.capital }}</td>
            </tr>
            @if(expandedPanelId === row.id) {
                <tr isExpandableRow>
                    <td colspan="6" class="p-3">
                        <h4 class="eui-u-text-h4">Expanded row content for <strong>{{ row.country }}</strong> <span euiBadge class="eui-u-ml-m">{{ row.iso }}</span></h4>
                        <div class="row">
                            <div class="col-md-3">
                                <span class="eui-flag-icon eui-flag-icon-{{ row.iso.toLowerCase() }} eui-flag-icon-5x"></span>
                            </div>
                            <div class="col-md-9">
                                <span>Capital city : <strong>{{ row.capital }}</strong></span><br>
                                <span>Population : <strong>{{ row.population | number }}</strong></span><br>
                                <span>Year : <strong>{{ row.year }}</strong></span><br>
                            </div>
                        </div>
                    </td>
                </tr>
            }
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="6">Footer</td>
            </tr>
        </ng-template>
    </table>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    selector: 'expandable-row-close-other',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, ...EUI_ICON_BUTTON, EuiTemplateDirective, DecimalPipe, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableRowCloseOtherComponent {

    public data: Country[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
    ];
    public expandedPanelId = null;

}
```

