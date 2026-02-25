# eui-paginator

## Overview

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-paginator</code> component is in charge of the <strong>pagination</strong> by splitting up content or data into several pages and adding visual controls for better user experience like:</p>
<ul class="eui-u-ml-m">
    <li>identifying the current page : clearly identify which page the user is on by displaying the current page number.</li>
    <li>providing context into how many pages there are in total : can help provide clarity around the data displayed.</li>
    <li>providing various options for navigating : previous and next chevrons or links are the most useful way for the user to move forward or backward through pages of data.</li>
    <li>items per page : allows to select the amount of data displayed per page.</li>
</ul>


<h5 class="eui-u-f-bold eui-u-c-info eui-u-mt-xl">Best practices & Usage</h5>
<p class="eui-u-text-paragraph">Generally, pagination is recommended to be used if there are <strong>more than 25 items</strong> displayed in one view. The default number of displayed items may vary depending on the context.</p>
<p class="eui-u-text-paragraph">The main benefits of using pagination :</p>
<ul class="eui-u-ml-m">
    <li>delivers structure and feedback over the displayed data</li>
    <li>supports embedded navigation (and in particular back and forward, first and last)</li>
    <li>pagination is accessible (see A11Y)</li>
    <li>pagination typically means smaller, shorter pages and as a result reduced load times</li>
    <li>compared to infinite scroll display, it helps to focus the user's mind and not continue to offer more and more choices.</li>
</ul>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | pageSizeOptions | number[] | [5, 10, 25, 50, 100] |
| Input | pageSize | number | 10 |
| Input | page | number | 0 |
| Input | length | number | 0 |
| Input | nbPageNumberNavigation | number | 5 |
| Input | isHidden | boolean | false |
| Input | isBasicMode | boolean | false |
| Input | hasPageNumberNavigation | boolean | false |
| Input | hasDynamicLength | boolean | false |
| Input | hasPageSize | boolean | true |
| Output | pageChange | unknown | new EventEmitter<EuiPaginationEvent>() |

## Samples

### [Default](samples/eui-paginator/Default)

```html
<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-paginator</code> component uses translated labels for its layout's
    elements which are linked to the user selected language or default current language.
    Try to change it from the language selector to see it in action.
</p>
<br>
<eui-alert>
    In order to <strong>activate</strong> the pagination, you must provide the <strong>data source
        size</strong> through the <code class="eui-u-text-code">length</code> input property.
</eui-alert>

<eui-paginator [length]="dataSource.length"></eui-paginator>
```

```typescript
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
```

### Other examples

- [Options: Basic mode](samples/eui-paginator/basic-mode)
- [Options: isHidden](samples/eui-paginator/is-hidden)
- [Options: Page number navigation](samples/eui-paginator/page-numbering)
- [Options: Position](samples/eui-paginator/position)
- [Main features: Page size & options](samples/eui-paginator/page-size-options)
- [Main features: Set start page](samples/eui-paginator/page-start)
- [Events handlers: Events](samples/eui-paginator/pagination-events)
- [Composition: Cards list usage](samples/eui-paginator/cards-list)
- [Composition: Data table usage](samples/eui-paginator/data-table)

## Accessibility

<p class="eui-u-text-paragraph">
    When <code class="eui-u-text-code">eui-paginator</code> is present, an <code class="eui-u-text-code">aria-label="Select Items per page"</code> is used to provide a meaningful label on the arrow-down icon used to select the items per page.
Likewise on the navigation area the following attributes have been used on the icons in order to announce them properly:</p>
<ul class="eui-u-ml-m">
    <li><code class="eui-u-text-code">aria-label="Go to first page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to previous page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to next page"</code>,</li>
    <li><code class="eui-u-text-code">aria-label="Go to last page"</code>.</li>
</ul>

<h5 class="eui-u-text-h5 section-title eui-u-mt-m">Keyboard interaction</h5>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Goes to next navigation item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Sift + Tab</kbd></td>
            <td>Goes to previous nagitation item</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter / Spacebar</kbd></td>
            <td>Selects the targetted navigation item</td>
        </tr>
    </tbody>
</table>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
