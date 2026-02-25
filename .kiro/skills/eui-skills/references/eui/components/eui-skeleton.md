# eui-skeleton

## Overview

Molecule multi-purpose container component to display loading / skeleton of expected component shapes before final rendering.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSizeXS, euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiRounded, euiSizeVariant |

## Samples

### [Default](samples/eui-skeleton/Default)

```html
<eui-skeleton circle></eui-skeleton>
```

```typescript
import { Component } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
})
export class DefaultComponent {


}
```

### Other examples

- [Variants: Sizes](samples/eui-skeleton/sizes)
- [Options: Circle](samples/eui-skeleton/circle)
- [Options: Line](samples/eui-skeleton/line)
- [Options: Rectangle](samples/eui-skeleton/rectangle)
- [Options: Square](samples/eui-skeleton/square)
- [Composition: Custom styles](samples/eui-skeleton/custom-styles)
- [Composition: Multiple skeleton](samples/eui-skeleton/multiple-skeleton)

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
