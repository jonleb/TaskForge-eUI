# eui-banner

## Overview

TODO

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | euiPositionTop | boolean | false |
| Input | euiPositionCenter | boolean | false |
| Input | euiInverse | boolean | false |
| Input | isVideoBanner | boolean | false |
| Input | imageUrl | string | - |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSizeS, euiSizeM, euiSizeL, euiSizeVariant, euiOutline |

## Samples

### [Default](samples/eui-banner/Default)

```html
<eui-banner imageUrl="https://inno-ecl.s3.amazonaws.com/media/examples/example-image8.jpg">
    <eui-banner-title>Title</eui-banner-title>
    <eui-banner-description>Description</eui-banner-description>
</eui-banner>
```

```typescript
import { Component } from '@angular/core';

import { EUI_BANNER } from '@eui/components/eui-banner';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BANNER,
        ...EUI_BUTTON,
    ]
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Inverse colors](samples/eui-banner/inverse)
- [Variants: Sizes](samples/eui-banner/sizes)
- [Main Features: Content position](samples/eui-banner/position)
- [Misc: Video banner](samples/eui-banner/video-banner)
- [Misc: With call to action button](samples/eui-banner/call-to-action)

## Accessibility

TODO
