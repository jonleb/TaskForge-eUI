---
description: Demonstrates tooltip text alignment with the contentAlignment input on long content.
id: content-align
---

```html
<button euiButton euiPrimary [euiTooltip]="bigContentLatin" contentAlignment="left">Left aligned</button>
&nbsp;&nbsp;
<button euiButton euiPrimary [euiTooltip]="bigContentLatin" contentAlignment="right">Right aligned</button>
&nbsp;&nbsp;
<button euiButton euiPrimary [euiTooltip]="bigContentLatin" contentAlignment="center">Centered (default)</button>
&nbsp;&nbsp;
<button euiButton euiPrimary [euiTooltip]="bigContentEnglish" contentAlignment="justify">Justified content</button>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faker } from '@faker-js/faker';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'content-align',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentAlignmentComponent {

    public bigContentLatin = faker.lorem.paragraphs(2, '\n\n    ');
    public bigContentEnglish = faker.lorem.paragraphs(3, '\n\n    ');
}
```

