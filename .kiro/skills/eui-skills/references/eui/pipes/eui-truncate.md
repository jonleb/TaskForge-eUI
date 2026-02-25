# eui-truncate

## Overview

The <code class="eui-u-text-code">euiTruncate</code> pipe allows to limit the length's display of a string to a defined number characters.
Recommended usage is within component's views to regulate UI display visual consistency. It is commonly convenient when used within data tables.

<div class="doc-sample-section-title">Usage sample</div>

<img src="./assets/images/eui-truncate/euiTruncate.png" alt="" />

## Samples

### [Default](samples/eui-truncate/Default)

```html
<div class="doc-sample-section-title">Initial values</div>
<div class="eui-u-ml-m">
    <div class="eui-u-mb-s">
        <small><strong>Sample 1 &mdash; length : {{ commentSmall.length }} characters</strong></small>
        <br>
        <em>{{ commentSmall }}</em>
    </div>
    <div class="eui-u-mb-s">
        <small><strong>Sample 2 &mdash; length : {{ commentBig.length }} characters</strong></small>
        <br>
        <em>{{ commentBig }}</em>
    </div>
</div>


<div class="doc-sample-section-title">Truncated values</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Truncated&nbsp;size</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-col="Truncated&nbsp;size">10</td>
            <td data-col="Result">{{ commentSmall | euiTruncate : 10 }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">20</td>
            <td data-col="Result">{{ commentSmall | euiTruncate : 20 }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">30</td>
            <td data-col="Result">{{ commentSmall | euiTruncate : 30 }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">40 (default)</td>
            <td data-col="Result">{{ commentSmall | euiTruncate }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">50</td>
            <td data-col="Result">{{ commentSmall | euiTruncate : 50 }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">100</td>
            <td data-col="Result">{{ commentBig | euiTruncate : 100 }}</td>
        </tr>
        <tr>
            <td data-col="Truncated&nbsp;size">250</td>
            <td data-col="Result">{{ commentBig | euiTruncate : 250 }}</td>
        </tr>
    </tbody>
</table>
```

```typescript
import { Component } from '@angular/core';

import { EuiTruncatePipe } from '@eui/components/pipes';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [EuiTruncatePipe]
})
export class DefaultComponent {
    // tslint:disable max-line-length
    public commentSmall = 'The quick brown fox jumps over the lazy dog';
    public commentBig = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur id diam vitae varius. Nullam ornare lectus quis dui volutpat, id tincidunt dolor ultricies. Curabitur ut nulla vitae nisl interdum fringilla feugiat in felis. Suspendisse commodo massa a ipsum interdum, accumsan gravida arcu vestibulum. Donec pharetra congue lorem. Vestibulum porta suscipit ullamcorper. Maecenas pellentesque feugiat ultricies. Suspendisse faucibus diam ac est porttitor, sed vestibulum nisl viverra.';
}
```
