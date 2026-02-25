# eui-chip

## Overview

<p class="eui-u-text-paragraph">Chips are compact elements that allow users to enter information, select a choice, filter content or trigger an action.
<br>
The <code class="eui-u-text-code">eui-chip</code> component can also be displayed dynamically as a group of multiple interactive elements, see <a class="eui-u-text-link" routerLink="/style-guide/components/eui-chip-list" class="eui-u-text-link"><code class="eui-u-text-code">eui-chip-list</code></a>.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-chip' |
| Input | euiInternalId | string | null |
| Input | tooltipMessage | string | - |
| Input | id | string \| number | - |
| Input | data | any | { |
| Input | isChipRemovable | boolean | false |
| Input | isFilled | boolean | false |
| Input | colorPalette | string | - |
| Output | remove | unknown | new EventEmitter<any>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiSizeS, euiSizeVariant, euiOutline, euiDisabled |

## Samples

### [Default](samples/eui-chip/Default)

```html
<eui-chip>Chip label</eui-chip>
```

```typescript
import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Variants: Colors](samples/eui-chip/color-states)
- [Variants: Outline](samples/eui-chip/outline)
- [Variants: Sizes](samples/eui-chip/sizes)
- [Options: Icons](samples/eui-chip/icons)
- [Options: isFilled](samples/eui-chip/isFilled)
- [Options: Long labels](samples/eui-chip/long-label)
- [Main features: Removable chips](samples/eui-chip/isChipRemovable)
- [Event handlers: Events](samples/eui-chip/event-handlers)
- [Composition: Tooltip](samples/eui-chip/tooltip)
- [Variants: eui-chip-button](samples/eui-chip/chip-button)
- [Extra palettes](samples/eui-chip/extra-palettes)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-chip</code> component behaves as a <code class="eui-u-text-code">role="status"</code> if it is used as an individual chip and as a <code class="eui-u-text-code">role="listitem"</code> in case it's part of an <code class="eui-u-text-code">eui-chip-list</code>. <br> 
The chip content is announced to the assistive technologies through the ariaLabel property that needs to be provided by the developer. When the chip is removable, the remove button is announced as a button with the ariaLabel property set to "Remove "chip's label" chip".

<p class="eui-u-text-paragraph">Special attention has been given to comply with the a11y requirement to have sufficient color contrast between the text in the foreground and the background color behind it.
More info on this can be found <code class="eui-u-text-code"><a class="eui-u-text-link-external" href="https://dequeuniversity.com/rules/axe/3.5/color-contrast?application=axeAPI" target="_blank">here</a>.</code></p>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
