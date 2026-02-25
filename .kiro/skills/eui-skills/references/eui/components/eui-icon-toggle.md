# eui-icon-toggle

## Overview

The <code class="eui-u-text-code">eui-icon-toggle</code> component is a toggleable implementation of <code class="eui-u-text-code">eui-icon</code> where you can use its two states (on/off) which you can toggle between to display 2 different icons.
For list of available icons, see <a class="eui-u-text-link" routerLink="/style-guide/components/eui-icon">eui-icon</a>.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isChecked | boolean | false |
| Input | isReadOnly | boolean | - |
| Input | e2eAttr | string | 'eui-icon-toggle' |
| Input | id | unknown | `eui-icon-toggle-${uniqueId()}` |
| Input | tabindex | string | '0' |
| Input | ariaLabel | string | 'Toggle icon' |
| Input | iconSvgSize | string | 'm' |
| Input | iconSvgNameOn | string | - |
| Input | iconSvgNameOff | string | - |
| Input | iconSvgFillColorOn | string | 'accent' |
| Input | iconSvgFillColorOff | string | 'neutral' |
| Output | toggle | EventEmitter<boolean> | new EventEmitter() |

## Samples

### [Default](samples/eui-icon-toggle/Default)

```html
<div class="doc-sample-section-title">With svg icon : filled/outline for on/off toggle icon name</div>
    <eui-icon-toggle iconSvgNameOn="eui-star-fill" iconSvgNameOff="eui-star">
</eui-icon-toggle>
```

```typescript
import { Component } from '@angular/core';

import { EUI_ICON_TOGGLE } from "@eui/components/eui-icon-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ICON_TOGGLE],
})
export class DefaultComponent {
}
```

### Other examples

- [Options: isChecked](samples/eui-icon-toggle/isChecked)
- [Options: isReadOnly](samples/eui-icon-toggle/isReadOnly)
- [Event Handlers: Events](samples/eui-icon-toggle/event-toggle)
- [Misc: Custom icon](samples/eui-icon-toggle/custom-icon)
- [Misc: With tooltip](samples/eui-icon-toggle/with-tooltip)

## Accessibility

The <code class="eui-u-text-code">eui-icon-toggle</code> component provides keyboard accessible experience. It announces to screen readers with a "switch" role and a meaningful customizable default label <code class="eui-u-text-code">aria-label="Toggle icon"</code>.
As IDs of active elements must be unique (see <a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/duplicate-id-active?application=axeAPI" target="_blank">here</a>), we provided a default unique <code class="eui-u-text-code">id</code> value as input option that can also be customized.


<div class="doc-sample-section-title">Default</div>
<eui-icon-toggle iconClassOff="eui-icon eui-icon-star-o"
                  iconClassOn="eui-icon eui-icon-star">
</eui-icon-toggle>


<div class="doc-sample-section-title">With custom aria label</div>
<eui-icon-toggle iconClassOff="eui-icon eui-icon-star-o"
                  iconClassOn="eui-icon eui-icon-star"
                  ariaLabel="Bright star in the sky">
</eui-icon-toggle>


<div class="doc-sample-section-title">With keyboardAccessKey 't' defined</div>
Use <kbd class="eui-u-text-kbd">Alt</kbd> + <kbd class="eui-u-text-kbd">t</kbd>
<br>
<eui-icon-toggle iconClassOff="eui-icon eui-icon-star-o"
                  iconClassOn="eui-icon eui-icon-star"
                  keyboardAccessKey="t">
</eui-icon-toggle>


<div class="doc-sample-section-title">Keyboard interaction</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Move focus to next tab</td>
        </tr>
        <tr>
            <td><kbd class="eui-u-text-kbd">Shift</kbd> + <kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Move focus to previous tab</td>
        </tr>
        <tr>
            <td>
                <kbd class="eui-u-text-kbd">Enter</kbd>
                 or
                <kbd class="eui-u-text-kbd">Spacebar</kbd>
                 or
                <kbd class="eui-u-text-kbd">Alt</kbd> + <kbd class="eui-u-text-kbd">accesskey</kbd>
            </td>
            <td>Select/unselect focused tab</td>
        </tr>
    </tbody>
</table>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
