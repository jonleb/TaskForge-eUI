# eui-timeline

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-timeline</code> component displays responsive and customisable timeline items to show data in a chronological order with support for multiple styles, sizes and variants.
</p>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-timeline' |
| Input | isLeftAligned | boolean | - |

## Samples

### [Default](samples/eui-timeline/Default)

```html
<eui-timeline>
    <eui-timeline-item
        date="01/03/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item">
    </eui-timeline-item>
    <eui-timeline-item
        date="01/02/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item">
    </eui-timeline-item>
    <eui-timeline-item
        date="01/01/2021"
        time="12:00"
        label="default"
        subLabel="sub label content of the timeline item">
    </eui-timeline-item>
</eui-timeline>
```

```typescript
import { Component } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-timeline/colors)
- [Options: dateStyleClass](samples/eui-timeline/date-style-class)
- [Options: isGroup](samples/eui-timeline/isGroup)
- [Options: isLeftAligned](samples/eui-timeline/isLeftAligned)
- [Options: timeStyleClass](samples/eui-timeline/time-style-class)
- [Main features: Custom content](samples/eui-timeline/content-custom)
- [Main features: Custom content template](samples/eui-timeline/content-custom-template)
- [Misc: Responsive layout](samples/eui-timeline/responsive-layout)
- [Misc: Within eui-card](samples/eui-timeline/within-card)
