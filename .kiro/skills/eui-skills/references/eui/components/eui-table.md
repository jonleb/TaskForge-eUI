# eui-table

## Overview

<eui-alert euiWarning>
    This component requires the import of <code class="eui-u-text-code">EuiTemplateDirective</code><br/>
    <code class="eui-u-text-code">import &#123; EuiTemplateDirective &#125; from '&#64;eui/components/directives';</code>
</eui-alert><br/>

The <strong>eui-table</strong> component has been built to offer various requested features including fast performance and excellent level of control over tabular presentation of data. The eui-table is quite simple of usage and requires :
<div class="eui-u-ml-m">
    <ul>
        <li>
            rows : the <strong>data value</strong> input as an array of objects, usually fetched from a service (data payload),
        </li>
        <li>
            view : this is the <strong>template </strong>for the presentation
            with its various options such as the search filter, the paginator,
            sortable columns, etc.
        </li>
    </ul>
</div>

<br/>

<eui-card [euiCollapsible]="true" [euiCollapsed]="true">
    <eui-card-header>
        <eui-card-header-title>Migrate from legacy eui-table</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <div tabindex="0" style="overflow-y: auto;">
             <code class="eui-u-text-code">&#64;Input() rows</code> has been renamed to <code class="eui-u-text-code">data</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() loading</code> has been renamed to <code class="eui-u-text-code">isLoading</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() asyncTable</code> has been renamed to <code class="eui-u-text-code">isAsync</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() paginable</code> has been removed as pagination needs to be done with <code class="eui-u-text-code">eui-aginator</code> component.<br/>
            <code class="eui-u-text-code">&#64;Input() euiTableResponsive</code> has been renamed to <code class="eui-u-text-code">isTableResponsive</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() euiTableBordered</code> has been removed to align to Design System.<br/>
            <code class="eui-u-text-code">&#64;Input() euiTableFixedLayout</code> has been renamed to <code class="eui-u-text-code">isTableFixedLayout</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() euiTableCompact</code> has been renamed to <code class="eui-u-text-code">isTableCompact</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() hasStickyColumns</code> has been renamed to <code class="eui-u-text-code">hasStickyCols</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() isSelectOnlyVisibleRows</code> default value is now <code class="eui-u-text-code">true</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() isHoverable</code> has been removed to align to Design System.<br/>
            <code class="eui-u-text-code">&#64;Input() isStickyColumn</code> on <code class="eui-u-text-code">th</code> and <code class="eui-u-text-code">td</code> has been renamed to <code class="eui-u-text-code">isStickyCol</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() isSelectableHeader</code> on <code class="eui-u-text-code">tr</code> has been renamed to <code class="eui-u-text-code">isHeaderSelectable</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() isSelectable</code> on <code class="eui-u-text-code">tr</code> has been renamed to <code class="eui-u-text-code">isDataSelectable</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() sortable</code> on <code class="eui-u-text-code">th</code> has been renamed to <code class="eui-u-text-code">isSortable</code>.<br/>
            <code class="eui-u-text-code">&#64;Input() defaultMultiOrder</code> on <code class="eui-u-text-code">th</code> has been removed. Sorting needs to be inited with <code class="eui-u-text-code">eui-table</code> public method <code class="eui-u-text-code">setSort(sorts: Sort[])</code>.<br/>
            <code class="eui-u-text-code">&#64;Output() selectedRows</code> has been renamed to <code class="eui-u-text-code">rowsSelect</code>.<br/>
            <code class="eui-u-text-code">&#64;Output() sortChange</code> emits now an array of <code class="eui-u-text-code">Sort</code> type.<br/>
            <code class="eui-u-text-code">&#64;Output() multiSortChange</code> has been removed as multi-sort is supported by <code class="eui-u-text-code">sortChange</code> Output.<br/>
            <code class="eui-u-text-code">&#64;Pipe euiTableHighlightFilter</code> has been renamed to <code class="eui-u-text-code">euiTableHighlight</code>.<br/>
            - public method <code class="eui-u-text-code">setSort(sort: string, order: "asc" | "desc")</code> is now <code class="eui-u-text-code">setSort(Sort[])</code>.<br/>
            - public variable <code class="eui-u-text-code">filteredRows</code> has been renamed to <code class="eui-u-text-code">getFilteredData</code>.<br/>
        </div>
    </eui-card-content>
</eui-card>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | data | DATA[] | [] |
| Input | propId | string | 'id' |
| Input | itemSize | number | 41 |
| Input | paginator | EuiPaginatorComponent | - |
| Input | filter | EuiTableFilterComponent | - |
| Input | preselectedRows | DATA[] | [] |
| Input | isVirtualScroll | boolean | false |
| Input | isVirtualScrollCache | boolean | false |
| Input | hasStickyHeader | boolean | false |
| Input | hasStickyFooter | boolean | false |
| Input | hasStickyCols | boolean | false |
| Input | isTableResponsive | boolean | false |
| Input | isAsync | boolean | false |
| Input | virtualScrollAsyncItemsLength | number | 0 |
| Input | virtualScrollNbRows | number | 50 |
| Input | isColsOrderable | boolean | false |
| Input | isLoading | boolean | false |
| Input | isSelectOnlyVisibleRows | boolean | true |
| Input | isTableBordered | boolean | false |
| Input | isTableFixedLayout | boolean | false |
| Input | isTableCompact | boolean | false |
| Output | scrollChange | unknown | new EventEmitter() |
| Output | rowsSelect | unknown | new EventEmitter<DATA[]>() |
| Output | sortChange | unknown | new EventEmitter<Sort[]>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | - |

## Samples

### [Default](samples/eui-table/default)

```html
<div class="doc-sample-section-title">Static table</div>

<table class="eui-table-default">
    <thead>
        <tr>
            <th>Country</th>
            <th>Year</th>
            <th>ISO</th>
            <th>Population</th>
            <th>Capital city</th>
        </tr>
    </thead>
    <tbody>
        @for (row of data; track row) {
            <tr>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td>{{ row.iso }}</td>
                <td>{{ row.population | number }}</td>
                <td>{{ row.capital }}</td>
            </tr>
        }
    </tbody>
    <tfoot>
        <tr>
            <td class="eui-u-text-center" colspan="5">Footer 1</td>
        </tr>
    </tfoot>
</table>

<div class="doc-sample-section-title">eui-table</div>

<div class="eui-table__scrollable-wrapper">
    <table euiTable [data]="data">
        <ng-template euiTemplate="header">
            <tr>
                <th>Country</th>
                <th>Year</th>
                <th>ISO</th>
                <th>Population</th>
                <th>Capital city</th>
            </tr>
        </ng-template>
        <ng-template let-row euiTemplate="body">
            <tr>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td>{{ row.iso }}</td>
                <td>{{ row.population | number }}</td>
                <td>{{ row.capital }}</td>
            </tr>
        </ng-template>
        <ng-template euiTemplate="footer">
            <tr>
                <td class="eui-u-text-center" colspan="5">Footer 1</td>
            </tr>
        </ng-template>
    </table>
</div>
```

```typescript
import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';

import { Country } from '../../models/eui-countries-response.model';

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_TABLE, EuiTemplateDirective, DecimalPipe],
})
export class DefaultComponent {

    public data: Country[] = [
        { id: 1, country: 'Austria', year: 1995, iso: 'AT', population: 8504850, capital: 'Vienna' },
        { id: 2, country: 'Belgium', year: 1958, iso: 'BE', population: 11198638, capital: 'Brussels' },
        { id: 3, country: 'Bulgaria', year: 2007, iso: 'BG', population: 7364570, capital: 'Sofia' },
        { id: 4, country: 'Croatia', year: 2013, iso: 'HR', population: 4284889, capital: 'Zagreb' },
        { id: 5, country: 'Cyprus', year: 2004, iso: 'CY', population: 1117000, capital: 'Nicosia' },
        { id: 6, country: 'Czechia', year: 2004, iso: 'CZ', population: 10513209, capital: 'Prague' },
        { id: 7, country: 'Denmark', year: 1973, iso: 'DK', population: 5655750, capital: 'Copenhagen' },
        { id: 8, country: 'Estonia', year: 2004, iso: 'EE', population: 1315819, capital: 'Tallinn' },
        { id: 9, country: 'Finland', year: 1995, iso: 'FI', population: 5470820, capital: 'Helsinki' },
        { id: 10, country: 'France', year: 1958, iso: 'FR', population: 67210000, capital: 'Paris' },
    ];

}
```

### Other examples

- [Options: Compact](samples/eui-table/compact)
- [Options: Bordered](samples/eui-table/bordered)
- [Options: Fixed Layout](samples/eui-table/fixed-layout)
- [Options: Responsive](samples/eui-table/responsive)
- [Main features: Async](samples/eui-table/async)
- [Main features: Caption](samples/eui-table/caption)
- [Main features: Id property](samples/eui-table/prop-id)
- [Main features: No data](samples/eui-table/no-data)
- [Main features: Re-order Cols](samples/eui-table/cols-drag-n-drop)
- [Main features: Resizable Cols](samples/eui-table/cols-resizable)
- [Main features: Row index](samples/eui-table/row-index)
- [Main features: Sortable cols](samples/eui-table/sortable-cols)
- [Main features: Sticky](samples/eui-table/sticky)
- [Expand rows: All expandable](samples/eui-table/expandable-row)
- [Expand rows: Expand one close other](samples/eui-table/expandable-row-close-other)
- [Filtering: Custom highlight filtered results](samples/eui-table/global-filter-custom-highlight)
- [Filtering: Global filter](samples/eui-table/global-filter)
- [Filtering: Highlight filtered results](samples/eui-table/global-filter-highlight)
- [Filtering: Reset filter manually](samples/eui-table/global-filter-reset)
- [Pagination: Default pagination](samples/eui-table/pagination-default)
- [Pagination: Dynamic page length change](samples/eui-table/pagination-dynamic-length)
- [Pagination: Init on specific page](samples/eui-table/pagination-init-page)
- [Pagination: Multiple pagination](samples/eui-table/pagination-multiple)
- [Pagination: Page number navigation](samples/eui-table/pagination-page-number)
- [Selectable row: Custom selectable feature implementation](samples/eui-table/selectable-row-custom)
- [Selectable row: Multi-select rows with Ctrl / Shift keys](samples/eui-table/selectable-row-keyboard)
- [Selectable row: Preselected rows](samples/eui-table/selectable-row-preselection)
- [Selectable row: Select all across all pages](samples/eui-table/selectable-row-all-pages)
- [Selectable row: Selectable row](samples/eui-table/selectable-row)
- [Selectable row: Single selectable row](samples/eui-table/single-selectable-row)
- [Virtual Scroll: Default Virtual Scroll](samples/eui-table/virtual-scroll-default)
- [Virtual Scroll: With async data](samples/eui-table/virtual-scroll-async)
- [Virtual Scroll: With async data and cache](samples/eui-table/virtual-scroll-async-cache)
- [Misc: Cols / Rows grouping](samples/eui-table/cols-rows-grouping)
- [Misc: Full options](samples/eui-table/full-options)
- [Misc: Hide / Show cols](samples/eui-table/hide-show-cols)
- [Misc: Inline editing](samples/eui-table/inline-editing)
- [Misc: Re-order Rows](samples/eui-table/re-order-rows-drag-n-drop)

## Accessibility

<code class="eui-u-text-code">eui-table</code> takes full advantage of the semantic approach being used and the corresponding roles attached to the <code class="eui-u-text-code">tr</code> and <code class="eui-u-text-code">td</code> of the native <code class="eui-u-text-code">table</code> html element in order to announce it's content.
<br>

<p class="eui-u-mb-none">When <code class="eui-u-text-code">eui-paginator</code> is present, an <code class="eui-u-text-code">aria-label="Select Items per page"</code> is used to provide a meaningful label on the arrow-down icon used to select the items per page.
Likewise on the navigation area the following attributes have been used on the icons in order to announce them properly:</p>
<div class="eui-u-ml-m">
    <li><code class="eui-u-text-code">aria-label="Go to first page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to previous page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to next page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to last page"</code>.</li>
</div>

<p class="eui-u-mb-none">When <code class="eui-u-text-code">tr[isSelectableHeader]</code> is used, the following attributes are being used on the icons acting as checkboxes in order to inform the user about the action that he needs to take:</p>
<div class="eui-u-ml-m">
    <li><code class="eui-u-text-code">aria-label="Check"</code> if the checkbox is not checked and</li>
    <li><code class="eui-u-text-code">aria-label="Uncheck"</code> if the checkbox is checked.</li>
</div>
The same attributes have been applied for the selectable rows as well, when <code class="eui-u-text-code">tr[isSelectable]</code> is used.

<p class="eui-u-mb-none">When <code class="eui-u-text-code">th[sortable]</code> (eui-table-sortable-col) is used, depending on which ordering is used ('no order', 'ascending order' or 'descending order'), the following attributes have been attached accordingly to the eUI Icons in order to give them a meaningful label:</p>
<div class="eui-u-ml-m">
    <li><code class="eui-u-text-code">aria-label="No sorting icon"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Ascending order icon"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Descending order icon"</code>.</li>
</div>

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-table-filter</code> consists of a form which includes an <code class="eui-u-text-code">input</code> field and two <code class="eui-u-text-code">span</code> icons.
The <code class="eui-u-text-code">input</code> field has been given a meaningful label via <code class="eui-u-text-code">[attr.aria-label]="placeholder? placeholder: 'Filter Input Field'"</code> and announces either the <code class="eui-u-text-code">placeholder</code> value (if used) or a default message.
The first euiIcon has been given a meaningful label via <code class="eui-u-text-code">aria-label="Search Icon"</code> and the second euiIcon which appears once user starts typing within the input field has been given a meaningful label via <code class="eui-u-text-code">aria-label="Clear Icon"</code>
</p>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
