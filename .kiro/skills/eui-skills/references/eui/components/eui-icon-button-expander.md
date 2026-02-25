# eui-icon-button-expander

## Overview

<p>
    Atomic component used in eUI internal component for accessible button with icon chevron expand/collapse
</p>

<p>
    It is used in <strong>eui-card</strong>, <strong>eui-fieldset</strong> and <strong>eui-sidebar-menu</strong> for example.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | fillColor | string | - |
| Input | size | '2xs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| '2xl' \| '3xl' \| '4xl' | 'm' |
| Input | ariaLabel | string | - |
| Input | isExpanded | boolean | false |
| Input | isDirectionForward | boolean | false |
| Input | euiDisabled | boolean | false |
| Output | buttonClick | unknown | new EventEmitter<Event>() |

## Samples

### [Default](samples/eui-icon-button-expander/Default)

```html
<div class="doc-sample-section-title">Default</div>

<eui-icon-button-expander [isExpanded]="isExpanded1" fillColor="secondary" (buttonClick)="onToggle1()"/>

<br>
Expanded : {{ isExpanded1 }}

<div class="doc-sample-section-title">isDirectionForward</div>

<eui-icon-button-expander [isExpanded]="isExpanded2" isDirectionForward fillColor="secondary" (buttonClick)="onToggle2()"/>

<br>
Expanded : {{ isExpanded2 }}
```

```typescript
import { Component } from '@angular/core';
import { EUI_ICON_BUTTON_EXPANDER } from '@eui/components/eui-icon-button-expander';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON_EXPANDER,
    ],
})
export class DefaultComponent {
    isExpanded1 = false;
    isExpanded2 = false;
    isExpanded3 = false;

    onToggle1(): void {
        this.isExpanded1 = !this.isExpanded1;
    }

    onToggle2(): void {
        this.isExpanded2 = !this.isExpanded2;
    }    
}
```
