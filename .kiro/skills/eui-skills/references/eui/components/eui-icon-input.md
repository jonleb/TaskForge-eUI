# eui-icon-input

## Overview

<p>
    A embedded eui-icon-svg and eui-input-text wrapper to have default and consolidated search field rendering.
</p>

<p>
    This component is used internally in eUI in <strong>eui-sidebar-menu</strong> and <strong>eui-table</strong> for example.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | euiIconPositionStart | boolean | true |
| Input | euiIconPositionEnd | boolean | false |

## Samples

### [Default](samples/eui-icon-input/Default)

```html
<div class="doc-sample-section-title">Default</div>

<div class="row">
    <div class="col-md-4">
        <eui-icon-input>
            <eui-icon-svg icon="eui-search" fillColor="secondary" aria-label="Search Icon"/>
            <input
                euiInputText
                [euiClearable]="true"
                (input)="onSearch($event)"
                placeholder="Search..."
                aria-label="Search"/>
        </eui-icon-input>        
    </div>
</div>


<div class="doc-sample-section-title">euiIconPositionEnd</div>

<div class="row">
    <div class="col-md-4">
        <eui-icon-input euiIconPositionEnd>
            <eui-icon-svg icon="eui-search" fillColor="secondary" aria-label="Search Icon"/>
            <input
                euiInputText
                [euiClearable]="true"
                (input)="onSearch($event)"
                placeholder="Search..."
                aria-label="Search"/>
        </eui-icon-input>        
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_INPUT } from '@eui/components/eui-icon-input';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_INPUT_TEXT,
        ...EUI_ICON_INPUT,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```
