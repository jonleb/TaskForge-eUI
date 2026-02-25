---
description: Basic tooltip usage on buttons, icon buttons, and links using the euiTooltip directive.
id: Default
---

```html
<button euiButton euiPrimary euiTooltip="Info about the action">Action</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="eUI" aria-label="eUI Tooltip questionmark icon">
    <eui-icon-svg icon="question:regular" size="s" fillColor="secondary" />
</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="is" aria-label="eUI Tooltip send icon">
    <eui-icon-svg icon="eui-send" size="s" fillColor="secondary" />
</button>

&nbsp;&nbsp;

<button euiButton euiRounded euiIconButton euiBasicButton euiPrimary euiSizeL euiTooltip="Awesome !" aria-label="eUI Tooltip thumb up icon">
    <eui-icon-svg icon="eui-thumbs-up" size="s" fillColor="secondary" />
</button>

<a href="#" euiTooltip="Awesome !" class="eui-u-text-link">Link</a>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

