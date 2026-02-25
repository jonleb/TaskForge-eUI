# eui-header

## Overview

<eui-alert>
    This eui-header is used within an <strong>eui-app-header</strong> wrapper component at eui-app / app.component.html root level of an eUI application.
    <br>
    When using the <strong>eui-app-header-user-profile</strong>, check the <strong>eui-user-profile</strong> component. The same inputs applies there.
</eui-alert>

<br><br><br>

<div class="eui-u-flex">
    Toggle impersonated view :
    <eui-slide-toggle class="eui-u-ml-xs eui-u-mr-m" (slideToggleChange)="onToggleImpersonated($event)"></eui-slide-toggle>
</div>
<br>

## Samples

### [Default](samples/eui-header/Default)

```html
<eui-alert euiWarning>
    The <strong>eui-header-logo</strong> AND <strong>eui-header-app</strong> eui-header's sub component are mandatory
</eui-alert>

<eui-header>
    <eui-header-logo></eui-header-logo>
    <eui-header-app appName="appName"></eui-header-app>
</eui-header>
```

```typescript
import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_ALERT,
    ],
    styleUrl: './component.scss'
})
export class DefaultComponent {
}
```

### Other examples

- [Options: Using eui-header-environment](samples/eui-header/with-header-environment)
- [Options: Using eui-header-right-content](samples/eui-header/with-header-right-content)
- [Options: Using eui-header-user-profile](samples/eui-header/with-header-user-profile)
- [Options: Using eui-language-selector](samples/eui-header/with-language-selector)
- [Options: Using custom logo](samples/eui-header/logo)
- [Misc: ECL Options](samples/eui-header/ecl-options)
- [Misc: Multiple Options](samples/eui-header/multiple-options)

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
