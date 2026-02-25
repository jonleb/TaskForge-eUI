# eui-section-header

## Overview

TODO

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-section-header' |
| Input | id | string | - |
| Input | isExpandable | boolean | false |
| Input | isExpanded | boolean | true |
| Input | isFirst | boolean | false |
| Output | expand | EventEmitter<string> | new EventEmitter() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiHighlighted |

## Samples

### [Default](samples/eui-section-header/Default)

```html
<eui-section-header>
    <eui-section-header-title>Section title</eui-section-header-title>
</eui-section-header>
```

```typescript
import { Component } from '@angular/core';

import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-section-header/colors)
- [Options: Expandable](samples/eui-section-header/expandable)
- [Options: Icon](samples/eui-section-header/icon)
- [Main Feature: Actions](samples/eui-section-header/actions)
- [Main Feature: Description](samples/eui-section-header/description)
- [Event Handlers: Events](samples/eui-section-header/events)
- [Composition: With badge](samples/eui-section-header/with-badge)

## Accessibility

TODO
