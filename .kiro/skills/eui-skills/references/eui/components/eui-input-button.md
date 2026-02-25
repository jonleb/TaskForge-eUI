# eui-input-button

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
| Input | euiButtonPositionStart | boolean | false |
| Input | euiButtonPositionEnd | boolean | true |

## Samples

### [Default](samples/eui-input-button/Default)

```html
<div class="doc-sample-section-title">Default</div>

<div class="row">
    <div class="col-md-4">        
        <eui-input-button>
            <input euiInputText
                [euiClearable]="true"
                (input)="onSearch($event)"
                placeholder="Search..."
                aria-label="Search"/>
            <button euiButton>
                <eui-icon-svg icon="eui-search" aria-label="Search Icon"/>
            </button>
        </eui-input-button>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_BUTTON } from '@eui/components/eui-input-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_BUTTON,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```
