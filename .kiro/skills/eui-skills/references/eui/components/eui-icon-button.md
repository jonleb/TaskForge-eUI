# eui-icon-button

## Overview

<p>
    Highly recommended for accessibility usage, it has focus point, and <strong>ariaLabel</strong> provided as input attached to the internal eui-icon-svg.
</p>

<eui-alert euiDanger>
    When you need to use a clickable icon, DON'T bind a click event directly on an eui-icon-svg, use the eui-icon-button here instead.
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | icon | string | - |
| Input | iconUrl | string | - |
| Input | fillColor | string | - |
| Input | size | '2xs' \| 'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| '2xl' \| '3xl' \| '4xl' | 'm' |
| Input | ariaLabel | string | 'eUI Icon button' |
| Input | tabindex | number | 0 |
| Input | hasNoPadding | boolean | false |
| Input | hasOverflowHover | boolean | false |
| Input | hasFocusHoverColor | boolean | false |
| Input | hasFocusHoverBg | boolean | true |
| Input | euiRounded | boolean | false |
| Input | euiDisabled | boolean | false |
| Output | buttonClick | unknown | new EventEmitter<Event>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeS |

## Samples

### [Default](samples/eui-icon-button/Default)

```html
<eui-icon-button icon="eui-state-info" ariaLabel="information"/>
```

```typescript
import { Component } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_LAYOUT,
    ],
})
export class DefaultComponent {

}
```

### Other examples

- [Variants: Colors](samples/eui-icon-button/colors)
- [Variants: Rounded](samples/eui-icon-button/rounded)
- [Variants: Sizes](samples/eui-icon-button/sizes)
- [Options: hasNoPadding](samples/eui-icon-button/has-no-padding)
- [Options: hasOverflowHover](samples/eui-icon-button/has-overflow-hover)
- [Options: States](samples/eui-icon-button/states)
- [Event Handlers: Events](samples/eui-icon-button/event-handlers)
- [Misc: As eui-toolbar-item](samples/eui-icon-button/as-toolbar-item)
- [Misc: With eui-dropdown](samples/eui-icon-button/with-dropdown)
