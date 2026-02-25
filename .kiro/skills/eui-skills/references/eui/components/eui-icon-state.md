# eui-icon-state

## Overview

<p>
    Atomic component used in eUI internal component states to ensure centralized rendering of state icons.
</p>

<p>
    It is used in <strong>eui-alert</strong>, <strong>eui-growl</strong> and <strong>eui-feedback-message</strong> for example.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | size | '2xs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| '2xl' \| '3xl' \| '4xl' | 'm' |
| Input | ariaLabel | string | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant |

## Samples

### [Default](samples/eui-icon-state/Default)

```html
<div class="doc-sample-section-title">euiInfo</div>
<eui-icon-state euiInfo/>

<div class="doc-sample-section-title">euiSuccess</div>
<eui-icon-state euiSuccess/>

<div class="doc-sample-section-title">euiWarning</div>
<eui-icon-state euiWarning/>

<div class="doc-sample-section-title">euiDanger</div>
<eui-icon-state euiDanger/>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ICON_STATE } from '@eui/components/eui-icon-state';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_STATE,
    ],
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```
